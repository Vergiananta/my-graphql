import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($name: String!, $password: String!) {
    createUser(name: $name, password: $password) {
      id
      name
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $name: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      name: $name
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      message
    }
  }
`;
