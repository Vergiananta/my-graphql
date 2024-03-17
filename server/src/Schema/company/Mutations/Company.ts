import { GraphQLID, GraphQLString } from "graphql";
import { CompanyType } from "../TypeDefs/Company";
import { Company } from "../../../Entities/Company";
import { MessageType } from "../../../utils/Messages";
import express from 'express';
import { tokenValidation } from "../../../middleware/auth";
import { errorName } from "../../../middleware/error_response";
import bcrypt from 'bcrypt'
import { Role } from "../../../utils/Role";
import jwt from 'jsonwebtoken'
import { LoginType } from "../../user/TypeDefs/User";

export const CREATE_COMPANY = {
    type: CompanyType,
    args: {
      name: { type: GraphQLString },
      password: { type: GraphQLString },
      yearOfCreation: { type: GraphQLString}
    },
    async resolve(parent: any, args: any, context: any) {
      const { name, password , yearOfCreation} = args;
      const userCheck = await Company.findOne({
        where: {
          name: name
        }
      })
  
      if (userCheck) {
        throw new Error('username already exists')
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await Company.insert({ name, password: hashedPassword, role: Role.COMPANY, yearOfCreation: yearOfCreation });
      return args;
    },
  };
  
  export const UPDATE_PASSWORD = {
    type: MessageType,
    args: {
        id: { type: GraphQLString },
      username: { type: GraphQLString },
      oldPassword: { type: GraphQLString },
      newPassword: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
      const { id, name, oldPassword, newPassword } = args;
      const user = await Company.findOne({ id: id });
  
      if (!user) {
        throw new Error("USERNAME DOESNT EXIST");
      }
      const userPassword = user?.password;
      const passNew = await bcrypt.hash(newPassword,10)

      if (oldPassword === userPassword) {
        await Company.update({ name: name }, { password: passNew });
  
        return { successful: true, message: "PASSWORD UPDATED" };
      } else {
        throw new Error("PASSWORDS DO NOT MATCH!");
      }
    },
  };
  
  export const DELETE_COMPANY = {
    type: MessageType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent: any, args: any, context: any) {
      const token = context.headers.authorization;
      let role: string = '';
      if (token) {
        role = await tokenValidation(token, 'company')
      } else if (!token) {
        throw new Error(errorName.UNAUTHORIZED)
      }

      if (role != Role.COMPANY) {
        throw new Error(errorName.UNAUTHORIZED)
      }

      const id = args.id;

      await Company.delete(id);
  
      return { successful: true, message: "DELETE WORKED" };
    },
  };

  export const LOGIN_COMPANY = {
    type: LoginType,
    args: {
      name: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
  
      const {name, password} = args;

      const user = await Company.findOne({ where: {name: name}    })
    
      if (!user) {
        throw new Error(errorName.NOTFOUND)
      }

      const validatePassword = await bcrypt.compare(password, user.password)
      if (!validatePassword) {
        throw new Error(errorName.UNAUTHORIZED)
      }

      const token = jwt.sign({id: user.id, name: user.name, role: user.role}, 'secret', { expiresIn: "2 days" })
      return {
        successful: true,
        accessToken: token
      }
    }
  }