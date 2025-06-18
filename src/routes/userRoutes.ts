import express from "express";
const router = express.Router();
import * as userController from "../controllers/userControllers";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

/**
 * GET api/v1/users/getall
 * Get all users
 */
router.get(
  "/users/getall",
  adminMiddleware,
  userController.getAllUsersController
);

/**
 * POST api/v1/users/create
 * Add a new user
 * @body {string} email - User's email address
 * @body {string} fname - User's first name
 * @body {string} lname - User's last name
 * @body {string} contact - User's contact number
 * @body {string} role - User's role (e.g., admin, employee)
 * @body {string} password - User's password
 */
router.post(
  "/users/create",
  adminMiddleware,
  userController.createUsersController
);

/**
 * POST api/v1/users/login
 * Login user
 */
router.post("/users/login", userController.loginUserController);

/**
 * GET api/v1/users/profile
 * Get user profile
 */
router.get(
  "/users/profile",
  authMiddleware,
  userController.getProfileController
);

/**
 * GET api/v1/users/getUserByEmail
 * Get user Email (Admin only)
 */
router.get(
  "/users/getUserByEmail",
  adminMiddleware,
  userController.getUserByEmailController
);

export default router;
