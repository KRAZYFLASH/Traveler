import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("MongoDB connected"));
    mongoose.connection.on("error", (err) =>
      console.error("MongoDB connection error:", err)
    );
    mongoose.connection.on("disconnected", () =>
      console.log("MongoDB disconnected")
    );

    // Pastikan MONGODB_URI sudah termasuk database name atau gunakan default
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/traveler";

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
