import { Request, Response, NextFunction } from "express";
import * as workTimeServices from "../services/workTimeServices";

/**
 * Get a work time configuration by name
 * @param req The request object
 * @param res The response object
 * @param next The next function
 */
const getWorkTimeConfigByNameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;
    const workTimeConfig = await workTimeServices.getWorkTimeConfigByName(name);
    
    if (!workTimeConfig) {
      return res.status(404).json({
        success: false,
        message: `Work time configuration '${name}' not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      data: workTimeConfig
    });
  } catch (error) {
    console.error("Error in getWorkTimeConfigByNameController:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve work time configuration",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

/**
 * Get all work time configurations
 * @param req The request object
 * @param res The response object
 * @param next The next function
 */
const getAllWorkTimeConfigsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workTimeConfigs = await workTimeServices.getAllWorkTimeConfigs();
    
    return res.status(200).json({
      success: true,
      data: workTimeConfigs
    });
  } catch (error) {
    console.error("Error in getAllWorkTimeConfigsController:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve work time configurations",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

/**
 * Add a new work time configuration
 * @param req The request object
 * @param res The response object
 * @param next The next function
 */
const addWorkTimeConfigController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workTimeData = req.body;
    
    // Name is required for adding a new config
    if (!workTimeData.name) {
      return res.status(400).json({
        success: false,
        message: "Name is required for work time configuration"
      });
    }
    
    const newWorkTimeConfig = await workTimeServices.addWorkTimeConfig(workTimeData);
    
    return res.status(201).json({
      success: true,
      message: "Work time configuration created successfully",
      data: newWorkTimeConfig
    });
  } catch (error) {
    console.error("Error in addWorkTimeConfigController:", error);
    return res.status(400).json({
      success: false,
      message: "Failed to create work time configuration",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

/**
 * Update an existing work time configuration
 * @param req The request object
 * @param res The response object
 * @param next The next function
 */
const updateWorkTimeConfigController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;
    const workTimeData = req.body;
    
    const updatedWorkTimeConfig = await workTimeServices.updateWorkTimeConfig(
      name,
      workTimeData
    );
    
    if (!updatedWorkTimeConfig) {
      return res.status(404).json({
        success: false,
        message: `Work time configuration '${name}' not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Work time configuration updated successfully",
      data: updatedWorkTimeConfig
    });
  } catch (error) {
    console.error("Error in updateWorkTimeConfigController:", error);
    return res.status(400).json({
      success: false,
      message: "Failed to update work time configuration",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export {
  getWorkTimeConfigByNameController,
  getAllWorkTimeConfigsController,
  addWorkTimeConfigController,
  updateWorkTimeConfigController
};
