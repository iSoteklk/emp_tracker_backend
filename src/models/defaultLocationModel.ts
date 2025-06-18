import mongoose, { Schema, Document } from "mongoose";

export interface ILocation {
  latitude: number;
  longitude: number;
  address?: string; // Optional human-readable address
  accuracy?: number; // GPS accuracy in meters
}

// Location interface for geolocation data
export interface ILocation {
  latitude: number;
  longitude: number;
  address?: string; // Optional human-readable address
}
const locationSchema = new Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
  },
  { timestamps: true }
);
const Location = mongoose.model<ILocation & Document>(
  "Location",
  locationSchema
);
export default Location;
