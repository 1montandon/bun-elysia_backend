// plugins/auth-macro.ts
import { Elysia } from "elysia";
import { auth } from "@/auth";

export const authMacro = new Elysia({ name: "auth-macro" }).macro({
  auth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({ headers });

      if (!session) {
        return status(401, { message: "Unauthorized" });
      }

      return session;
    },
  },
});
