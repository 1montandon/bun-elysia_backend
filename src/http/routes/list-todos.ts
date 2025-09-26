// Controller handle HTTP related eg. routing, request validation
import { Elysia, t } from "elysia";
import { authMacro } from "../plugins/auth-macro";
import { db } from "@/database/client";
import { schema } from "@/database/schema";

export const listTodosRoute = new Elysia({ prefix: "/todo" })
  .use(authMacro)
  .get(
    "/",
    async ({ params, status, session }) => {
        const {} = params
        const { userId } = session;

      const newTodo = await db
        .insert(schema.todos)
        .values({
          title,
          userId,
          startDate,
          endDate,
        })
        .returning();

      return status(201, { todo: newTodo[0] });
    },
    {
      auth: true,
      detail: {
        tags: ["Todo"],
        summary: "Create a To Do",
        description: "Create a To Do",
      },
      body: t.Object({
        title: t.String(),
        startDate: t.Date(),
        endDate: t.Date(),
      }),
      response: {
        201: t.Object({
          todo: t.Object({
            id: t.String({ format: "uuid" }),
            title: t.String(),
            userId: t.String({ format: "uuid" }),
            startDate: t.Date(),
            endDate: t.Date(),
            completed: t.Boolean(),
          }),
        }),
        401: t.Object({
          message: t.String(),
        }),
      },
    }
  );
