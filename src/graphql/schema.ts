export const typeDefs = /* GraphQL */ `
  type Tag {
    id: ID!
    name: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    tags: [Tag!]!
  }

  type Query {
    todos: [Todo!]!
    tags: [Tag!]!
  }

  type Mutation {
    addTodo(title: String!, tagIds: [ID!]): Todo!
    toggleTodo(id: ID!): Todo!
    deleteTodo(id: ID!): Todo!
    addTag(name: String!): Tag!
    removeTag(id: ID!): Tag!
    addTagToTodo(todoId: ID!, tagId: ID!): Todo!
    removeTagFromTodo(todoId: ID!, tagId: ID!): Todo!
  }
`