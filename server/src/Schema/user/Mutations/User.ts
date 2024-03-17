import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { LoginType, UserType } from "../TypeDefs/User";
import { MessageType } from "../../../utils/Messages";
import { Users } from "../../../Entities/Users";
import { errorName } from "../../../middleware/error_response";
import { tokenValidation } from "../../../middleware/auth";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { Role } from "../../../utils/Role";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    companyId: { type: GraphQLInt}
  },
  async resolve(parent: any, args: any) {

    const { name, password, companyId, email } = args;
    const userCheck = await Users.findOne({
      where: {
        name: name,
      }
    })

    if (userCheck) {
      throw new Error('username already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.insert({ name, password: hashedPassword, role: Role.USER, company: companyId, email: email });
    return args;
  },
};

export const LOGIN_USER = {
  type: LoginType,
  args: {
    name: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
  
    const {name, password} = args;

    const user = await Users.findOne({ where: {name: name}    })
    
    if (!user) {
      throw new Error(errorName.NOTFOUND)
    }

    const validatePassword = await bcrypt.compare(password, user.password)
    if (!validatePassword) {
      throw new Error(errorName.UNAUTHORIZED)
    }

    const token = jwt.sign({id: user.id, name: user.name, role: user.role}, 'secret', { expiresIn: "1h" })
    return {
      successful: true,
      accessToken: token
    }
  }
}

export const UPDATE_PASSWORD = {
  type: MessageType,
  args: {
    name: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name, oldPassword, newPassword } = args;
    const user = await Users.findOne({ name: name});

    if (!user) {
      throw new Error("USERNAME DOESNT EXIST");
    }
    const userPassword = user?.password;
    const passNew = await bcrypt.hash(newPassword,10)
    if (oldPassword === userPassword) {
      await Users.update({ name: name }, { password: passNew });

      return { successful: true, message: "PASSWORD UPDATED" };
    } else {
      throw new Error("PASSWORDS DO NOT MATCH!");
    }

  },
};

export const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, context: any) {
    const token = context.headers.authorization;
    let role: string = ''
    if (token) {
      role = await tokenValidation(token, 'company')
    } else if (!token) {
      throw new Error(errorName.UNAUTHORIZED)
    }
    const id = args.id;
    await Users.delete(id);

    return { successful: true, message: "DELETE WORKED" };
  },
};

export const UPDATE_USER = {
  type: MessageType,
  args: {
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    company: {type: GraphQLInt}
  },
  async resolve(parent: any, args: any, context: any) {
    const token = context.headers.authorization;
    let role: string = ''
    if (token) {
      role = await tokenValidation(token, 'company')
    } else if (!token) {
      throw new Error(errorName.UNAUTHORIZED)
    }

    if (role != Role.USER) {
      throw new Error(errorName.UNAUTHORIZED)
    }

    await Users.save(args)
    return { successful: true, message: "DATA HAS BEEN UPDATED" };

  }
}