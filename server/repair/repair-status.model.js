const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.legacyDbConnector();

const Repair = require('server/repair/repair.model');

class RepairStatusModel extends Sequelize.Model {}

module.exports = () => RepairStatusModel;

RepairStatusModel.init(
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
    }
);

RepairStatusModel.belongsTo(Repair(), { as: 'repair', foreignKey: 'id_status' });

Repair().hasMany(RepairStatusModel, {
    as: 'repairStatus',
    sourceKey: 'idStatus',
    foreignKey: 'id'
});