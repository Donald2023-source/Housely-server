import type { Response } from "express";
import {
  comparePassword,
  createUser,
  findUserExisting,
  generateToken,
  hashPassword,
} from "./auth-repo.ts";

const register = async (
  data: {
    username: string;
    email: string;
    password: string;
  },
  res: Response,
) => {
  const { username, email, password } = data;
  const hashedPassword = await hashPassword(password);
  const user = await createUser({
    username: username,
    email: email.toString(),
    password: hashedPassword,
  });
  const token = generateToken(user.id, res);

  return { user, token };
};
const login = async (
  data: {
    email: string;
    password: string;
  },
  res: Response,
) => {
  const { email, password } = data;

  const user = await findUserExisting(email);
  if (!user) {
    return res.status(400).json({
      message: "User not found.",
      success: false,
    });
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid)
    return res.status(400).json({
      message: "Email or passsword is wrong",
      success: false,
    });
  const token = generateToken(user.id, res);

  return { user, token };
};

export { register, login };
