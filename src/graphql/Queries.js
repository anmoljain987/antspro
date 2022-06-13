import { gql } from "@apollo/client";

export const DATA_VALUE = gql`
  fragment DATA_VALUE on Todo {
    id
    description
    status
  }
`;
export const GET_ALL_TODOS = gql`
  ${DATA_VALUE}
  query {
    todos {
      ...DATA_VALUE
    }
  }
`;

export const CREATE_TODO = gql`
  ${DATA_VALUE}

  mutation createTodo($description: String!) {
    createTodo(description: $description) {
      ...DATA_VALUE
    }
  }
`;
export const DELETE_TODO = gql`
  ${DATA_VALUE}
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      ...DATA_VALUE
    }
  }
`;

export const UPDATE_TODO = gql`
  ${DATA_VALUE}

  mutation updateTodo($id: ID!, $description: String!) {
    updateTodo(id: $id, description: $description) {
      ...DATA_VALUE
    }
  }
`;

export const CHECKED_TODO = gql`
  ${DATA_VALUE}

  mutation checkedTodo($id: ID!, $status: Boolean!) {
    checkedTodo(id: $id, status: $status) {
      ...DATA_VALUE
    }
  }
`;
