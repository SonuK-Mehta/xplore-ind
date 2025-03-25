import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    image: { type: String }, // Optional: Store image URL
  },
  { timestamps: true }
);

export default mongoose.model("Place", placeSchema);

/*
 * © 2025 Sonu Mehta. All rights reserved.
 * The content, design, and code of this website are the property of Sonu Mehta.
 * Unauthorized use, reproduction, or redistribution is prohibited.
 * For permission to use, please contact **https://github.com/sonuk-mehta**.
 */
