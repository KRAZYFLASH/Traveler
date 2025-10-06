import express from "express";
import { addPromo, adminLogin,  } from "../controller/adminController.js";
import upload, {
  handleMulterError,
  optionalUpload,
} from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

// Route dengan optional upload untuk image
adminRouter.post(
  "/add-promo",
  authAdmin,
  optionalUpload("image"),
  handleMulterError,
  addPromo
);

adminRouter.post("/login", adminLogin) 

export default adminRouter;
