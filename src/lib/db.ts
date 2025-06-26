import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
export const disconnectDB = async () => {
  if (mongoose.connection.readyState === 0) return;

  try {
    await mongoose.disconnect();
    console.log("✅ MongoDB disconnected");
  } catch (error) {
    console.error("❌ MongoDB disconnection error:", error);
    throw error;
  }
};
export const isConnected = () => mongoose.connection.readyState === 1;