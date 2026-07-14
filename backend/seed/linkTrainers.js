import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import Workshop from "../models/workshops.js";
import TrainerProfile from "../models/trainerProfile.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const linkTrainers = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB...");

    const workshops = await Workshop.find({});
    
    for (let workshop of workshops) {
      if (workshop.classification && workshop.classification.competency) {
        // Find a trainer that has this competency
        const trainer = await TrainerProfile.findOne({
          "expertiseDomain.competencies": workshop.classification.competency
        });

        if (trainer) {
          workshop.assignedTrainer = trainer._id;
          await workshop.save();
          console.log(`Linked workshop "${workshop.basicInformation.title}" to trainer "${trainer.fullName}"`);
        } else {
          console.log(`No trainer found for competency: ${workshop.classification.competency}`);
        }
      }
    }

    console.log("Finished linking trainers to workshops!");
    process.exit();
  } catch (error) {
    console.error("Error linking data:", error);
    process.exit(1);
  }
};

linkTrainers();
