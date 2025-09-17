import { Elysia} from "elysia";
import { errorHandler } from "./plugins/error-handler";

export const app = new Elysia()
.use(errorHandler)

