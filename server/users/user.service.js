const role = require('server/users/role.model');
const userRole = require('server/users/user-role.model');
const environment = require('server/_helpers/environment');
const jwt = require('jsonwebtoken');
const { EUserRole } = require('./user-role-enum');
const { User } = require('./user.model');

module.exports = {
    authenticate,
    getAll,
    register,
};

// TODO: Build workflow to register new users via Auth0
async function register(user) {
    // Assign the customer role by default

    const t = await sequelizeConnector.transaction();

    let userDAO;
    let userRoleDAO;

    return new Promise(async (resolve, reject) => {
        try {
            userDAO = await User.create(
                {
                    firstName: user.firstName ?? '',
                    lastName: user.lastName ?? '',
                    userName: user.email,
                    deleted: false,
                    enabled: true,
                    roleId: EUserRole.CUSTOMER,
                },
                { transaction: t }
            );

            userRoleDAO = userRole.UserRole.create(
                {
                    idUser: userDAO.dataValues.id,
                    idRole: EUserRole.CUSTOMER,
                },
                { transaction: t }
            );
            await t.rollback();
        } catch (error) {
            console.error(error);
            await t.rollback();
            reject([0]);
        }
    });
}

async function authenticate({ user }) {
    const currentUser = await User.findOne({
        include: [
            {
                model: role.Role,
                required: true,
                attributes: ['id', 'description'],
                through: { attributes: [] },
            },
        ],

        where: {
            email: user.email,
            enabled: true,
            deleted: false,
        },
    });

    return new Promise((resolve, reject) => {
        if (!currentUser || !currentUser.dataValues) reject(error);

        resolve({
            ...currentUser.dataValues,
            token: jwt.sign({ sub: currentUser.id }, environment.secret),
        });
    });
}

async function getAll() {
    return User.findAll({
        attributes: [
            'id',
            'firstName',
            'lastName',
            'userName',
            'avatar',
            'createdAt',
            'updatedAt',
            'enabled',
            'deleted',
        ],
        include: [
            {
                model: role.Role,
                required: true,
                attributes: ['id', 'description'],
                through: { attributes: [] },
            },
        ],
        where: { enabled: true, deleted: false },
    });
}
