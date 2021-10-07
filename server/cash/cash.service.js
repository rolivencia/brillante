const cash = require('server/cash/cash.model');
const transaction = require('server/cash/transaction-concepts/transaction-concepts.model');
const user = require('server/users/user.model');
const officeBranch = require('server/office-branch/office-branch.model');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const connector = require('server/_helpers/mysql-connector');
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
    return cash.PaymentMethod.findAll();
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

async function openCashRegister({ user }) {
    return cash.CashTransaction.create({
        amount: 0,
        note: 'Apertura de Caja',
        transactionTypeId: 1,
        transactionConceptId: 49,
        createdBy: user.id,
        paymentMethodId: 1,
    });
}

async function closeCashRegister({ user }) {
    return cash.CashTransaction.create({
        amount: 0,
        note: 'Apertura de Caja',
        transactionTypeId: 1,
        transactionConceptId: 163,
        createdBy: user.id,
        paymentMethodId: 1,
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
                        createdBy: cashTransaction.user.id, //TODO: Issue #21 - Assign transactions to creator user
                        paymentMethodId: cashTransaction.payments[0].method.id,
                        idBranch: cashTransaction.idBranch,
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
async function update({ id, amount, date, note, concept, paymentMethod, ...cashTransaction }) {
    return cash.CashTransaction.update(
        {
            amount: amount,
            date: date,
            note: note,
            transactionTypeId: concept.transactionType.id,
            transactionConceptId: concept.id,
            createdBy: 1, //TODO: Issue #21 - Assign transactions to creator user
            paymentMethodId: paymentMethod.id,
        },
        { where: { id: id } }
    );
}

async function remove(id) {
    return cash.CashTransaction.update({ deleted: 1 }, { where: { id: id } });
}

function toTransactionDTO({ createdBy, deleted, enabled, user, operation, amount, paymentMethod, ...transactionDAO }) {
    return {
        ...transactionDAO,
        amount: amount,
        paymentMethod: paymentMethod.dataValues,
        payments: [{ amount: amount, method: paymentMethod.dataValues }],
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

function cashGetDefinition() {
    return [
        {
            as: 'concept',
            model: transaction.CashTransactionConcept,
            required: true,
            attributes: ['id', 'description', 'userAssignable'],
            include: [
                {
                    as: 'parent',
                    model: transaction.CashTransactionConcept,
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
            as: 'paymentMethod',
            model: cash.PaymentMethod,
            required: true,
            attributes: ['id', 'description'],
        },
        {
            as: 'officeBranch',
            model: officeBranch.OfficeBranch,
            required: true,
            attributes: ['id', 'name', 'address'],
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
        {
            as: 'operation',
            model: cash.RepairCashTransaction, //TODO: Adapt to other cases of transactions. How to do it?
            required: false,
            attributes: ['id', 'idRepair', [Sequelize.fn('CONCAT', '', 'Reparación'), 'description']],
        },
    ];
}
