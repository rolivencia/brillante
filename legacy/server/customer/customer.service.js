const customer = require('./customer.model');

module.exports = {
    countAll,
    create,
    getAll,
    getByDni,
    getByEmail,
    getById,
    update,
};

async function create({ dni, firstName, lastName, address, telephone, email, birthDate }) {
    return customer.Customer.findOrCreate({
        where: { dni: dni },
        defaults: {
            dni: dni,
            firstName: firstName,
            lastName: lastName,
            address: address,
            telephone: telephone,
            email: email,
            birthDate: birthDate,
        },
    });
}

async function update({ id, dni, firstName, lastName, address, telephone, email, birthDate }) {
    return customer.Customer.update(
        {
            dni: dni,
            firstName: firstName,
            lastName: lastName,
            address: address,
            telephone: telephone,
            email: email,
            birthDate: birthDate,
        },
        { where: { id: id } }
    );
}

async function getAll(offset, limit, sortBy = {}) {
    // TODO: Implement pagination and sorting to retrieve data on-demand
    return customer.Customer.findAndCountAll();
}

async function getByDni(dni) {
    let customerDAO = null;
    const rawCustomer = await customer.Customer.findOne({
        where: {
            dni: dni,
        },
    });

    if (rawCustomer) {
        customerDAO = parseCustomer(rawCustomer.dataValues);
    }

    return new Promise((resolve, reject) => {
        customerDAO ? resolve(customerDAO) : reject(Error);
    });
}

function parseCustomer(dataValues) {
    // TODO: Agregar usuario creador
    // TODO: Agregar usuario ligado

    return {
        address: dataValues.address,
        birthDate: dataValues.birthDate,
        dni: dataValues.dni,
        email: dataValues.email,
        firstName: dataValues.firstName,
        id: dataValues.id,
        lastName: dataValues.lastName,
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

async function getByEmail(email) {
    let customerDAO = null;
    const rawCustomer = await customer.Customer.findOne({
        where: {
            email: email,
        },
    });

    if (rawCustomer) {
        customerDAO = parseCustomer(rawCustomer.dataValues);
    }

    return new Promise((resolve, reject) => {
        customerDAO ? resolve(customerDAO) : reject(Error);
    });
}

async function countAll() {
    return customer.Customer.count();
}

async function getById(id) {
    return customer.Customer.findOne({
        where: {
            id: id,
        },
    });
}
