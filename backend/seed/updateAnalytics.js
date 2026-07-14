import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import Workshop from "../models/workshops.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const updateAnalytics = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for updating analytics...");
    
    const workshops = await Workshop.find({});
    
    for (const w of workshops) {
      if (!w.analytics) {
        w.analytics = {};
      }
      // Assign random realistic values
      w.analytics.rating = (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1); // 4.2 to 5.0
      w.analytics.views = Math.floor(Math.random() * 50000) + 1000; // 1k to 51k
      w.analytics.enrolledCount = Math.floor(Math.random() * 10000) + 100; // 100 to 10k
      await w.save();
    }
    
    console.log("Successfully updated all workshops with analytics data!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating analytics:", error);
    process.exit(1);
  }
};

updateAnalytics();
