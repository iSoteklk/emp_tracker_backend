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

/**
 * Checks if the request has a valid token and if the user is an admin
 * @param req Express request object
 * @param res Express response object
 * @returns Object containing success status, user data (if successful), or error response (if failed)
 */
const checkIsAdmin = (req: Request, res: Response) => {
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

  const { valid, decoded, error } = verifyToken(token);
  if (!valid) {
    return {
      success: false,
      response: res.status(401).json({
        success: "false",
        message: "Invalid token",
        error,
      }),
    };
  }

  const userRole = (decoded as any).role;
  if (userRole !== "admin") {
    return {
      success: false,
      response: res.status(403).json({
        success: "false",
        message: "Forbidden: Only admins can access this resource",
      }),
    };
  }

  return { success: true, decoded };
};

export { verifyToken, checkIsAdmin };
