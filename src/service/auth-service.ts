import UserModel, { User } from "../models/user";
import crypto from "crypto";
import constants, { errors } from "../util/constants";
import { ObjectId } from "mongoose";

export class AuthService {
  public async userExists(
    email: string,
    username: string
  ): Promise<{ emailUsed: boolean; usernameUsed: boolean }> {
    const user = await UserModel.findOne({ email }).select("+password");
    const usernameUser = await UserModel.findOne({ username }).select(
      "+password"
    );
    return {
      emailUsed: user !== null,
      usernameUsed: usernameUser !== null,
    };
  }

  public static async findById(userId: string): Promise<User | null> {
    return UserModel.findOne({ _id: userId }).select("+password");
  }
  public async register(newUser: Partial<User>): Promise<User> {
    if (!newUser.password) {
      const forgotPasswordCode = crypto.randomBytes(16).toString("hex");
      newUser.forgotPasswordCode = forgotPasswordCode;
    } else {
      const saltRounds: number = constants.crypto.saltRounds;
      newUser.salt = crypto.randomBytes(saltRounds).toString("hex");
      newUser.password = crypto
        .pbkdf2Sync(newUser.password, newUser.salt, 10000, 512, "sha512")
        .toString("hex");
    }

    return UserModel.create<Partial<User>>(newUser);
  }
  public async login(email: string, password: string): Promise<User> {
    const user = await UserModel.findOne({
      email,
      password: { $exists: true },
    }).select("+password +salt");
    if (!user) {
      throw errors.incorrectEmailOrPassword;
    }

    const passwordHash = crypto
      .pbkdf2Sync(password, user.salt!, 10000, 512, "sha512")
      .toString("hex");
    if (passwordHash !== user.password) throw errors.incorrectPassword;

    return user;
  }
  public async confirmEmail(code: string): Promise<User | null> {
    const user = await UserModel.findOneAndUpdate(
      { "emailConfirmation.code": code },
      {
        $set: {
          "emailConfirmation.confirmed": true,
        },
        $unset: {
          "emailConfirmation.code": 1,
        },
      },
      { new: true }
    );

    if (!user) throw errors.invalidEmailCode;
    return user;
  }
  public async forgotPassword(email: string): Promise<User | null> {
    const token = crypto.randomBytes(16).toString("hex");

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw errors.incorrectEmailOrPassword;
    }

    return UserModel.findOneAndUpdate(
      { email },
      {
        forgotPasswordCode: token,
      },
      { new: true }
    )
      .select("+forgotPasswordCode")
      .exec();
  }

  public async verifyPassword(
    userId: string | ObjectId,
    password: string
  ): Promise<boolean> {
    const user = await UserModel.findOne({ _id: userId }).select(
      "+salt +password"
    );
    if (!user) throw errors.unauthorized;

    const passwordHash = crypto
      .pbkdf2Sync(password, user.salt!, 10000, 512, "sha512")
      .toString("hex");
    return passwordHash === user.password;
  }

  public async changePasswordByEmailToken(
    token: string,
    newPassword: string
  ): Promise<User> {
    const saltRounds: number = constants.crypto.saltRounds;
    const salt = crypto.randomBytes(saltRounds).toString("hex");
    const password = crypto
      .pbkdf2Sync(newPassword, salt, 10000, 512, "sha512")
      .toString("hex");

    const user = await UserModel.findOneAndUpdate(
      { forgotPasswordCode: token },
      {
        $set: {
          salt,
          password,
        },
        $unset: {
          forgotPasswordCode: 1,
        },
      },
      { new: true }
    ).select("+password");
    if (!user) throw errors.unauthorized;

    return user;
  }
}
