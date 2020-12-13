const user = require('server/users/user.model');
const role = require('server/users/role.model');

const bcrypt = require('bcrypt');
const environment = require('server/_helpers/environment');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate,
    getAll,
};

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
