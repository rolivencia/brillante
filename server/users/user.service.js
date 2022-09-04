const connector = require('../_helpers/mysql-connector');
const environment = require('server/_helpers/environment');
const jwt = require('jsonwebtoken');
const sequelizeConnector = connector.sequelizeConnector();
const { EUserRole } = require('./user-role-enum');
const { Role } = require('./role.model');
const { User } = require('./user.model');
const { UserRole } = require('./user-role.model');
const { Customer } = require('../customer/customer.model');

module.exports = {
    authenticate,
    getAll,
    registerCustomerUser,
};

// TODO: Build workflow to register new users via Auth0
async function registerCustomerUser(user) {
    const t = await sequelizeConnector.transaction();

    let userDAO;
    let userRoleDAO;
    let customerDAO;

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

            const [result, created] = await Customer.findOrCreate({
                where: { email: user.email },
                defaults: {
                    dni: null,
                    firstName: '',
                    lastName: '',
                    address: '',
                    telephone: null,
                    email: user.email,
                    birthDate: null,
                    idUser: userDAO.id,
                },
                raw: true,
                transaction: t,
            });

            customerDAO = result ?? result.get({ plain: true });

            // Case where we're registering a user of an already-existing customer
            if (!created) {
                await Customer.update({ idUser: userDAO.id }, { where: { email: user.email }, transaction: t });
                const customerData = (await Customer.findOne({ where: { idUser: userDAO.id }, transaction: t })).get({
                    plain: true,
                });
                await User.update(
                    {
                        firstName: customerData.firstName,
                        lastName: customerData.lastName,
                        hasFinishedRegistration: true,
                    },
                    { where: { id: userDAO.id }, transaction: t }
                );
            }

            await t.commit();
            const newUser = await findByUserEmail(userDAO.email);
            resolve(newUser);
        } catch (error) {
            console.error(error);
            await t.rollback();
            reject(error);
        }
    });
}

async function findByUserEmail(email) {
    return User.findOne({
        include: [
            {
                model: Role,
                required: true,
                attributes: ['id', 'description'],
                through: { attributes: [] },
            },
            {
                as: 'customer',
                model: Customer,
                required: false,
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
        let registeredUser = await registerCustomerUser(user);
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
