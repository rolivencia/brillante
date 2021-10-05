const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();

class AdministrationBranch extends Sequelize.Model {}

AdministrationBranch.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id',
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'name',
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'address',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_administration_branch',
    }
);

module.exports = { AdministrationBranch };
