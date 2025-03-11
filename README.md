# Full-Stack Todo Application

A modern, production-ready Todo application demonstrating advanced full-stack development practices using Next.js 14, GraphQL, and PostgreSQL. This project showcases enterprise-level architecture, type safety across the stack, and modern development workflows.

## Technical Stack

### Backend Infrastructure
- **Database**: PostgreSQL with Drizzle ORM for type-safe queries and migrations
- **API Layer**: GraphQL with Type-GraphQL for fully typed schema definitions
- **Server**: Next.js 14 App Router with GraphQL Yoga
- **Performance**: DataLoader for efficient batched database queries
- **Type Safety**: Full TypeScript implementation with generated types

### Frontend Architecture
- **Framework**: Next.js 14 with React Server Components
- **State Management**: Apollo Client with automatic cache updates
- **UI Components**: Custom component library built on Radix UI primitives using Shadcn
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form with Zod validation

### Developer Experience
- **Type Safety**: End-to-end type safety with TypeScript
- **Code Quality**: 
  - Biome for linting and formatting
  - GraphQL Codegen for type-safe operations
  - Drizzle Kit for database schema management
- **Testing**: Playwright for E2E testing
- **Development**: Docker Compose for local development

## Core Features

- **Advanced Todo Management**
  - Real-time updates with optimistic UI
  - Tag-based organization system
  - Batch operations support
  
- **Database Operations**
  - Type-safe query building
  - Automated migrations
  - Seeding functionality
  - Data integrity with foreign key constraints

- **GraphQL Implementation**
  - Efficient data loading with DataLoader
  - Type-safe resolvers and operations
  - Automatic type generation
  - Real-time subscription support

## Getting Started

1. **Environment Setup**
```bash
# Clone and install dependencies
git clone <repository-url>
yarn install

# Start PostgreSQL
docker-compose up -d

# Configure environment
cp .env.example .env
```

2. **Database Setup**
```bash
# Run migrations
yarn db:migrate

# (Optional) Seed database
yarn db:reset
```

3. **Development**
```bash
# Start development server
yarn dev

# Generate GraphQL types (in watch mode)
yarn graphql:codegen --watch
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Development Commands

### Database Operations
- `yarn db:generate` - Generate new migrations
- `yarn db:migrate` - Apply pending migrations
- `yarn db:reset` - Reset database with seed data

### Testing & Quality
- `yarn test` - Run E2E tests
- `yarn lint` - Run linting
- `yarn format` - Format code
- `yarn graphql:codegen` - Generate GraphQL types

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/         
│   ├── ui/            # Reusable UI components
│   └── features/      # Feature-specific components
├── db/                
│   ├── migrations/    # Database migrations
│   └── schema.ts      # Database schema
├── graphql/           
│   ├── resolvers/     # GraphQL resolvers
│   ├── types.ts       # GraphQL type definitions
│   └── operations.ts  # GraphQL operations
├── lib/               # Shared utilities
└── services/          # Business logic layer
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server)
- [Drizzle ORM](https://orm.drizzle.team)
- [Apollo Client](https://www.apollographql.com/docs/react)
- [Type-GraphQL](https://typegraphql.com)
```