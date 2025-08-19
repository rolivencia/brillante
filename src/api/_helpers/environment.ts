interface Environment {
    secret: string;
    mySqlDatabase: string;
}

const environment: Environment = {
    secret: process.env["SECRET"] || '',
    mySqlDatabase: process.env["MYSQL_DATABASE"] || '',
};

export default environment;
