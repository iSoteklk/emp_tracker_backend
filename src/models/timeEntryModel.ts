import mongoose, { Schema, Document } from "mongoose";

export interface ILocation {
  latitude: number;
  longitude: number;
  address?: string; // Optional human-readable address
  accuracy?: number; // GPS accuracy in meters
}
export interface ITimeEntry extends Document {
  email: string;
  date: String; // Date of the shift (YYYY-MM-DD format)
  clockInTime?: Date;
  clockInLocation?: ILocation;
  clockOutTime?: Date;
  clockOutLocation?: ILocation;
  totalHours?: any; // Calculated field
  status: "clocked-in" | "clocked-out" | "incomplete";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
const timeEntrySchema: Schema = new Schema(
  {
    email: { type: String, required: true }, // email
    date: { type: String, required: true },
    clockInTime: { type: Date },
    clockInLocation: { type: Object }, // ILocation
    clockOutTime: { type: Date },
    clockOutLocation: { type: Object }, // ILocation
    totalHours: { type: String, default: "0", required: false }, // Calculated field, can be updated later
    status: {
      type: String,
      enum: ["clocked-in", "clocked-out", "incomplete"],
      default: "incomplete",
    },
    notes: { type: String },
  },
  { timestamps: true }
);
const TimeEntry = mongoose.model<ITimeEntry>("TimeEntries", timeEntrySchema);
export default TimeEntry;
