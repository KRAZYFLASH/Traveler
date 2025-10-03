import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    operatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Operator ID is required"],
      ref: "TransportationOperator",
    },
    name: {
      type: String,
      required: [true, "Vehicle name is required"],
      trim: true,
      maxlength: [255, "Name cannot exceed 255 characters"],
    },
    type: {
      type: String,
      required: [true, "Vehicle type is required"],
      enum: ["aircraft", "train", "bus", "ship", "car"],
    },
    model: {
      type: String,
      trim: true,
      maxlength: [255, "Model cannot exceed 255 characters"],
    },
    registrationNumber: {
      type: String,
      trim: true,
      maxlength: [50, "Registration number cannot exceed 50 characters"],
    },
    capacity: {
      passengers: {
        type: Number,
        required: [true, "Passenger capacity is required"],
        min: [1, "Passenger capacity must be at least 1"],
      },
      vehicles: {
        type: Number,
        default: 0,
        min: [0, "Vehicle capacity cannot be negative"],
      },
    },
    facilities: [
      {
        type: String,
        trim: true,
      },
    ],
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
        seats: {
          type: Number,
          required: true,
          min: [1, "Seat count must be at least 1"],
        },
        basePrice: {
          type: Number,
          required: true,
          min: [0, "Base price cannot be negative"],
        },
        amenities: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],
    status: {
      type: String,
      enum: ["active", "maintenance", "retired"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk performa
vehicleSchema.index({ operatorId: 1 });
vehicleSchema.index({ type: 1 });
vehicleSchema.index({ status: 1 });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
