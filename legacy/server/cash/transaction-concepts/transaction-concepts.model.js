const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();

class CashTransactionConcept extends Sequelize.Model {}

module.exports = { CashTransactionConcept };

CashTransactionConcept.init(
    {
        id: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            primaryKey: true,
            field: 'transaction_concept_id',
            autoIncrement: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'description',
        },
        parentId: {
            type: Sequelize.SMALLINT,
            allowNull: true,
            field: 'transaction_parent_concept_id',
        },
        transactionTypeId: {
            type: Sequelize.SMALLINT,
            allowNull: true,
            field: 'transaction_type_id',
        },
        userAssignable: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            field: 'user_assignable',
        },
        enabled: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            field: 'enabled',
        },
        modifiable: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            field: 'modifiable',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_tab_transaction_concept',
    }
);

CashTransactionConcept.belongsTo(CashTransactionConcept, {
    as: 'parent',
    foreignKey: 'transaction_parent_concept_id',
});
CashTransactionConcept.hasOne(CashTransactionConcept, {
    as: 'children',
    foreignKey: 'transaction_concept_id',
});
