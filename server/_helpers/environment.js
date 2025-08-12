const environment = {
    secret: process.env.SECRET,
    mySqlDatabase: process.env.MYSQL_DATABASE,
    sanity: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
    },
};

module.exports = environment;
