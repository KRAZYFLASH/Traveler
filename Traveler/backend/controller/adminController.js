import { v2 as cloudinary } from "cloudinary";
import Promotion from "../models/promoModels.js";
import jwt from "jsonwebtoken";

// API for adding promo
const addPromo = async (req, res) => {
  try {
    const {
      code,
      title,
      description,
      type, // "percentage" | "fixed" | "buy_one_get_one"
      value,
      maxDiscount,
      minSpend,
      appliesTo, // string[]: ["flight","train",...,"all"]
      targetOperators, // ObjectId[] (string id mongo)
      targetRoutes, // ObjectId[] (string id mongo)
      validPeriod, // object { startDate, endDate } atau string JSON
      usage, // object { quota, usedCount, userLimit } atau string JSON
      termsConditions,
      status, // "active" | "inactive" | "expired"
    } = req.body;

    // Validasi required fields
    if (!code || !title || !type || !value) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: code, title, type, value",
      });
    }

    // Parse JSON strings jika ada
    let parsedValidPeriod, parsedUsage, parsedAppliesTo;

    try {
      parsedValidPeriod =
        typeof validPeriod === "string" ? JSON.parse(validPeriod) : validPeriod;
      parsedUsage = typeof usage === "string" ? JSON.parse(usage) : usage;
      parsedAppliesTo =
        typeof appliesTo === "string" ? JSON.parse(appliesTo) : appliesTo;
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid JSON format in validPeriod, usage, or appliesTo fields",
      });
    }

    // Handle image upload ke cloudinary jika ada
    let imageUrl = null;
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "image",
        });
        imageUrl = result.secure_url;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image to cloudinary",
          error: uploadError.message,
        });
      }
    }

    // Create promotion object
    const promoData = {
      code: code.toUpperCase(),
      title,
      description,
      image: imageUrl,
      type,
      value: Number(value),
      maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
      minSpend: minSpend ? Number(minSpend) : 0,
      appliesTo: parsedAppliesTo || ["all"],
      targetOperators: targetOperators
        ? Array.isArray(targetOperators)
          ? targetOperators
          : [targetOperators]
        : [],
      targetRoutes: targetRoutes
        ? Array.isArray(targetRoutes)
          ? targetRoutes
          : [targetRoutes]
        : [],
      validPeriod: {
        startDate: new Date(parsedValidPeriod?.startDate),
        endDate: new Date(parsedValidPeriod?.endDate),
      },
      usage: {
        quota: parsedUsage?.quota ? Number(parsedUsage.quota) : undefined,
        usedCount: 0,
        userLimit: parsedUsage?.userLimit ? Number(parsedUsage.userLimit) : 1,
      },
      termsConditions,
      status: status || "active",
    };

    // Validasi tanggal
    if (promoData.validPeriod.endDate <= promoData.validPeriod.startDate) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Save to database
    const newPromo = new Promotion(promoData);
    const savedPromo = await newPromo.save();

    res.status(201).json({
      success: true,
      message: "Promotion created successfully",
      data: savedPromo,
    });
  } catch (error) {
    console.error("Add Promo Error:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Promo code already exists",
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationErrors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// API Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Cek kredensial admin
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    
  }
}

export { addPromo, adminLogin };
