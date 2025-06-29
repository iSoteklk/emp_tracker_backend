import * as locationRepository from "../repositories/locationRepository";
import { ILocation } from "../models/defaultLocationModel";

const getAllLocations = async () => {
  try {
    const locations = await locationRepository.getAllLocations();
    return { data: locations };
  } catch (err) {
    console.error(err);
    return { message: "Failed to get locations" };
  }
};
const addLocation = async (locationData: ILocation) => {
  try {
    const location = await locationRepository.addLocation(locationData);
    return {
      success: "true",
      data: location,
      message: "Location added successfully",
    };
  } catch (err) {
    console.error(`Failed to add location: ${err}`);
    return { success: "false", message: "Failed to add location" };
  }
};
const updateLocation = async (address: string, locationData: ILocation) => {
  try {
    const updatedLocation = await locationRepository.updateLocation(
      address,
      locationData
    );
    if (!updatedLocation) {
      return { success: "false", message: "Location not found" };
    }
    return {
      success: "true",
      data: updatedLocation,
      message: "Location updated successfully",
    };
  } catch (err) {
    console.error(`Failed to update location: ${err}`);
    return { success: "false", message: "Failed to update location" };
  }
};
export { getAllLocations, addLocation, updateLocation };
