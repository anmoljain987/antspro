import { gql } from "@apollo/client";
export const GET_ALL_TODOS = gql`
  query {
    todos {
      id
      description
      status
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      description
      status
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $description: String!) {
    updateTodo(id: $id, description: $description) {
      id
      description
      status
    }
  }
`;

export const CHECKED_TODO = gql`
  mutation checkedTodo($id: ID!, $status: Boolean!) {
    checkedTodo(id: $id, status: $status) {
      id
      description
      status
    }
  }
`;

export const CREATE_TODO = gql`
  mutation createTodo($description: String!) {
    createTodo(description: $description) {
      id
      description
      status
    }
  }
`;
