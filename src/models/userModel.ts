import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  fname: string;
  lname: string;
  contact: string;
  role: string | "employee" | "admin";
  workLocation?: string; // Optional field for work location
  password: string;
}

const userschema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    contact: { type: String, required: true },
    role: { type: String, required: true },
    workLocation: { type: String, required: false },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("Users", userschema);
