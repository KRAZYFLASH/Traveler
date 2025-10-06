import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import all models
import { User } from "../models/userModels.js";
import { Location } from "../models/locationModels.js";
import { Route } from "../models/routeModels.js";
import { TransportationOperator } from "../models/transportationOperatorModels.js";
import { Vehicle } from "../models/vehicleModels.js";
import { Schedule } from "../models/scheduleModels.js";
import { Destination } from "../models/destinationModels.js";
import { ComboPackage } from "../models/comboModels.js";
import { Booking } from "../models/bookingModelsNew.js";
import { Promotion } from "../models/promoModels.js";
import { Review } from "../models/reviewModels.js";
import { Payment } from "../models/paymentModels.js";
import { Notification } from "../models/notificationModels.js";

// Complete sample data from SQL converted to MongoDB format
const sampleData = {
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
        transportPreference: [],
        classPreference: "business",
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
      profilePhoto: null,
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
    {
      _id: "USR-003-JANE",
      email: "jane.smith@email.com",
      phone: "081234567892",
      name: "Jane Smith",
      password: "$2b$10$example.hash.here",
      profilePhoto: null,
      role: "customer",
      verified: true,
      dateOfBirth: new Date("1992-07-22"),
      gender: "female",
      address: {
        street: "Jl. Malioboro No.45",
        city: "Yogyakarta",
        province: "DI Yogyakarta",
        postalCode: "55213",
        country: "Indonesia",
      },
      preferences: {
        notifications: true,
        newsletter: true,
        transportPreference: ["bus", "train"],
        classPreference: "economy",
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
    {
      _id: "LOC-YOGSTATION",
      code: "YK",
      name: "Stasiun Yogyakarta",
      type: "train_station",
      address: "Jl. Pasar Kembang No.1",
      city: "Yogyakarta",
      province: "DI Yogyakarta",
      country: "Indonesia",
      coordinates: { lat: -7.7891, lng: 110.3641 },
      facilities: ["wifi", "waiting_room", "parking"],
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
      policies: {
        cancellation: "Free cancellation up to 24 hours before departure",
        baggage: "20kg free baggage for economy, 30kg for business",
        checkin: "Online check-in opens 24 hours before departure",
      },
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
      policies: {
        cancellation: "No free cancellation",
        baggage: "20kg free baggage",
        checkin: "Online check-in opens 14 days before departure",
      },
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
      policies: {
        cancellation: "Cancellation allowed up to 3 hours before departure",
        baggage: "20kg free baggage",
        checkin: "Boarding 30 minutes before departure",
      },
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
      _id: "ROUTE-CGK-DPS-001",
      code: "CGK-DPS",
      originCode: "CGK",
      destinationCode: "DPS",
      distanceKm: 1150,
      transportType: "air",
      estimatedDurationMinutes: 135,
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
      capacityVehicles: 0,
      facilities: [
        "wifi",
        "entertainment",
        "meal_service",
        "priority_boarding",
      ],
      seatClasses: [
        {
          class: "economy",
          capacity: 160,
          features: ["standard_seat", "meal_service"],
          price: 850000,
        },
        {
          class: "business",
          capacity: 29,
          features: ["lie_flat_seat", "priority_boarding", "lounge_access"],
          price: 1500000,
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
      capacityVehicles: 0,
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
          features: ["reclining_seats", "meal_service", "wifi", "power_outlet"],
          price: 350000,
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
      contactInfo: {
        phone: "0293-788266",
        email: "info@borobudurpark.com",
        website: "https://borobudurpark.com",
      },
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
      contactInfo: {
        phone: "0335-541020",
        email: "info@bromotour.com",
        website: "https://bromotour.com",
      },
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
      duration: 7,
      pricing: {
        originalPrice: 4500000,
        discountedPrice: 3600000,
        discountPercent: 20,
        currency: "IDR",
      },
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
          meals: ["lunch", "dinner"],
          accommodation: "Hotel Yogyakarta 4*",
        },
        {
          day: 2,
          activities: [
            "Wisata Borobudur",
            "Wisata Prambanan",
            "Belanja di Malioboro",
          ],
          location: "Yogyakarta",
          meals: ["breakfast", "lunch"],
          accommodation: "Hotel Yogyakarta 4*",
        },
        {
          day: 3,
          activities: ["Perjalanan ke Malang", "Wisata Batu", "Check-in hotel"],
          location: "Malang",
          meals: ["breakfast", "dinner"],
          accommodation: "Hotel Malang 3*",
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
    {
      _id: "SCH-KAI-ARGO-GMR-YK-001",
      vehicleId: "VEH-KAI-ARGO-001",
      routeId: "ROUTE-GMR-YK-001",
      scheduleNumber: "KA-ARGO-101",
      departureTime: new Date("2024-01-15T06:00:00.000Z"),
      arrivalTime: new Date("2024-01-15T13:45:00.000Z"),
      durationMinutes: 465,
      frequency: {
        type: "daily",
        pattern: null,
      },
      validPeriod: {
        from: new Date("2024-01-01"),
        until: new Date("2024-12-31"),
      },
      pricing: {
        basePrice: 350000,
        currency: "IDR",
        seatClasses: [{ class: "eksekutif", price: 350000, availability: 300 }],
      },
      features: ["meal", "power_outlet", "wifi"],
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
    },
  ],
};

// MongoDB connection string
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/traveler";

// Fungsi untuk connect ke MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
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

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((col) => col.name);

    for (const collectionName of collectionNames) {
      try {
        await mongoose.connection.db.collection(collectionName).deleteMany({});
        console.log(`   ✅ Cleared ${collectionName}`);
      } catch (error) {
        console.log(`   ⚠️  Error clearing ${collectionName}:`, error.message);
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
    console.error("Error details:", error.message);
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

    // Test booking with passengers
    const sampleBooking = await Booking.findOne({
      bookingNumber: "TRV2024010100001",
    });
    console.log(
      `   ✅ Found sample booking with ${
        sampleBooking?.passengers?.length || 0
      } passengers`
    );

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
    console.error("Error details:", error.message);
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
