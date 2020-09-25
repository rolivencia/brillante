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
        typeId: {
            type: Sequelize.SMALLINT,
            allowNull: true,
            field: 'transaction_type_id',
        },
        userAssignable: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            field: 'user_assignable',
        },
    },
    {
        sequelize: sequelizeConnector,
        modelName: 'sh_tab_transaction_concept',
    }
);
