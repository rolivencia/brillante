const user = require('server/users/user.model');
const role = require('server/users/role.model');
const userRole = require('server/users/user-role.model');
const environment = require('server/_helpers/environment');
const jwt = require('jsonwebtoken');
const { EUserRole } = require('./user-role-enum');

module.exports = {
    authenticateByEmail,
    getAll,
    register,
};

// TODO: Build workflow to register new users via Auth0
async function register({ firstName, lastName, email }) {
    // Assign the customer role by default

    const t = await sequelizeConnector.transaction();

    let userDAO;
    let userRoleDAO;

    return new Promise(async (resolve, reject) => {
        try {
            userDAO = await user.User.create(
                {
                    firstName: firstName,
                    lastName: lastName,
                    userName: email,
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
        } catch (error) {
            console.error(error);
            await t.rollback();
            reject([0]);
        }
    });
}

async function authenticateByEmail({ email }) {
    const currentUser = await user.User.findOne({
        include: [
            {
                model: role.Role,
                required: true,
                attributes: ['id', 'description'],
                through: { attributes: [] },
            },
        ],

        where: {
            email: email,
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
    return user.User.findAll({
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
