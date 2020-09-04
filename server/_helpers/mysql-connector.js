const environment = require('./environment');
module.exports = { sequelizeConnector };

const Sequelize = require('sequelize');
const mysql = require('mysql2');

const database = environment.mySqlDatabase;

const sequelizeConnection = new Sequelize(database, {
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: true,
    },
});
function sequelizeConnector() {
    return sequelizeConnection;
}
