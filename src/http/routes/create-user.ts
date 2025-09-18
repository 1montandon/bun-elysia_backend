import { Elysia, t } from "elysia";
import { db } from "../../db/client";
import { users } from "../../db/schema";
import { eq, or } from "drizzle-orm";
import { AppError } from "../utils/error";
import { AuthUtils } from "../utils/auth";


export const createUser = new Elysia({ prefix: "/auth" }).post(
  "sign-in",
  async ({ body }) => {
    const { username, email, password } = body;
    const userExists = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.username, username)));
    if (userExists.length > 0) {
      throw new AppError(409, "User with that info already exists");
    }

    const hashedPassword = await AuthUtils.hashPassword(password)

    const [user] = await db.insert(users).values({username, email, password: hashedPassword }).returning()

   return {
    user: {
        id: user.id,
        username: user.username,
        email: user.email
    }
   }
  },

  {
    body: t.Object({
      username: t.String({ minLength: 5 }),
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  }
);
