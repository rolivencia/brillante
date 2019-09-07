module.exports = { mysqlConnector, legacyDbConnector };

const Sequelize = require('sequelize');
const mysql = require('mysql2');
const config = require('server-config.json');
const dbConfig = config.databases.mysql.databases.filter(db => db.id === 'brillante_godaddy').pop();

const sequelizeConnection = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: true
    }
});

const mySqlConnection = mysql.createConnection({
    host: 'pwcspfbyl73eccbn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'ull0rya55h5ajn6y',
    password: 'fmrorcfy1lbwexto',
    database: 'g30ybi82rgh176xm'
});

function mysqlConnector() {
    return mySqlConnection;
}

function legacyDbConnector() {
    return sequelizeConnection;
}
