import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import locationRoutes from "./routes/locationRoutes";
import config from "./config/config";

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

app.use("/api/v1", userRoutes);
app.use("/api/v1", locationRoutes);

mongoose
  .connect(config.database.mongoUri)
  .then(() => console.log(`🗄️| Connected to MongoDB Database successfully`))
  .then(async () => {
    app.listen(config.server.port);
  })
  .then(() =>
    console.log(`🌎 | App Started on http://localhost:${config.server.port}`)
  )
  .catch((err) => console.log("🚫 " + err));
