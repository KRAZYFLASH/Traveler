import express from "express";
import {
  importAllData,
  importUsers,
  importLocations,
  importOperators,
  importPromotions,
  importDestinations,
  getDataCount,
} from "../controller/importController.js";

const importRouter = express.Router();

// Route untuk import semua data sekaligus
importRouter.post("/all", importAllData);

// Routes untuk import data spesifik
importRouter.post("/users", importUsers);
importRouter.post("/locations", importLocations);
importRouter.post("/operators", importOperators);
importRouter.post("/promotions", importPromotions);
importRouter.post("/destinations", importDestinations);

// Route untuk cek jumlah data
importRouter.get("/count", getDataCount);

// Route info
importRouter.get("/", (req, res) => {
  res.json({
    message: "Import Data API",
    endpoints: {
      "POST /api/import/all": "Import semua data dummy",
      "POST /api/import/users": "Import users",
      "POST /api/import/locations": "Import locations",
      "POST /api/import/operators": "Import transportation operators",
      "POST /api/import/promotions": "Import promotions",
      "POST /api/import/destinations": "Import destinations",
      "GET /api/import/count": "Get jumlah data",
    },
  });
});

export default importRouter;
