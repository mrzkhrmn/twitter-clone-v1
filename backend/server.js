import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database.js";
dotenv.config();
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB(process.env.MONGO_URI);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

app.use("/api/user", userRouter);
