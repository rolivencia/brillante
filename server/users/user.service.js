const user = require('server/users/user.model');
const role = require('server/users/role.model');
const userRole = require('server/users/user-role.model');

const bcrypt = require('bcrypt');
const environment = require('server/_helpers/environment');
const jwt = require('jsonwebtoken');
const { EUserRole } = require('./user-role-enum');

module.exports = {
    authenticate,
    getAll,
    register,
};

async function register({ firstName, lastName, email, password }) {
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
                    password: 'dummy',
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

async function authenticate({ username, password }) {
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
            userName: username,
            enabled: true,
            deleted: false,
        },
    });

    return new Promise((resolve, reject) => {
        if (!currentUser || !currentUser.dataValues) reject(error);

        bcrypt.compareSync(password, currentUser.dataValues.password, 10)
            ? resolve({
                  ...currentUser.dataValues,
                  token: jwt.sign({ sub: currentUser.id }, environment.secret),
              })
            : reject(error);
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
