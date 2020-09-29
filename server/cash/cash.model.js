const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();
const repair = require('server/repair/repair.model');

const user = require('server/users/user.model');

class CashTransaction extends Sequelize.Model {}
class RepairCashTransaction extends Sequelize.Model {}
class TransactionConcept extends Sequelize.Model {}
class TransactionType extends Sequelize.Model {}

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
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
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
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_cash_transaction',
    }
);

TransactionConcept.init(
    {
        id: {
            type: Sequelize.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
            field: 'transaction_concept_id',
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            field: 'description',
        },
        parentConceptId: {
            type: Sequelize.SMALLINT,
            allowNull: true,
            field: 'transaction_parent_concept_id',
        },
        transactionTypeId: {
            type: Sequelize.SMALLINT,
            allowNull: true,
            field: 'transaction_type_id',
        },
        userAssignable: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'user_assignable',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_tab_transaction_concept',
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

RepairCashTransaction.belongsTo(CashTransaction, { as: 'transaction', foreignKey: 'transaction_id' });
RepairCashTransaction.belongsTo(repair.Repair, { as: 'repair', foreignKey: 'repair_id' });

TransactionConcept.belongsTo(TransactionConcept, { as: 'parent', foreignKey: 'transaction_parent_concept_id' });
TransactionConcept.hasOne(TransactionConcept, { as: 'children', foreignKey: 'transaction_concept_id' });

CashTransaction.hasOne(RepairCashTransaction, { as: 'operation', foreignKey: 'transaction_id' });
repair.Repair.hasOne(RepairCashTransaction, { as: 'repairCashTransaction', foreignKey: 'repair_id' });

CashTransaction.belongsTo(TransactionConcept, { as: 'concept', foreignKey: 'transaction_concept_id' });
TransactionConcept.hasMany(CashTransaction, { as: 'transaction', foreignKey: 'transaction_concept_id' });

CashTransaction.belongsTo(user.User, { as: 'user', foreignKey: 'created_user_id' });
user.User.hasMany(CashTransaction, { as: 'transaction', foreignKey: 'transaction_id' });

TransactionConcept.belongsTo(TransactionType, { as: 'transactionType', foreignKey: 'transaction_type_id' });
TransactionType.hasMany(TransactionConcept, { as: 'transaction', foreignKey: 'transaction_type_id' });

module.exports = { CashTransaction, RepairCashTransaction, TransactionConcept, TransactionType };
