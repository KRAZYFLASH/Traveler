import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Import models
import User from "../models/userModels.js";
import Location from "../models/locationModels.js";
import TransportationOperator from "../models/transportationOperatorModels.js";
import Promotion from "../models/promoModels.js";

// Sample data dengan ObjectId yang bisa auto-generate
const sampleData = {
  users: [
    {
      email: "admin@traveler.com",
      phone: "081234567890",
      name: "Administrator Traveler",
      password: "$2b$10$example.hash.here",
      role: "admin",
      verified: true,
      status: "active",
    },
    {
      email: "john.doe@email.com",
      phone: "081234567891",
      name: "John Doe",
      password: "$2b$10$example.hash.here",
      role: "customer",
      verified: true,
      status: "active",
    },
    {
      email: "jane.smith@email.com",
      phone: "081234567892",
      name: "Jane Smith",
      password: "$2b$10$example.hash.here",
      role: "customer",
      verified: true,
      status: "active",
    },
  ],

  locations: [
    {
      code: "CGK",
      name: "Soekarno-Hatta International Airport",
      type: "airport",
      city: "Tangerang",
      province: "Banten",
      country: "Indonesia",
      coordinates: { lat: -6.1275, lng: 106.6537 },
      facilities: ["wifi", "lounge", "food_court", "atm", "parking"],
      status: "active",
    },
    {
      code: "YIA",
      name: "Yogyakarta International Airport",
      type: "airport",
      city: "Yogyakarta",
      province: "DI Yogyakarta",
      country: "Indonesia",
      coordinates: { lat: -7.9004, lng: 110.0537 },
      facilities: ["wifi", "lounge", "food_court", "car_rental"],
      status: "active",
    },
    {
      code: "DPS",
      name: "Ngurah Rai International Airport",
      type: "airport",
      city: "Denpasar",
      province: "Bali",
      country: "Indonesia",
      coordinates: { lat: -8.7467, lng: 115.1669 },
      facilities: ["wifi", "lounge", "duty_free", "spa"],
      status: "active",
    },
    {
      code: "GMR",
      name: "Stasiun Gambir",
      type: "train_station",
      city: "Jakarta Pusat",
      province: "DKI Jakarta",
      country: "Indonesia",
      coordinates: { lat: -6.1744, lng: 106.8294 },
      facilities: ["wifi", "waiting_room", "food_court", "atm"],
      status: "active",
    },
    {
      code: "YK",
      name: "Stasiun Yogyakarta",
      type: "train_station",
      city: "Yogyakarta",
      province: "DI Yogyakarta",
      country: "Indonesia",
      coordinates: { lat: -7.7891, lng: 110.3641 },
      facilities: ["wifi", "waiting_room", "parking"],
      status: "active",
    },
  ],

  transportationOperators: [
    {
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
      status: "active",
    },
    {
      name: "Lion Air",
      code: "JT",
      type: "airline",
      description:
        "Maskapai penerbangan low-cost carrier terbesar di Indonesia",
      logo: "https://example.com/lionair-logo.png",
      country: "Indonesia",
      contactInfo: {
        phone: "0804-1-778-899",
        email: "callcenter@lionair.co.id",
        website: "https://lionair.co.id",
      },
      rating: 4.2,
      totalReviews: 8930,
      status: "active",
    },
    {
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
      status: "active",
    },
    {
      name: "PO Primajasa",
      code: "PJ",
      type: "bus",
      description: "Perusahaan otobus terpercaya dengan layanan antar kota",
      logo: "https://example.com/primajasa-logo.png",
      country: "Indonesia",
      contactInfo: {
        phone: "0251-8324567",
        email: "info@primajasa.co.id",
        website: "https://primajasa.co.id",
      },
      rating: 4.2,
      totalReviews: 3420,
      status: "active",
    },
  ],

  promotions: [
    {
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
      termsConditions:
        "Berlaku untuk semua jenis transportasi. Tidak dapat digabung dengan promo lain.",
      status: "active",
    },
    {
      code: "EARLYBIRD50",
      title: "Early Bird Flight Deals",
      description:
        "Diskon untuk pemesanan tiket pesawat 30 hari sebelum keberangkatan",
      type: "fixed",
      value: 150000,
      maxDiscount: 150000,
      minSpend: 1000000,
      appliesTo: ["flight"],
      validPeriod: {
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-12-31"),
      },
      usage: {
        quota: 2000,
        usedCount: 234,
        userLimit: 2,
      },
      termsConditions:
        "Khusus untuk penerbangan domestik. Pemesanan minimal 30 hari sebelum keberangkatan.",
      status: "active",
    },
    {
      code: "STUDENT15",
      title: "Diskon Pelajar",
      description: "Diskon khusus untuk pelajar dan mahasiswa",
      type: "percentage",
      value: 15,
      maxDiscount: 200000,
      minSpend: 200000,
      appliesTo: ["all"],
      validPeriod: {
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-12-31"),
      },
      usage: {
        quota: 10000,
        usedCount: 1250,
        userLimit: 1,
      },
      termsConditions:
        "Wajib menunjukkan kartu pelajar/mahasiswa yang masih berlaku.",
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
    const insertedUsers = await User.insertMany(sampleData.users);
    console.log(`   ✅ Imported ${insertedUsers.length} users`);

    // Import Locations
    console.log("📍 Importing locations...");
    const insertedLocations = await Location.insertMany(sampleData.locations);
    console.log(`   ✅ Imported ${insertedLocations.length} locations`);

    // Import Transportation Operators
    console.log("🚌 Importing transportation operators...");
    const insertedOperators = await TransportationOperator.insertMany(
      sampleData.transportationOperators
    );
    console.log(`   ✅ Imported ${insertedOperators.length} operators`);

    // Import Promotions
    console.log("🎫 Importing promotions...");
    const insertedPromotions = await Promotion.insertMany(
      sampleData.promotions
    );
    console.log(`   ✅ Imported ${insertedPromotions.length} promotions`);

    console.log("🎉 All data imported successfully!");

    return {
      users: insertedUsers,
      locations: insertedLocations,
      operators: insertedOperators,
      promotions: insertedPromotions,
    };
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

    const samplePromotion = await Promotion.findOne({ code: "NEWYEAR25" });
    console.log(
      `   ✅ Found sample promotion: ${samplePromotion?.title || "Not found"}`
    );

    console.log("✅ Verification completed successfully!");

    return counts;
  } catch (error) {
    console.error("❌ Error during verification:", error);
  }
};

const main = async () => {
  try {
    console.log("🚀 Starting SQL to MongoDB data import...");
    console.log("===========================================");
    console.log(
      "📝 This script imports sample data from SQL structure to MongoDB"
    );
    console.log("===========================================");

    await connectDB();
    await clearDatabase();
    const imported = await importData();
    const counts = await verifyImport();

    console.log("===========================================");
    console.log("✅ Import process completed successfully!");
    console.log(
      `📊 Total documents imported: ${Object.values(counts).reduce(
        (a, b) => a + b,
        0
      )}`
    );
    console.log("===========================================");
    console.log("");
    console.log("🎯 Ready to use! Your MongoDB now contains:");
    console.log("   - User accounts (admin & customers)");
    console.log("   - Transportation locations (airports, stations)");
    console.log("   - Transportation operators (airlines, trains, buses)");
    console.log("   - Active promotions and discounts");
    console.log("");
    console.log("💡 You can now test the admin panel with this data!");
  } catch (error) {
    console.error("❌ Import process failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔐 Database connection closed");
  }
};

// Execute
main();
