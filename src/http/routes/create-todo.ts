// Controller handle HTTP related eg. routing, request validation
import { Elysia, t } from "elysia";
import { authMacro } from "../plugins/auth-macro";
import { db } from "@/database/client";
import { schema } from "@/database/schema";

export const createTodoRoute = new Elysia({ prefix: "/todo" })
  .use(authMacro)
  .post(
    "/",
    async ({ body, status, session }) => {
      const { title } = body;
      const { userId } = session;

      const newTodo = await db
        .insert(schema.todos)
        .values({ title, userId })
        .returning();

      return status(201, { todo: newTodo[0] });
    },
    {
      auth: true,
      detail: {
        tags: ["Todo"],
        summary: "Create a To-Do",
        description: "Create a To-Do",
      },
      body: t.Object({
        title: t.String(),
      }),
      response: {
        201: t.Object({
          todo: t.Object({
            id: t.String({ format: "uuid" }),
            title: t.String(),
            userId: t.String({ format: "uuid" }),
            completed: t.Boolean(),
          }),
        }),
      },
    }
  );
