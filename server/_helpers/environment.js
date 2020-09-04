const result = require('dotenv').config();
const _ = require('lodash');

let environment;

if (!('error' in result)) {
    environment = {
        secret: result.parsed.SECRET,
        mySqlDatabase: result.parsed.MYSQL_DATABASE,
    };
} else {
    environment = {
        secret: process.env.SECRET,
        mySqlDatabase: process.env.MYSQL_DATABASE,
    };
}

module.exports = environment;
