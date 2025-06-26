import * as dotenv from "dotenv";

dotenv.config();

const config = {
  server: {
    port: Number(process.env.PORT) || 4000,
  },

  database: {
    mongoUri: process.env.MONGODB_URI as string,
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET as string,
  },
};

export default config;
