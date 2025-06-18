import { Request, Response, NextFunction } from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
  userProfiles,
} from "../services/userServices";

import {
  verifyToken,
  checkIsAdmin,
  getTokenFromRequest,
} from "../utils/authUtils";

const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let users;
  try {
    users = await getAllUsers();

    if (!users) {
      return res
        .status(500)
        .json({ success: "false", data: [], message: "No users found" });
    }
    res.status(200).json({ success: "true", data: users.data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: "false",
      message: "Failed to retrieve users",
      data: [],
    });
  }
};

const createUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body;
  let user;

  try {
    user = await createUser(userData);
    if (user && user.success === "false") {
      return res
        .status(500)
        .json({ success: "false", data: [], message: user.message });
    }
    res.status(201).json({ success: "true", data: user?.data });
  } catch (err) {
    console.error(err);
  }
};

const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await loginUser(email, password);

    if (user && user.success === "false") {
      return res
        .status(500)
        .json({ success: "false", data: [], message: user.message });
    }
    res
      .status(200)
      .json({ success: "true", token: user?.token, contact: user?.contact });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: "false",
      message: "Failed to login",
      data: [],
    });
  }
};
const getProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenResult = getTokenFromRequest(req, res);
  if (!tokenResult.success) {
    return tokenResult.response;
  }

  const email = (tokenResult.decoded as any).email;
  try {
    const userProfile = await userProfiles(email);
    if (userProfile.success === "false") {
      return res.status(500).json({
        success: "false",
        message: userProfile.message,
      });
    }
    return res.status(200).json({
      success: "true",
      data: userProfile.data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: "false",
      message: "Failed to retrieve profile",
      data: [],
    });
  }
};

const getUserByEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.query.email as string;
  try {
    const userProfile = await userProfiles(email);
    if (userProfile.success === "false") {
      return res.status(500).json({
        success: "false",
        message: userProfile.message,
      });
    }
    return res.status(200).json({
      success: "true",
      data: userProfile.data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: "false",
      message: "Failed to retrieve profile",
      data: [],
    });
  }
};

export {
  createUsersController,
  getAllUsersController,
  loginUserController,
  getProfileController,
  getUserByEmailController,
};
