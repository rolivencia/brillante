const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.legacyDbConnector();

const repair = require('server/repair/repair.model');

class RepairStatus extends Sequelize.Model {}

RepairStatus.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id'
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'status'
        }
    },
    {
        sequelize: sequelizeConnector,
        modelName: 'sh_fix_tab_status'
    },
    {
        classMethods: {
            associate: function() {
                RepairStatus.belongsTo(repair.Repair, { as: 'repair', foreignKey: 'status_id' });
                RepairStatus.belongsTo(repair.RepairStatusHistory, { as: 'repairStatusHistory', foreignKey: 'status_id' });
            }
        }
    }
);

module.exports = { RepairStatus };
