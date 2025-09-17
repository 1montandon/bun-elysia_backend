import { defineConfig } from 'drizzle-kit'

if(!process.env.DB_FILE_NAME){
    throw new Error('the DATABASE_URL is required')
}

export default defineConfig({
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DB_FILE_NAME,
    },
    out: './drizzle',
    schema: './src/db/schema.ts',
})