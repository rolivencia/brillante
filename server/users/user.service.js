const config = require('config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications

const users =  [
  {
    firstName: 'Ramiro',
    lastName: 'Olivencia',
    username: 'rolivencia',
    password: 'abacab@270156',
    id: 1,
    token: '',
    avatar: '🧑🏻'
  },
  {
    firstName: 'Carlos',
    lastName: 'Barreto',
    username: 'cbarreto',
    password: 'Conestolarompemos3',
    id: 2,
    token: '',
    avatar: '🧑🏿'
  },
  {
    firstName: 'Luciano',
    lastName: 'Cosundino',
    username: 'lcosundino',
    password: 'Conestolarompemos3',
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
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ sub: user.id }, config.secret);
    const { password, ...userWithoutPassword } = user;
    console.log(`User: ${username} is logged in`);
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
