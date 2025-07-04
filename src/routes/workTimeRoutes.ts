import { Router } from "express";
import {
  getWorkTimeConfigByNameController,
  getAllWorkTimeConfigsController,
  addWorkTimeConfigController,
  updateWorkTimeConfigController,
  setActiveWorkTimeConfigController,
  getActiveWorkTimeConfigController
} from "../controllers/workTimeController";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Apply authentication middleware to all work time routes
// router.use(adminMiddleware);

/**
 * @swagger
 * /work-time/config:
 *   get:
 *     summary: Get all work time configurations
 *     description: Retrieve all work time configuration settings
 *     tags: [WorkTime]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Work time configurations retrieved successfully
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Server error
 */
router.get("/work-time/config", getAllWorkTimeConfigsController);

/**
 * @swagger
 * /work-time/config/{name}:
 *   get:
 *     summary: Get work time configuration by name
 *     description: Retrieve a specific work time configuration by its name
 *     tags: [WorkTime]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the work time configuration
 *     responses:
 *       200:
 *         description: Work time configuration retrieved successfully
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: Work time configuration not found
 *       500:
 *         description: Server error
 */
router.get("/work-time/config/:name", getWorkTimeConfigByNameController);

/**
 * @swagger
 * /work-time/config:
 *   post:
 *     summary: Add new work time configuration
 *     description: Create a new work time configuration (Admin only)
 *     tags: [WorkTime]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Night Shift"
 *                 description: Unique name for the configuration
 *               standardStartTime:
 *                 type: string
 *                 example: "22:00"
 *               standardEndTime:
 *                 type: string
 *                 example: "06:00"
 *               fullWorkingHours:
 *                 type: number
 *                 example: 8
 *               lunchBreakDuration:
 *                 type: number
 *                 example: 30
 *               shortBreakDuration:
 *                 type: number
 *                 example: 15
 *               lateThresholdMinutes:
 *                 type: number
 *                 example: 5
 *               overtimeAfterHours:
 *                 type: number
 *                 example: 8
 *               weekendDays:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [0, 6]
 *               use24HourFormat:
 *                 type: boolean
 *                 example: true
 *               showSeconds:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Work time configuration created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Admin authentication required
 *       500:
 *         description: Server error
 */
router.post("/work-time/config", adminMiddleware, addWorkTimeConfigController);

/**
 * @swagger
 * /work-time/config/{name}:
 *   put:
 *     summary: Update work time configuration
 *     description: Update an existing work time configuration by its name (Admin only)
 *     tags: [WorkTime]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the work time configuration to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Shift"
 *                 description: New name for the configuration (must be unique)
 *               standardStartTime:
 *                 type: string
 *                 example: "09:00"
 *               standardEndTime:
 *                 type: string
 *                 example: "17:00"
 *               fullWorkingHours:
 *                 type: number
 *                 example: 7.5
 *               lunchBreakDuration:
 *                 type: number
 *                 example: 45
 *               shortBreakDuration:
 *                 type: number
 *                 example: 10
 *               lateThresholdMinutes:
 *                 type: number
 *                 example: 10
 *               overtimeAfterHours:
 *                 type: number
 *                 example: 7.5
 *               weekendDays:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [5, 6]
 *               use24HourFormat:
 *                 type: boolean
 *                 example: false
 *               showSeconds:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Work time configuration updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Admin authentication required
 *       404:
 *         description: Work time configuration not found
 *       500:
 *         description: Server error
 */
router.put("/work-time/config/:name", adminMiddleware, updateWorkTimeConfigController);

/**
 * @swagger
 * /work-time/config/active/{name}:
 *   put:
 *     summary: Set active work time configuration
 *     description: Set a specific work time configuration as active (Admin only)
 *     tags: [WorkTime]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the work time configuration to set as active
 *     responses:
 *       200:
 *         description: Work time configuration set as active successfully
 *       401:
 *         description: Unauthorized - Admin authentication required
 *       404:
 *         description: Work time configuration not found
 *       500:
 *         description: Server error
 */
router.put("/work-time/config/active/:name", adminMiddleware, setActiveWorkTimeConfigController);

/**
 * @swagger
 * /work-time/config/active:
 *   get:
 *     summary: Get active work time configuration
 *     description: Retrieve the currently active work time configuration
 *     tags: [WorkTime]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active work time configuration retrieved successfully
 *       404:
 *         description: No active work time configuration found
 *       500:
 *         description: Server error
 */
router.get("/work-time/config/active", getActiveWorkTimeConfigController);





export default router;
