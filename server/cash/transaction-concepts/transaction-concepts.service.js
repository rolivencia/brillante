const transaction = require('./transaction-concepts.model');

module.exports = { get };

async function get() {
    const transactionDAOs = await transaction.CashTransactionConcept.findAll({
        attributes: ['id', 'description', 'parentId', 'transactionTypeId', 'userAssignable'],
    });

    return new Promise((resolve, reject) => {
        if (transactionDAOs) {
            const parentConcepts = transactionDAOs
                .filter((transactionDAO) => !transactionDAO.dataValues.parentId)
                .map((transactionDAO) => transactionDAO.dataValues)
                .map((transactionDAO) => toTransactionDTO(transactionDAO, []));

            const childrenConcepts = transactionDAOs
                .filter((transactionDAO) => !!transactionDAO.dataValues.parentId)
                .map((transactionDAO) => transactionDAO.dataValues)
                .map((transactionDAO) => toTransactionDTO(transactionDAO, parentConcepts));

            const transactionDTOs = parentConcepts.map((concept) => ({
                ...concept,
                children: childrenConcepts.filter((children) => children.parent.id === concept.id),
            }));

            resolve(transactionDTOs);
        } else {
            reject(error);
        }
    });
}

//TODO: Phase 2 - Implement method for CRUD of Transaction Concepts
async function create() {}
//TODO: Phase 2 - Implement method for CRUD of Transaction Concepts
async function update() {}
//TODO: Phase 2 - Implement method for CRUD of Transaction Concepts
async function remove() {}

function toTransactionDTO(transactionDAO, parentConcepts = []) {
    return {
        id: transactionDAO.id,
        description: transactionDAO.description,
        transactionType: _transactionTypes.filter((transactionType) => transactionDAO.transactionTypeId === transactionType.id)[0],
        parent: parentConcepts.length === 0 ? null : parentConcepts.filter((parent) => parent.id === transactionDAO.parentId)[0],
        userAssignable: !!transactionDAO.userAssignable,
        children: [],
    };
}

const _transactionTypes = [
    { id: 0, description: 'Egreso' },
    { id: 1, description: 'Ingreso' },
];
