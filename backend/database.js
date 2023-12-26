import mongoose from "mongoose";

export const connectDB = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};
