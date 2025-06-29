import Location, { ILocation } from "../models/defaultLocationModel";
import { Document } from "mongoose";

const getAllLocations = async (): Promise<ILocation[]> => {
  try {
    const locations = await Location.find();
    return locations;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch locations from the database");
  }
};

const addLocation = async (
  locationData: ILocation
): Promise<ILocation & Document> => {
  try {
    const location = new Location(locationData);
    await location.save();
    return location;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add location to the database");
  }
};

const updateLocation = async (
  address: string,
  locationData: ILocation
): Promise<(ILocation & Document) | null> => {
  try {
    const updatedLocation = await Location.findOneAndUpdate(
      { address: address },
      locationData,
      {
        new: true,
      }
    );
    return updatedLocation;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update location in the database");
  }
};

export { getAllLocations, addLocation, updateLocation };
