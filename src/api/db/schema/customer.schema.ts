import { mysqlTable, int, varchar, bigint, datetime, boolean, date } from 'drizzle-orm/mysql-core';

export const customer = mysqlTable('sh_fix_customer', {
  id: int('id').primaryKey().autoincrement(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  dni: int('dni').notNull(),
  telephone: bigint('telephone_number', { mode: 'number' }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  createdAt: datetime('created_at').notNull().default(new Date()),
  updatedAt: datetime('updated_at').notNull().default(new Date()),
  createdBy: bigint('created_by', { mode: 'number' }),
  updatedBy: bigint('updated_by', { mode: 'number' }),
  enabled: boolean('enabled').notNull().default(true),
  deleted: boolean('deleted').notNull().default(false),
  birthDate: date('birth_date')
});

export type Customer = typeof customer.$inferSelect;
export type NewCustomer = typeof customer.$inferInsert;
