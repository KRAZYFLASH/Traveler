import mongoose from "mongoose";

const transportationOperatorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Operator name is required"],
      trim: true,
      maxlength: [255, "Name cannot exceed 255 characters"],
    },
    code: {
      type: String,
      unique: true,
      trim: true,
      maxlength: [10, "Code cannot exceed 10 characters"],
    },
    type: {
      type: String,
      required: [true, "Operator type is required"],
      enum: ["airline", "train", "bus", "ship", "rental"],
    },
    logo: {
      type: String,
      maxlength: [500, "Logo URL cannot exceed 500 characters"],
    },
    country: {
      type: String,
      default: "Indonesia",
      maxlength: [100, "Country cannot exceed 100 characters"],
    },
    contact: {
      email: {
        type: String,
        maxlength: [255, "Email cannot exceed 255 characters"],
      },
      phone: {
        type: String,
        maxlength: [20, "Phone cannot exceed 20 characters"],
      },
      website: {
        type: String,
        maxlength: [255, "Website URL cannot exceed 255 characters"],
      },
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
      default: 0,
    },
    totalReviews: {
      type: Number,
      min: [0, "Total reviews cannot be negative"],
      default: 0,
    },
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    policies: {
      cancellation: String,
      baggage: String,
      refund: String,
      reschedule: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk performa
transportationOperatorSchema.index({ type: 1 });
transportationOperatorSchema.index({ status: 1 });
transportationOperatorSchema.index({ rating: -1 });
transportationOperatorSchema.index({ code: 1 }, { unique: true });

const TransportationOperator = mongoose.model(
  "TransportationOperator",
  transportationOperatorSchema
);

export default TransportationOperator;
