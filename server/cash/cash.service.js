const connector = require('server/_helpers/mysql-connector');
const cash = require('server/cash/cash.model');
const user = require('server/users/user.model');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};

async function getById(id) {
    const transactionDAO = await cash.CashTransaction.findOne({
        //TODO: Reference user table with 'createdBy' attribute
        attributes: ['id', 'amount', 'date', 'note', 'createdBy', 'deleted', 'enabled'],
        include: cashGetDefinition(),
        where: { id: id },
    });

    return new Promise((resolve, reject) => {
        if (transactionDAO) {
            resolve(toTransactionDTO(transactionDAO.dataValues));
        } else {
            reject(error);
        }
    });
}

async function getAll({ startDate, endDate }) {
    const transactionsDAO = await cash.CashTransaction.findAll({
        //TODO: Reference user table with 'createdBy' attribute
        attributes: ['id', 'amount', 'date', 'note', 'createdBy', 'deleted', 'enabled'],
        include: cashGetDefinition(),
        where: {
            createdAt: { [Op.between]: [startDate, endDate] },
            enabled: 1,
            deleted: 0,
        },
    });

    return new Promise((resolve, reject) => {
        if (transactionsDAO) {
            resolve(transactionsDAO.map((transactionDAO) => toTransactionDTO(transactionDAO.dataValues)));
        } else {
            reject(error);
        }
    });
}

async function create(cashTransaction) {}
async function update(cashTransaction) {}
async function remove(id) {
    return cash.CashTransaction.update({ deleted: 1 }, { where: { id: id } });
}

function toTransactionDTO({ createdBy, deleted, enabled, user, operation, ...transactionDAO }) {
    return {
        ...transactionDAO,
        operation: operation ? operation.dataValues : operation,
        concept: {
            ...transactionDAO.concept.dataValues,
            children: [],
        },
        audit: {
            createdBy: user,
            createdAt: transactionDAO.date,
            updatedAt: transactionDAO.date, //TODO: Check if transactions can or not be updated.
            deleted: !!deleted,
            enabled: !!enabled,
        },
    };
}

function cashGetDefinition() {
    return [
        {
            as: 'concept',
            model: cash.TransactionConcept,
            required: true,
            attributes: ['id', 'description', 'userAssignable'],
            include: [
                {
                    as: 'parent',
                    model: cash.TransactionConcept,
                    required: false,
                    attributes: ['id', 'description', 'userAssignable'],
                },
                {
                    as: 'transactionType',
                    model: cash.TransactionType,
                    required: true,
                    attributes: ['id', 'description'],
                },
            ],
        },
        {
            as: 'user',
            model: user.User,
            required: true,
            attributes: ['id', 'firstName', 'lastName', 'userName', 'avatar', 'createdAt', 'updatedAt', 'enabled', 'deleted'],
        },
        {
            as: 'operation',
            model: cash.RepairCashTransaction, //TODO: Adapt to other cases of transactions. How to do it?
            required: false,
            attributes: ['id', 'idRepair', [Sequelize.fn('CONCAT', '', 'Reparación'), 'description']],
        },
    ];
}
