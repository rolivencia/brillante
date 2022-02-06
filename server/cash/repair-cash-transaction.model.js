const Sequelize = require('sequelize');
const { CashTransaction } = require('./cash.model');
const repair = require('../repair/repair.model');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();

class RepairCashTransaction extends Sequelize.Model {}

RepairCashTransaction.init(
    {
        idRepair: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            field: 'repair_id',
            references: {
                model: 'sh_fix_repair',
                key: 'id',
            },
        },
        idCashTransaction: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            field: 'transaction_id',
            references: {
                model: 'sh_cash_transaction',
                key: 'id',
            },
        },
    },
    {
        sequelize: sequelizeConnector,
        modelName: 'sh_fix_transaction',
    }
);

RepairCashTransaction.belongsTo(CashTransaction, { as: 'transaction', foreignKey: 'transaction_id' });
RepairCashTransaction.belongsTo(repair.Repair, { as: 'repair', foreignKey: 'repair_id' });

CashTransaction.hasOne(RepairCashTransaction, { as: 'operation', foreignKey: 'transaction_id' });
repair.Repair.hasOne(RepairCashTransaction, { as: 'repairCashTransaction', foreignKey: 'repair_id' });

// repair.Repair.belongsToMany(CashTransaction, {
//     through: RepairCashTransaction,
//     foreignKey: 'repair_id',
// });
//
// CashTransaction.belongsTo(repair.Repair, {
//     through: RepairCashTransaction,
//     foreignKey: 'transaction_id',
//     // as: 'moneyTransactions'
// });

module.exports = { RepairCashTransaction };
