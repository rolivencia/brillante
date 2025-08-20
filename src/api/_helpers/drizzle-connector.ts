import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import environment from './environment';

const poolConnection = mysql.createPool({
  uri: environment.mySqlDatabase,
  multipleStatements: false,
});

export const db = drizzle(poolConnection);

export { poolConnection };