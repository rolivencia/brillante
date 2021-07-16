const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();
const repair = require('server/repair/repair.model');

const user = require('server/users/user.model');
const transaction = require('server/cash/transaction-concepts/transaction-concepts.model');

class CashTransaction extends Sequelize.Model {}
class RepairCashTransaction extends Sequelize.Model {}
class TransactionType extends Sequelize.Model {}
class PaymentMethod extends Sequelize.Model {}

CashTransaction.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'transaction_id',
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
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_cash_transaction',
    }
);

RepairCashTransaction.init(
    {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            field: 'repair_transaction_id',
        },
        idRepair: {
            type: Sequelize.BIGINT,
            allowNull: false,
            field: 'repair_id',
            references: {
                model: 'sh_fix_repair',
                key: 'repair_id',
            },
        },
        idCashTransaction: {
            type: Sequelize.BIGINT,
            allowNull: false,
            field: 'transaction_id',
            references: {
                model: 'sh_cash_transaction',
                key: 'transaction_id',
            },
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_fix_transaction',
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
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_tab_payment_methods',
    }
);

RepairCashTransaction.belongsTo(CashTransaction, { as: 'transaction', foreignKey: 'transaction_id' });
RepairCashTransaction.belongsTo(repair.Repair, { as: 'repair', foreignKey: 'repair_id' });

CashTransaction.hasOne(RepairCashTransaction, { as: 'operation', foreignKey: 'transaction_id' });
repair.Repair.hasOne(RepairCashTransaction, { as: 'repairCashTransaction', foreignKey: 'repair_id' });

CashTransaction.belongsTo(transaction.CashTransactionConcept, { as: 'concept', foreignKey: 'transaction_concept_id' });
transaction.CashTransactionConcept.hasMany(CashTransaction, {
    as: 'transaction',
    foreignKey: 'transaction_concept_id',
});

CashTransaction.belongsTo(user.User, { as: 'user', foreignKey: 'created_user_id' });
user.User.hasMany(CashTransaction, { as: 'transaction', foreignKey: 'transaction_id' });

transaction.CashTransactionConcept.belongsTo(TransactionType, {
    as: 'transactionType',
    foreignKey: 'transaction_type_id',
});
TransactionType.hasMany(transaction.CashTransactionConcept, { as: 'transaction', foreignKey: 'transaction_type_id' });

CashTransaction.belongsTo(PaymentMethod, { as: 'paymentMethod', foreignKey: 'payment_method_id' });
PaymentMethod.hasMany(CashTransaction, { as: 'transaction', foreignKey: 'transaction_id' });

module.exports = { CashTransaction, RepairCashTransaction, TransactionType, PaymentMethod };
