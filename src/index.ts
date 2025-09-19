import { Elysia } from "elysia";
import { z } from "zod";
import { openapi } from '@elysiajs/openapi'
import { betterAuthPlugin } from "./http/plugins/better-auth";

const app = new Elysia()
  .use(openapi())
  .use(betterAuthPlugin)
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
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
