import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import Workshop from "../models/workshops.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const updatePricing = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB...");
    
    const workshops = await Workshop.find({});
    
    for (const w of workshops) {
      if (w.pricing && w.pricing.price) {
        w.pricing.originalPrice = Math.round(w.pricing.price * 1.5); // Example: 50% more
        w.pricing.discountedPrice = w.pricing.price; 
        w.pricing.emiPerMonth = Math.round(w.pricing.price / 3); // Example: 3 months EMI
        await w.save();
      }
    }
    
    console.log("Successfully updated all workshops with new pricing fields!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating pricing:", error);
    process.exit(1);
  }
};

updatePricing();
