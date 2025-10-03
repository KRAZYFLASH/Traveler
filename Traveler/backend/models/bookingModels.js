import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    bookingType: {
      type: String,
      required: [true, "Booking type is required"],
      enum: ["schedule", "combo", "destination"],
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Reference ID is required"],
    },
    bookingNumber: {
      type: String,
      required: [true, "Booking number is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Booking number cannot exceed 50 characters"],
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    travelDate: {
      type: Date,
      required: [true, "Travel date is required"],
    },
    returnDate: Date,
    pricing: {
      totalAmount: {
        type: Number,
        required: [true, "Total amount is required"],
        min: [0, "Total amount cannot be negative"],
      },
      discountAmount: {
        type: Number,
        default: 0,
        min: [0, "Discount amount cannot be negative"],
      },
      finalAmount: {
        type: Number,
        required: [true, "Final amount is required"],
        min: [0, "Final amount cannot be negative"],
      },
      currency: {
        type: String,
        default: "IDR",
        maxlength: [3, "Currency code cannot exceed 3 characters"],
      },
    },
    promoCode: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: [50, "Promo code cannot exceed 50 characters"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded", "partial_refund"],
      default: "pending",
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "no_show"],
      default: "pending",
    },
    cancellation: {
      reason: String,
      cancelledAt: Date,
      refundAmount: {
        type: Number,
        min: [0, "Refund amount cannot be negative"],
      },
      refundDate: Date,
    },
    specialRequests: {
      type: String,
      trim: true,
    },
    contactInfo: {
      name: {
        type: String,
        required: [true, "Contact name is required"],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, "Contact phone is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Contact email is required"],
        trim: true,
        lowercase: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const bookingPassengerSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Booking ID is required"],
      ref: "Booking",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      enum: ["Mr", "Mrs", "Ms", "Dr"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [255, "First name cannot exceed 255 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [255, "Last name cannot exceed 255 characters"],
    },
    fullName: {
      type: String,
      trim: true,
    },
    identification: {
      type: {
        type: String,
        required: [true, "ID type is required"],
        enum: ["ktp", "passport", "sim"],
      },
      number: {
        type: String,
        required: [true, "ID number is required"],
        trim: true,
        maxlength: [50, "ID number cannot exceed 50 characters"],
      },
    },
    birthDate: Date,
    nationality: {
      type: String,
      default: "Indonesia",
      maxlength: [100, "Nationality cannot exceed 100 characters"],
    },
    contact: {
      phone: {
        type: String,
        maxlength: [20, "Phone cannot exceed 20 characters"],
      },
      email: {
        type: String,
        maxlength: [255, "Email cannot exceed 255 characters"],
      },
    },
    passengerType: {
      type: String,
      required: [true, "Passenger type is required"],
      enum: ["adult", "child", "infant"],
    },
    preferences: {
      seat: {
        type: String,
        maxlength: [50, "Seat preference cannot exceed 50 characters"],
      },
      meal: {
        type: String,
        maxlength: [50, "Meal preference cannot exceed 50 characters"],
      },
      specialNeeds: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk performa
bookingSchema.index({ userId: 1 });
bookingSchema.index({ bookingNumber: 1 }, { unique: true });
bookingSchema.index({ referenceId: 1 });
bookingSchema.index({ travelDate: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ bookingStatus: 1 });

bookingPassengerSchema.index({ bookingId: 1 });
bookingPassengerSchema.index({ "identification.number": 1 });
bookingPassengerSchema.index({ passengerType: 1 });

// Pre-save middleware untuk generate fullName
bookingPassengerSchema.pre("save", function (next) {
  this.fullName = this.lastName
    ? `${this.firstName} ${this.lastName}`
    : this.firstName;
  next();
});

// Generate booking number
bookingSchema.pre("save", function (next) {
  if (this.isNew && !this.bookingNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    this.bookingNumber = `TRV${year}${month}${day}${random}`;
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
const BookingPassenger = mongoose.model(
  "BookingPassenger",
  bookingPassengerSchema
);

export { Booking, BookingPassenger };
