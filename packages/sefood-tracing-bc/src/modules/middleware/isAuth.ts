import { MiddlewareFn } from "type-graphql";
import { MyContext } from "src/types/MyContext";

export const isAuth: MiddlewareFn<MyContext> = async ({ context: { req }, args }, next) => {
  if (!req.session!.userId) {
    throw new Error("not authenticated");
  }
  args.myName = "nothing to do knows";
  return next();
};
