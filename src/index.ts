import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import locationRoutes from "./routes/locationRoutes";
import timeEntryRoutes from "./routes/timeEntryRoutes";
import workTimeRoutes from "./routes/workTimeRoutes";
import workTimePublicRoutes from "./routes/workTimePublic";
import config from "./config/config";
import { displayBanner, displayStartupInfo } from "./utils/startupUtils";
import { scheduleCronJobs } from "./utils/cronUtils";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Content-Type",
      "Origin",
      "authorization",
      "Authorization",
    ],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.use("/api/v1", workTimePublicRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", locationRoutes);
app.use("/api/v1", timeEntryRoutes);
app.use("/api/v1", workTimeRoutes);

mongoose
  .connect(config.database.mongoUri)
  .then(() => {
    app.listen(config.server.port);

    // Display ASCII art banner and startup info
    displayBanner(config.server.port);
    displayStartupInfo(config.server.port);

    // Schedule cron jobs
    scheduleCronJobs();
  })
  .catch((err) => console.log("🚫 " + err));
