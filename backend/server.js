// Imports Packages
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// connect to MongoDB
connectDB();

// Import Routes
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Import Middleware
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/test", testRoutes);
app.use("/api", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/map", authMiddleware, mapRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

//  Global Error Handler
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`.bgCyan.white);
});

/*
 * © 2025 Sonu Mehta. All rights reserved.
 * The content, design, and code of this website are the property of Sonu Mehta.
 * Unauthorized use, reproduction, or redistribution is prohibited.
 * For permission to use, please contact **https://github.com/sonuk-mehta**.
 */
