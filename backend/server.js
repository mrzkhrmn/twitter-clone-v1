import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database.js";
dotenv.config();

const app = express();

connectDB(process.env.MONGO_URI);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port: " + process.env.PORT);
});
