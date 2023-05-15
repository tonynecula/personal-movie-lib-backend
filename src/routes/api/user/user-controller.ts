import { NextFunction, Request, Response } from "express";
import { CrudController } from "../../../crud-controller";
import { User } from "../../../models/user";
import { UserService } from "../../../service/user-service";
import { errors } from "../../../util/constants";

interface UserResponse {
  user: User;
}

export class UserController extends CrudController<UserService, User> {
  constructor() {
    super(new UserService());
  }
  public getCurrentUser = async (
    req: Request,
    res: Response<UserResponse>,
    next: NextFunction
  ) => {
    try {
      const user = await this.service.getById(req.user!.id);
      if (!user) return next(errors.notFound("user"));

      return res.status(200).json({ user });
    } catch (e) {
      return next(e);
    }
  };
  public deleteUser = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data = await this.service.removeOne(id);
      if (!data) return next(errors.notFound("user"));

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (e) {
      return next(e);
    }
  };

  public editUser = async (
    req: Request<{ id: string }, {}, Partial<User>>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;

      if (updatedData.username) {
        // Check if the new username already exists in the database
        const existingUser = await this.service.findOne({
          username: updatedData.username,
        });

        if (existingUser && existingUser._id.toString() !== id) {
          // If a user with the new username exists and it's not the current user
          // then return an error
          return res.status(400).json({ message: "Username already taken" });
        }
      }

      const data = await this.service.updateOne(id, updatedData);

      if (!data) return next(errors.notFound("user"));

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  };
}
export default new UserController();
