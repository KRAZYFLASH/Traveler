// Index file untuk mengekspor semua models
// Memudahkan import models di berbagai bagian aplikasi

// User & Authentication Models
export { default as User } from "./userModels.js";

// Location & Route Models
export { default as Location } from "./locationModels.js";
export { default as Route } from "./routeModels.js";

// Transportation Models
export { default as TransportationOperator } from "./transportationOperatorModels.js";
export { default as Vehicle } from "./vehicleModels.js";
export { default as Schedule } from "./scheduleModels.js";

// Destination Models
export { DestinationCategory, Destination } from "./destinationModels.js";

// Commerce Models
export { default as Promotion } from "./promoModels.js";
export { ComboPackage, ComboComponent } from "./comboModels.js";

// Booking & Transaction Models
export { Booking, BookingPassenger } from "./bookingModels.js";
export { default as Payment } from "./paymentModels.js";

// Social & Communication Models
export { default as Review } from "./reviewModels.js";
export { default as Notification } from "./notificationModels.js";

// System Models
export { SystemSetting, FAQ, ActivityLog } from "./systemModels.js";
