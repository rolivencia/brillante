const bcrypt = require('bcrypt');
const environment = require('server/_helpers/environment');
const jwt = require('jsonwebtoken');
const Role = require('./role.model');
const User = require('./user.model');

module.exports = {
    authenticate,
    getAll,
};

async function authenticate({ username, password }) {
    const user = await User().findOne({
        include: [
            {
                model: Role(),
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
        if (!user || !user.dataValues) reject(error);

        bcrypt.compareSync(password, user.dataValues.password, 10)
            ? resolve({
                  ...user.dataValues,
                  token: jwt.sign({ sub: user.id }, environment.secret),
              })
            : reject(error);
    });
}

async function getAll() {
    return User().findAll({ where: { enabled: true, deleted: false } });
}
