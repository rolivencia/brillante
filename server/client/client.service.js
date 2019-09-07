const Client = require('./client.model');

module.exports = {
    create,
    getAll,
    getById,
    update
};

async function create() {}

async function getAll() {
    return Client().findAll();
}

async function getById(id) {
    return Client().findOne({
        where: {
            clientId: id
        }
    });
}

async function update() {}
