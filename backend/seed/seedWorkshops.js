import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import Workshop from "../models/workshops.js";
import { dummyWorkshops } from "../data/workshopData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedWorkshops = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB...");

    // Create a dummy admin ID to act as the creator
    const dummyAdminId = new mongoose.Types.ObjectId();
    
    console.log("Processing dummy workshops...");
    
    // Fetch all trainers to map them to workshops
    const TrainerProfile = (await import("../models/trainerProfile.js")).default;
    const trainers = await TrainerProfile.find({});
    
    const workshopsToInsert = dummyWorkshops.map(workshop => {
      // Find a trainer matching the competency
      const matchingTrainer = trainers.find(t => 
        t.expertiseDomain?.competencies?.includes(workshop.classification.competency)
      );
      
      return {
        ...workshop,
        assignedTrainer: matchingTrainer ? matchingTrainer._id : null
      };
    });

    console.log("Inserting dummy workshops...");
    await Workshop.insertMany(workshopsToInsert);

    console.log("Workshops seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedWorkshops();
