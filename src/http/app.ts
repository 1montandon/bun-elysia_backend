import { Elysia} from "elysia";
import { errorHandler } from "./plugins/error-handler";
import { createUser } from "./routes/create-user";

export const app = new Elysia()
.use(errorHandler)
.use(createUser)

