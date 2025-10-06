import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // Tentukan folder uploads berdasarkan field name
    let uploadPath = "uploads/";

    if (file.fieldname === "image") {
      uploadPath = "uploads/images/";
    } else if (file.fieldname === "profilePhoto") {
      uploadPath = "uploads/profiles/";
    } else if (file.fieldname === "logo") {
      uploadPath = "uploads/logos/";
    }

    callback(null, uploadPath);
  },
  filename: function (req, file, callback) {
    // Generate unique filename dengan timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + uniqueSuffix + ext;
    callback(null, name);
  },
});

// File filter untuk validasi tipe file
const fileFilter = (req, file, callback) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return callback(null, true);
  } else {
    callback(
      new Error("Only image files (jpeg, jpg, png, gif, webp) are allowed!")
    );
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5, // Maximum 5 files
  },
  fileFilter: fileFilter,
});

// Error handling middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 5MB.",
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "Too many files. Maximum is 5 files.",
      });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: "Unexpected field name in form data.",
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
};

// Optional upload middleware (tidak error jika tidak ada file)
const optionalUpload = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        return handleMulterError(err, req, res, next);
      }
      // Continue even if no file uploaded
      next();
    });
  };
};

export default upload;
export { handleMulterError, optionalUpload };
