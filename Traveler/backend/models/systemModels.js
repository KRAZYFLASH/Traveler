import mongoose from "mongoose";

const systemSettingSchema = new mongoose.Schema(
  {
    keyName: {
      type: String,
      required: [true, "Key name is required"],
      unique: true,
      trim: true,
      maxlength: [100, "Key name cannot exceed 100 characters"],
    },
    value: {
      type: String,
      required: [true, "Value is required"],
    },
    dataType: {
      type: String,
      enum: ["string", "number", "boolean", "json"],
      default: "string",
    },
    category: {
      type: String,
      default: "general",
      maxlength: [50, "Category cannot exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const faqSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: [100, "Category cannot exceed 100 characters"],
    },
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
    },
    orderIndex: {
      type: Number,
      default: 0,
    },
    helpfulCount: {
      type: Number,
      default: 0,
      min: [0, "Helpful count cannot be negative"],
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

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    action: {
      type: String,
      required: [true, "Action is required"],
      maxlength: [100, "Action cannot exceed 100 characters"],
    },
    entityType: {
      type: String,
      maxlength: [50, "Entity type cannot exceed 50 characters"],
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    oldData: mongoose.Schema.Types.Mixed,
    newData: mongoose.Schema.Types.Mixed,
    ipAddress: {
      type: String,
      maxlength: [45, "IP address cannot exceed 45 characters"],
    },
    userAgent: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk performa
systemSettingSchema.index({ keyName: 1 }, { unique: true });
systemSettingSchema.index({ category: 1 });
systemSettingSchema.index({ isPublic: 1 });

faqSchema.index({ category: 1 });
faqSchema.index({ orderIndex: 1 });
faqSchema.index({ status: 1 });

activityLogSchema.index({ userId: 1 });
activityLogSchema.index({ action: 1 });
activityLogSchema.index({ entityType: 1, entityId: 1 });
activityLogSchema.index({ createdAt: -1 });

const SystemSetting = mongoose.model("SystemSetting", systemSettingSchema);
const FAQ = mongoose.model("FAQ", faqSchema);
const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export { SystemSetting, FAQ, ActivityLog };
