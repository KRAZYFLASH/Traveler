import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Route code is required"],
      unique: true,
      trim: true,
      maxlength: [20, "Code cannot exceed 20 characters"],
    },
    originCode: {
      type: String,
      required: [true, "Origin code is required"],
      ref: "Location",
    },
    destinationCode: {
      type: String,
      required: [true, "Destination code is required"],
      ref: "Location",
    },
    distanceKm: {
      type: Number,
      min: [0, "Distance cannot be negative"],
    },
    transportType: {
      type: String,
      required: [true, "Transport type is required"],
      enum: ["air", "rail", "road", "sea"],
    },
    estimatedDurationMinutes: {
      type: Number,
      min: [0, "Duration cannot be negative"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk performa
routeSchema.index({ originCode: 1 });
routeSchema.index({ destinationCode: 1 });
routeSchema.index({ transportType: 1 });
routeSchema.index({ code: 1 }, { unique: true });

const Route = mongoose.model("Route", routeSchema);

export default Route;
