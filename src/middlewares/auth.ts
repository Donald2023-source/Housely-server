import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../config/constants.ts";
import UserModel from "../models/user.ts";

declare global {
  namespace Express {
    interface Request {
      user?: NonNullable<Awaited<ReturnType<typeof UserModel.findOne>>>;
    }
  }
}

export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;
  console.log("Auth middleware");

  if (req.cookies.auth) {
    token = req.cookies.auth;
  }

  console.log("Token", token);

  if (!token) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: "Unauthorized",
      status: 401,
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (typeof decoded === "string" || !("id" in decoded)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Unauthorized",
        status: 401,
      });
    }

    const user = await UserModel.findById(decoded.id);
    console.log("Decoed", decoded);

    if (!user)
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Unauthorized, user not found",
      });

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Token expired",
        status: 401,
      });
    }
  }
};
