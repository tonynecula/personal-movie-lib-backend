import { Exception } from "../models/exception";

export const options = (error: Exception) => {
  return {
    message: error.message,
    context: {
      code: error.code,
      status: error.status,
    },
  };
};
