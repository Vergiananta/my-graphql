import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection } from "typeorm";
import { Users } from "./Entities/Users";
import { schemaUser } from "./Schema/user";
import { schemaCompany } from "./Schema/company";
import { Company } from "./Entities/Company";
import {errorType} from './middleware/error_response'

const getErrorType = (errorName: string) => {
  return errorType[errorName]
}

const main = async () => {
  console.log("Starting")
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    database: "companies",
    username: "postgres",
    password: "shaolinsocer",
    logging: true,
    synchronize: true,
    entities: [Users, Company],
  });

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/talent",
    graphqlHTTP({
      schema: schemaUser,
      graphiql: true,
      formatError: (err: any) => {
        const error = getErrorType(err.name)
        return {
          message: err.message,
          statusCode: error ? error.statusCode : 500
        }
      }
    })
  );

  app.use(
    "/company",
    graphqlHTTP({
      schema: schemaCompany,
      graphiql: true,
      formatError: (err: any) => {
        const error = getErrorType(err.name)
        return {
          message: err.message,
          statusCode: errorType ? errorType.statusCode : 500
        }
      }
    })
  )

  app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
  });
};

main().catch((err) => {
  console.log(err);
});
