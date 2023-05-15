/* eslint-disable no-prototype-builtins */
import { ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { Exception } from "../models/exception";
import { errors } from "../util/constants";

interface GenericError {
  status: number;
  code: string;
  message: string;
}

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  console.log(err.stack);

  let error: GenericError = {
    code: "Unknown",
    status: 400,
    message:
      "An unknown error occurred processing your request. Please try again later.",
  };

  if (err instanceof mongoose.Error.ValidationError) {
    error.code = err.name;
    error.status = 422;
    const key = Object.keys(err.errors)[0];
    error.message = err.errors[key].message;
  } else if (err instanceof mongoose.mongo.MongoError && err.code === 11000) {
    // Duplicate index
    error.code = err.name;
    // Bulk write error has a different structure than the normal MongoError
    if (err.name === "BulkWriteError") {
      error.message = `Duplicate ${err.message.split(":")[2].split(" ")[1]}`;
    } else {
      // @ts-ignore
      const duplicatedField = Object.keys(err.keyValue);
      error.message = `Duplicate ${duplicatedField.reverse().join(", ")}.`;
    }
  } else if (err instanceof Exception) {
    error = { code: err.code, status: err.status, message: err.message };
  } else if (err instanceof Array && err[0] instanceof ValidationError) {
    // Validation Error
    const validationError = err[0];
    let code;
    let message;
    let status;

    if (
      validationError.constraints &&
      validationError.constraints?.hasOwnProperty("isDef") &&
      (!validationError.contexts || !validationError.contexts.isDef)
    ) {
      const param = validationError.property;
      code = errors.invalidParameter(param).code;
      message = errors.invalidParameter(param).message;
      status = errors.invalidParameter(param).status;
    } else {
      for (const constraintType in validationError.constraints) {
        if (
          Object.prototype.hasOwnProperty.call(
            validationError.constraints,
            constraintType
          )
        ) {
          message = validationError.constraints?.[constraintType] || "";
          if (validationError.contexts) {
            code = validationError.contexts[constraintType]?.code;
            status = validationError.contexts[constraintType]?.status;
          }
        }
      }
    }

    if (!code) {
      code = "UnprocessableEntity";
    }

    if (!message) {
      message = JSON.stringify(validationError);
    }

    if (!status) {
      status = 422;
    }

    error = { code, status, message };
  } else if (err instanceof Error) {
    const code = (err as any).code;
    error = {
      code: String(code) || err.name,
      status: 400,
      message: err.message,
    };
  }
  return res.status(error.status).json(error);
};
