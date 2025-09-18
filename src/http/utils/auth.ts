import { env } from "../../env";

const JWT_SECRET = env.JWT_SECRET 
const JWT_EXPIRES_IN = '7d';

export class AuthUtils {
    static async hashPassword(password: string): Promise<string>{
        const hashedPassword = await Bun.password.hash(password)
        return hashedPassword
    }

    static async generateToken()
}