const customer = require('server/customer/customer.model');
const repair = require('server/repair/repair.model');
const cash = require('server/cash/cash.model');
const user = require('server/users/user.model');

const repairStatus = require('server/repair/repair.status');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();

const Sequelize = require('sequelize');
const { CashTransaction } = require('../cash/cash.model');
const { cashGetDefinition } = require('../cash/cash.functions');
const { RepairCashTransaction } = require('../cash/repair-cash-transaction.model');
const { ERepairStatus } = require('./repair-status-enum');
const Op = Sequelize.Op;

module.exports = {
    create,
    getAll,
    getAllByDate,
    getByClientId,
    getById,
    getHistoryByRepairId,
    remove,
    updateDeviceInfo,
    updateTrackingInfo,
    getStatusData,
};

async function getStatusData() {
    return repairStatus.RepairStatus.findAll({ attributes: ['id', 'description'], order: [['id', 'ASC']] });
}

async function create({ repairToCreate, user }) {
    return new Promise(async (resolve, reject) => {
        const t = await sequelizeConnector.transaction();

        let repairDAO;
        let repairHistoryDAO;

        try {
            repairDAO = await repair.Repair.create(
                {
                    idClient: repairToCreate.customer.id,
                    idEquipment: repairToCreate.device.type.id,
                    manufacturer: repairToCreate.device.manufacturer,
                    model: repairToCreate.device.model,
                    imei: repairToCreate.device.deviceId,
                    equipmentTurnedOn: repairToCreate.device.turnedOn,
                    issue: repairToCreate.issue,
                    paymentInAdvance: repairToCreate.paymentInAdvance,
                    createdBy: user.id,
                    enabled: 1,
                    deleted: 0,
                    warrantyTerm: 3,
                    idStatus: 0,
                },
                { transaction: t }
            );

            repairHistoryDAO = await repair.RepairStatusHistory.create(
                {
                    idRepair: repairDAO.dataValues.id,
                    idStatus: 0,
                    updatedBy: user.id,
                    note: repairToCreate.issue,
                    cost: repairDAO.dataValues.cost,
                    price: repairDAO.dataValues.price,
                    paymentInAdvance: repairDAO.dataValues.paymentInAdvance,
                    updatedAt: null,
                },
                { transaction: t }
            );

            await t.commit();
            resolve({ ...repairDAO.dataValues, history: { ...repairHistoryDAO.dataValues } });
        } catch (error) {
            console.error(error);
            await t.rollback();
            reject(error);
        }
    });
}

async function updateDeviceInfo({ id, device, issue, ...discarded }) {
    return repair.Repair.update(
        {
            idEquipment: device.type.id,
            manufacturer: device.manufacturer,
            model: device.model,
            imei: device.deviceId,
            issue: issue,
            equipmentTurnedOn: device.turnedOn,
        },
        { where: { id: id } }
    );
}

async function updateTrackingInfo({ repairToUpdate, user, generateTransaction, officeBranch }) {
    const {
        id,
        status,
        note,
        paymentInAdvance,
        cost,
        price,
        warrantyTerm,
        moneyTransactions,
        ...discarded
    } = repairToUpdate;

    const t = await sequelizeConnector.transaction();

    return new Promise(async (resolve, reject) => {
        try {
            // Updates data relative to repair register
            await repair.Repair.update(
                {
                    note: note,
                    idStatus: status.id,
                    repairCost: cost,
                    repairPrice: price,
                    paymentInAdvance: paymentInAdvance,
                    warrantyTerm: warrantyTerm,
                    updatedDate: Sequelize.literal('CURRENT_TIMESTAMP'),
                    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                { where: { id: id }, transaction: t }
            );

            // Updates current/previous status history of the repair
            await repair.RepairStatusHistory.update(
                {
                    updatedBy: user.id,
                    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                { where: { idRepair: id, updatedAt: { [Op.eq]: null } }, transaction: t }
            );

            // Creates a new register for the repair status history
            await repair.RepairStatusHistory.create(
                {
                    idRepair: id,
                    idStatus: status.id,
                    updatedBy: user.id,
                    note: note,
                    cost: cost,
                    price: price,
                    paymentInAdvance: paymentInAdvance,
                    updatedAt: null,
                },
                { transaction: t }
            );

            // If status is one of the accepter finish status, and transactions are generated, adds related money transactions
            if (generateTransaction && isFinishedStatus(status.id)) {
                for (const payment of moneyTransactions.filter((x) => !x.id)) {
                    // Grabs only new moneyTransactions, which lack an ID, and ignore the others

                    let cashTransactionDAO = await cash.CashTransaction.create(
                        {
                            amount: payment.amount,
                            note: 'Ingresos por Reparación ID ' + id,
                            transactionTypeId: 1,
                            transactionConceptId: 158, // TODO: Define enums for server-side APIs (Transaction Concepts)
                            createdBy: user.id,
                            paymentMethodId: payment.paymentMethod.id,
                            idBranch: officeBranch.id,
                        },
                        { transaction: t }
                    );

                    // Saves the relation between the operation (a repair) and the money transaction
                    await RepairCashTransaction.create(
                        {
                            idRepair: id,
                            idCashTransaction: cashTransactionDAO.dataValues.id,
                        },
                        { transaction: t }
                    );
                }
            }

            await t.commit();
            resolve([1]);
        } catch (e) {
            console.error(e);
            await t.rollback();
            reject([0]);
        }
    });
}

async function remove(id) {
    return repair.Repair.update({ deleted: 1 }, { where: { id: id } });
}

async function getAll({ showFinished }) {
    showFinished = showFinished !== 'false';
    const repairDAOs = await repair.Repair.findAll({
        attributes: [
            'id',
            'manufacturer',
            'model',
            'imei',
            'issue',
            'note',
            'dischargeDate',
            'updatedDate',
            'finishedDate',
            'paymentInAdvance',
            'repairCost',
            'repairPrice',
            'equipmentTurnedOn',
            'enabled',
            'deleted',
            'idEquipment',
            'warrantyTerm',
        ],
        include: [
            {
                as: 'customer',
                model: customer.Customer,
                required: true,
                attributes: [
                    'id',
                    'dni',
                    'address',
                    'firstName',
                    'lastName',
                    'email',
                    'telephone',
                    [
                        Sequelize.fn(
                            'CONCAT',
                            Sequelize.col('customer.first_name'),
                            ' ',
                            Sequelize.col('customer.last_name')
                        ),
                        'fullName',
                    ],
                ],
            },
            {
                as: 'status',
                model: repairStatus.RepairStatus,
                required: true,
                attributes: ['id', 'description'],
            },
            {
                as: 'user',
                model: user.User,
                required: true,
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'userName',
                    'avatar',
                    'createdAt',
                    'updatedAt',
                    'enabled',
                    'deleted',
                ],
            },
        ],
        where: {
            // ADD ENUMS FOR THIS WHERE
            idStatus: {
                [Op.notIn]: showFinished
                    ? []
                    : [
                          ERepairStatus.FINISHED_AND_PAID,
                          ERepairStatus.RETURNED_WITHOUT_REPAIR,
                          ERepairStatus.BOUGHT,
                          ERepairStatus.FINISHED_BY_WARRANTY,
                      ],
            },
            enabled: 1,
            deleted: 0,
        },
    });

    return new Promise((resolve, reject) => {
        if (repairDAOs) {
            const repairDTOs = repairDAOs.map((repairDAO) => toRepairDTO(repairDAO.dataValues));
            resolve(repairDTOs);
        } else {
            reject(error);
        }
    });
}
async function getAllByDate({ showFinished, startDate, endDate }) {
    showFinished = showFinished !== 'false';
    const repairDAOs = await repair.Repair.findAll({
        attributes: [
            'id',
            'manufacturer',
            'model',
            'imei',
            'issue',
            'note',
            'dischargeDate',
            'updatedDate',
            'finishedDate',
            'paymentInAdvance',
            'repairCost',
            'repairPrice',
            'equipmentTurnedOn',
            'enabled',
            'deleted',
            'idEquipment',
            'warrantyTerm',
        ],
        include: [
            {
                as: 'customer',
                model: customer.Customer,
                required: true,
                attributes: [
                    'id',
                    'dni',
                    'address',
                    'firstName',
                    'lastName',
                    'email',
                    'telephone',
                    [
                        Sequelize.fn(
                            'CONCAT',
                            Sequelize.col('customer.first_name'),
                            ' ',
                            Sequelize.col('customer.last_name')
                        ),
                        'fullName',
                    ],
                ],
            },
            {
                as: 'status',
                model: repairStatus.RepairStatus,
                required: true,
                attributes: ['id', 'description'],
            },
            {
                as: 'user',
                model: user.User,
                required: true,
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'userName',
                    'avatar',
                    'createdAt',
                    'updatedAt',
                    'enabled',
                    'deleted',
                ],
            },
        ],
        where: {
            idStatus: { [Op.notIn]: showFinished ? [] : [5, 7] },
            dischargeDate: { [Op.between]: [startDate, endDate] },
            enabled: 1,
            deleted: 0,
        },
    });

    return new Promise((resolve, reject) => {
        if (repairDAOs) {
            const repairDTOs = repairDAOs.map((repairDAO) => toRepairDTO(repairDAO.dataValues));
            resolve(repairDTOs);
        } else {
            reject(error);
        }
    });
}
async function getById(id) {
    const repairDAO = await repair.Repair.findOne({
        attributes: [
            'id',
            'manufacturer',
            'model',
            'imei',
            'issue',
            'note',
            'dischargeDate',
            'updatedDate',
            'finishedDate',
            'paymentInAdvance',
            'repairCost',
            'repairPrice',
            'equipmentTurnedOn',
            'enabled',
            'deleted',
            'idEquipment',
            'warrantyTerm',
        ],
        include: [
            {
                as: 'customer',
                model: customer.Customer,
                required: true,
                attributes: [
                    'id',
                    'dni',
                    'address',
                    'firstName',
                    'lastName',
                    'email',
                    'telephone',
                    [
                        Sequelize.fn(
                            'CONCAT',
                            Sequelize.col('customer.first_name'),
                            ' ',
                            Sequelize.col('customer.last_name')
                        ),
                        'fullName',
                    ],
                ],
            },
            {
                as: 'status',
                model: repairStatus.RepairStatus,
                required: true,
                attributes: ['id', 'description'],
            },
            {
                as: 'user',
                model: user.User,
                required: false,
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'userName',
                    'avatar',
                    'createdAt',
                    'updatedAt',
                    'enabled',
                    'deleted',
                ],
            },
            {
                as: 'moneyTransactions',
                model: CashTransaction,
                attributes: ['id', 'amount', 'date', 'note', 'createdBy', 'deleted', 'enabled'],
                include: cashGetDefinition(false),
                required: false,
                through: { attributes: [] },
            },
        ],
        where: {
            id: id,
        },
    });

    // Attach history to the repair DAO
    repairDAO.dataValues.history = await getHistoryByRepairId(id);

    return new Promise((resolve, reject) => {
        if (repairDAO) {
            const repairDTOs = toRepairDTO(repairDAO.dataValues);
            resolve(repairDTOs);
        } else {
            reject(error);
        }
    });
}
async function getByClientId(idClient) {
    const repairDAOs = await repair.Repair.findAll({
        attributes: [
            'id',
            'manufacturer',
            'model',
            'imei',
            'issue',
            'note',
            'dischargeDate',
            'updatedDate',
            'finishedDate',
            'paymentInAdvance',
            'repairCost',
            'repairPrice',
            'equipmentTurnedOn',
            'enabled',
            'deleted',
            'idEquipment',
            'warrantyTerm',
        ],
        include: [
            {
                as: 'status',
                model: repairStatus.RepairStatus,
                required: true,
                attributes: ['id', 'description'],
            },
        ],
        where: {
            idClient: idClient,
            enabled: 1,
            deleted: 0,
        },
    });

    return new Promise((resolve, reject) => {
        if (repairDAOs) {
            const repairDTOs = repairDAOs.map((repairDAO) => toRepairDTO(repairDAO.dataValues));
            resolve(repairDTOs);
        } else {
            reject(error);
        }
    });
}

async function getHistoryByRepairId(idRepair) {
    return repair.RepairStatusHistory.findAll({
        attributes: ['id', 'createdAt', 'updatedAt', 'paymentInAdvance', 'cost', 'price', 'note'],
        include: [
            {
                as: 'status',
                model: repairStatus.RepairStatus,
                attributes: ['id', 'description'],
            },
            {
                as: 'user',
                model: user.User,
                required: true,
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'userName',
                    'avatar',
                    'createdAt',
                    'updatedAt',
                    'enabled',
                    'deleted',
                ],
            },
        ],
        where: {
            idRepair: idRepair,
        },
        order: [['updatedAt', 'DESC']],
    });
}

function toRepairDTO(repairDAO) {
    const {
        dischargeDate,
        updatedDate,
        finishedDate,
        equipmentTurnedOn,
        manufacturer,
        model,
        imei,
        repairPrice,
        repairCost,
        enabled,
        deleted,
        idEquipment,
        history,
        ...destructuredDAORepair
    } = repairDAO;
    return {
        ...destructuredDAORepair,
        cost: repairCost,
        price: repairPrice,
        device: {
            turnedOn: !!equipmentTurnedOn,
            manufacturer: manufacturer,
            model: model,
            deviceId: imei,
            type: mapDeviceType(idEquipment),
        },
        audit: {
            createdAt: dischargeDate,
            updatedAt: updatedDate,
            enabled: enabled,
            deleted: deleted,
            createdBy: {},
        },
        checkIn: dischargeDate,
        lastUpdate: updatedDate,
        checkOut: finishedDate,
        history: history,
    };
}

//FIXME: #243 - Retrieve device types from database
function mapDeviceType(id) {
    const deviceTypes = [
        {
            id: 0,
            description: 'Smartphone',
        },
        {
            id: 1,
            description: 'Tablet',
        },
        {
            id: 2,
            description: 'Laptop',
        },
        {
            id: 3,
            description: 'Escritorio',
        },
        {
            id: 4,
            description: 'Smartwatch',
        },
        {
            id: 5,
            description: 'Parlantes',
        },
    ];
    return deviceTypes.filter((deviceType) => deviceType.id === id).pop();
}

function isFinishedStatus(idStatus) {
    return [
        ERepairStatus.FINISHED_AND_PAID,
        ERepairStatus.RETURNED_WITHOUT_REPAIR,
        ERepairStatus.FINISHED_DIAGNOSTICS,
    ].includes(idStatus);
}
