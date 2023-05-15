import { NextFunction, Request, RequestHandler, Response } from "express";
import { validateOrReject } from "class-validator";
import { plainToClass } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/ban-types
export const validateBody = <T extends object>(
  classCreator: new () => T,
  forbidNonWhiteListed = true
): RequestHandler => {
  return async (
    request: Request<any, any, T, any>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const value = plainToClass(classCreator, request.body);
      await validateOrReject(value, {
        forbidUnknownValues: forbidNonWhiteListed,
        whitelist: forbidNonWhiteListed,
        forbidNonWhitelisted: forbidNonWhiteListed,
      });
      request.body = value;
    } catch (e) {
      return next(e);
    }
    return next();
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const validateParams = <T extends object>(
  classCreator: new () => T
): RequestHandler => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const value = plainToClass(classCreator, request.params);
      await validateOrReject(value, {
        forbidUnknownValues: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
    } catch (e) {
      return next(e);
    }
    return next();
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const validateQuery = <T extends object>(
  classCreator: new () => T
): RequestHandler => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const value = plainToClass(classCreator, request.query);
      await validateOrReject(value, {
        forbidUnknownValues: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      request.queryDto = value;
    } catch (e) {
      return next(e);
    }
    return next();
  };
};
