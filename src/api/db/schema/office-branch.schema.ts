import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const officeBranch = mysqlTable('sh_administration_office_branch', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  codeName: varchar('code_name', { length: 255 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
});

export type OfficeBranch = typeof officeBranch.$inferSelect;
export type NewOfficeBranch = typeof officeBranch.$inferInsert;