const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();

const role = require('./role.model');
const userRole = require('./user-role.model');

class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        userName: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            field: 'user_name',
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            field: 'email',
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'avatar',
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'password',
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
        enabled: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'enabled',
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'deleted',
        },
        hasFinishedRegistration: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'has_finished_registration',
        },
    },
    {
        sequelize: sequelizeConnector,
        modelName: 'user',
    }
);

// Mediante las dos llamadas siguientes, se define en Sequelize la relación N a M entre Role y User
User.belongsToMany(role.Role, {
    through: userRole.UserRole,
    foreignKey: 'id_user',
});

role.Role.belongsToMany(User, {
    through: userRole.UserRole,
    foreignKey: 'id_role',
});

module.exports = { User };
