import "reflect-metadata";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import { Container } from "@/container";
import { TodoResolver } from "@/graphql/resolvers/todo.resolver";
import { TagResolver } from "@/graphql/resolvers/tag.resolver";
import type { GraphQLSchema } from "graphql";

let schema: GraphQLSchema;

async function getSchema() {
  if (!schema) {
    schema = await buildSchema({
      resolvers: [TodoResolver, TagResolver],
      container: Container,
      validate: false,
    });
  }
  return schema;
}

const { handleRequest } = createYoga({
  schema: getSchema(),
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
