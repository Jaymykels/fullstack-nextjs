# Next.js Todo Application with GraphQL

A modern Todo application built with Next.js, GraphQL, Drizzle ORM, and PostgreSQL. This project demonstrates a full-stack application with type-safe database operations, GraphQL API, and a React frontend.

## Features

- ✨ Full-stack TypeScript application
- 🎯 GraphQL API with Type-GraphQL
- 🗃️ PostgreSQL database with Drizzle ORM
- 🔄 Real-time updates with Apollo Client
- 🎨 Styled with Tailwind CSS and Radix UI
- 🔒 Type-safe database operations
- 🌱 Database seeding and migrations
- 🐳 Docker-compose for development

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
yarn install
```

3. Start the PostgreSQL database:
```bash
docker-compose up -d
```

4. Set up the database:
```bash
# Generate migrations
yarn db:generate

# Run migrations
yarn db:migrate

# (Optional) Reset database and apply seed data
yarn db:reset
```

5. Start the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Commands

- `yarn db:generate` - Generate new migrations
- `yarn db:push` - Push schema changes to database
- `yarn db:pull` - Pull database changes to schema
- `yarn db:migrate` - Run pending migrations
- `yarn db:studio` - Open Drizzle Studio
- `yarn db:reset` - Reset database and apply migrations
- `yarn db:update-seed` - Update seed file with current database data

## Project Structure

```
src/
├── app/                 # Next.js app router
├── components/         # React components
├── db/                 # Database configuration and migrations
│   ├── migrations/    # Database migrations
│   └── schema.ts      # Database schema
├── graphql/           # GraphQL types and operations
│   ├── operations.ts  # GraphQL queries and mutations
│   ├── resolvers/     # GraphQL resolvers
│   └── types.ts       # GraphQL type definitions
├── lib/               # Shared utilities
└── services/          # Business logic layer
```

## Features

### Todo Management
- Create new todos
- Toggle todo completion
- Delete completed todos
- Add tags to todos
- Filter todos by tags

### Database
- Type-safe database operations with Drizzle ORM
- Database migrations
- Seed data management
- Database reset functionality

### API
- GraphQL API with Type-GraphQL
- DataLoader for efficient data fetching
- Type-safe resolvers and operations

### Frontend
- Modern React with hooks
- Apollo Client for state management
- Form handling with React Hook Form
- UI components with Radix UI
- Styling with Tailwind CSS

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server)
- [Drizzle ORM](https://orm.drizzle.team)
- [Apollo Client](https://www.apollographql.com/docs/react)
- [Type-GraphQL](https://typegraphql.com)
```