import { RequestHandler } from "express";
import { NextFunction, Request, Response } from "express";
import { errors } from "../util/constants";
import { AuthService } from "../service/auth-service";
export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.userId) {
    try {
      req.user = await authUser(req.session.userId.toString());
      return next();
    } catch (e) {
      return next(e);
    }
  } else {
    return next(errors.unauthorized);
  }
};
export const authenticatedAdmin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.userId) {
    try {
      const user = await authUser(req.session.userId.toString());

      if (!user.isAdmin) {
        return next(errors.unauthorized);
      }

      req.user = user;
      return next();
    } catch (e) {
      return next(e);
    }
  } else {
    return next(errors.unauthorized);
  }
};
const authUser = async (token: string) => {
  const user = await AuthService.findById(token);
  if (!user) {
    throw errors.unauthorized;
  }

  return user;
};
