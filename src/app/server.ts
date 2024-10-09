import { config } from "dotenv";
config();
import express from "express";
import dbConnection from "../config/db-config";

const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(express.json());

app.listen(APP_PORT, () => {
  console.log(`App listening on http://localhost:${APP_PORT}`);
  dbConnection(); // database connection
});
