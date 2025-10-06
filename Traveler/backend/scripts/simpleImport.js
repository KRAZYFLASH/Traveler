import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import all models with correct export format
import User from "../models/userModels.js";
import Location from "../models/locationModels.js";
import Route from "../models/routeModels.js";
import TransportationOperator from "../models/transportationOperatorModels.js";
import Vehicle from "../models/vehicleModels.js";
import Schedule from "../models/scheduleModels.js";
import Destination from "../models/destinationModels.js";
import { ComboPackage } from "../models/comboModels.js";
import Promotion from "../models/promoModels.js";

// Complete sample data
const sampleData = {
  // Users
  users: [
    {
      _id: "USR-001-ADMIN",
      email: "admin@traveler.com",
      phone: "081234567890",
      name: "Administrator Traveler",
      password: "$2b$10$example.hash.here",
      role: "admin",
      verified: true,
      dateOfBirth: new Date("1990-01-01"),
      gender: "male",
      address: {
        street: "Jl. Admin No.1",
        city: "Jakarta",
        province: "DKI Jakarta",
        postalCode: "10110",
        country: "Indonesia",
      },
      preferences: {
        notifications: true,
        newsletter: true,
        currency: "IDR",
        language: "id",
      },
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
      dateOfBirth: new Date("1985-03-15"),
      gender: "male",
      address: {
        street: "Jl. Sudirman No.123",
        city: "Jakarta",
        province: "DKI Jakarta",
        postalCode: "12190",
        country: "Indonesia",
      },
      preferences: {
        notifications: true,
        newsletter: true,
        transportPreference: ["flight", "train"],
        classPreference: "business",
        currency: "IDR",
        language: "id",
      },
      status: "active",
    },
  ],

  // Locations
  locations: [
    {
      _id: "LOC-CGKAIRPORT",
      code: "CGK",
      name: "Soekarno-Hatta International Airport",
      type: "airport",
      address: "Pajang, Benda, Tangerang City",
      city: "Tangerang",
      province: "Banten",
      country: "Indonesia",
      coordinates: { lat: -6.1275, lng: 106.6537 },
      facilities: ["wifi", "lounge", "food_court", "atm", "parking"],
      timezone: "Asia/Jakarta",
      status: "active",
    },
    {
      _id: "LOC-JOGAIRPORT",
      code: "YIA",
      name: "Yogyakarta International Airport",
      type: "airport",
      address: "Jl. Raya Palagan Tentara Pelajar",
      city: "Yogyakarta",
      province: "DI Yogyakarta",
      country: "Indonesia",
      coordinates: { lat: -7.9004, lng: 110.0537 },
      facilities: ["wifi", "lounge", "food_court", "car_rental"],
      timezone: "Asia/Jakarta",
      status: "active",
    },
    {
      _id: "LOC-GMRSTATION",
      code: "GMR",
      name: "Stasiun Gambir",
      type: "train_station",
      address: "Jl. Medan Merdeka Timur No.1",
      city: "Jakarta Pusat",
      province: "DKI Jakarta",
      country: "Indonesia",
      coordinates: { lat: -6.1744, lng: 106.8294 },
      facilities: ["wifi", "waiting_room", "food_court", "atm"],
      timezone: "Asia/Jakarta",
      status: "active",
    },
  ],

  // Transportation Operators
  transportationOperators: [
    {
      _id: "OP-GARUDA001",
      name: "Garuda Indonesia",
      code: "GA",
      type: "airline",
      description:
        "Maskapai penerbangan nasional Indonesia dengan layanan premium",
      logo: "https://example.com/garuda-logo.png",
      country: "Indonesia",
      contactInfo: {
        phone: "0804-1-807-807",
        email: "reservations@garuda-indonesia.com",
        website: "https://garuda-indonesia.com",
      },
      rating: 4.5,
      totalReviews: 15420,
      amenities: ["wifi", "entertainment", "meal_service", "priority_boarding"],
      status: "active",
    },
    {
      _id: "OP-KAI001",
      name: "PT Kereta Api Indonesia",
      code: "KAI",
      type: "train",
      description: "Perusahaan kereta api nasional Indonesia",
      logo: "https://example.com/kai-logo.png",
      country: "Indonesia",
      contactInfo: {
        phone: "121",
        email: "halo@kai.id",
        website: "https://kai.id",
      },
      rating: 4.4,
      totalReviews: 12500,
      amenities: ["ac", "meal_service", "wifi", "power_outlet"],
      status: "active",
    },
  ],

  // Routes
  routes: [
    {
      _id: "ROUTE-CGK-YIA-001",
      code: "CGK-YIA",
      originCode: "CGK",
      destinationCode: "YIA",
      distanceKm: 435,
      transportType: "air",
      estimatedDurationMinutes: 75,
      status: "active",
    },
    {
      _id: "ROUTE-GMR-YK-001",
      code: "GMR-YK",
      originCode: "GMR",
      destinationCode: "YK",
      distanceKm: 561,
      transportType: "rail",
      estimatedDurationMinutes: 465,
      status: "active",
    },
  ],

  // Vehicles
  vehicles: [
    {
      _id: "VEH-GARUDA-B738-001",
      operatorId: "OP-GARUDA001",
      name: "Boeing 737-800",
      type: "aircraft",
      model: "Boeing 737-800",
      registrationNumber: "PK-GMA",
      capacityPassengers: 189,
      facilities: ["wifi", "entertainment", "meal_service"],
      seatClasses: [
        { class: "economy", capacity: 160, features: ["standard_seat"] },
        { class: "business", capacity: 29, features: ["lie_flat_seat"] },
      ],
      status: "active",
    },
  ],

  // Destinations
  destinations: [
    {
      _id: "DEST-BOROBUDUR",
      name: "Candi Borobudur",
      description:
        "Candi Buddha terbesar di dunia dan situs warisan dunia UNESCO",
      location: "Magelang, Jawa Tengah",
      category: "cultural",
      priceRange: { min: 50000, max: 200000 },
      rating: 4.7,
      totalReviews: 8420,
      images: ["https://example.com/borobudur.jpg"],
      features: ["sunrise_tour", "guided_tour", "photo_spots"],
      includes: ["entrance_ticket", "local_guide"],
      excludes: ["personal_expenses", "meals"],
      termsConditions:
        "Tiket berlaku untuk 1 hari. Anak di bawah 3 tahun gratis.",
      coordinates: { lat: -7.6079, lng: 110.2038 },
      status: "active",
    },
  ],

  // Promotions
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
      termsConditions: "Berlaku untuk semua jenis transportasi.",
      status: "active",
    },
  ],
};

// MongoDB connection
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
        console.log(`   ⚠️  Error clearing ${collection.name}:`, error.message);
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
    if (sampleData.users.length > 0) {
      console.log("👤 Importing users...");
      await User.insertMany(sampleData.users);
      console.log(`   ✅ Imported ${sampleData.users.length} users`);
    }

    // Import Locations
    if (sampleData.locations.length > 0) {
      console.log("📍 Importing locations...");
      await Location.insertMany(sampleData.locations);
      console.log(`   ✅ Imported ${sampleData.locations.length} locations`);
    }

    // Import Transportation Operators
    if (sampleData.transportationOperators.length > 0) {
      console.log("🚌 Importing transportation operators...");
      await TransportationOperator.insertMany(
        sampleData.transportationOperators
      );
      console.log(
        `   ✅ Imported ${sampleData.transportationOperators.length} operators`
      );
    }

    // Import Routes
    if (sampleData.routes.length > 0) {
      console.log("🛣️  Importing routes...");
      await Route.insertMany(sampleData.routes);
      console.log(`   ✅ Imported ${sampleData.routes.length} routes`);
    }

    // Import Vehicles
    if (sampleData.vehicles.length > 0) {
      console.log("🚗 Importing vehicles...");
      await Vehicle.insertMany(sampleData.vehicles);
      console.log(`   ✅ Imported ${sampleData.vehicles.length} vehicles`);
    }

    // Import Destinations
    if (sampleData.destinations.length > 0) {
      console.log("🏛️  Importing destinations...");
      await Destination.insertMany(sampleData.destinations);
      console.log(
        `   ✅ Imported ${sampleData.destinations.length} destinations`
      );
    }

    // Import Promotions
    if (sampleData.promotions.length > 0) {
      console.log("🎫 Importing promotions...");
      await Promotion.insertMany(sampleData.promotions);
      console.log(`   ✅ Imported ${sampleData.promotions.length} promotions`);
    }

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
      routes: await Route.countDocuments(),
      vehicles: await Vehicle.countDocuments(),
      destinations: await Destination.countDocuments(),
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
    console.log("🚀 Starting SQL to MongoDB import process...");
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

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default main;
