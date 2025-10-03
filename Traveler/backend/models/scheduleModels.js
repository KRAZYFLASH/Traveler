import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Vehicle ID is required"],
      ref: "Vehicle",
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Route ID is required"],
      ref: "Route",
    },
    scheduleNumber: {
      type: String,
      required: [true, "Schedule number is required"],
      trim: true,
      maxlength: [50, "Schedule number cannot exceed 50 characters"],
    },
    departureTime: {
      type: Date,
      required: [true, "Departure time is required"],
    },
    arrivalTime: {
      type: Date,
      required: [true, "Arrival time is required"],
    },
    durationMinutes: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
    frequency: {
      type: {
        type: String,
        enum: ["daily", "weekly", "monthly", "one_time"],
        default: "daily",
      },
      pattern: {
        type: String,
        maxlength: [20, "Pattern cannot exceed 20 characters"],
      },
    },
    validPeriod: {
      from: {
        type: Date,
        required: [true, "Valid from date is required"],
      },
      until: Date,
    },
    pricing: {
      basePrice: {
        type: Number,
        required: [true, "Base price is required"],
        min: [0, "Base price cannot be negative"],
      },
      currency: {
        type: String,
        default: "IDR",
        maxlength: [3, "Currency code cannot exceed 3 characters"],
      },
      seatClasses: [
        {
          class: {
            type: String,
            required: true,
            enum: [
              "economy",
              "premium_economy",
              "business",
              "first",
              "executive",
            ],
          },
          price: {
            type: Number,
            required: true,
            min: [0, "Price cannot be negative"],
          },
          availability: {
            type: Number,
            required: true,
            min: [0, "Availability cannot be negative"],
          },
        },
      ],
    },
    seatAvailability: {
      total: {
        type: Number,
        required: [true, "Total seats is required"],
        min: [1, "Total seats must be at least 1"],
      },
      available: {
        type: Number,
        required: [true, "Available seats is required"],
        min: [0, "Available seats cannot be negative"],
      },
      booked: {
        type: Number,
        default: 0,
        min: [0, "Booked seats cannot be negative"],
      },
    },
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "completed", "delayed", "boarding"],
      default: "scheduled",
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk performa
scheduleSchema.index({ vehicleId: 1 });
scheduleSchema.index({ routeId: 1 });
scheduleSchema.index({ departureTime: 1 });
scheduleSchema.index({ status: 1 });
scheduleSchema.index({ vehicleId: 1, departureTime: 1 }, { unique: true });

// Virtual untuk menghitung occupancy rate
scheduleSchema.virtual("occupancyRate").get(function () {
  return this.seatAvailability.total > 0
    ? (this.seatAvailability.booked / this.seatAvailability.total) * 100
    : 0;
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
