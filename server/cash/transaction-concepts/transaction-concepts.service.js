const transaction = require('./transaction-concepts.model');

module.exports = { create, get, update, disable, enable };

const transactionAttributes = [
    'id',
    'description',
    'parentId',
    'transactionTypeId',
    'userAssignable',
    'enabled',
    'modifiable',
];

async function get() {
    const transactionDAOs = await transaction.CashTransactionConcept.findAll({
        attributes: transactionAttributes,
        order: [['description', 'ASC']],
    });

    return new Promise((resolve, reject) => {
        transactionDAOs ? resolve(buildTransactionDTOs(transactionDAOs)) : reject(error);
    });
}

//TODO: Phase 2 - Implement method for CRUD of Transaction Concepts
async function create({ concept }) {
    return transaction.CashTransactionConcept.findOrCreate({
        description: concept.description,
        parentId: concept.parent.id,
        transactionTypeId: concept.transactionType.id,
        userAssignable: concept.userAssignable,
        enabled: concept.enabled,
        modifiable: concept.modifiable,
    });
}

async function update({ concept }) {
    return transaction.CashTransactionConcept.update(
        {
            description: concept.description,
            parentId: concept.parent ? concept.parent.id : null,
            transactionTypeId: concept.transactionType.id,
            userAssignable: concept.userAssignable,
        },
        { where: { id: concept.id } }
    );
}

async function disable({ concept }) {
    return transaction.CashTransactionConcept.update(
        {
            enabled: false,
        },
        { where: { id: concept.id } }
    );
}
async function enable({ concept }) {
    return transaction.CashTransactionConcept.update(
        {
            enabled: true,
        },
        { where: { id: concept.id } }
    );
}

function toTransactionDTO(transactionDAO, parentConcepts = []) {
    return {
        id: transactionDAO.id,
        description: transactionDAO.description,
        transactionType: _transactionTypes.filter(
            (transactionType) => transactionDAO.transactionTypeId === transactionType.id
        )[0],
        parent:
            parentConcepts.length === 0
                ? null
                : parentConcepts.filter((parent) => parent.id === transactionDAO.parentId)[0],
        userAssignable: !!transactionDAO.userAssignable,
        children: [],
        enabled: transactionDAO.enabled,
        modifiable: transactionDAO.modifiable,
    };
}

function buildTransactionDTOs(transactionDAOs) {
    const parentConcepts = transactionDAOs
        .filter((transactionDAO) => !transactionDAO.dataValues.parentId)
        .map((transactionDAO) => transactionDAO.dataValues)
        .map((transactionDAO) => toTransactionDTO(transactionDAO, []));

    const childrenConcepts = transactionDAOs
        .filter((transactionDAO) => !!transactionDAO.dataValues.parentId)
        .map((transactionDAO) => transactionDAO.dataValues)
        .map((transactionDAO) => toTransactionDTO(transactionDAO, parentConcepts));

    return parentConcepts.map((concept) => ({
        ...concept,
        children: childrenConcepts.filter((children) => children.parent.id === concept.id),
    }));
}

//TODO: See Issue #74. Refactor hardcoded transaction type handling.
const _transactionTypes = [
    { id: 0, description: 'Egreso' },
    { id: 1, description: 'Ingreso' },
];
