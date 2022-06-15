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
  mutation createTodo($description: String!, $userId: ID!) {
    createTodo(description: $description, userId: $userId) {
      id
      description
      status
      userId {
        id
      }
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

export const USER_TODO = gql`
  ${DATA_VALUE}
  query userTodo($email: String!) {
    userTodo(email: $email) {
      id
      email
      todos {
        ...DATA_VALUE
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($uid: String!) {
    createUser(uid: $uid) {
      id
      uid
    }
  }
`;
