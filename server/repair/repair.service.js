const Client = require('server/client/client.model');
const repair = require('server/repair/repair.model');
const RepairStatus = require('server/repair/repair-status.model');
const RepairHistory = require('server/repair/repair-status.model');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    create,
    getAll,
    getById,
    update,
    getHistoryByRepairId
};

async function create() {}

async function getAll({ showFinished, startDate, endDate }) {
    if (showFinished) {
        return repair.Repair().findAll({
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
                'equipmentTurnedOn'
            ],
            include: [
                {
                    as: 'client',
                    model: Client(),
                    required: true,
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    as: 'repairStatus',
                    model: RepairStatus(),
                    required: true,
                    attributes: ['id', 'description']
                }
            ],
            where: {
                dischargeDate: { [Op.between]: [startDate, endDate] },
                enabled: 1,
                deleted: 0
            }
        });
    } else {
        return repair.Repair().findAll({
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
                'equipmentTurnedOn'
            ],
            where: {
                idStatus: { [Op.notIn]: [5, 7] },
                dischargeDate: { [Op.between]: [startDate, endDate] },
                enabled: 1,
                deleted: 0
            }
        });
    }
}

async function getById(id) {
    return repair.Repair().findOne({
        where: {
            id: id
        }
    });
}

async function getHistoryByRepairId(idRepair) {
    return repair.RepairStatusHistory.findAll({
        attributes: ['id', 'updatedAt', 'updatedBy', 'idStatus', 'paymentInAdvance', 'cost', 'price'],
        where: {
            idRepair: idRepair,
            updatedAt: { [Op.ne]: null }
        },
        order: [['updatedAt', 'DESC']]
    });
}

async function update() {}
