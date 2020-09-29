const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();
const cash = require('server/cash/cash.model');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};

async function getById(id) {}

async function getAll({ startDate, endDate }) {
    return cash.CashTransaction.findAll({
        where: {
            createdAt: { [Op.between]: [startDate, endDate] },
            enabled: 1,
            deleted: 0,
        },
    });
}

async function create(cashTransaction) {}
async function update(cashTransaction) {}
async function remove(id) {}
