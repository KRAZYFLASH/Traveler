import User from "../models/userModels.js";
import Location from "../models/locationModels.js";
import TransportationOperator from "../models/transportationOperatorModels.js";
import Promotion from "../models/promoModels.js";
import {
  Destination,
  DestinationCategory,
} from "../models/destinationModels.js";
import mongoose from "mongoose";

// Data dummy destination categories
const destinationCategoriesData = [
  {
    name: "Historical Sites",
    icon: "🏛️",
    color: "#8B4513",
    description: "Ancient temples and historical landmarks",
    status: "active",
  },
  {
    name: "Natural Attractions",
    icon: "🌊",
    color: "#4682B4",
    description: "Beautiful natural landscapes and landmarks",
    status: "active",
  },
];

// Data dummy users
const usersData = [
  {
    name: "Admin Traveler",
    email: "admin@traveler.com",
    password: "$2a$10$X8Y2QNzXCOHGtFq4.Y3lCuzRzKqVlSU0r7ZQH8NLwfF1t2R9vT.0a", // admin123
    phone: "+62812345678",
    dateOfBirth: new Date("1990-01-01"),
    gender: "male",
    role: "admin",
    verified: true,
    profilePhoto:
      "https://ui-avatars.com/api/?name=Admin+Traveler&background=0066cc&color=fff",
    address: {
      street: "Jl. Admin No. 1",
      city: "Jakarta",
      province: "DKI Jakarta",
      postalCode: "10110",
      country: "Indonesia",
    },
    preferences: {
      language: "id",
      currency: "IDR",
      notifications: true,
      newsletter: true,
    },
  },
  {
    name: "John Doe",
    email: "john.doe@gmail.com",
    password: "$2a$10$X8Y2QNzXCOHGtFq4.Y3lCuzRzKqVlSU0r7ZQH8NLwfF1t2R9vT.0a", // password123
    phone: "+62812345679",
    dateOfBirth: new Date("1985-05-15"),
    gender: "male",
    role: "customer",
    verified: true,
    profilePhoto:
      "https://ui-avatars.com/api/?name=John+Doe&background=28a745&color=fff",
    address: {
      street: "Jl. Customer No. 2",
      city: "Bandung",
      province: "West Java",
      postalCode: "40111",
      country: "Indonesia",
    },
    preferences: {
      language: "id",
      currency: "IDR",
      notifications: true,
      newsletter: false,
    },
  },
  {
    name: "Jane Smith",
    email: "jane.smith@gmail.com",
    password: "$2a$10$X8Y2QNzXCOHGtFq4.Y3lCuzRzKqVlSU0r7ZQH8NLwfF1t2R9vT.0a", // password123
    phone: "+62812345680",
    dateOfBirth: new Date("1992-08-20"),
    gender: "female",
    role: "customer",
    verified: true,
    profilePhoto:
      "https://ui-avatars.com/api/?name=Jane+Smith&background=dc3545&color=fff",
    address: {
      street: "Jl. Customer No. 3",
      city: "Surabaya",
      province: "East Java",
      postalCode: "60111",
      country: "Indonesia",
    },
    preferences: {
      language: "id",
      currency: "IDR",
      notifications: true,
      newsletter: true,
    },
  },
];

// Data dummy locations
const locationsData = [
  {
    code: "CGK",
    name: "Soekarno-Hatta International Airport",
    type: "airport",
    address: "Jl. Raya Bandara",
    city: "Tangerang",
    province: "Banten",
    country: "Indonesia",
    coordinates: { lat: -6.1256, lng: 106.6556 },
    facilities: ["wifi", "food_court", "duty_free", "lounge", "parking"],
    timezone: "Asia/Jakarta",
    status: "active",
  },
  {
    code: "DPS",
    name: "Ngurah Rai International Airport",
    type: "airport",
    address: "Jl. Raya Gusti Ngurah Rai",
    city: "Badung",
    province: "Bali",
    country: "Indonesia",
    coordinates: { lat: -8.7467, lng: 115.1675 },
    facilities: ["wifi", "food_court", "duty_free", "spa", "parking"],
    timezone: "Asia/Makassar",
    status: "active",
  },
  {
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
    code: "YK",
    name: "Stasiun Yogyakarta",
    type: "train_station",
    address: "Jl. Pasar Kembang No.1",
    city: "Yogyakarta",
    province: "DI Yogyakarta",
    country: "Indonesia",
    coordinates: { lat: -7.7956, lng: 110.3695 },
    facilities: ["wifi", "waiting_room", "food_court", "parking"],
    timezone: "Asia/Jakarta",
    status: "active",
  },
];

// Data dummy transportation operators
const operatorsData = [
  {
    name: "Garuda Indonesia",
    code: "GA",
    type: "airline",
    description:
      "Maskapai penerbangan nasional Indonesia dengan layanan premium",
    logo: "https://logos-world.net/wp-content/uploads/2023/01/Garuda-Indonesia-Logo.png",
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
    name: "Lion Air",
    code: "JT",
    type: "airline",
    description: "Maskapai penerbangan terjangkau dengan rute domestik luas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Lion_Air_logo.svg/1200px-Lion_Air_logo.svg.png",
    country: "Indonesia",
    contactInfo: {
      phone: "0804-1-778-899",
      email: "callcenter@lionair.co.id",
      website: "https://lionair.co.id",
    },
    rating: 4.0,
    totalReviews: 8950,
    amenities: ["online_checkin", "seat_selection", "baggage_tracking"],
    status: "active",
  },
  {
    name: "PT KAI",
    code: "KAI",
    type: "train",
    description: "Kereta Api Indonesia - transportasi kereta api nasional",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Logo_PT_KAI.svg/1200px-Logo_PT_KAI.svg.png",
    country: "Indonesia",
    contactInfo: {
      phone: "121",
      email: "halo@kai.id",
      website: "https://kai.id",
    },
    rating: 4.3,
    totalReviews: 12800,
    amenities: ["ac", "power_outlet", "wifi", "food_service"],
    status: "active",
  },
];

// Data dummy promotions
const promotionsData = [
  {
    code: "WELCOME50",
    title: "Welcome New User",
    description: "Diskon 50% untuk pengguna baru maksimal Rp 100,000",
    type: "percentage",
    value: 50,
    maxDiscount: 100000,
    minSpend: 200000,
    appliesTo: ["all"],
    validPeriod: {
      startDate: new Date("2024-01-01"),
      endDate: new Date("2025-12-31"),
    },
    usage: {
      quota: 1000,
      usedCount: 250,
      userLimit: 1,
    },
    userEligibility: ["new_user"],
    termsConditions:
      "Berlaku untuk pengguna baru. Tidak dapat digabung dengan promo lain.",
    status: "active",
  },
  {
    code: "HOLIDAY20",
    title: "Holiday Special",
    description: "Diskon 20% untuk semua perjalanan liburan",
    type: "percentage",
    value: 20,
    maxDiscount: 500000,
    minSpend: 1000000,
    appliesTo: ["all"],
    validPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2025-01-15"),
    },
    usage: {
      quota: 500,
      usedCount: 120,
      userLimit: 2,
    },
    userEligibility: ["all"],
    termsConditions: "Berlaku untuk semua jenis transportasi dan destinasi.",
    status: "active",
  },
];

// Data dummy destinations (will be updated with actual category IDs)
let destinationsData = [
  {
    name: "Borobudur Temple",
    categoryId: null, // Will be set after categories are created
    location: {
      city: "Magelang",
      province: "Central Java",
      country: "Indonesia",
      coordinates: { latitude: -7.6079, longitude: 110.2038 },
    },
    description: "Ancient Buddhist temple and UNESCO World Heritage Site",
    priceRange: "Rp 50,000 - Rp 200,000",
    rating: 4.8,
    totalReviews: 1250,
    tags: ["Historical", "Religious", "UNESCO"],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Borobudur-perfect-buddhas.jpg/1200px-Borobudur-perfect-buddhas.jpg",
        caption: "Borobudur Temple main view",
        isMain: true,
      },
    ],
    facilities: [
      { name: "Parking", available: true, description: "Free parking area" },
      {
        name: "Toilet",
        available: true,
        description: "Clean restroom facilities",
      },
      {
        name: "Gift Shop",
        available: true,
        description: "Souvenir and gift shop",
      },
      {
        name: "Restaurant",
        available: true,
        description: "Local and international cuisine",
      },
    ],
    operatingHours: {
      monday: { open: "06:00", close: "17:00" },
      tuesday: { open: "06:00", close: "17:00" },
      wednesday: { open: "06:00", close: "17:00" },
      thursday: { open: "06:00", close: "17:00" },
      friday: { open: "06:00", close: "17:00" },
      saturday: { open: "06:00", close: "17:00" },
      sunday: { open: "06:00", close: "17:00" },
    },
    contactInfo: {
      phone: "0293-788266",
      email: "info@borobudurpark.com",
      website: "https://borobudurpark.com",
      address: "Borobudur, Magelang, Central Java, Indonesia",
    },
    status: "active",
  },
  {
    name: "Tanah Lot",
    categoryId: null, // Will be set after categories are created
    location: {
      city: "Tabanan",
      province: "Bali",
      country: "Indonesia",
      coordinates: { latitude: -8.6211, longitude: 115.0868 },
    },
    description: "Iconic sea temple perched on a rocky outcrop",
    priceRange: "Rp 30,000 - Rp 60,000",
    rating: 4.6,
    totalReviews: 890,
    tags: ["Temple", "Sunset", "Photography"],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Tanah_Lot.jpg/1200px-Tanah_Lot.jpg",
        caption: "Tanah Lot Temple at sunset",
        isMain: true,
      },
    ],
    facilities: [
      { name: "Parking", available: true, description: "Large parking area" },
      {
        name: "Toilet",
        available: true,
        description: "Clean restroom facilities",
      },
      { name: "Restaurant", available: true, description: "Sea view dining" },
      {
        name: "Souvenir Shop",
        available: true,
        description: "Local handicrafts and souvenirs",
      },
    ],
    operatingHours: {
      monday: { open: "07:00", close: "19:00" },
      tuesday: { open: "07:00", close: "19:00" },
      wednesday: { open: "07:00", close: "19:00" },
      thursday: { open: "07:00", close: "19:00" },
      friday: { open: "07:00", close: "19:00" },
      saturday: { open: "07:00", close: "19:00" },
      sunday: { open: "07:00", close: "19:00" },
    },
    contactInfo: {
      phone: "0361-812345",
      email: "info@tanahlot.com",
      website: "https://tanahlot.com",
      address: "Beraban, Kediri, Tabanan Regency, Bali, Indonesia",
    },
    status: "active",
  },
];

// Import all data function
export const importAllData = async (req, res) => {
  try {
    console.log("🚀 Starting complete data import...");

    // 1. Import destination categories first
    console.log("📁 Importing destination categories...");
    const categories = await DestinationCategory.insertMany(
      destinationCategoriesData
    );
    console.log(`✅ Created ${categories.length} destination categories`);

    // 2. Update destinations with actual category IDs
    destinationsData[0].categoryId = categories[0]._id; // Historical Sites
    destinationsData[1].categoryId = categories[1]._id; // Natural Attractions

    // 3. Import users
    console.log("👤 Importing users...");
    const users = await User.insertMany(usersData);
    console.log(`✅ Created ${users.length} users`);

    // 4. Import locations
    console.log("📍 Importing locations...");
    const locations = await Location.insertMany(locationsData);
    console.log(`✅ Created ${locations.length} locations`);

    // 5. Import operators
    console.log("🚌 Importing transportation operators...");
    const operators = await TransportationOperator.insertMany(operatorsData);
    console.log(`✅ Created ${operators.length} operators`);

    // 6. Import promotions
    console.log("🎫 Importing promotions...");
    const promotions = await Promotion.insertMany(promotionsData);
    console.log(`✅ Created ${promotions.length} promotions`);

    // 7. Import destinations
    console.log("🏛️ Importing destinations...");
    const destinations = await Destination.insertMany(destinationsData);
    console.log(`✅ Created ${destinations.length} destinations`);

    console.log("🎉 All data imported successfully!");

    res.json({
      success: true,
      message: "All data imported successfully",
      data: {
        categories: categories.length,
        users: users.length,
        locations: locations.length,
        operators: operators.length,
        promotions: promotions.length,
        destinations: destinations.length,
      },
    });
  } catch (error) {
    console.error("❌ Import failed:", error);
    res.status(500).json({
      success: false,
      message: "Gagal import data",
      error: error.message,
    });
  }
};

// Individual import functions
export const importUsers = async (req, res) => {
  try {
    const users = await User.insertMany(usersData);
    res.json({
      success: true,
      message: `Successfully imported ${users.length} users`,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to import users",
      error: error.message,
    });
  }
};

export const importLocations = async (req, res) => {
  try {
    const locations = await Location.insertMany(locationsData);
    res.json({
      success: true,
      message: `Successfully imported ${locations.length} locations`,
      data: locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to import locations",
      error: error.message,
    });
  }
};

export const importOperators = async (req, res) => {
  try {
    const operators = await TransportationOperator.insertMany(operatorsData);
    res.json({
      success: true,
      message: `Successfully imported ${operators.length} operators`,
      data: operators,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to import operators",
      error: error.message,
    });
  }
};

export const importPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.insertMany(promotionsData);
    res.json({
      success: true,
      message: `Successfully imported ${promotions.length} promotions`,
      data: promotions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to import promotions",
      error: error.message,
    });
  }
};

export const importDestinations = async (req, res) => {
  try {
    // First create categories if they don't exist
    const existingCategories = await DestinationCategory.find();
    if (existingCategories.length === 0) {
      const categories = await DestinationCategory.insertMany(
        destinationCategoriesData
      );
      destinationsData[0].categoryId = categories[0]._id;
      destinationsData[1].categoryId = categories[1]._id;
    } else {
      destinationsData[0].categoryId = existingCategories[0]._id;
      destinationsData[1].categoryId = existingCategories[1]._id;
    }

    const destinations = await Destination.insertMany(destinationsData);
    res.json({
      success: true,
      message: `Successfully imported ${destinations.length} destinations`,
      data: destinations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to import destinations",
      error: error.message,
    });
  }
};

// Get data count
export const getDataCount = async (req, res) => {
  try {
    const counts = {
      users: await User.countDocuments(),
      locations: await Location.countDocuments(),
      operators: await TransportationOperator.countDocuments(),
      promotions: await Promotion.countDocuments(),
      destinations: await Destination.countDocuments(),
      categories: await DestinationCategory.countDocuments(),
    };

    res.json({
      success: true,
      message: "Data count retrieved successfully",
      data: counts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get data count",
      error: error.message,
    });
  }
};

// Cleanup functions (optional)
export const deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} users`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete users",
      error: error.message,
    });
  }
};

export const deleteAllLocations = async (req, res) => {
  try {
    const result = await Location.deleteMany({});
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} locations`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete locations",
      error: error.message,
    });
  }
};

export const deleteAllOperators = async (req, res) => {
  try {
    const result = await TransportationOperator.deleteMany({});
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} operators`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete operators",
      error: error.message,
    });
  }
};

export const deleteAllPromotions = async (req, res) => {
  try {
    const result = await Promotion.deleteMany({});
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} promotions`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete promotions",
      error: error.message,
    });
  }
};

export const deleteAllDestinations = async (req, res) => {
  try {
    const resultDest = await Destination.deleteMany({});
    const resultCat = await DestinationCategory.deleteMany({});
    res.json({
      success: true,
      message: `Deleted ${resultDest.deletedCount} destinations and ${resultCat.deletedCount} categories`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete destinations",
      error: error.message,
    });
  }
};
