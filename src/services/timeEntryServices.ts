import * as timeEntryRepository from "../repositories/timeEntryRepository";
import { ITimeEntry } from "../models/timeEntryModel";
import { IUser } from "../models/userModel";

const logTimeEntryStart = async (
  timeEntry: ITimeEntry
): Promise<ITimeEntry> => {
  try {
    return await timeEntryRepository.logTimeEntryStart(timeEntry);
  } catch (error) {
    console.error("Error logging time entry start:", error);
    throw new Error(
      "Failed to log time entry start: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};

const logTimeEntryEnd = async (
  id: string,
  timeEntry: Partial<ITimeEntry>
): Promise<ITimeEntry | null> => {
  try {
    return await timeEntryRepository.logTimeEntryEnd(id, timeEntry);
  } catch (error) {
    console.error("Error logging time entry end:", error);
    throw new Error(
      "Failed to log time entry end: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};

const getTimeEntriesByUserId = async (
  userId: string,
  range: string = "all"
): Promise<ITimeEntry[]> => {
  try {
    return await timeEntryRepository.getTimeEntriesByUserId(userId, range);
  } catch (error) {
    console.error("Error getting time entries by user ID:", error);
    throw new Error(
      "Failed to get time entries by user ID: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};

const getTimeEntriesByDate = async (date: string): Promise<ITimeEntry[]> => {
  try {
    return await timeEntryRepository.getTimeEntriesByDate(date);
  } catch (error) {
    console.error("Error getting time entries by date:", error);
    throw new Error(
      "Failed to get time entries by date: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};

const getTimeEntriesByUserIdAndDate = async (
  userId: string,
  date: string
): Promise<ITimeEntry[]> => {
  try {
    return await timeEntryRepository.getTimeEntriesByUserIdAndDate(
      userId,
      date
    );
  } catch (error) {
    console.error("Error getting time entries by user ID and date:", error);
    throw new Error(
      "Failed to get time entries by user ID and date: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};

const getTimeEntryById = async (id: string): Promise<ITimeEntry | null> => {
  try {
    return await timeEntryRepository.getTimeEntryById(id);
  } catch (error) {
    console.error("Error getting time entry by ID:", error);
    throw new Error(
      "Failed to get time entry by ID: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};

const getAllTimeEntries = async (): Promise<ITimeEntry[]> => {
  try {
    return await timeEntryRepository.getAllTimeEntries();
  } catch (error) {
    console.error("Error getting all time entries:", error);
    throw new Error(
      "Failed to get all time entries: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};

export {
  logTimeEntryStart,
  logTimeEntryEnd,
  getTimeEntriesByUserId,
  getTimeEntriesByDate,
  getTimeEntriesByUserIdAndDate,
  getTimeEntryById,
  getAllTimeEntries,
};
