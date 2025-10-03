import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Booking ID is required"],
      ref: "Booking",
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: [
        "credit_card",
        "debit_card",
        "bank_transfer",
        "e_wallet",
        "virtual_account",
        "cash",
      ],
    },
    paymentProvider: {
      type: String,
      maxlength: [100, "Payment provider cannot exceed 100 characters"],
    },
    providerTransactionId: {
      type: String,
      maxlength: [255, "Provider transaction ID cannot exceed 255 characters"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    currency: {
      type: String,
      default: "IDR",
      maxlength: [3, "Currency code cannot exceed 3 characters"],
    },
    exchangeRate: {
      type: Number,
      default: 1.0,
      min: [0, "Exchange rate cannot be negative"],
    },
    paymentDate: Date,
    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "success",
        "failed",
        "cancelled",
        "expired",
      ],
      default: "pending",
    },
    paymentDetails: {
      cardType: String,
      cardLastFour: String,
      bankName: String,
      accountNumber: String,
      walletType: String,
      gatewayResponse: mongoose.Schema.Types.Mixed,
    },
    failureReason: {
      type: String,
      trim: true,
    },
    refund: {
      amount: {
        type: Number,
        default: 0,
        min: [0, "Refund amount cannot be negative"],
      },
      date: Date,
      reason: String,
      refundTransactionId: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk performa
paymentSchema.index({ bookingId: 1 });
paymentSchema.index({ providerTransactionId: 1 });
paymentSchema.index({ paymentStatus: 1 });
paymentSchema.index({ paymentDate: 1 });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
