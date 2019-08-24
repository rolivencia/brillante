const config = require('server-config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

const connection = require('server/_helpers/mysql-connector');

connection().connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
});

connection().query('SELECT * FROM user', function(err, result) {
    if (err) throw err;
    for (let item of result) {
        console.log('User: ' + result.user_name);
    }
});

// users hardcoded for simplicity, store in a db for production applications

const users = [
    {
        firstName: 'Ramiro',
        lastName: 'Olivencia',
        username: 'rolivencia',
        // password: 'abacab@270156',
        password: '$2a$10$fgB5dXfJw7dLLzGGGmyJJe2vX5lGJayJ3GW0EMzrx0tPuZ./C24De',
        id: 1,
        token: '',
        avatar: '🧑🏻'
    },
    {
        firstName: 'Carlos',
        lastName: 'Barreto',
        username: 'cbarreto',
        password: '$2a$10$IfY5e90cVtme28AjvOMch.ivXBAyFgwzNT6T.eMrdUSlwVxLNrPVm',
        id: 2,
        token: '',
        avatar: '🧑🏿'
    },
    {
        firstName: 'Luciano',
        lastName: 'Cosundino',
        username: 'lcosundino',
        password: '$2a$10$IfY5e90cVtme28AjvOMch.ivXBAyFgwzNT6T.eMrdUSlwVxLNrPVm',
        id: 3,
        token: '',
        avatar: '🧑🏻'
    }
];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && bcrypt.compareSync(password, u.password, 10));
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
