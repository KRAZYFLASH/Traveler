import mongoose from "mongoose";

const comboPackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Package name is required"],
      trim: true,
      maxlength: [255, "Name cannot exceed 255 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      maxlength: [500, "Image URL cannot exceed 500 characters"],
    },
    duration: {
      type: String,
      maxlength: [20, "Duration cannot exceed 20 characters"],
    },
    pricing: {
      basePrice: {
        type: Number,
        required: [true, "Base price is required"],
        min: [0, "Base price cannot be negative"],
      },
      discountPercent: {
        type: Number,
        min: [0, "Discount percent cannot be negative"],
        max: [100, "Discount percent cannot exceed 100"],
        default: 0,
      },
      finalPrice: {
        type: Number,
        required: [true, "Final price is required"],
        min: [0, "Final price cannot be negative"],
      },
      currency: {
        type: String,
        default: "IDR",
        maxlength: [3, "Currency code cannot exceed 3 characters"],
      },
    },
    includes: [
      {
        type: String,
        trim: true,
      },
    ],
    excludes: [
      {
        type: String,
        trim: true,
      },
    ],
    itinerary: [
      {
        day: {
          type: Number,
          required: true,
          min: [1, "Day must be at least 1"],
        },
        title: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        activities: [
          {
            time: String,
            activity: String,
            location: String,
          },
        ],
      },
    ],
    termsConditions: {
      type: String,
      trim: true,
    },
    participants: {
      min: {
        type: Number,
        default: 1,
        min: [1, "Min participants must be at least 1"],
      },
      max: {
        type: Number,
        min: [1, "Max participants must be at least 1"],
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
    status: {
      type: String,
      enum: ["active", "inactive", "sold_out"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const comboComponentSchema = new mongoose.Schema(
  {
    comboId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Combo ID is required"],
      ref: "ComboPackage",
    },
    componentType: {
      type: String,
      required: [true, "Component type is required"],
      enum: ["schedule", "destination", "hotel", "meal", "activity"],
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Reference ID is required"],
    },
    componentOrder: {
      type: Number,
      required: [true, "Component order is required"],
      min: [1, "Component order must be at least 1"],
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, "Quantity must be at least 1"],
    },
    optional: {
      type: Boolean,
      default: false,
    },
    additionalPrice: {
      type: Number,
      default: 0,
      min: [0, "Additional price cannot be negative"],
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk performa
comboPackageSchema.index({ "pricing.finalPrice": 1 });
comboPackageSchema.index({ rating: -1 });
comboPackageSchema.index({ status: 1 });

comboComponentSchema.index({ comboId: 1 });
comboComponentSchema.index({ componentType: 1 });
comboComponentSchema.index({ componentOrder: 1 });

// Virtual untuk calculate savings
comboPackageSchema.virtual("savings").get(function () {
  return this.pricing.basePrice - this.pricing.finalPrice;
});

const ComboPackage = mongoose.model("ComboPackage", comboPackageSchema);
const ComboComponent = mongoose.model("ComboComponent", comboComponentSchema);

export { ComboPackage, ComboComponent };
