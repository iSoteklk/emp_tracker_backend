import { Request, Response, NextFunction } from "express";
import * as timeEntryServices from "../services/timeEntryServices";
import { getTokenFromRequest } from "../utils/authUtils";

/**
 * Controller to handle clock-in (start time entry)
 */
const clockInController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenResult = getTokenFromRequest(req, res);
    if (!tokenResult.success) {
      return tokenResult.response;
    }

    const email = (tokenResult.decoded as any).email;
    const timeEntryData = {
      ...req.body,
      email,
      status: "clocked-in",
      date:req.body.date.includes("T") ? req.body.date.split("T")[0] : req.body.date
    };

    const result = await timeEntryServices.logTimeEntryStart(timeEntryData);

    return res.status(201).json({
      success: "true",
      message: "Successfully clocked in",
      data: result,
    });
  } catch (error) {
    console.error("Error in clockInController:", error);
    return res.status(500).json({
      success: "false",
      message: "Failed to clock in",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Controller to handle clock-out (end time entry)
 */
const clockOutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenResult = getTokenFromRequest(req, res);
    if (!tokenResult.success) {
      return tokenResult.response;
    }

    const email = (tokenResult.decoded as any).email;
    const { clockOutTime, clockOutLocation, totalHours, notes } = req.body;

    const timeEntryData = {
      clockOutTime,
      clockOutLocation,
      totalHours,
      notes,
      date: req.body.date 
      ? (req.body.date.includes("T") ? req.body.date.split("T")[0] : req.body.date) 
      : new Date().toISOString().split("T")[0],
    };

    const result = await timeEntryServices.logTimeEntryEnd(
      email,
      timeEntryData
    );

    if (!result) {
      return res.status(404).json({
        success: "false",
        message: "No active clock-in found for this user",
      });
    }

    return res.status(200).json({
      success: "true",
      message: "Successfully clocked out",
      data: result,
    });
  } catch (error) {
    console.error("Error in clockOutController:", error);
    return res.status(500).json({
      success: "false",
      message: "Failed to clock out",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Controller to get all time entries
 */
const getAllTimeEntriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const timeEntries = await timeEntryServices.getAllTimeEntries();

    return res.status(200).json({
      success: "true",
      data: timeEntries,
    });
  } catch (error) {
    console.error("Error in getAllTimeEntriesController:", error);
    return res.status(500).json({
      success: "false",
      message: "Failed to retrieve time entries",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Controller to get time entries for a specific user
 */
const getUserTimeEntriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenResult = getTokenFromRequest(req, res);
    if (!tokenResult.success) {
      return tokenResult.response;
    }

    const email = (tokenResult.decoded as any).email;
    const range = req.params.range || "all"; // Default to 'all' if not provided
    const timeEntries = await timeEntryServices.getTimeEntriesByUserId(email,range);

    return res.status(200).json({
      success: "true",
      data: timeEntries,
    });
  } catch (error) {
    console.error("Error in getUserTimeEntriesController:", error);
    return res.status(500).json({
      success: "false",
      message: "Failed to retrieve user time entries",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getUserTimeEntriesAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenResult = getTokenFromRequest(req, res);
    if (!tokenResult.success) {
      return tokenResult.response;
    }

    const email = req.body.email || req.body.userId;
    // Validate email
    if (!email) {
      return res.status(400).json({
        success: "false",
        message: "Email is required",
      });
    }
    const timeEntries = await timeEntryServices.getTimeEntriesByUserId(email);

    return res.status(200).json({
      success: "true",
      data: timeEntries,
    });
  } catch (error) {
    console.error("Error in getUserTimeEntriesController:", error);
    return res.status(500).json({
      success: "false",
      message: "Failed to retrieve user time entries",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
/**
 * Controller to get time entries by date
 */
const getTimeEntriesByDateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { date } = req.params;
    date  =  date.includes("T") ? date.split("T")[0] : date
    const timeEntries = await timeEntryServices.getTimeEntriesByDate(date);

    return res.status(200).json({
      success: "true",
      data: timeEntries,
    });
  } catch (error) {
    console.error("Error in getTimeEntriesByDateController:", error);
    return res.status(500).json({
      success: "false",
      message: "Failed to retrieve time entries for the specified date",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Controller to get time entries by user ID and date
 */
const getTimeEntriesByUserAndDateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenResult = getTokenFromRequest(req, res);
    if (!tokenResult.success) {
      return tokenResult.response;
    }

    const email = (tokenResult.decoded as any).email;
    const date  =  req.params.date.includes("T") ? req.params.date.split("T")[0] : req.params.date
    

    const timeEntries = await timeEntryServices.getTimeEntriesByUserIdAndDate(
      email,
      date
    );

    return res.status(200).json({
      success: "true",
      data: timeEntries,
    });
  } catch (error) {
    console.error("Error in getTimeEntriesByUserAndDateController:", error);
    return res.status(500).json({
      success: "false",
      message: "Failed to retrieve time entries for the user and date",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getTimeEntriesByUserAndDateAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenResult = getTokenFromRequest(req, res);
    if (!tokenResult.success) {
      return tokenResult.response;
    }

    const email = req.body.email || req.body.userId;
    const date  =  req.body.date.includes("T") ? req.body.date.split("T")[0] : req.body.date

    // Validate email and date
    if (!email || !date) {
      return res.status(400).json({
        success: "false",
        message: "Email and date are required",
      });
    }

    const timeEntries = await timeEntryServices.getTimeEntriesByUserIdAndDate(
      email,
      date
    );

    return res.status(200).json({
      success: "true",
      data: timeEntries,
    });
  } catch (error) {
    console.error("Error in getTimeEntriesByUserAndDateController:", error);
    return res.status(500).json({
      success: "false",
      message: "Failed to retrieve time entries for the user and date",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
/**
 * Controller to get a specific time entry by ID
 */
const getTimeEntryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const timeEntry = await timeEntryServices.getTimeEntryById(id);

    if (!timeEntry) {
      return res.status(404).json({
        success: "false",
        message: "Time entry not found",
      });
    }

    return res.status(200).json({
      success: "true",
      data: timeEntry,
    });
  } catch (error) {
    console.error("Error in getTimeEntryByIdController:", error);
    return res.status(500).json({
      success: "false",
      message: "Failed to retrieve time entry",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export {
  clockInController,
  clockOutController,
  getAllTimeEntriesController,
  getUserTimeEntriesController,
  getTimeEntriesByDateController,
  getTimeEntriesByUserAndDateController,
  getTimeEntryByIdController,
  getTimeEntriesByUserAndDateAdminController,
  getUserTimeEntriesAdminController,
};
