import mongoose, { Schema, Document } from "mongoose";

export interface IWorkTime extends Document {
  name: string; // Optional name for the work time configuration
  standardStartTime: string; // Format: "HH:MM"
  standardEndTime: string; // Format: "HH:MM"
  fullWorkingHours: number; // Number of hours in a full working day
  lunchBreakDuration: number; // Duration of lunch break in minutes
  shortBreakDuration: number; // Duration of short breaks in minutes
  lateThresholdMinutes: number; // Minutes after start time that count as late
  overtimeAfterHours: number; // Hours after which overtime begins
  weekendDays?: number[]; // Array of days considered as weekends (0 = Sunday, 6 = Saturday)
  use24HourFormat: boolean; // Whether to use 24-hour format (true) or AM/PM format (false)
  showSeconds: boolean; // Whether to show seconds in time displays
  createdAt: Date;
  updatedAt: Date;
}

const workTimeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: "Standard",
    },
    standardStartTime: {
      type: String,
      required: true,
      default: "08:30",
    },
    standardEndTime: {
      type: String,
      required: true,
      default: "17:30",
    },
    fullWorkingHours: {
      type: Number,
      required: true,
      default: 8,
    },
    lunchBreakDuration: {
      type: Number,
      required: true,
      default: 60,
    }, // In minutes
    shortBreakDuration: {
      type: Number,
      required: true,
      default: 15,
    }, // In minutes
    lateThresholdMinutes: {
      type: Number,
      required: true,
      default: 0,
    },
    overtimeAfterHours: {
      type: Number,
      required: true,
      default: 8,
    },
    weekendDays: {
      type: [Number],
      required: true,
      default: [0, 6],
    }, // 0 = Sunday, 6 = Saturday
    use24HourFormat: {
      type: Boolean,
      required: true,
      default: true,
    },
    showSeconds: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const WorkTime = mongoose.model<IWorkTime>("WorkTimes", workTimeSchema);
export default WorkTime;
