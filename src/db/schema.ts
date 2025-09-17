import { password } from "bun";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull()
});

export const todos = sqliteTable("todos", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text().notNull(),
  done: integer({ mode: "boolean" }).default(false).notNull(),
  userId: int().notNull().references(() => users.id)
});
