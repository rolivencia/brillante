const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();
const officeBranch = require('server/office-branch/office-branch.model');

const user = require('server/users/user.model');
const transaction = require('server/cash/transaction-concepts/transaction-concepts.model');
const { Repair } = require('../repair/repair.model');
const { RepairCashTransaction } = require('./repair-cash-transaction.model');

class CashTransaction extends Sequelize.Model {}
class TransactionType extends Sequelize.Model {}
class PaymentMethod extends Sequelize.Model {}
class PaymentMethodInstallments extends Sequelize.Model {}

CashTransaction.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id',
        },
        amount: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'amount',
        },
        transactionTypeId: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            field: 'transaction_type_id',
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            field: 'date',
        },
        transactionConceptId: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            references: {
                model: 'sh_tab_transaction_concept',
                key: 'transaction_concept_id',
            },
            field: 'transaction_concept_id',
        },
        note: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: 'note',
        },
        createdBy: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
            field: 'created_user_id',
        },
        enabled: {
            type: Sequelize.TINYINT,
            defaultValue: 1,
            field: 'enabled',
        },
        deleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
            field: 'deleted',
        },
        paymentMethodId: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            references: {
                model: 'sh_payment_methods',
                key: 'payment_method_id',
            },
            field: 'payment_method_id',
        },
        idBranch: {
            type: Sequelize.SMALLINT,
            defaultValue: 1, //FIXME: #192 - Remove defaultValue. The officeBranch value must always be passed.
            references: {
                model: 'sh_administration_office_branch',
                key: 'id',
            },
            field: 'id_office_branch',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_cash_transaction',
    }
);

TransactionType.init(
    {
        id: {
            type: Sequelize.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
            field: 'transaction_type_id',
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            field: 'description',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_tab_transaction_type',
    }
);

PaymentMethod.init(
    {
        id: {
            type: Sequelize.SMALLINT,
            auto: false,
            primaryKey: true,
            field: 'payment_method_id',
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            field: 'description',
        },
        allowsInstallments: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            field: 'allows_installments',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_tab_payment_methods',
    }
);

PaymentMethodInstallments.init(
    {
        id: {
            type: Sequelize.SMALLINT,
            auto: false,
            primaryKey: true,
            field: 'id',
        },
        idPaymentMethod: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            field: 'id_payment_method',
        },
        installments: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            field: 'installments',
        },
        interestRate: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'interest_rate',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_tab_payment_method_installments',
    }
);

officeBranch.OfficeBranch.hasMany(CashTransaction, { as: 'transaction', foreignKey: 'id_office_branch' });

CashTransaction.belongsTo(transaction.CashTransactionConcept, { as: 'concept', foreignKey: 'transaction_concept_id' });
CashTransaction.belongsTo(officeBranch.OfficeBranch, {
    as: 'officeBranch',
    foreignKey: 'id_office_branch',
});

transaction.CashTransactionConcept.hasMany(CashTransaction, {
    as: 'transaction',
    foreignKey: 'transaction_concept_id',
});

CashTransaction.belongsTo(user.User, { as: 'user', foreignKey: 'created_user_id' });
user.User.hasMany(CashTransaction, { as: 'transaction', foreignKey: 'id' });

transaction.CashTransactionConcept.belongsTo(TransactionType, {
    as: 'transactionType',
    foreignKey: 'transaction_type_id',
});
TransactionType.hasMany(transaction.CashTransactionConcept, { as: 'transaction', foreignKey: 'transaction_type_id' });

CashTransaction.belongsTo(PaymentMethod, { as: 'paymentMethod', foreignKey: 'payment_method_id' });
PaymentMethod.hasMany(CashTransaction, { as: 'transaction', foreignKey: 'id' });

PaymentMethodInstallments.belongsTo(PaymentMethod, { as: 'paymentMethod', foreignKey: 'id' });
PaymentMethod.hasMany(PaymentMethodInstallments, { as: 'installments', foreignKey: 'id_payment_method' });

CashTransaction.belongsToMany(Repair, {
    through: RepairCashTransaction,
    foreignKey: 'transaction_id',
    as: 'repair',
});

Repair.belongsToMany(CashTransaction, {
    through: RepairCashTransaction,
    foreignKey: 'repair_id',
    as: 'moneyTransactions',
});

module.exports = { CashTransaction, TransactionType, PaymentMethod, PaymentMethodInstallments };
