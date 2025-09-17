import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  done: boolean("done").default(false).notNull(),
  // userId: integer("user_id").notNull().references(() => users.id)
});
