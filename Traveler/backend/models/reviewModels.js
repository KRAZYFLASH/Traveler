import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    targetType: {
      type: String,
      required: [true, "Target type is required"],
      enum: ["operator", "vehicle", "destination", "combo", "schedule"],
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Target ID is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be between 1 and 5"],
      max: [5, "Rating must be between 1 and 5"],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [255, "Title cannot exceed 255 characters"],
    },
    comment: {
      type: String,
      trim: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
          maxlength: [500, "Image URL cannot exceed 500 characters"],
        },
        caption: {
          type: String,
          maxlength: [255, "Caption cannot exceed 255 characters"],
        },
      },
    ],
    helpfulCount: {
      type: Number,
      default: 0,
      min: [0, "Helpful count cannot be negative"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    reply: {
      text: {
        type: String,
        trim: true,
      },
      date: Date,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "hidden"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk performa
reviewSchema.index({ userId: 1 });
reviewSchema.index({ targetType: 1, targetId: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ status: 1 });
reviewSchema.index({ createdAt: -1 });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
