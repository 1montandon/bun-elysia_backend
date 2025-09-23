import { pgTable, serial, varchar, boolean, uuid, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const todos = pgTable("todos", {
    id: uuid("id").primaryKey().$defaultFn(() => Bun.randomUUIDv7()),
    title: text("title").notNull(),
    completed: boolean("completed").notNull().default(false),
    userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});