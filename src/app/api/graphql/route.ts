import "reflect-metadata";
import { createYoga } from 'graphql-yoga';
import { buildSchema } from 'type-graphql';
import { TodoResolver } from '@/graphql/resolvers/todo.resolver';

let schema: any;

async function getSchema() {
  if (!schema) {
    schema = await buildSchema({
      resolvers: [TodoResolver],
      validate: false,
    });
  }
  return schema;
}

const { handleRequest } = createYoga({
  schema: getSchema(),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response }
});

export { handleRequest as GET, handleRequest as POST } 