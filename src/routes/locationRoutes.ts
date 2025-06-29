import express from "express";
const router = express.Router();
import * as locationControllers from "../controllers/locationControllers";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

/**
 * GET api/v1/locations/getall
 * Get all locations
 * @access Admin only
 */
router.get(
  "/locations/getall",
  adminMiddleware,
  locationControllers.getAllLocationsController
);

/**
 * POST api/v1/locations/create
 * Add a new location
 * @access Admin only
 * @body {string} name - Location name
 * @body {string} address - Location address
 * @body {string} contact - Contact number for the location
 */
router.post(
  "/locations/create",
  adminMiddleware,
  locationControllers.addLocationController
);

/**
 * PUT api/v1/locations/update/:address
 * Update a location by address
 * @access Admin only
 * @param {string} address - Address of the location to update
 * @body {string} name - Updated location name
 * @body {string} contact - Updated contact number for the location
 */
router.put(
  "/locations/update/:address",
  adminMiddleware,
  locationControllers.updateLocationController
);

export default router;
