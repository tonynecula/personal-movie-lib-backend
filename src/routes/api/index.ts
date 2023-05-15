import { Router } from "express";
import authRouter from "./auth/auth-router";
import userRouter from "./user/user-router";
import movieRouter from "./movies/movie-router";
import reportRoter from "./report/report-router";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/users", userRouter);
v1Router.use("/movies", movieRouter);
v1Router.use("/report", reportRoter);

export default v1Router;
