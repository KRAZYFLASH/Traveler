import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Location code is required"],
      unique: true,
      trim: true,
      maxlength: [10, "Code cannot exceed 10 characters"],
    },
    name: {
      type: String,
      required: [true, "Location name is required"],
      trim: true,
      maxlength: [255, "Name cannot exceed 255 characters"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxlength: [100, "City cannot exceed 100 characters"],
    },
    province: {
      type: String,
      trim: true,
      maxlength: [100, "Province cannot exceed 100 characters"],
    },
    country: {
      type: String,
      default: "Indonesia",
      maxlength: [100, "Country cannot exceed 100 characters"],
    },
    type: {
      type: String,
      required: [true, "Location type is required"],
      enum: ["airport", "train_station", "bus_terminal", "port", "city"],
    },
    coordinates: {
      latitude: {
        type: Number,
        min: [-90, "Latitude must be between -90 and 90"],
        max: [90, "Latitude must be between -90 and 90"],
      },
      longitude: {
        type: Number,
        min: [-180, "Longitude must be between -180 and 180"],
        max: [180, "Longitude must be between -180 and 180"],
      },
    },
    timezone: {
      type: String,
      default: "Asia/Jakarta",
      maxlength: [50, "Timezone cannot exceed 50 characters"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "maintenance"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk performa
locationSchema.index({ city: 1 });
locationSchema.index({ type: 1 });
locationSchema.index({ status: 1 });
locationSchema.index({ code: 1 }, { unique: true });

const Location = mongoose.model("Location", locationSchema);

export default Location;
