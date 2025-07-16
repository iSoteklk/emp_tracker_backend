import mongoose, { Schema, Document } from "mongoose";

export interface ILocation {
  latitude: number;
  longitude: number;
  address: string; // Optional human-readable address
  radius: number; // GPS accuracy in meters
  name: string; // Optional name for the location
}

// Location interface for geolocation data
export interface ILocation {
  latitude: number;
  longitude: number;
  address: string; // Optional human-readable address
  radius: number; // GPS accuracy in meters
  name: string; // Optional name for the location
}
const locationSchema = new Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
    radius: { type: Number, default: 50 }, // Default radius in meters
    name: { type: String }, // Optional name for the location
  },
  { timestamps: true }
);
const Location = mongoose.model<ILocation & Document>(
  "Location",
  locationSchema
);
export default Location;
