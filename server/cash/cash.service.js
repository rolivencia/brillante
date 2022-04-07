const cash = require('server/cash/cash.model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const connector = require('server/_helpers/mysql-connector');
const { cashGetDefinition } = require('./cash.functions');
const sequelizeConnector = connector.sequelizeConnector();

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    openCashRegister,
    closeCashRegister,
    getPaymentMethods,
};

async function getPaymentMethods() {
    return cash.PaymentMethod.findAll({
        include: {
            as: 'installments',
            model: cash.PaymentMethodInstallments,
            required: false,
            attributes: ['installments', 'interestRate'],
        },
    });
}

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

async function getAll({ startDate, endDate, idBranch }) {
    const whereCondition = { date: { [Op.between]: [startDate, endDate] }, enabled: 1, deleted: 0 };

    if (idBranch) {
        whereCondition['idBranch'] = parseInt(idBranch, 10);
    }

    const transactionsDAO = await cash.CashTransaction.findAll({
        //TODO: Reference user table with 'createdBy' attribute
        attributes: ['id', 'amount', 'date', 'note', 'createdBy', 'deleted', 'enabled'],
        include: cashGetDefinition(),
        where: whereCondition,
    });

    return new Promise((resolve, reject) => {
        if (transactionsDAO) {
            resolve(transactionsDAO.map((transactionDAO) => toTransactionDTO(transactionDAO.dataValues)));
        } else {
            reject(error);
        }
    });
}

async function openCashRegister({ user, branch }) {
    return cash.CashTransaction.create({
        amount: 0,
        note: 'Apertura de Caja',
        transactionTypeId: 1,
        transactionConceptId: 49,
        createdBy: user.id,
        paymentMethodId: 1,
        idBranch: branch.id,
    });
}

async function closeCashRegister({ user, branch }) {
    return cash.CashTransaction.create({
        amount: 0,
        note: 'Apertura de Caja',
        transactionTypeId: 1,
        transactionConceptId: 163,
        createdBy: user.id,
        paymentMethodId: 1,
        idBranch: branch.id,
    });
}

async function create(cashTransactions) {
    const transactionPayments = dissectPayments(cashTransactions);

    return new Promise(async (resolve, reject) => {
        let returnedData = [];
        const dbTransaction = await sequelizeConnector.transaction();

        try {
            for (const cashTransaction of transactionPayments) {
                if (cashTransaction.payments[0].amount > 0) {
                    let tranaux = await cash.CashTransaction.create({
                        amount: cashTransaction.payments[0].amount,
                        date: cashTransaction.date,
                        note: cashTransaction.note,
                        transactionTypeId: cashTransaction.concept.transactionType.id,
                        transactionConceptId: cashTransaction.concept.id,
                        createdBy: cashTransaction.user.id,
                        paymentMethodId: cashTransaction.payments[0].paymentMethod.id,
                        idBranch: cashTransactions.branch.id,
                    });
                    returnedData.push(tranaux);
                }
            }
            await dbTransaction.commit();
            resolve(returnedData);
        } catch (error) {
            console.error(error);
            await dbTransaction.rollback();
            reject(error);
        }
    });
}
async function update({ transaction, user }) {
    return cash.CashTransaction.update(
        {
            amount: transaction.amount,
            date: transaction.date,
            note: transaction.note,
            transactionTypeId: transaction.concept.transactionType.id,
            transactionConceptId: transaction.concept.id,
            createdBy: user.id,
            paymentMethodId: transaction.payments[0].paymentMethod.id,
        },
        { where: { id: transaction.id } }
    );
}

async function remove(id) {
    return cash.CashTransaction.update({ deleted: 1 }, { where: { id: id } });
}

function toTransactionDTO({ createdBy, deleted, enabled, user, operation, amount, paymentMethod, ...transactionDAO }) {
    let moneyTransactionDTO = {
        ...transactionDAO,
        amount: amount,
        paymentMethod: paymentMethod.dataValues,
        payments: [{ amount: amount, paymentMethod: paymentMethod.dataValues }],
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

    // If related to a repair, we take the first element of the array returned by the query
    if (transactionDAO.repair && transactionDAO.repair.length > 0) {
        moneyTransactionDTO.operation = transactionDAO.repair.pop();
        delete moneyTransactionDTO.repair;
    }

    return moneyTransactionDTO;
}

function dissectPayments(cashTransaction) {
    const { payments, ...transactionWithoutPayments } = cashTransaction;
    let transactionWithPayments = [];

    for (const payment of payments) {
        transactionWithPayments = transactionWithPayments.concat({
            ...transactionWithoutPayments,
            payments: [payment],
        });
    }

    return transactionWithPayments;
}
