import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    yearOfCreation: { type: GraphQLString },
  }),
});
