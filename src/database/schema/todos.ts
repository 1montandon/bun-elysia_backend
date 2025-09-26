import { pgTable, boolean, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const todos = pgTable("todos", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => Bun.randomUUIDv7()),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  // With timezone-aware timestamps
  startDate: timestamp("start_date", { withTimezone: true })
    .notNull()
    .defaultNow(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
