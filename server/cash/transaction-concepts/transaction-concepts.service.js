const transaction = require('./transaction-concepts.model');

module.exports = { get };

async function get() {
    return transaction.CashTransactionConcept.findAll({
        attributes: ['id', 'description', 'parentId', 'typeId', 'userAssignable'],
    });
}
