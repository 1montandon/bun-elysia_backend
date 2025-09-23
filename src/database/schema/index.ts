import { accounts } from "./accounts";
import { sessions } from "./sessions";
import { todos } from "./todos";
import { users } from "./users";
import { verifications } from "./verifications";

// barrel file
export const schema = { users, accounts, sessions, verifications, todos };
