import { GraphQLID, GraphQLList } from "graphql";
import { Company } from "../../../Entities/Company";
import { CompanyType } from "../TypeDefs/Company";
import { Users } from "../../../Entities/Users";

export const GET_ALL_COMPANIES = {
  type: new GraphQLList(CompanyType),
  resolve() {
    return Company.find();
  },
};

export const GET_ONE_COMPANY = {
  type: CompanyType,
  args: {
    id: {type: GraphQLID}
  },
  async resolve(id: any) {

    return await Company.findOne(id)
  }
}
