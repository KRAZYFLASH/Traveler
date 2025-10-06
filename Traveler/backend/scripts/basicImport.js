import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import only models with correct exports
import User from "../models/userModels.js";
import Location from "../models/locationModels.js";
import TransportationOperator from "../models/transportationOperatorModels.js";
import Promotion from "../models/promoModels.js";

// Basic sample data untuk testing
const sampleData = {
  users: [
    {
      _id: "USR-001-ADMIN",
      email: "admin@traveler.com",
      phone: "081234567890",
      name: "Administrator Traveler",
      password: "$2b$10$example.hash.here",
      role: "admin",
      verified: true,
      status: "active",
    },
    {
      _id: "USR-002-JOHN",
      email: "john.doe@email.com",
      phone: "081234567891",
      name: "John Doe",
      password: "$2b$10$example.hash.here",
      role: "customer",
      verified: true,
      status: "active",
    },
  ],

  locations: [
    {
      _id: "LOC-CGKAIRPORT",
      code: "CGK",
      name: "Soekarno-Hatta International Airport",
      type: "airport",
      city: "Tangerang",
      province: "Banten",
      country: "Indonesia",
      coordinates: { lat: -6.1275, lng: 106.6537 },
      facilities: ["wifi", "lounge", "food_court"],
      status: "active",
    },
    {
      _id: "LOC-JOGAIRPORT",
      code: "YIA",
      name: "Yogyakarta International Airport",
      type: "airport",
      city: "Yogyakarta",
      province: "DI Yogyakarta",
      country: "Indonesia",
      coordinates: { lat: -7.9004, lng: 110.0537 },
      facilities: ["wifi", "lounge", "food_court"],
      status: "active",
    },
  ],

  transportationOperators: [
    {
      _id: "OP-GARUDA001",
      name: "Garuda Indonesia",
      code: "GA",
      type: "airline",
      description: "Maskapai penerbangan nasional Indonesia",
      logo: "https://example.com/garuda-logo.png",
      country: "Indonesia",
      contactInfo: {
        phone: "0804-1-807-807",
        email: "reservations@garuda-indonesia.com",
      },
      rating: 4.5,
      totalReviews: 15420,
      status: "active",
    },
  ],

  promotions: [
    {
      _id: "PROMO-NEWYEAR2024",
      code: "NEWYEAR25",
      title: "Promo Tahun Baru 2025",
      description: "Diskon spesial untuk perjalanan di awal tahun 2025",
      type: "percentage",
      value: 25,
      maxDiscount: 300000,
      minSpend: 500000,
      appliesTo: ["all"],
      validPeriod: {
        startDate: new Date("2024-12-25"),
        endDate: new Date("2025-01-31"),
      },
      usage: {
        quota: 1000,
        usedCount: 45,
        userLimit: 1,
      },
      status: "active",
    },
  ],
};

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/traveler";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const clearDatabase = async () => {
  try {
    console.log("🗑️  Clearing existing data...");

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    for (const collection of collections) {
      try {
        await mongoose.connection.db.collection(collection.name).deleteMany({});
        console.log(`   ✅ Cleared ${collection.name}`);
      } catch (error) {
        console.log(`   ⚠️  Error clearing ${collection.name}`);
      }
    }

    console.log("✅ Database cleared successfully");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
  }
};

const importData = async () => {
  try {
    console.log("📥 Starting data import...");

    // Import Users
    console.log("👤 Importing users...");
    await User.insertMany(sampleData.users);
    console.log(`   ✅ Imported ${sampleData.users.length} users`);

    // Import Locations
    console.log("📍 Importing locations...");
    await Location.insertMany(sampleData.locations);
    console.log(`   ✅ Imported ${sampleData.locations.length} locations`);

    // Import Transportation Operators
    console.log("🚌 Importing transportation operators...");
    await TransportationOperator.insertMany(sampleData.transportationOperators);
    console.log(
      `   ✅ Imported ${sampleData.transportationOperators.length} operators`
    );

    // Import Promotions
    console.log("🎫 Importing promotions...");
    await Promotion.insertMany(sampleData.promotions);
    console.log(`   ✅ Imported ${sampleData.promotions.length} promotions`);

    console.log("🎉 All data imported successfully!");
  } catch (error) {
    console.error("❌ Error importing data:", error);
    console.error("Error details:", error.message);
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        console.error(`   - ${key}: ${error.errors[key].message}`);
      });
    }
    throw error;
  }
};

const verifyImport = async () => {
  try {
    console.log("🔍 Verifying import...");

    const counts = {
      users: await User.countDocuments(),
      locations: await Location.countDocuments(),
      transportationOperators: await TransportationOperator.countDocuments(),
      promotions: await Promotion.countDocuments(),
    };

    console.log("📊 Import Summary:");
    console.log("================================");
    Object.entries(counts).forEach(([collection, count]) => {
      console.log(
        `   ${collection.padEnd(20)}: ${count.toString().padStart(3)} documents`
      );
    });
    console.log("================================");

    // Test sample queries
    console.log("🧪 Testing sample queries...");

    const sampleUser = await User.findOne({ email: "john.doe@email.com" });
    console.log(`   ✅ Found sample user: ${sampleUser?.name || "Not found"}`);

    const sampleLocation = await Location.findOne({ code: "CGK" });
    console.log(
      `   ✅ Found sample location: ${sampleLocation?.name || "Not found"}`
    );

    const sampleOperator = await TransportationOperator.findOne({ code: "GA" });
    console.log(
      `   ✅ Found sample operator: ${sampleOperator?.name || "Not found"}`
    );

    console.log("✅ Verification completed successfully!");
  } catch (error) {
    console.error("❌ Error during verification:", error);
  }
};

const main = async () => {
  try {
    console.log("🚀 Starting basic data import to MongoDB...");
    console.log("============================================");

    await connectDB();
    await clearDatabase();
    await importData();
    await verifyImport();

    console.log("✅ Import process completed successfully!");
    console.log("============================================");
  } catch (error) {
    console.error("❌ Import process failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔐 Database connection closed");
    process.exit(0);
  }
};

// Execute
main();
