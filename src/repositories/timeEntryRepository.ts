import TimeEntry from "../models/timeEntryModel";
import { ITimeEntry } from "../models/timeEntryModel";

const logTimeEntryStart = async (
  timeEntry: ITimeEntry
): Promise<ITimeEntry> => {
  try {
    const newTimeEntry = new TimeEntry(timeEntry);
    return await newTimeEntry.save();
  } catch (error) {
    console.error("Error logging time entry start:", error);
    throw error;
  }
};

const logTimeEntryEnd = async (
  id: string,
  timeEntry: Partial<ITimeEntry>
): Promise<ITimeEntry | null> => {
  try {
    const updatedTimeEntry = await TimeEntry.findOneAndUpdate(
      { email: id, status: "clocked-in", date: timeEntry.date },
      {
        $set: {
          clockOutTime: timeEntry.clockOutTime,
          clockOutLocation: timeEntry.clockOutLocation,
          totalHours: timeEntry.totalHours,
          status: "clocked-out",
          notes: timeEntry.notes,
        },
      },
      { new: true }
    );
    return updatedTimeEntry as ITimeEntry;
  } catch (error) {
    console.error("Error logging time entry end:", error);
    throw error;
  }
};

const getTimeEntriesByUserId = async (
  userId: string
): Promise<ITimeEntry[]> => {
  try {
    const timeEntries = await TimeEntry.find({ email: userId }).sort({
      date: -1,
    });
    return timeEntries;
  } catch (error) {
    console.error("Error getting time entries by user ID:", error);
    throw error;
  }
};

const getTimeEntriesByDate = async (date: string): Promise<ITimeEntry[]> => {
  try {
    const timeEntries = await TimeEntry.find({ date: new Date(date) }).sort({
      createdAt: -1,
    });
    return timeEntries;
  } catch (error) {
    console.error("Error getting time entries by date:", error);
    throw error;
  }
};

const getTimeEntriesByUserIdAndDate = async (
  userId: string,
  date: string
): Promise<ITimeEntry[]> => {
  try {
    const timeEntries = await TimeEntry.find({
      email: userId,
      date: new Date(date),
    }).sort({ createdAt: -1 });
    return timeEntries;
  } catch (error) {
    console.error("Error getting time entries by user ID and date:", error);
    throw error;
  }
};

const getTimeEntryById = async (id: string): Promise<ITimeEntry | null> => {
  try {
    const timeEntry = await TimeEntry.findById(id);
    return timeEntry;
  } catch (error) {
    console.error("Error getting time entry by ID:", error);
    throw error;
  }
};

const getAllTimeEntries = async (): Promise<ITimeEntry[]> => {
  try {
    const timeEntries = await TimeEntry.find().sort({ createdAt: -1 });
    return timeEntries;
  } catch (error) {
    console.error("Error getting all time entries:", error);
    throw error;
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
