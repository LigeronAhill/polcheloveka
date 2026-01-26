import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
	mongoose.set("strictQuery", true);
	const dbURL = process.env.MONGO_URL;
	if (!dbURL) {
		return console.error("missing MONGO_URL env var");
	}
	if (isConnected) {
		return;
	}
	try {
		await mongoose.connect(dbURL, {
			dbName: "polcheloveka",
		});
		isConnected = true;
	} catch (error) {
		console.log("MongoDB connection failed", error);
	}
};
