import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  const dbURL = process.env.MONGO_URL;
  if (!dbURL) {
    return console.log("missing MONGO_URL env var");
  }
  if (isConnected) {
    return console.log("MongoDB is already connected");
  }
  try {
    await mongoose.connect(dbURL, {
      dbName: "polcheloveka",
    });
    isConnected = true;
    console.log("Mongodb is connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
