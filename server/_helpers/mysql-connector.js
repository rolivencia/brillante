module.exports = mysqlConnector;

const mysql = require('mysql');

function mysqlConnector() {
    return mysql.createConnection({
        host: 'pwcspfbyl73eccbn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ull0rya55h5ajn6y',
        password: 'fmrorcfy1lbwexto',
        database: 'g30ybi82rgh176xm'
    });
}
