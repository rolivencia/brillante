const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();

class OfficeBranch extends Sequelize.Model {}

OfficeBranch.init(
    {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            field: 'id',
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'name',
        },
        codeName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'code_name',
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'address',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_administration_office_branch',
    }
);

module.exports = { OfficeBranch };
