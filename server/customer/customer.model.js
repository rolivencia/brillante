const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();

class Customer extends Sequelize.Model {}

module.exports = { Customer };

Customer.init(
    {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            field: 'client_id',
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'nombre',
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'apellido',
        },
        dni: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'dni',
        },
        telephone: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'telefono',
        },
        secondaryTelephone: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'telefono2',
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'direccion',
        },
        idUser: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'usuario',
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'email',
        },
        birthDate: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'birth_date',
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'fecha_creacion',
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'fecha_modificacion',
        },
        createdBy: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'usuario_creador',
        },
        updatedBy: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'usuario_modificador',
        },
        enabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1,
            field: 'habilitado',
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
            field: 'eliminado',
        },
    },
    {
        sequelize: sequelizeConnector,
        modelName: 'sh_fix_client',
    }
);
