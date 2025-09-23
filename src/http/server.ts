import { env } from "../env";
import { app } from "./app";

const server = app.listen(env.PORT)

console.log(
  `🦊 Elysia is running at ${server.server?.hostname}:${server.server?.port}`
);