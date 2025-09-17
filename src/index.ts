import { Elysia } from "elysia";
import { authRoutes } from "./routes/auth";

const app = new Elysia().onError(({ code, error }) => {
  return { code, error, message: "SERIO ISSO" };
});

app.use(authRoutes)

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
