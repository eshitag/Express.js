import mongoose from "mongoose";

const connectDB = async (dbURI) => {
  try {
    //Connect to MongoDB
    await mongoose.connect(dbURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
