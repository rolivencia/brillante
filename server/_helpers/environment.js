const result = require('dotenv').config();
const _ = require('lodash');

let environment;

if (!('error' in result)) {
    environment = {
        secret: result.parsed.SECRET,
        mySqlDatabase: result.parsed.MYSQL_DATABASE,
        sanity: {
            projectId: result.parsed.SANITY_PROJECT_ID,
            dataset: result.parsed.SANITY_DATASET,
        },
    };
} else {
    environment = {
        secret: process.env.SECRET,
        mySqlDatabase: process.env.MYSQL_DATABASE,
        sanity: {
            projectId: process.env.SANITY_PROJECT_ID,
            dataset: process.env.SANITY_DATASET,
        },
    };
}

module.exports = environment;
