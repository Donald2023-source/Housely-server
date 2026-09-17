import type { Request, Response } from "express";
import {
  loginSchema,
  registerSchema,
  type RegisterSchema,
} from "./auth.schema.ts";
import { login, register } from "./auth.service.ts";
import { StatusCodes } from "http-status-codes";
import { findUserExisting, hashPassword } from "./auth-repo.ts";
import crypto from "crypto";
import sendMail from "../services/SendMail.ts";
import fs from "fs";
import path from "path";
import UserModel from "../../models/user.ts";
import config from "../../../config/constants.ts";

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: result.error.issues,
      });
    }

    const { username, email, password } = result.data;

    const existingUser = await findUserExisting(email);
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        data: {
          message: "User already exists",
        },
      });
    }
    const { user, token } = await register({ username, email, password }, res);
    return res.status(StatusCodes.CREATED).json({
      message: "user created successfully",
      success: true,
      data: {
        name: user.username,
        email: user.email,
        token: token,
      },
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err,
      success: false,
    });
  }
};
const loginUser = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.issues,
    });
  }

  const { email, password } = result.data;
  const loginResult = await login({ email, password }, res);
  if (!("token" in loginResult)) {
    return loginResult;
  }

  const { user, token } = loginResult;
  return res.status(StatusCodes.OK).json({
    message: "user logged in successfully",
    success: true,
    data: {
      name: user.username,
      email: user.email,
      token: token,
    },
  });
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email  required",
        success: false,
      });
    }
    const user = await findUserExisting(email);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
        success: false,
      });
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = token;
    user.tokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "resetEmail.html",
    );
    await user.save();
    let htmlContent = await fs.promises.readFile(templatePath, "utf-8");
    htmlContent = htmlContent.replace(/\[Token\]/g, token);

    console.log("Mail sending...");
    let emailPayload = {
      to: email,
      subject: "Reset From Housely",
      html: htmlContent,
    };
    await sendMail(emailPayload);

    res.status(StatusCodes.OK).json({
      message: `Reset token sent to ${email}`,
      success: true,
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: err,
      success: false,
    });
  }
};

const validateToken = async (req: Request, res: Response) => {
  const { token, email } = req.body;
  console.log(req.body);

  if (!token) return;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Invalid token",
      success: false,
    });
  }

  if (
    user.tokenExpiresAt &&
    user.tokenExpiresAt.getTime() < Date.now() &&
    user?.resetCode === token
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Token has expired",
      success: false,
    });
  }
  const resetToken = crypto.randomBytes(24).toString("hex");

  user.resetToken = resetToken;
  user.resetCode = null;
  user.tokenExpiresAt = null;

  await user.save();

  res.cookie("resetToken", resetToken, {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return res.status(StatusCodes.OK).json({
    message: "Token is valid",
    success: true,
  });
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const { resetToken } = req.cookies;

    console.log(resetToken);

    if (!resetToken || !password) {
      return res.status(400).json({
        message: "Password and reset token are required",
        success: false,
      });
    }

    const user = await UserModel.findOne({ resetToken });

    if (!user) {
      return res.status(400).json({
        message: "Invalid reset token",
        success: false,
      });
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetToken = null;

    await user.save();

    return res.status(200).json({
      message: "Password Reset successful!",
      success: true,
      user: {
        email: user.email,
        name: user.username,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

export {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  validateToken,
  resetPassword,
};
