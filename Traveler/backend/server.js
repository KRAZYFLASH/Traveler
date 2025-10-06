import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import importRouter from "./routes/importRoute.js";
import mongoose from "mongoose";

// App config
const app = express();
const port = process.env.PORT || 3001;

// Database connection
connectDB();
connectCloudinary();

// ✅ PERBAIKAN CORS - MULTIPLE ORIGINS
const corsOptions = {
  origin: [
    "http://localhost:5173", // Default Vite port
    "http://localhost:5174", // Alternative Vite port
    "http://localhost:5175", // Alternative Vite port
    "http://localhost:5176", // Alternative Vite port
    "http://localhost:5177", // Alternative Vite port
    "http://localhost:5178", // Your current port
    "http://localhost:5179", // Alternative Vite port
    "http://localhost:3000", // React default
    "http://localhost:3001", // In case of same port
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Test database connection function
const testConnection = async () => {
  try {
    return mongoose.connection.readyState === 1;
  } catch (error) {
    return false;
  }
};

// API endpoints
app.get("/", (req, res) => {
  res.send("API Working");
});

// Database health check endpoint
app.get("/health", async (req, res) => {
  const dbHealthy = await testConnection();
  res.json({
    status: dbHealthy ? "OK" : "DEGRADED",
    message: "Traveler API is running",
    database: dbHealthy ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString(),
  });
});

// Admin routes
app.use("/api/admin", adminRouter);

// Import routes for dummy data
app.use("/api/import", importRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.listen(port, () => console.log("Server started on PORT : " + port));
