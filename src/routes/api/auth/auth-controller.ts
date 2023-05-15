/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from "express";
import UserModel, { User } from "../../../models/user";
import { errors } from "../../../util/constants";
import mongoose from "mongoose";
import { AuthService } from "../../../service/auth-service";
import { LoginUserDto } from "./dtos/login-user.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { EmailDto } from "./dtos/email-dto";
import { EmailService } from "../../../service/email-service";
import { ChangePasswordEmailDto } from "./dtos/reset-password.dto";

export class AuthController {
  private authService = new AuthService();
  private emailService = new EmailService();

  public login = async (
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<{}, {}, LoginUserDto>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    try {
      const user = await this.authService.login(email!, password!);
      req.session.userId = new mongoose.Types.ObjectId(user._id);
      return res.status(200).json({ user, authToken: req.session.userId });
    } catch (e) {
      return next(e);
    }
  };

  public register = async (
    req: Request<{}, {}, RegisterUserDto>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newUser: Partial<User> = req.body;

      const userExists = await this.authService.userExists(
        newUser.email!,
        newUser.username!
      );
      if (userExists.emailUsed) {
        return next(errors.emailInUse);
      }
      if (userExists.usernameUsed) {
        return next(errors.usernameInUse);
      }

      req.session.userId = new mongoose.Types.ObjectId(newUser._id);

      const user = await this.authService.register(newUser);
      await this.emailService.sendWelcomeNewUser(user.email);
      return res.status(200).json({ user, authToken: req.session.userId });
    } catch (e) {
      return next(e);
    }
  };
  public logout = async (
    req: Request<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      req.session.destroy((error) => {
        if (error) {
          next(errors.unknown);
        } else {
          res.status(200).send({ success: true });
        }
      });
    } catch (e) {
      return next(e);
    }
  };
  public forgotPassword = async (
    req: Request<{}, {}, EmailDto>,
    res: Response<{ emailSent: boolean; code: string }>,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;
      if (!email) {
        return next(errors.invalidParameter("email"));
      }
      const user = await this.authService.forgotPassword(email);
      if (user) {
        await this.emailService.sendForgotPasswordEmail(
          email,
          user.forgotPasswordCode!
        );
      }

      return res
        .status(200)
        .json({ emailSent: Boolean(user), code: user!.forgotPasswordCode! });
    } catch (e) {
      return next(e);
    }
  };
  public changePasswordByEmailToken = async (
    req: Request<{}, {}, ChangePasswordEmailDto>,
    res: Response<{}>,
    next: NextFunction
  ) => {
    try {
      const { newPassword, token } = req.body;
      const user = await this.authService.changePasswordByEmailToken(
        token!,
        newPassword!
      );

      return res.status(200).json({ user });
    } catch (e) {
      return next(e);
    }
  };
}

export default new AuthController();
