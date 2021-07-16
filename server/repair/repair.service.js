const customer = require('server/customer/customer.model');
const repair = require('server/repair/repair.model');
const cash = require('server/cash/cash.model');
const user = require('server/users/user.model');

const repairStatus = require('server/repair/repair.status');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();

const Sequelize = require('sequelize');
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
            equipmentTurnedOn: device.turnedOn
        },
        { where: { id: id } }
    );
}

async function updateTrackingInfo({ repairToUpdate, user, generateTransaction, paymentMethod }) {
    const { id, status, note, paymentInAdvance, cost, price, warrantyTerm, ...discarded } = repairToUpdate;

    const t = await sequelizeConnector.transaction();

    let repairDAO;
    let previousRepairHistoryDAO;
    let newRepairHistoryDAO;
    let cashTransactionDAO; //TODO: Write Sequelize query
    let operationTransactionDAO; //TODO: Write Sequelize query

    return new Promise(async (resolve, reject) => {
        try {
            repairDAO = await repair.Repair.update(
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

            previousRepairHistoryDAO = await repair.RepairStatusHistory.update(
                {
                    updatedBy: user.id,
                    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                { where: { idRepair: id, updatedAt: { [Op.eq]: null } }, transaction: t }
            );

            newRepairHistoryDAO = await repair.RepairStatusHistory.create(
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

            if (generateTransaction && status.id === 5) {
                //TODO: Define enums for server-side APIs (Status)
                cashTransactionDAO = await cash.CashTransaction.create(
                    {
                        amount: price,
                        note: 'Ingresos por Reparación ID ' + id,
                        transactionTypeId: 1,
                        transactionConceptId: 158, // TODO: Define enums for server-side APIs (Transaction Concepts)
                        createdBy: user.id,
                        paymentMethodId: paymentMethod.id,
                    },
                    { transaction: t }
                );

                operationTransactionDAO = await cash.RepairCashTransaction.create(
                    {
                        idRepair: id,
                        idCashTransaction: cashTransactionDAO.dataValues.id,
                    },
                    { transaction: t }
                );
            }

            await t.commit();
            resolve([1]);
        } catch (e) {
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
                    [Sequelize.fn('CONCAT', Sequelize.col('nombre'), ' ', Sequelize.col('apellido')), 'fullName'],
                ],
            },
            {
                as: 'status',
                model: repairStatus.RepairStatus,
                required: true,
                attributes: ['id', 'status'],
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
                    [Sequelize.fn('CONCAT', Sequelize.col('nombre'), ' ', Sequelize.col('apellido')), 'fullName'],
                ],
            },
            {
                as: 'status',
                model: repairStatus.RepairStatus,
                required: true,
                attributes: ['id', 'status'],
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
                    [Sequelize.fn('CONCAT', Sequelize.col('nombre'), ' ', Sequelize.col('apellido')), 'fullName'],
                ],
            },
            {
                as: 'status',
                model: repairStatus.RepairStatus,
                required: true,
                attributes: ['id', 'status'],
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
        ],
        where: {
            id: id,
        },
    });

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
                attributes: ['id', 'status'],
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
        attributes: ['id', 'createdAt', 'updatedAt', 'updatedBy', 'paymentInAdvance', 'cost', 'price', 'note'],
        include: [
            {
                as: 'status',
                model: repairStatus.RepairStatus,
                attributes: ['id', 'status'],
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
            //updatedAt: { [Op.ne]: null },
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
    };
}

//FIXME: Cargar desde base de datos
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
    ];
    return deviceTypes.filter((deviceType) => deviceType.id === id).pop();
}
