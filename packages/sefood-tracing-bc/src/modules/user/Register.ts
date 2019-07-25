import bcrypt from "bcryptjs";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";
import { RegisterInput } from "./register/RegisterInput";
import { logger } from "../middleware/logger";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => String)
  async hello() {
    return await "Hello world!";
  }

  @Mutation(() => User)
  async register(@Arg("data") { firstName, lastName, email, password }: RegisterInput): Promise<User> {
    const hashedPwd = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPwd
    }).save();
    return user;
  }
}
