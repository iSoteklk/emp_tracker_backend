import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return { valid: true, decoded };
  } catch (err: any) {
    return { valid: false, error: err.message };
  }
};

const getTokenFromRequest = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return {
      success: false,
      response: res.status(401).json({
        success: "false",
        message: "No token provided",
      }),
    };
  }

  const tokenResult = verifyToken(token);
  if (!tokenResult.valid) {
    return {
      success: false,
      response: res.status(401).json({
        success: "false",
        message: "Invalid token",
        error: tokenResult.error,
      }),
    };
  }

  return { success: true, decoded: tokenResult.decoded };
};

const checkIsAdmin = (req: Request, res: Response) => {
  const tokenResult = getTokenFromRequest(req, res);
  if (!tokenResult.success) {
    return tokenResult;
  }

  const userRole = (tokenResult.decoded as any).role;
  if (userRole !== "admin") {
    return {
      success: false,
      response: res.status(403).json({
        success: "false",
        message: "Forbidden: Only admins can access this resource",
      }),
    };
  }

  return { success: true, decoded: tokenResult.decoded };
};

export { verifyToken, checkIsAdmin, getTokenFromRequest };
