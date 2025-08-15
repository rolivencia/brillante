const Sequelize = require('sequelize');
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
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_fix_transaction',
    }
);

module.exports = { RepairCashTransaction };
