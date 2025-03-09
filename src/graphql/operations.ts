import { graphql } from "./codegen";

export const GET_TODOS = graphql(`
  query GetTodos {
    todos {
      id
      title
      completed
      tags {
        id
        name
      }
    }
  }
`);

export const ADD_TODO = graphql(`
  mutation AddTodo($newTodoInput: NewTodoInput!) {
    addTodo(newTodo: $newTodoInput) {
      id
      title
      completed
      tags {
        id
        name
      }
    }
  }
`);

export const TOGGLE_TODO = graphql(`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`);

export const DELETE_TODO = graphql(`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`);

export const GET_TAGS = graphql(`
  query GetTags {
    tags {
      id
      name
    }
  }
`);
