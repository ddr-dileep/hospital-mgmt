import express, { Request, Response } from "express";
const app = express();

app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
