import { GraphQLList } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from "../../../Entities/Users";

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  resolve() {
    return Users.find();
  },
};


export const GET_ONE_USER = {
  type: UserType,
  async resolve(id: string) {
    return await Users.findOne(id)
  }
}