const config = require('server-config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const connection = require('server/_helpers/mysql-connector');

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    return new Promise((resolve, reject) => {
        connection().query(`SELECT * FROM user WHERE user_name = '${username}'`, (err, result) => {
            if (err) reject(error);
            user = result.pop();
            const encryptedPassword = bcrypt.compareSync(password, user.password, 10);
            if (user && encryptedPassword) {
                const token = jwt.sign({ sub: user.id }, config.secret);
                const returnedUser = {
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    username: user.user_name,
                    token: token,
                    avatar: user.avatar
                };
                resolve(returnedUser);
            }
        });
    });
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
