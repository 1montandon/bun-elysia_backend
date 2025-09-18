// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../env';

const queryClient = postgres(env.DATABASE_URL);
export const db = drizzle({ client: queryClient });

