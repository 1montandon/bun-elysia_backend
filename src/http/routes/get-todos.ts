// Controller handle HTTP related eg. routing, request validation
import { Elysia, t } from "elysia";
import { authMacro } from "../plugins/auth-macro";
import { db } from "@/database/client";
import { schema } from "@/database/schema";
import { and, eq, gt, gte, lt, lte, SQL } from "drizzle-orm";

export const getTodosRoute = new Elysia({ prefix: "/todo" }).use(authMacro).get(
  "/",
  async ({ query, status, session }) => {
// 1. Get query values (which are now optional)
    const { from: fromQuery, to: toQuery } = query;
    const { userId } = session;

    // 2. Define default date logic
    // Example: Default 'from' (Start Date) to 7 days ago, and 'to' (End Date) to 7 days from now.
    const defaultFrom = new Date();
    defaultFrom.setDate(defaultFrom.getDate() - 7); // 7 days ago

    const defaultTo = new Date();
    defaultTo.setDate(defaultTo.getDate() + 7); // 7 days from now

    // 3. Apply defaults if query parameters are missing
    const startDateFilter = fromQuery || defaultFrom;
    const endDateFilter = toQuery || defaultTo;

    // 4. Construct the Drizzle WHERE clause
    const conditions: SQL[] = [];

    // Always filter by user
    conditions.push(eq(schema.todos.userId, userId));

    conditions.push(lte(schema.todos.startDate, startDateFilter)); 
    conditions.push(gte(schema.todos.endDate, endDateFilter));   


    const todos = await db
      .select()
      .from(schema.todos)
      .where(and(...conditions)); // Use `and` with the array of conditions

    return status(200, { todos });
  },
  {
    auth: true,
    detail: {
      tags: ["Todo"],
      summary: "List To Do's",
      description: "List all To Do's",
    },
    query: t.Object({
      from: t.Optional(t.Date()), // Now optional
      to: t.Optional(t.Date()),   // Now optional
    }),
    response: {
      200: t.Object({
        todos: t.Array(
          t.Object({
            id: t.String({ format: "uuid" }),
            title: t.String(),
            userId: t.String({ format: "uuid" }),
            startDate: t.Date(),
            endDate: t.Date(),
            completed: t.Boolean(),
          })
        ),
      }),
      401: t.Object({
        message: t.String(),
      }),
    },
  }
);
