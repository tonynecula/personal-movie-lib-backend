import { Router } from "express";
import authController, * as UserController from "./auth-controller";
import { LoginUserDto } from "./dtos/login-user.dto";
import { validateBody } from "../../../middleware/validation";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { authenticated } from "../../../middleware/auth";
import { EmailDto } from "./dtos/email-dto";
import { ChangePasswordEmailDto } from "./dtos/reset-password.dto";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(RegisterUserDto),
  authController.register
);

authRouter.post("/login", validateBody(LoginUserDto), authController.login);

authRouter.post("/logout", authenticated, authController.logout);
authRouter.put(
  "/forgot-password",
  validateBody(EmailDto),
  authController.forgotPassword
);

authRouter.put(
  "/reset-password",
  validateBody(ChangePasswordEmailDto),
  authController.changePasswordByEmailToken
);
export default authRouter;
