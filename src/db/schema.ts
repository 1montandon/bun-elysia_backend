import { pgTable, serial, text, boolean, integer, uuid } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid().defaultRandom().primaryKey(),
    username: text().notNull().unique(),
    email: text().notNull().unique(),
    password: text().notNull(),
})

export const todos = pgTable("todos", {
  id: uuid().primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  done: boolean().default(false).notNull(),
  userId: uuid().notNull().references(() => users.id)
});
