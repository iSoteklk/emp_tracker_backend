import { Router } from "express";
import {
  getWorkTimeConfigByNameController,
  getAllWorkTimeConfigsController,
  getActiveWorkTimeConfigController
} from "../controllers/workTimeController";

const router = Router();

/**
 * @swagger
 * /public/work-time/config:
 *   get:
 *     summary: Get all work time configurations
 *     description: Retrieve all work time configuration settings
 *     tags: [WorkTime]
 *     responses:
 *       200:
 *         description: Work time configurations retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/public/work-time/config", getAllWorkTimeConfigsController);

/**
 * @swagger
 * /public/work-time/config/active:
 *   get:
 *     summary: Get active work time configuration
 *     description: Retrieve the currently active work time configuration (public endpoint)
 *     tags: [WorkTime]
 *     responses:
 *       200:
 *         description: Active work time configuration retrieved successfully
 *       404:
 *         description: No active work time configuration found
 *       500:
 *         description: Server error
 */
router.get("/public/work-time/config/active", getActiveWorkTimeConfigController);

/**
 * @swagger
 * /public/work-time/config/{name}:
 *   get:
 *     summary: Get work time configuration by name
 *     description: Retrieve a specific work time configuration by its name
 *     tags: [WorkTime]
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
 *       404:
 *         description: Work time configuration not found
 *       500:
 *         description: Server error
 */
router.get("/public/work-time/config/:name", getWorkTimeConfigByNameController);

export default router;
