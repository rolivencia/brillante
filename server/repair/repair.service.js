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

async function getAll({ showFinishedString, startDate, endDate }) {
    const showFinished = showFinishedString !== 'false';

    if (showFinished) {
        return repair.Repair.findAll({
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
                dischargeDate: { [Op.between]: [startDate, endDate] },
                enabled: 1,
                deleted: 0,
            },
        });
    } else {
        return repair.Repair.findAll({
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
                        [(Sequelize.fn('CONCAT', Sequelize.col('nombre'), ' ', Sequelize.col('apellido')), 'fullName')],
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
                idStatus: { [Op.notIn]: [5, 7] },
                dischargeDate: { [Op.between]: [startDate, endDate] },
                enabled: 1,
                deleted: 0,
            },
        });
    }
}

async function getById(id) {
    return repair.Repair.findOne({
        where: {
            id: id,
        },
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
