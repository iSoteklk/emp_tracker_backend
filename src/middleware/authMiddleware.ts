import { Request, Response, NextFunction } from "express";
import {
  verifyToken,
  checkIsAdmin,
  getTokenFromRequest,
} from "../utils/authUtils";
import { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenResult = getTokenFromRequest(req, res);
  if (!tokenResult.success) {
    return tokenResult.response;
  }

  next();
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = checkIsAdmin(req, res);
  if (!result.success) {
    return result.response;
  }

  next();
};
