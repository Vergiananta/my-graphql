import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_COMPANIES, GET_ONE_COMPANY } from "./Queries/Company";
import { CREATE_COMPANY, DELETE_COMPANY, LOGIN_COMPANY, UPDATE_PASSWORD } from "./Mutations/Company";

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
      getAllCompanies: GET_ALL_COMPANIES,
      getOneCompany: GET_ONE_COMPANY
    },
  });
  
  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createCompany: CREATE_COMPANY,
      deleteCompany: DELETE_COMPANY,
      updatePassword: UPDATE_PASSWORD,
      loginCompany: LOGIN_COMPANY
    },
  });
  
  export const schemaCompany = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
  });