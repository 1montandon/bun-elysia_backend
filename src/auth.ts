import { betterAuth, hash } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database/client";
import { password } from "bun";


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true
    }),
    advanced: {
        generateId: false,
    },
    emailAndPassword:{
        enabled: true,
        autoSignIn: true,
        password: {
            hash: (password: string) => Bun.password.hash(password),
            verify: ({password, hash}) => Bun.password.verify(password, hash)
        },
    },
})