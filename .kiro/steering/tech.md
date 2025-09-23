# Technology Stack

## Runtime & Framework
- **Bun**: JavaScript runtime and package manager
- **Elysia**: Fast and type-safe web framework for Bun
- **TypeScript**: Strict type checking enabled

## Database & ORM
- **PostgreSQL**: Primary database (containerized via Docker)
- **Drizzle ORM**: Type-safe database toolkit with snake_case convention
- **Drizzle Kit**: Database migrations and schema management

## Authentication
- **Better Auth**: Modern authentication library with OpenAPI integration
- **Bun.password**: Built-in password hashing utilities

## API & Documentation
- **@elysiajs/openapi**: Automatic OpenAPI/Swagger documentation
- **Zod**: Runtime type validation and schema definition

## Development Tools
- **Docker Compose**: Local PostgreSQL development environment
- **ESModules**: ES2022 module system with node resolution

## Common Commands

### Development
```bash
bun run dev          # Start development server with hot reload
```

### Database Operations
```bash
bun run db:generate  # Generate Drizzle migrations from schema
bun run db:migrate   # Apply pending migrations to database
```

### Docker
```bash
docker-compose up -d # Start PostgreSQL container
```

## Path Aliases
- `@/*` maps to `./src/*` for clean imports