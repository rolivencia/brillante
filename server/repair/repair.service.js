const customer = require('server/customer/customer.model');

const repair = require('server/repair/repair.model');
const repairStatus = require('server/repair/repair.status');

const repairService = require('../customer/customer.service');

const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    create,
    getAll,
    getByClientId,
    getById,
    getHistoryByRepairId,
    remove,
    updateDevice,
    updateTracking,
};

async function create({ customer, device, issue, paymentInAdvance, ...discarded }) {
    //TODO: Implement this function
    //TODO: Add creator user - Issue #11
    //TODO: Add tracking record too

    const t = await sequelizeConnector.transaction();

    let repairDAO;
    let repairHistoryDAO;

    try {
        repairDAO = await repair.Repair.create(
            {
                idClient: customer.id,
                idEquipment: device.type.id,
                manufacturer: device.manufacturer,
                model: device.model,
                imei: device.deviceId,
                equipmentTurnedOn: device.turnedOn,
                issue: issue,
                paymentInAdvance: paymentInAdvance,
                createdBy: 1,
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
                updatedBy: 1, //TODO: Issue #11 -> Link user to repair creation/update
                cost: repairDAO.dataValues.cost,
                price: repairDAO.dataValues.price,
                paymentInAdvance: repairDAO.dataValues.paymentInAdvance,
                updatedAt: null,
            },
            { transaction: t }
        );

        await t.commit();
    } catch (error) {
        console.error(error);
        await t.rollback();
    }

    return new Promise((resolve, reject) => {
        if (repairDAO && repairHistoryDAO) {
            resolve({ ...repairDAO.dataValues, history: { ...repairHistoryDAO.dataValues } });
        } else {
            reject(error);
        }
    });
}

async function updateDevice({ ...repair }) {
    //TODO: Implement this function
    //TODO: Add tracking record too
    console.log(repair);
}

async function updateTracking({ ...repair }) {
    //TODO: Implement this function
    console.log(repair);
}

async function remove(id) {
    return repair.Repair.update({ deleted: 1 }, { where: { id: id } });
}

async function getAll({ showFinished, startDate, endDate }) {
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
        ],
        where: {
            idRepair: idRepair,
            updatedAt: { [Op.ne]: null },
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
