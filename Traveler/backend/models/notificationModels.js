import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    type: {
      type: String,
      required: [true, "Notification type is required"],
      enum: [
        "booking_confirmation",
        "payment_success",
        "payment_failed",
        "booking_reminder",
        "promo_alert",
        "review_request",
        "general",
      ],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [255, "Title cannot exceed 255 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    data: {
      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
      paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
      promoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Promotion",
      },
      additionalData: mongoose.Schema.Types.Mixed,
    },
    readAt: Date,
    actionUrl: {
      type: String,
      maxlength: [500, "Action URL cannot exceed 500 characters"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

// Index untuk performa
notificationSchema.index({ userId: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ readAt: 1 });
notificationSchema.index({ priority: 1 });
notificationSchema.index({ createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
