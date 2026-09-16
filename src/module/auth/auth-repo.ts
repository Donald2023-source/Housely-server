import UserModel from "../../models/user.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config/constants.ts";
import type { Response } from "express";

const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const user = await UserModel.create(data);
  return user;
};

const findUserExisting = async (email: string) => {
  const user = await UserModel.findOne({ email });
  return user;
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (passwordInput: string, dbPassword: string) => {
  return bcrypt.compare(passwordInput, dbPassword);
};

const generateToken = (userId: string, res: Response) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: "1d",
  });
  res.cookie("auth", token, {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return token;
};

export { createUser, findUserExisting, hashPassword, generateToken, comparePassword };
