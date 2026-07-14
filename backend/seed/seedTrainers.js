import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import User from "../models/user.js";
import TrainerProfile from "../models/trainerProfile.js";
import { dummyTrainers } from "../data/trainerData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedTrainers = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB...");

    console.log("Inserting dummy trainers...");
    for (const trainer of dummyTrainers) {
      const { userData, profileData } = trainer;

      // Check if user already exists
      let user = await User.findOne({ email: userData.email });
      if (!user) {
        user = await User.create(userData);
        console.log(`Created user: ${user.email}`);
      }

      let profile = await TrainerProfile.findOne({ email: profileData.contactInfo.email });
      if (!profile) {
        await TrainerProfile.create({
          ...profileData,
          email: userData.email,
          password: userData.password,
          user: user._id,
        });
        console.log(`Created trainer profile for: ${profileData.fullName}`);
      }
    }

    console.log("Trainers seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedTrainers();
