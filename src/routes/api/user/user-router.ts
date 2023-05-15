import { Router } from "express";
import { authenticated } from "../../../middleware/auth";
import userController from "./user-controller";

const userRouter = Router();
userRouter.get("/me", authenticated, userController.getCurrentUser);
userRouter.delete("/:id", authenticated, userController.deleteUser);
userRouter.put("/:id", authenticated, userController.editUser);

export default userRouter;
