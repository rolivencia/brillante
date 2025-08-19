import { Sequelize } from 'sequelize';
import environment from './environment';

const database = environment.mySqlDatabase;

const sequelizeConnection = new Sequelize(database, {
    dialect: 'mysql',
    dialectOptions: {
        decimalNumbers: true
    },
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

export function sequelizeConnector(): Sequelize {
    return sequelizeConnection;
}

export { sequelizeConnection };
