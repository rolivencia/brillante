const Client = require('./client.model');

module.exports = {
    countAll,
    create,
    getAll,
    getByDni,
    getById,
    update,
};

async function create() {}

async function getAll(offset, limit, sortBy = {}) {
    // TODO: Implement pagination and sorting to retrieve data on-demand
    //return Client().findAndCountAll({ offset: offset, limit: limit });
    return Client().findAndCountAll();
}

async function getByDni(dni) {
    let customer = null;
    const rawCustomer = await Client().findOne({
        where: {
            dni: dni,
        },
    });

    if (rawCustomer) {
        // TODO: Agregar usuario creador
        // TODO: Agregar usuario ligado
        const dataValues = rawCustomer.dataValues;
        customer = {
            address: dataValues.address,
            dni: dataValues.dni,
            email: dataValues.email,
            firstName: dataValues.firstName,
            id: dataValues.id,
            lastName: dataValues.lastName,
            secondaryTelephone: dataValues.secondaryTelephone,
            telephone: dataValues.telephone,
            user: {},
            audit: {
                createdAt: dataValues.createdAt,
                updatedAt: dataValues.updatedAt,
                enabled: dataValues.enabled,
                deleted: dataValues.deleted,
            },
        };
    }

    return new Promise((resolve, reject) => {
        customer ? resolve(customer) : resolve(null);
    });
}
async function countAll() {
    return Client().count();
}

async function getById(id) {
    return Client().findOne({
        where: {
            id: id,
        },
    });
}

async function update() {}
