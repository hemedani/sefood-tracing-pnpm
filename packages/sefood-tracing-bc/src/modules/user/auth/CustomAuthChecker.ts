import { AuthChecker } from "type-graphql";
import { User } from "../../../entity/User";
import { Request } from "express";

export interface ContextType {
  user?: User;
  req: Request;
}

export const customAuthChecker: AuthChecker<ContextType> = ({ context: { req } }) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  if (req.session!.userId) {
    return true;
  }
  return false; // or false if access is denied
};
