import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS, GET_ONE_USER } from "./Queries/User";
import { CREATE_USER, DELETE_USER, LOGIN_USER, UPDATE_PASSWORD, UPDATE_USER } from "./Mutations/User";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_USERS,
    getOneUser: GET_ONE_USER
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updatePassword: UPDATE_PASSWORD,
    loginUser: LOGIN_USER,
    updateUser: UPDATE_USER
  },
});

export const schemaUser = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
