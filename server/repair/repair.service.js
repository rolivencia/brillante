const Customer = require('server/customer/customer.model');

const repair = require('server/repair/repair.model');
const repairStatus = require('server/repair/repair.status');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    create,
    getAll,
    getById,
    update,
    getHistoryByRepairId,
};

async function create() {}

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
            'payInAdvance',
            'repairCost',
            'repairPrice',
            'equipmentTurnedOn',
            'enabled',
            'deleted',
            'idEquipment',
        ],
        include: [
            {
                as: 'customer',
                model: Customer(),
                required: true,
                attributes: [
                    'id',
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
            'payInAdvance',
            'repairCost',
            'repairPrice',
            'equipmentTurnedOn',
            'enabled',
            'deleted',
            'idEquipment',
        ],
        include: [
            {
                as: 'customer',
                model: Customer(),
                required: true,
                attributes: [
                    'id',
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
async function update() {}

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
