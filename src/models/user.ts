import mongoose, { Document, Schema } from "mongoose";
export interface User extends Document {
  _id: string;
  email: string;
  password: string;
  salt?: string;
  username: string;
  isAdmin: boolean;
  forgotPasswordCode?: string;
  deleteCode?: string;
  deleteExpires?: Date;
  emailConfirmation: {
    code?: string;
    confirmed: boolean;
  };
}
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    isAdmin: { type: Boolean, default: false },
    password: { type: String, select: false },
    salt: { type: String, select: false },
    forgotPasswordCode: { type: String, select: false },
    deleteCode: { type: String, select: false },
    deleteExpires: { type: Date, select: false },
    emailConfirmation: {
      confirmed: { type: Boolean, default: false },
      code: { type: String, select: false },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toObject", {
  virtuals: true,
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.password;
    delete ret.salt;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model<User>("user", userSchema);
