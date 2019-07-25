import { MiddlewareFn } from "type-graphql";
import { MyContext } from "src/types/MyContext";

export const logger: MiddlewareFn<MyContext> = async ({ args }, next) => {
  console.log("==================");
  console.log("log from logger after auth", args);
  console.log("==================");

  return next();
};
