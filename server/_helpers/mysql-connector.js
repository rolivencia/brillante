const environment = require('./environment');
module.exports = { sequelizeConnector };

const Sequelize = require('sequelize');

const database = environment.mySqlDatabase;

const sequelizeConnection = new Sequelize(database, {
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
    define: {
        freezeTableName: true,
        timestamps: true,
    },
});
function sequelizeConnector() {
    return sequelizeConnection;
}
