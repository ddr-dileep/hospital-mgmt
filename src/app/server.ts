import express from "express";
import dbConnection from "../config/db-config";
const app = express();

dbConnection()

app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
