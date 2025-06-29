import WorkTime from "../models/workTimeModel";
import { IWorkTime } from "../models/workTimeModel";

/**
 * Get a work time configuration by name
 * @param name The name of the work time configuration
 * @returns The work time configuration or null if not found
 */
const getWorkTimeConfigByName = async (name: string): Promise<IWorkTime | null> => {
  try {
    const workTime = await WorkTime.findOne({ name });
    return workTime;
  } catch (error) {
    console.error("Error getting work time config by name:", error);
    throw error;
  }
};

//get active work time config

/**
 * Get the currently active work time configuration
 * @returns The active work time configuration or null if not found
 */
const getActiveWorkTimeConfig = async (): Promise<IWorkTime | null> => {
  try {
    const activeWorkTime = await WorkTime.findOne({ isActive: 1 });
    return activeWorkTime;
  } catch (error) {
    console.error("Error getting active work time config:", error);
    throw error;
  }
};

/**
 * Get all work time configurations
 * @returns Array of work time configurations
 */
const getAllWorkTimeConfigs = async (): Promise<IWorkTime[]> => {
  try {
    const workTimes = await WorkTime.find().sort({ createdAt: -1 });
    return workTimes;
  } catch (error) {
    console.error("Error getting all work time configs:", error);
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
    // First, deactivate the currently active work time config
    // await WorkTime.updateMany({ isActive: 1 }, { $set: { isActive: 0 } });  


    const newWorkTime = new WorkTime(workTimeData);
    return await newWorkTime.save();
  } catch (error) {
    console.error("Error adding work time config:", error);
    throw error;
  }
};

/**
 * Update an existing work time configuration by name
 * @param name The name of the work time configuration to update
 * @param workTimeData The updated work time data
 * @returns The updated work time configuration
 */
const updateWorkTimeConfig = async (
  name: string,
  workTimeData: Partial<IWorkTime>
): Promise<IWorkTime | null> => {
  try {
    const updatedWorkTime = await WorkTime.findOneAndUpdate(
      { name },
      { $set: workTimeData },
      { new: true }
    );
    return updatedWorkTime;
  } catch (error) {
    console.error("Error updating work time config:", error);
    throw error;
  }
};

// setActiveWorkTimeConfig  - get the record where isActive is 1 and set isActive to 0.  then set the isActive to 1 for the given name
const setActiveWorkTimeConfig = async (name: string): Promise<IWorkTime | null> => {
  try {
    // First, deactivate the currently active work time config
    await WorkTime.updateMany({ isActive: 1 }, { $set: { isActive: 0 } });  
    // Then, activate the specified work time config
    const updatedWorkTime = await WorkTime.findOneAndUpdate(
      { name },
      { $set: { isActive: 1 } },
      { new: true }
    );
    return updatedWorkTime;
  } catch (error) {
    console.error("Error setting active work time config:", error);
    throw error;
  }
};

export {
  getWorkTimeConfigByName,
  getAllWorkTimeConfigs,
  addWorkTimeConfig,
  updateWorkTimeConfig,
  setActiveWorkTimeConfig,
  getActiveWorkTimeConfig
};
