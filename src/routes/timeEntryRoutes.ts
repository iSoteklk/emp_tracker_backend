import { Router } from "express";
import {
  clockInController,
  clockOutController,
  getAllTimeEntriesController,
  getUserTimeEntriesController,
  getTimeEntriesByDateController,
  getTimeEntriesByUserAndDateController,
  getTimeEntryByIdController,
  getTimeEntriesByUserAndDateAdminController,
  getUserTimeEntriesAdminController,
} from "../controllers/timeEntryController";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Apply authentication middleware to all time entry routes
router.use(authMiddleware);

/**
 * POST api/v1/shift/clock-in
 * Record a new clock-in event for the authenticated user
 * @body {Date} date - The date of the time entry
 * @body {Date} clockInTime - The time user clocked in
 * @body {Object} clockInLocation - Location data including latitude, longitude, and optional address
 * @body {string} notes - Optional notes for the time entry
 */
router.post("/shift/clock-in", clockInController);

/**
 * POST api/v1/shift/clock-out
 * Record a clock-out event for the authenticated user's active time entry
 * @body {Date} date - The date of the time entry to update
 * @body {Date} clockOutTime - The time user clocked out
 * @body {Object} clockOutLocation - Location data including latitude, longitude, and optional address
 * @body {number} totalHours - Total hours worked (can be calculated on client)
 * @body {string} notes - Optional notes for the time entry
 */
router.post("/shift/clock-out", clockOutController);

/**
 * GET api/v1/shift/me
 * Get all time entries for the authenticated user
 * @returns {Array} List of time entries for the user
 */
router.get("/shift/me/:range", getUserTimeEntriesController);

/**
 * GET api/v1/shift/byUser
 * Get all time entries for a specific user
 * @body {string} email - Email of the user
 * @returns {Array} List of time entries for the user
 */
router.get("/shift/byUser", adminMiddleware, getUserTimeEntriesAdminController);

/**
 * GET api/v1/shift/me/date/:date
 * Get time entries for the authenticated user filtered by specific date
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Array} List of time entries for the user on the specified date
 */
router.get(
  "/shift/me/date/:date",
  authMiddleware,
  getTimeEntriesByUserAndDateController
);

/**
 * GET api/v1/shift/byDateAndUser
 * Get time entries for a user filtered by specific date
 * @body {Date} date - Date in YYYY-MM-DD format
 * @body {string} email - Email of the user
 * @returns {Array} List of time entries for the user on the specified date
 */
router.get(
  "/shift/byDateAndUser",
  adminMiddleware,
  getTimeEntriesByUserAndDateAdminController
);

/**
 * GET api/v1/shift
 * Get all time entries (admin only)
 * @returns {Array} List of all time entries in the system
 */
router.get("/shift/all", adminMiddleware, getAllTimeEntriesController);

/**
 * GET api/v1/shift/date/:date
 * Get all time entries for a specific date (admin only)
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Array} List of all time entries on the specified date
 */
router.get(
  "/shift/date/:date",
  adminMiddleware,
  getTimeEntriesByDateController
);

/**
 * GET api/v1/shift/:id
 * Get a specific time entry by ID (admin only)
 * @param {string} id - MongoDB ID of the time entry
 * @returns {Object} Time entry data
 */
router.get("/shift/:id", adminMiddleware, getTimeEntryByIdController);

export default router;
