import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";


const app = express();
const PORT = process.env.PORT || 3001;
connectDB();
connectCloudinary();

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5174",
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
    res.send("Welcome to the Traveler API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// // API Routes
// app.use("/api/users", require("./routes/users"));
// app.use("/api/bookings", require("./routes/bookings"));
// app.use("/api/destinations", require("./routes/destinations"));
// app.use("/api/promos", require("./routes/promos"));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: "Something went wrong!",
//     message:
//       process.env.NODE_ENV === "production"
//         ? "Internal Server Error"
//         : err.message,
//   });
// });

// // 404 handler
// app.use("*", (req, res) => {
//   res.status(404).json({
//     error: "Route not found",
//     message: `Cannot ${req.method} ${req.originalUrl}`,
//   });
// });

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Traveler API server running on port ${PORT}`);
//   console.log(`📊 Health check: http://localhost:${PORT}/health`);
// });
