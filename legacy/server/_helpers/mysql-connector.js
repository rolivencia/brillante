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
    logging: false,
    pool: {
        max: 10,
        min: 0,
        idle: 5000,
    },
});
function sequelizeConnector() {
    return sequelizeConnection;
}
