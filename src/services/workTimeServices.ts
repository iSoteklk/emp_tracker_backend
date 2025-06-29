import { IWorkTime } from "../models/workTimeModel";
import * as workTimeRepository from "../repositories/workTimeRepository";

/**
 * Get a work time configuration by name
 * @param name The name of the work time configuration 
 * @returns The work time configuration
 */
const getWorkTimeConfigByName = async (name: string): Promise<IWorkTime | null> => {
  try {
    return await workTimeRepository.getWorkTimeConfigByName(name);
  } catch (error) {
    console.error("Error in work time service - getWorkTimeConfigByName:", error);
    throw error;
  }
};

/**
 * Get all work time configurations
 * @returns Array of work time configurations
 */
const getAllWorkTimeConfigs = async (): Promise<IWorkTime[]> => {
  try {
    return await workTimeRepository.getAllWorkTimeConfigs();
  } catch (error) {
    console.error("Error in work time service - getAllWorkTimeConfigs:", error);
    throw error;
  }
};

/**
 * Add a new work time configuration
 * @param workTimeData The work time configuration data
 * @returns The created work time configuration
 */
const addWorkTimeConfig = async (workTimeData: Partial<IWorkTime>): Promise<IWorkTime> => {
  try {
    // Check if a configuration with this name already exists
    const existingConfig = await workTimeRepository.getWorkTimeConfigByName(workTimeData.name as string);
    if (existingConfig) {
      throw new Error(`Work time configuration with name '${workTimeData.name}' already exists`);
    }
    
    // Validate the work time data
    validateWorkTimeData(workTimeData);
    
    return await workTimeRepository.addWorkTimeConfig(workTimeData);
  } catch (error) {
    console.error("Error in work time service - addWorkTimeConfig:", error);
    throw error;
  }
};

/**
 * Update an existing work time configuration
 * @param name The name of the work time configuration to update
 * @param workTimeData The updated work time data
 * @returns The updated work time configuration
 */
const updateWorkTimeConfig = async (
  name: string,
  workTimeData: Partial<IWorkTime>
): Promise<IWorkTime | null> => {
  try {
    // Check if a configuration with this name exists
    const existingConfig = await workTimeRepository.getWorkTimeConfigByName(name);
    if (!existingConfig) {
      throw new Error(`Work time configuration with name '${name}' not found`);
    }
    
    // If the name is being updated, check if the new name already exists
    if (workTimeData.name && workTimeData.name !== name) {
      const configWithNewName = await workTimeRepository.getWorkTimeConfigByName(workTimeData.name);
      if (configWithNewName) {
        throw new Error(`Work time configuration with name '${workTimeData.name}' already exists`);
      }
    }
    
    // Validate the work time data
    validateWorkTimeData(workTimeData);
    
    return await workTimeRepository.updateWorkTimeConfig(name, workTimeData);
  } catch (error) {
    console.error("Error in work time service - updateWorkTimeConfig:", error);
    throw error;
  }
};

/**
 * Validate the work time data
 * @param workTimeData The work time data to validate
 */
const validateWorkTimeData = (workTimeData: Partial<IWorkTime>): void => {
  // Validate the name if provided
  if (workTimeData.name !== undefined && workTimeData.name.trim() === '') {
    throw new Error("Name cannot be empty");
  }
  
  // Validate time format (HH:MM)
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  
  if (workTimeData.standardStartTime && !timeRegex.test(workTimeData.standardStartTime)) {
    throw new Error("Invalid standardStartTime format. Use HH:MM format.");
  }
  
  if (workTimeData.standardEndTime && !timeRegex.test(workTimeData.standardEndTime)) {
    throw new Error("Invalid standardEndTime format. Use HH:MM format.");
  }
  
  // Validate numeric values are positive
  if (workTimeData.fullWorkingHours !== undefined && workTimeData.fullWorkingHours < 0) {
    throw new Error("fullWorkingHours must be a positive number");
  }
  
  if (workTimeData.lunchBreakDuration !== undefined && workTimeData.lunchBreakDuration < 0) {
    throw new Error("lunchBreakDuration must be a positive number");
  }
  
  if (workTimeData.shortBreakDuration !== undefined && workTimeData.shortBreakDuration < 0) {
    throw new Error("shortBreakDuration must be a positive number");
  }
  
  if (workTimeData.lateThresholdMinutes !== undefined && workTimeData.lateThresholdMinutes < 0) {
    throw new Error("lateThresholdMinutes must be a positive number");
  }
  
  if (workTimeData.overtimeAfterHours !== undefined && workTimeData.overtimeAfterHours < 0) {
    throw new Error("overtimeAfterHours must be a positive number");
  }
  
  // Validate weekend days (0-6 where 0 is Sunday)
  if (workTimeData.weekendDays && workTimeData.weekendDays.length > 0) {
    for (const day of workTimeData.weekendDays) {
      if (day < 0 || day > 6) {
        throw new Error("Weekend days must be between 0 and 6");
      }
    }
  }
};

export {
  getWorkTimeConfigByName,
  getAllWorkTimeConfigs,
  addWorkTimeConfig,
  updateWorkTimeConfig
};
