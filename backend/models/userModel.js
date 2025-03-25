import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10; // 🔹 Define salt rounds as a constant

// Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // 🔹 Convert email to lowercase for consistency
      validate: [validator.isEmail, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // 🔹 Ensure password is never returned in queries
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols",
      },
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

// 🔹 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

// 🔹 Compare Password
userSchema.methods.comparePassword = async function (userPassword) {
  return bcrypt.compare(userPassword, this.password);
};

// 🔹 Generate JWT Token
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d", // Configurable expiration
  });
};

export default mongoose.model("User", userSchema);

/*
 * © 2025 Sonu Mehta. All rights reserved.
 * The content, design, and code of this website are the property of Sonu Mehta.
 * Unauthorized use, reproduction, or redistribution is prohibited.
 * For permission to use, please contact **https://github.com/sonuk-mehta**.
 */
