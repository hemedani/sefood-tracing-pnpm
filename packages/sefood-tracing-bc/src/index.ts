import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { RegisterResolver } from "./modules/user/Register";
import { redis } from "./redis";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";
import { customAuthChecker } from "./modules/user/auth/CustomAuthChecker";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver],
    authChecker: customAuthChecker
  });

  const apolloServer = new ApolloServer({ schema, context: ({ req }) => ({ req }) });

  const app = Express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );

  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "dkjgdk",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365
      }
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log("app is listen on http://localhost:4000/graphql"));
};

main();
