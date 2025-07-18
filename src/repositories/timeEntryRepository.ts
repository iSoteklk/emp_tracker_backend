import TimeEntry from "../models/timeEntryModel";
import { ITimeEntry } from "../models/timeEntryModel";
import { calculateTimeDifference } from "../utils/timeUtils";

const logTimeEntryStart = async (
  timeEntry: ITimeEntry
): Promise<ITimeEntry> => {
  try {
    // Check if user is already clocked in for the day
    const existingEntry = await TimeEntry.findOne({
      email: timeEntry.email,
      date: timeEntry.date,
    });

    if (existingEntry) {
      throw new Error("User is already clocked in for this day");
    }

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
    // Check if user is already clocked out for the day
    const existingClockedOutEntry = await TimeEntry.findOne({
      email: id,
      date: timeEntry.date,
      status: "clocked-out",
    });

    if (existingClockedOutEntry) {
      throw new Error("User is already clocked out for this day");
    }

    //get existing clocked-in entry to calculate total hours
    const existingClockedInEntry = await TimeEntry.findOne({
      email: id,
      status: "clocked-in",
      date: timeEntry.date,
    });
    if (!existingClockedInEntry) {
      throw new Error("No clocked-in entry found for this user on this date");
    }
    // Calculate total hours
    const clockInTime = existingClockedInEntry.clockInTime;
    const clockOutTime = new Date();
    const totalHours = calculateTimeDifference(
      clockInTime as Date,
      clockOutTime as Date
    );

    const updatedTimeEntry = await TimeEntry.findOneAndUpdate(
      { email: id, status: "clocked-in", date: timeEntry.date },
      {
        $set: {
          clockOutTime: timeEntry.clockOutTime,
          clockOutLocation: timeEntry.clockOutLocation,
          totalHours: totalHours,
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
  userId: string,
  range: string = "all"
): Promise<ITimeEntry[]> => {
  try {
    let query: any = { email: userId };
    
    // Calculate date range if not "all"
    if (range !== "all") {
      const now = new Date();
      let startDate = new Date();
      
      // Properly parse the range parameter (e.g., "1w", "2m", "10w")
      const match = range.match(/^(\d+)([wm])$/);
      if (match) {
        const value = parseInt(match[1]);
        const unit = match[2];
        
        if (unit === "w") {
          // Weeks
          startDate.setDate(now.getDate() - (value * 7));
        } else if (unit === "m") {
          // Months
          startDate.setMonth(now.getMonth() - value);
        }
        
        // Reset time to 00:00:00 to ensure full day inclusion
        startDate.setHours(0, 0, 0, 0);
        
        query.date = { $gte: startDate };
      }
    }
    
    const timeEntries = await TimeEntry.find(query).sort({
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
    const timeEntries = await TimeEntry.find({ date: date }).sort({
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
      date: date,
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
