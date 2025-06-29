import * as locationServices from "../services/locationServices";
import { Request, Response, NextFunction } from "express";

const getAllLocationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locations = await locationServices.getAllLocations();
    if (!locations) {
      return res.status(404).json({
        success: "false",
        message: "No locations found",
        data: [],
      });
    }
    res.status(200).json({ success: "true", data: locations });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: "false",
      message: "Failed to retrieve locations",
      data: [],
    });
  }
};
const addLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const locationData = req.body;
  try {
    const result = await locationServices.addLocation(locationData);
    if (result.success === "false") {
      return res.status(500).json({
        success: "false",
        message: result.message,
        data: [],
      });
    }
    res.status(201).json({ success: "true", data: result.data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: "false",
      message: "Failed to add location",
      data: [],
    });
  }
};
const updateLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { address } = req.params;
  const locationData = req.body;
  try {
    const result = await locationServices.updateLocation(address, locationData);
    if (result.success === "false") {
      return res.status(404).json({
        success: "false",
        message: result.message,
        data: [],
      });
    }
    res.status(200).json({ success: "true", data: result.data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: "false",
      message: "Failed to update location",
      data: [],
    });
  }
};

export {
  getAllLocationsController,
  addLocationController,
  updateLocationController,
};
