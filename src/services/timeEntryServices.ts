import * as timeEntryRepository from "../repositories/timeEntryRepository";
import { ITimeEntry } from "../models/timeEntryModel";
import { getAllUsersWithoutAdmin } from "./userServices";
import { IUser } from "../models/userModel";

interface IAttendance {
  email: string;
  fname: string;
  lname: string;
  contact: string;
  date: String; // Date of the shift (YYYY-MM-DD format)
  clockInTime?: Date;
  clockInLocation?: any;
  clockOutTime?: Date;
  clockOutLocation?: any;
  totalHours?: any; // Calculated field
  status: "clocked-in" | "clocked-out" | "absent";
  notes?: string;
}

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

const getAttendanceByDate = async (date: string) => {
  try {
    const users = await getAllUsersWithoutAdmin();
    const allUsers = users.data || [];
    const timeEntries: ITimeEntry[] =
      await timeEntryRepository.getTimeEntriesByDate(date);

    // Map each user to an attendance record
    const attendanceRecords = allUsers.map((user: IUser) => {
      // Find the time entry for this user by matching email
      const userTimeEntry = timeEntries.find(
        (entry) => entry.email === user.email
      );

      // Create the attendance record
      return {
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        contact: user.contact,
        date: date,
        // If time entry exists, add the clock in/out details
        clockInTime: userTimeEntry?.clockInTime || undefined,
        clockInLocation: userTimeEntry?.clockInLocation || undefined,
        clockOutTime: userTimeEntry?.clockOutTime || undefined,
        clockOutLocation: userTimeEntry?.clockOutLocation || undefined,
        totalHours: userTimeEntry?.totalHours || undefined,
        // Set status based on time entry existence and completeness
        status: !userTimeEntry ? "absent" : userTimeEntry.status,
        notes: userTimeEntry?.notes || undefined,
      };
    });

    return attendanceRecords;
  } catch (error) {
    console.error("Error getting attendance by date:", error);
    throw new Error(
      "Failed to get attendance by date: " +
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
  getAttendanceByDate,
};
