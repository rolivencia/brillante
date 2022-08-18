const connector = require('../_helpers/mysql-connector');
const environment = require('server/_helpers/environment');
const jwt = require('jsonwebtoken');
const sequelizeConnector = connector.sequelizeConnector();
const { EUserRole } = require('./user-role-enum');
const { Role } = require('./role.model');
const { User } = require('./user.model');
const { UserRole } = require('./user-role.model');

module.exports = {
    authenticate,
    getAll,
    register,
};

// TODO: Build workflow to register new users via Auth0
async function register(user) {
    const t = await sequelizeConnector.transaction();

    let userDAO;
    let userRoleDAO;

    return new Promise(async (resolve, reject) => {
        try {
            userDAO = (
                await User.create(
                    {
                        firstName: user.firstName ?? '',
                        lastName: user.lastName ?? '',
                        email: user.email,
                        userName: user.nickname,
                        deleted: false,
                        enabled: true,
                        roleId: EUserRole.CUSTOMER,
                    },
                    { transaction: t }
                )
            ).get({ plain: true });

            // Assign the customer role by default
            userRoleDAO = (
                await UserRole.create(
                    {
                        idUser: userDAO.id,
                        idRole: EUserRole.CUSTOMER,
                    },
                    { transaction: t }
                )
            ).get({ plain: true });

            await t.commit();

            const newUser = findByUserEmail(userDAO.email);
            resolve(newUser);
        } catch (error) {
            console.error(error);
            await t.rollback();
            reject(error);
        }
    });
}

function findByUserEmail(email) {
    return User.findOne({
        include: [
            {
                model: Role,
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
}

async function authenticate({ user }) {
    let currentUser = await findByUserEmail(user.email);

    if (!currentUser) {
        let registeredUser = await register(user);
        currentUser = registeredUser;
    }

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
                model: Role,
                required: true,
                attributes: ['id', 'description'],
                through: { attributes: [] },
            },
        ],
        where: { enabled: true, deleted: false },
    });
}
