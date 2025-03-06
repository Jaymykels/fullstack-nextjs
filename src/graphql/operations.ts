import { gql } from "@apollo/client";

export const GET_TODOS = gql`
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
`;

export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $tagIds: [ID!]) {
    addTodo(title: $title, tagIds: $tagIds) {
      id
      title
      completed
      tags {
        id
        name
      }
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`; 

export const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      name
    }
  }
`;