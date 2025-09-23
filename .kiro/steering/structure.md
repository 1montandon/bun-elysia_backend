# Project Structure

## Root Level
- `.env` - Environment variables (DATABASE_URL, etc.)
- `docker-compose.yml` - PostgreSQL development container
- `drizzle.config.ts` - Drizzle ORM configuration
- `package.json` - Bun dependencies and scripts
- `tsconfig.json` - TypeScript configuration with strict mode

## Source Organization (`src/`)

### Core Files
- `index.ts` - Main application entry point with Elysia server setup
- `auth.ts` - Better Auth configuration and setup
- `env.ts` - Environment variable validation using Zod

### Database Layer (`src/database/`)
- `client.ts` - Drizzle database client configuration
- `schema/` - Database schema definitions (Drizzle)
- `migrations/` - Generated migration files

### HTTP Layer (`src/http/`)
- `plugins/` - Elysia plugins and middleware
  - `better-auth.ts` - Authentication plugin with macro for protected routes

## Conventions

### File Organization
- Group related functionality in folders (database, http, etc.)
- Use plugins pattern for Elysia extensions
- Keep configuration files at appropriate levels (root vs src)

### Authentication
- Use `auth: true` in route options for protected endpoints
- Authentication macro provides `user` and `session` in route context
- Better Auth handles `/auth/*` routes automatically

### Database
- All database schemas use snake_case naming convention
- Migrations are auto-generated in `src/database/migrations/`
- Database client is centralized in `src/database/client.ts`

### API Design
- Use Zod schemas for request/response validation
- Include OpenAPI documentation with `detail` property
- Organize routes with appropriate tags for documentation