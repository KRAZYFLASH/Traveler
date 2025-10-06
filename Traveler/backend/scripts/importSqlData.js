import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Import all models
import "../models/index.js";

// Get models
const User = mongoose.model("User");
const Location = mongoose.model("Location");
const Route = mongoose.model("Route");
const TransportationOperator = mongoose.model("TransportationOperator");
const Vehicle = mongoose.model("Vehicle");
const Schedule = mongoose.model("Schedule");
const Destination = mongoose.model("Destination");
const ComboPackage = mongoose.model("ComboPackage");
const Booking = mongoose.model("Booking");
const Promotion = mongoose.model("Promotion");
const Review = mongoose.model("Review");
const Payment = mongoose.model("Payment");
const Notification = mongoose.model("Notification");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample data dari SQL yang akan dikonversi ke format MongoDB
const sampleData = {
  // Locations data
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
      _id: "LOC-DPSAIRPORT",
      code: "DPS",
      name: "Ngurah Rai International Airport",
      type: "airport",
      address: "Jl. Raya Gusti Ngurah Rai",
      city: "Denpasar",
      province: "Bali",
      country: "Indonesia",
      coordinates: { lat: -8.7467, lng: 115.1669 },
      facilities: ["wifi", "lounge", "duty_free", "spa"],
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
      _id: "OP-LIONAIR001",
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
      amenities: ["wifi", "entertainment"],
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
      facilities: [
        "wifi",
        "entertainment",
        "meal_service",
        "priority_boarding",
      ],
      seatClasses: [
        { class: "economy", capacity: 160, features: ["standard_seat"] },
        {
          class: "business",
          capacity: 29,
          features: ["lie_flat_seat", "priority_boarding"],
        },
      ],
      specifications: {
        wingspan: "35.8m",
        length: "39.5m",
        cruiseSpeed: "842 km/h",
        range: "5765 km",
      },
      status: "active",
    },
    {
      _id: "VEH-KAI-ARGO-001",
      operatorId: "OP-KAI001",
      name: "Kereta Argo Bromo Anggrek",
      type: "train",
      model: "Kereta Eksekutif",
      registrationNumber: "KA-ARGO-001",
      capacityPassengers: 300,
      facilities: [
        "ac",
        "reclining_seats",
        "meal_service",
        "wifi",
        "power_outlet",
      ],
      seatClasses: [
        {
          class: "eksekutif",
          capacity: 300,
          features: ["reclining_seats", "meal_service", "wifi"],
        },
      ],
      specifications: {
        cars: 8,
        maxSpeed: "120 km/h",
        facilities: ["restaurant_car", "business_class"],
      },
      status: "active",
    },
  ],

  // Users
  users: [
    {
      _id: "USR-001-ADMIN",
      email: "admin@traveler.com",
      phone: "081234567890",
      name: "Administrator Traveler",
      password: "$2b$10$example.hash.here", // Hashed password
      profilePhoto: null,
      role: "admin",
      verified: true,
      preferences: {},
      dateOfBirth: new Date("1990-01-01"),
      gender: "male",
      address: {
        street: "Jl. Admin No.1",
        city: "Jakarta",
        province: "DKI Jakarta",
        postalCode: "10110",
        country: "Indonesia",
      },
      status: "active",
    },
    {
      _id: "USR-002-JOHN",
      email: "john.doe@email.com",
      phone: "081234567891",
      name: "John Doe",
      password: "$2b$10$example.hash.here", // Hashed password
      profilePhoto: null,
      role: "customer",
      verified: true,
      preferences: {
        transportPreference: ["flight", "train"],
        classPreference: "business",
      },
      dateOfBirth: new Date("1985-03-15"),
      gender: "male",
      address: {
        street: "Jl. Sudirman No.123",
        city: "Jakarta",
        province: "DKI Jakarta",
        postalCode: "12190",
        country: "Indonesia",
      },
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
      features: [
        "sunrise_tour",
        "guided_tour",
        "photo_spots",
        "cultural_heritage",
      ],
      includes: ["entrance_ticket", "local_guide", "transport_from_parking"],
      excludes: ["personal_expenses", "meals", "accommodation"],
      termsConditions:
        "Tiket berlaku untuk 1 hari. Anak di bawah 3 tahun gratis.",
      coordinates: { lat: -7.6079, lng: 110.2038 },
      openingHours: {
        monday: "06:00-17:00",
        tuesday: "06:00-17:00",
        wednesday: "06:00-17:00",
        thursday: "06:00-17:00",
        friday: "06:00-17:00",
        saturday: "06:00-17:00",
        sunday: "06:00-17:00",
      },
      status: "active",
    },
    {
      _id: "DEST-BROMO",
      name: "Gunung Bromo",
      description:
        "Gunung berapi aktif dengan pemandangan sunrise yang spektakuler",
      location: "Probolinggo, Jawa Timur",
      category: "nature",
      priceRange: { min: 150000, max: 500000 },
      rating: 4.6,
      totalReviews: 12350,
      images: ["https://example.com/bromo.jpg"],
      features: ["sunrise_tour", "jeep_tour", "horse_riding", "photography"],
      includes: ["jeep_transport", "entrance_ticket", "sunrise_viewpoint"],
      excludes: ["meals", "accommodation", "personal_guide"],
      termsConditions: "Tour dimulai dini hari pukul 03:00. Bawa jaket tebal.",
      coordinates: { lat: -7.9425, lng: 112.9531 },
      openingHours: {
        monday: "03:00-18:00",
        tuesday: "03:00-18:00",
        wednesday: "03:00-18:00",
        thursday: "03:00-18:00",
        friday: "03:00-18:00",
        saturday: "03:00-18:00",
        sunday: "03:00-18:00",
      },
      status: "active",
    },
  ],

  // Combo Packages
  comboPackages: [
    {
      _id: "COMBO-JAWABALI-001",
      name: "Paket Wisata Jawa-Bali 7 Hari",
      description:
        "Paket lengkap wisata Jawa-Bali mengunjungi Yogyakarta, Malang, Bromo, dan Bali",
      images: ["https://example.com/combo-jawabali.jpg"],
      duration: "7D6N",
      originalPrice: 4500000,
      discountedPrice: 3600000,
      discountPercentage: 20,
      maxParticipants: 20,
      rating: 4.5,
      totalReviews: 180,
      itinerary: [
        {
          day: 1,
          activities: [
            "Tiba di Yogyakarta",
            "City tour Yogyakarta",
            "Check-in hotel",
          ],
          location: "Yogyakarta",
        },
        {
          day: 2,
          activities: [
            "Wisata Borobudur",
            "Wisata Prambanan",
            "Belanja di Malioboro",
          ],
          location: "Yogyakarta",
        },
        {
          day: 3,
          activities: ["Perjalanan ke Malang", "Wisata Batu", "Check-in hotel"],
          location: "Malang",
        },
      ],
      includes: [
        "Accommodation 6 nights",
        "All transportation",
        "Entrance tickets",
        "Professional guide",
        "Some meals",
        "Airport transfers",
      ],
      excludes: [
        "International flights",
        "Personal expenses",
        "Travel insurance",
        "Tips for guide/driver",
        "Lunch & dinner on day 6",
      ],
      termsConditions:
        "Minimum 2 orang. Harga per orang. Include hotel 3-4 star. Dapat dibatalkan H-7 dengan penalti 25%.",
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
      image: "https://example.com/newyear-promo.jpg",
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
        "Berlaku untuk semua jenis transportasi. Tidak dapat digabung dengan promo lain. Valid untuk booking hingga 31 Januari 2025.",
      status: "active",
    },
    {
      _id: "PROMO-EARLYBIRD",
      code: "EARLYBIRD50",
      title: "Early Bird Flight Deals",
      description:
        "Diskon untuk pemesanan tiket pesawat 30 hari sebelum keberangkatan",
      image: "https://example.com/earlybird-promo.jpg",
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
        "Khusus untuk penerbangan domestik. Pemesanan minimal 30 hari sebelum keberangkatan. Berlaku untuk kelas ekonomi.",
      status: "active",
    },
  ],

  // Schedules
  schedules: [
    {
      _id: "SCH-GARUDA-CGK-YIA-001",
      vehicleId: "VEH-GARUDA-B738-001",
      routeId: "ROUTE-CGK-YIA-001",
      scheduleNumber: "GA-101",
      departureTime: new Date("2024-01-15T06:00:00.000Z"),
      arrivalTime: new Date("2024-01-15T07:15:00.000Z"),
      durationMinutes: 75,
      frequency: {
        type: "daily",
        pattern: null,
      },
      validPeriod: {
        from: new Date("2024-01-01"),
        until: new Date("2024-12-31"),
      },
      pricing: {
        basePrice: 850000,
        currency: "IDR",
        seatClasses: [
          { class: "economy", price: 850000, availability: 160 },
          { class: "business", price: 1500000, availability: 29 },
        ],
      },
      features: ["meal", "baggage_20kg", "seat_selection"],
      status: "scheduled",
    },
  ],

  // Bookings
  bookings: [
    {
      _id: "BOOK-001",
      bookingNumber: "TRV2024010100001",
      userId: "USR-002-JOHN",
      bookingType: "schedule",
      referenceId: "SCH-GARUDA-CGK-YIA-001",
      passengers: [
        {
          title: "Mr",
          firstName: "John",
          lastName: "Doe",
          idType: "ktp",
          idNumber: "3201234567890001",
          birthDate: new Date("1985-03-15"),
          nationality: "Indonesian",
          phone: "081234567891",
          email: "john.doe@email.com",
          passengerType: "adult",
          seatNumber: "12A",
          mealPreference: "regular",
        },
        {
          title: "Mrs",
          firstName: "Jane",
          lastName: "Doe",
          idType: "ktp",
          idNumber: "3201234567890002",
          birthDate: new Date("1987-08-22"),
          nationality: "Indonesian",
          phone: "081234567899",
          email: "jane.doe@email.com",
          passengerType: "adult",
          seatNumber: "12B",
          mealPreference: "regular",
        },
      ],
      bookingDate: new Date("2024-01-10T14:30:00.000Z"),
      travelDate: new Date("2024-01-15T06:00:00.000Z"),
      pricing: {
        totalAmount: 1700000,
        discountAmount: 0,
        finalAmount: 1700000,
        currency: "IDR",
      },
      paymentStatus: "paid",
      bookingStatus: "confirmed",
      specialRequests: "Window seat preference",
      contactInfo: {
        name: "John Doe",
        phone: "081234567891",
        email: "john.doe@email.com",
      },
    },
  ],
};

// Fungsi untuk connect ke MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/traveler", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Fungsi untuk clear existing data
const clearDatabase = async () => {
  try {
    console.log("🗑️  Clearing existing data...");

    const collections = [
      "users",
      "locations",
      "routes",
      "transportationoperators",
      "vehicles",
      "schedules",
      "destinations",
      "combopackages",
      "bookings",
      "promotions",
      "reviews",
      "payments",
      "notifications",
    ];

    for (const collection of collections) {
      try {
        await mongoose.connection.db.collection(collection).deleteMany({});
        console.log(`   ✅ Cleared ${collection}`);
      } catch (error) {
        console.log(
          `   ⚠️  ${collection} collection doesn't exist, skipping...`
        );
      }
    }

    console.log("✅ Database cleared successfully");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
  }
};

// Fungsi untuk import data
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

    // Import Routes
    console.log("🛣️  Importing routes...");
    await Route.insertMany(sampleData.routes);
    console.log(`   ✅ Imported ${sampleData.routes.length} routes`);

    // Import Vehicles
    console.log("🚗 Importing vehicles...");
    await Vehicle.insertMany(sampleData.vehicles);
    console.log(`   ✅ Imported ${sampleData.vehicles.length} vehicles`);

    // Import Destinations
    console.log("🏛️  Importing destinations...");
    await Destination.insertMany(sampleData.destinations);
    console.log(
      `   ✅ Imported ${sampleData.destinations.length} destinations`
    );

    // Import Combo Packages
    console.log("📦 Importing combo packages...");
    await ComboPackage.insertMany(sampleData.comboPackages);
    console.log(
      `   ✅ Imported ${sampleData.comboPackages.length} combo packages`
    );

    // Import Promotions
    console.log("🎫 Importing promotions...");
    await Promotion.insertMany(sampleData.promotions);
    console.log(`   ✅ Imported ${sampleData.promotions.length} promotions`);

    // Import Schedules
    console.log("📅 Importing schedules...");
    await Schedule.insertMany(sampleData.schedules);
    console.log(`   ✅ Imported ${sampleData.schedules.length} schedules`);

    // Import Bookings
    console.log("📋 Importing bookings...");
    await Booking.insertMany(sampleData.bookings);
    console.log(`   ✅ Imported ${sampleData.bookings.length} bookings`);

    console.log("🎉 All data imported successfully!");
  } catch (error) {
    console.error("❌ Error importing data:", error);
    throw error;
  }
};

// Fungsi untuk verify import
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
      comboPackages: await ComboPackage.countDocuments(),
      promotions: await Promotion.countDocuments(),
      schedules: await Schedule.countDocuments(),
      bookings: await Booking.countDocuments(),
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

    // Test user query
    const sampleUser = await User.findOne({ email: "john.doe@email.com" });
    console.log(`   ✅ Found sample user: ${sampleUser?.name}`);

    // Test location query
    const sampleLocation = await Location.findOne({ code: "CGK" });
    console.log(`   ✅ Found sample location: ${sampleLocation?.name}`);

    // Test operator query
    const sampleOperator = await TransportationOperator.findOne({ code: "GA" });
    console.log(`   ✅ Found sample operator: ${sampleOperator?.name}`);

    console.log("✅ Verification completed successfully!");
  } catch (error) {
    console.error("❌ Error during verification:", error);
  }
};

// Main execution function
const main = async () => {
  try {
    console.log("🚀 Starting SQL to MongoDB import process...");
    console.log("============================================");

    // Connect to database
    await connectDB();

    // Clear existing data
    await clearDatabase();

    // Import new data
    await importData();

    // Verify import
    await verifyImport();

    console.log("✅ Import process completed successfully!");
    console.log("============================================");
  } catch (error) {
    console.error("❌ Import process failed:", error);
  } finally {
    // Close database connection
    await mongoose.disconnect();
    console.log("🔐 Database connection closed");
    process.exit(0);
  }
};

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default {
  sampleData,
  connectDB,
  clearDatabase,
  importData,
  verifyImport,
  main,
};
