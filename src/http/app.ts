import { Elysia} from "elysia";
import { errorHandler } from "./plugins/error-handler";
import { z } from "zod";
import { openapi } from '@elysiajs/openapi'
import { betterAuthPlugin, OpenAPI } from "./plugins/better-auth";
import { createTodoRoute } from "./routes/create-todo";
import { getTodosRoute } from "./routes/get-todos";

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
  .use(getTodosRoute)
