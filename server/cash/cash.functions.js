const transaction = require('server/cash/transaction-concepts/transaction-concepts.model');
const cash = require('server/cash/cash.model');
const officeBranch = require('server/office-branch/office-branch.model');
const user = require('server/users/user.model');
const Sequelize = require('sequelize');
const { Repair } = require('../repair/repair.model');

function cashGetDefinition(includeOperations = true) {
    let cashDefinition = [
        {
            as: 'concept',
            model: transaction.CashTransactionConcept,
            required: true,
            attributes: ['id', 'description', 'userAssignable'],
            include: [
                {
                    as: 'parent',
                    model: transaction.CashTransactionConcept,
                    required: false,
                    attributes: ['id', 'description', 'userAssignable'],
                },
                {
                    as: 'transactionType',
                    model: cash.TransactionType,
                    required: true,
                    attributes: ['id', 'description'],
                },
            ],
        },
        {
            as: 'paymentMethod',
            model: cash.PaymentMethod,
            required: true,
            attributes: ['id', 'description'],
        },
        {
            as: 'officeBranch',
            model: officeBranch.OfficeBranch,
            required: true,
            attributes: ['id', 'name', 'address'],
        },
        {
            as: 'user',
            model: user.User,
            required: true,
            attributes: [
                'id',
                'firstName',
                'lastName',
                'userName',
                'avatar',
                'createdAt',
                'updatedAt',
                'enabled',
                'deleted',
            ],
        },
    ];

    if (includeOperations) {
        cashDefinition = [
            ...cashDefinition,
            {
                as: 'repair',
                model: Repair,
                required: false,
                attributes: ['id', [Sequelize.fn('CONCAT', '', 'Reparación'), 'description']],
                through: { attributes: [] },
            },
        ];
    }

    return cashDefinition;
}

module.exports = { cashGetDefinition };
