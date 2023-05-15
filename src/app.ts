import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";

import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { authenticated } from "./middleware/auth";
import headers from "./middleware/headers";
import authRouter from "./routes/api/auth/auth-router";
import v1Router from "./routes/api";
import error from "./middleware/error";

const app = express();
// app.listen(process.env.port, () => {
//   console.log(`Server running on port ${process.env.port}`);
// });
app.use(morgan("dev"));

app.use(headers);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "qJ11Ao12ndasn1nSA321",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_STRING,
    }),
  })
);

app.use("/api/v1", v1Router);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use(error);

export default app;
