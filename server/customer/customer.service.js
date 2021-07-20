const customer = require('./customer.model');

module.exports = {
    countAll,
    create,
    getAll,
    getByDni,
    getById,
    update,
};

async function create({ dni, firstName, lastName, address, telephone, email, secondaryTelephone, birthDate }) {
    //TODO: Implement user cross-assignation
    return customer.Customer.findOrCreate({
        where: { dni: dni },
        defaults: {
            dni: dni,
            firstName: firstName,
            lastName: lastName,
            address: address,
            telephone: telephone,
            email: email,
            secondaryTelephone: secondaryTelephone,
            birthDate: birthDate,
        },
    });
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
        // TODO: Agregar usuario creador
        // TODO: Agregar usuario ligado
        const dataValues = rawCustomer.dataValues;
        customerDAO = {
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
        customerDAO ? resolve(customerDAO) : reject(error);
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

async function update({ id, dni, firstName, lastName, address, telephone, email, secondaryTelephone, user }) {
    //TODO: Implement user cross-assignation
    //TODO: Leave full implementation for Phase 2. Not currently required.
    return customer.Customer.update(
        {
            firstName: firstName,
            lastName: lastName,
            dni: dni,
            address: address,
            telephone: telephone,
            email: email,
            secondaryTelephone: secondaryTelephone,
        },
        { where: { id: id } }
    );
}
