import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    accessToken: { type: GraphQLString },
  }),
})
