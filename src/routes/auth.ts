import Elysia, { t } from "elysia";

export const authRoutes = new Elysia({ prefix: "/auth" }).post(
  "/login",
  (ctx) => {
    ctx.body;
    console.log(ctx.body)
  },
  {
    body: t.Object({
      username: t.String({ minLength: 5 }),
      email: t.String({ format: "email", error: "teste" }),
      password: t.String(),
    }),
  }
);
