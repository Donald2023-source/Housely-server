import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const health = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: "Bazar server is running",
    status: StatusCodes.OK,
  });
};

export default health;
