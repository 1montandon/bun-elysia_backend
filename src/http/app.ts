import { Elysia} from "elysia";
import { errorHandler } from "./plugins/error-handler";
import { z } from "zod";
import { openapi } from '@elysiajs/openapi'
import { betterAuthPlugin, OpenAPI } from "./plugins/better-auth";
import { createTodoRoute } from "./routes/create-todo";

export const app = new Elysia()
  .use(errorHandler)
  .use(openapi({
      documentation: {
          components: await OpenAPI.components,
          paths: await OpenAPI.getPaths()
      }
  }))
  .use(betterAuthPlugin)
  .use(createTodoRoute)
  .get("/", () => "Hello Elysia")
  .get(
    "/users/:id",
    ({ params, user, session }) => {
      const authenticatedUserName = user.name
      const userId = params.id;

      return { id: userId, name: "Eduardo" };
    },
    {
      auth: true,
      detail: {
        summary: 'Buscar um usuario pelo id',
        tags: ['users']
      },
      params: z.object({
        id: z.string(),
      }),
      response: {
        200: z.object({
          id: z.string(),
          name: z.string(),
        }),
      },
    }
  )
