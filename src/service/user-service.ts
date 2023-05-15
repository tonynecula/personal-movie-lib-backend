import { CrudService } from "./crud-service";

import * as mongooseTypes from "mongoose";
import UserModel, { User } from "../models/user";

export class UserService extends CrudService<User> {
  constructor() {
    super(UserModel);
  }

  public getById(id: string | mongooseTypes.ObjectId): Promise<User | null> {
    return this.model
      .findOne({ _id: id as any })
      .select("+password")
      .exec();
  }

  public findOne(match: mongooseTypes.FilterQuery<User>): Promise<User | null> {
    return this.model.findOne({ ...match }).exec();
  }

  public updateOne(
    id: string | mongooseTypes.ObjectId,
    updates: Partial<User>
  ) {
    return this.model
      .findOneAndUpdate({ _id: id as any }, { ...updates }, { new: true })
      .select("+password")
      .exec();
  }
}
