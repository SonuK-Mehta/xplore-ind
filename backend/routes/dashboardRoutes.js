import express from "express";
import {
  createPlace,
  getUserDashboard,
  getPlaceById,
  updatePlace,
  deletePlace,
} from "../controllers/dashboardController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected Route - Dashboard Data
router.post("/", authMiddleware, createPlace); // Create a new place
router.get("/", authMiddleware, getUserDashboard); // Get all places
router.get("/:id", authMiddleware, getPlaceById); // Get place by ID
router.put("/:id", authMiddleware, updatePlace); // Update place
router.delete("/:id", authMiddleware, deletePlace); // Delete place

export default router;
