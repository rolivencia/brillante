const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();

class Customer extends Sequelize.Model {}

module.exports = { Customer };

Customer.init(
    {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            field: 'id',
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'first_name',
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'last_name',
        },
        dni: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'dni',
        },
        telephone: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'telephone_number',
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'address',
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'email',
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'created_at',
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'updated_at',
        },
        createdBy: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'created_by',
        },
        updatedBy: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'updated_by',
        },
        enabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1,
            field: 'enabled',
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
            field: 'deleted',
        },
        birthDate: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'birth_date',
        },
    },
    {
        sequelize: sequelizeConnector,
        modelName: 'sh_fix_customer',
    }
);
