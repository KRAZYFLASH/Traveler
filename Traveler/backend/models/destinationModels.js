import mongoose from "mongoose";

const destinationCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [255, "Name cannot exceed 255 characters"],
    },
    icon: {
      type: String,
      maxlength: [10, "Icon cannot exceed 10 characters"],
    },
    color: {
      type: String,
      maxlength: [7, "Color cannot exceed 7 characters"],
      match: [/^#[0-9A-F]{6}$/i, "Color must be a valid hex color"],
    },
    description: {
      type: String,
      trim: true,
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

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
      maxlength: [255, "Name cannot exceed 255 characters"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Category ID is required"],
      ref: "DestinationCategory",
    },
    location: {
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
        maxlength: [100, "City cannot exceed 100 characters"],
      },
      province: {
        type: String,
        required: [true, "Province is required"],
        trim: true,
        maxlength: [100, "Province cannot exceed 100 characters"],
      },
      country: {
        type: String,
        default: "Indonesia",
        maxlength: [100, "Country cannot exceed 100 characters"],
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
    },
    description: {
      type: String,
      trim: true,
    },
    priceRange: {
      type: String,
      maxlength: [50, "Price range cannot exceed 50 characters"],
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
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
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
        isMain: {
          type: Boolean,
          default: false,
        },
      },
    ],
    facilities: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        available: {
          type: Boolean,
          default: true,
        },
        description: String,
      },
    ],
    operatingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    contactInfo: {
      phone: {
        type: String,
        maxlength: [20, "Phone cannot exceed 20 characters"],
      },
      email: {
        type: String,
        maxlength: [255, "Email cannot exceed 255 characters"],
      },
      website: {
        type: String,
        maxlength: [255, "Website cannot exceed 255 characters"],
      },
      address: {
        type: String,
        maxlength: [500, "Address cannot exceed 500 characters"],
      },
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
destinationCategorySchema.index({ status: 1 });
destinationSchema.index({ categoryId: 1 });
destinationSchema.index({ "location.city": 1 });
destinationSchema.index({ "location.province": 1 });
destinationSchema.index({ rating: -1 });
destinationSchema.index({ status: 1 });
destinationSchema.index({ tags: 1 });

const DestinationCategory = mongoose.model(
  "DestinationCategory",
  destinationCategorySchema
);
const Destination = mongoose.model("Destination", destinationSchema);

export { DestinationCategory, Destination };
