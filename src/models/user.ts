import mongoose from "mongoose";

export interface User {
  username: string;
  password: string;
  email: string;
  resetToken: string;
  tokenExpiresAt: Date;
  role: "ADMIN" | "USER";
  resetCode: string;
  firstName: string;
  lastName: string;
  googleId: string;
  avatar: string;
}

const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    resetToken: {
      type: String,
    },

    resetCode: {
      type: String,
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    avatar: {
      type: String,
    },

    tokenExpiresAt: Date,
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
