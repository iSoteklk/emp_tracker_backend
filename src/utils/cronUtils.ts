import * as cron from "node-cron";
import { updateCurrentDateClockedInEntries } from "../services/timeEntryServices";
import { ITimeEntry } from "../models/timeEntryModel";
import { calculateTimeDifference } from "./timeUtils";

/**
 * Schedules cron jobs for automatic system tasks
 */
export const scheduleCronJobs = (): void => {
  console.log("Setting up cron jobs...");

  // Schedule auto-clockout at 11:55 PM on weekdays (Monday-Friday)
  // Cron format: Minute Hour Day Month Day-of-week
  cron.schedule(
    "55 23 * * 1-5",
    async () => {
      try {
        console.log(
          "Running auto-clockout for remaining clocked-in users at",
          new Date().toLocaleString()
        );

        // Update data to mark remaining users as clocked-out
        const now = new Date();
        const updateData: Partial<ITimeEntry> = {
          clockOutTime: now, // Current time
          status: "clocked-out",
          notes: "Auto clocked-out by system at end of day",
          // Note: We're not setting a location since this is an automatic process
        };

        // Run the update function
        const updatedEntries = await updateCurrentDateClockedInEntries(
          updateData
        );
        console.log(
          `Auto-clockout completed. Updated ${updatedEntries.length} time entries.`
        );
      } catch (error) {
        console.error("Error during auto-clockout cron job:", error);
      }
    },
    {
      timezone: "Asia/Colombo", // Set your timezone here - adjust as needed
    }
  );

  console.log("Cron jobs scheduled successfully");
};
