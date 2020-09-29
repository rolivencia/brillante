const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();
const repair = require('server/repair/repair.model');

class CashTransaction extends Sequelize.Model {}
class RepairCashTransaction extends Sequelize.Model {}

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

RepairCashTransaction.belongsTo(CashTransaction, { as: 'transaction', foreignKey: 'transaction_id' });
RepairCashTransaction.belongsTo(repair.Repair, { as: 'repair', foreignKey: 'repair_id' });

CashTransaction.hasOne(RepairCashTransaction, { as: 'repairCashTransaction', foreignKey: 'transaction_id' });
repair.Repair.hasOne(RepairCashTransaction, { as: 'repairCashTransaction', foreignKey: 'repair_id' });

module.exports = { CashTransaction, RepairCashTransaction };
