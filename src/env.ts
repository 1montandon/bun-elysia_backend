import { t } from "elysia";
export const env = t.Object({
    PORT: t.Integer({ minimum: 1, maximum: 65535 }),
    DATABASE_URL: t.String(),
    JWT_SECRET: t.String()
});