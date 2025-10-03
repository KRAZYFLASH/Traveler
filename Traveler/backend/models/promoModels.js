import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Promo code is required"],
      unique: true,
      trim: true,
      uppercase: true,
      maxlength: [50, "Code cannot exceed 50 characters"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [255, "Title cannot exceed 255 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      maxlength: [500, "Image URL cannot exceed 500 characters"],
    },
    type: {
      type: String,
      required: [true, "Promo type is required"],
      enum: ["percentage", "fixed", "buy_one_get_one"],
    },
    value: {
      type: Number,
      required: [true, "Promo value is required"],
      min: [0, "Value cannot be negative"],
    },
    maxDiscount: {
      type: Number,
      min: [0, "Max discount cannot be negative"],
    },
    minSpend: {
      type: Number,
      min: [0, "Min spend cannot be negative"],
      default: 0,
    },
    appliesTo: [
      {
        type: String,
        enum: [
          "flight",
          "train",
          "bus",
          "ship",
          "rental",
          "combo",
          "destination",
          "all",
        ],
      },
    ],
    targetOperators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TransportationOperator",
      },
    ],
    targetRoutes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Route",
      },
    ],
    validPeriod: {
      startDate: {
        type: Date,
        required: [true, "Start date is required"],
      },
      endDate: {
        type: Date,
        required: [true, "End date is required"],
      },
    },
    usage: {
      quota: {
        type: Number,
        min: [1, "Quota must be at least 1"],
      },
      usedCount: {
        type: Number,
        default: 0,
        min: [0, "Used count cannot be negative"],
      },
      userLimit: {
        type: Number,
        default: 1,
        min: [1, "User limit must be at least 1"],
      },
    },
    termsConditions: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk performa
promotionSchema.index({ code: 1 }, { unique: true });
promotionSchema.index({ "validPeriod.startDate": 1, "validPeriod.endDate": 1 });
promotionSchema.index({ status: 1 });
promotionSchema.index({ appliesTo: 1 });

// Validasi tanggal
promotionSchema.pre("save", function (next) {
  if (this.validPeriod.endDate <= this.validPeriod.startDate) {
    return next(new Error("End date must be after start date"));
  }
  next();
});

// Virtual untuk cek apakah promo masih tersedia
promotionSchema.virtual("isAvailable").get(function () {
  const now = new Date();
  const hasQuota = !this.usage.quota || this.usage.usedCount < this.usage.quota;
  const isActive = this.status === "active";
  const isValid =
    now >= this.validPeriod.startDate && now <= this.validPeriod.endDate;

  return hasQuota && isActive && isValid;
});

const Promotion = mongoose.model("Promotion", promotionSchema);

export default Promotion;
