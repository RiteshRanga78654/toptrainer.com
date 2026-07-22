import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Article from "../models/Article.js";
import Admin from "../models/admin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

const seedSplitArticles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clear existing dummy articles
    await Article.deleteMany({});
    console.log("Cleared existing articles.");

    // Get an admin user
    let admin = await Admin.findOne();
    if (!admin) {
        admin = { _id: new mongoose.Types.ObjectId() };
    }

    // TRAINER ARTICLES (Focused on training, coaching, technical skills)
    const trainerArticles = [
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        creatorType: "TrainerProfile",
        createdBy: new mongoose.Types.ObjectId().toString(),
        coverImage: { url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200", publicId: "t_1" },
        author: "Coach Sarah",
        title: "5 Exercises to Improve Posture",
        category: "Wellness",
        shortDescription: "Sitting all day? These 5 simple stretches will reverse the damage of the desk worker slouch.",
        tags: ["Fitness", "Health", "Posture"],
        sections: [{ type: "paragraph", content: "Good posture isn't just about looking confident, it's about spinal health." }],
        status: "published"
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        creatorType: "TrainerProfile",
        createdBy: new mongoose.Types.ObjectId().toString(),
        coverImage: { url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200", publicId: "t_2" },
        author: "Dev Lead Mike",
        title: "Understanding React Hooks",
        category: "Technical",
        shortDescription: "A practical guide to useState and useEffect for beginner frontend developers.",
        tags: ["React", "JavaScript", "Frontend"],
        sections: [{ type: "paragraph", content: "Hooks changed the way we write React components forever." }],
        status: "published"
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        creatorType: "TrainerProfile",
        createdBy: new mongoose.Types.ObjectId().toString(),
        coverImage: { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200", publicId: "t_3" },
        author: "Data Scientist Anna",
        title: "Intro to Python for Data Analysis",
        category: "Data Science",
        shortDescription: "Learn how to use Pandas and NumPy to clean and analyze your first dataset.",
        tags: ["Python", "Data", "Analytics"],
        sections: [{ type: "paragraph", content: "Data is everywhere, but it's useless if you can't read it." }],
        status: "published"
      }
    ];

    // ADMIN ARTICLES (Focused on platform announcements, global news, official TopTrainer content)
    const adminArticles = [
      {
        trainer: new mongoose.Types.ObjectId().toString(), // dummy ref to satisfy schema
        creatorType: "Admin",
        createdBy: admin._id,
        coverImage: { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200", publicId: "a_1" },
        author: "TopTrainer Official",
        title: "Welcome to the New TopTrainer Platform",
        category: "Announcements",
        shortDescription: "We've completely redesigned our platform to help you connect with expert trainers faster than ever.",
        tags: ["Platform", "News", "Update"],
        sections: [
          { type: "heading", content: "A New Era of Learning" },
          { type: "paragraph", content: "Our mission has always been to bridge the gap between eager learners and world-class experts. Today, we're taking a massive leap forward." }
        ],
        status: "published"
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        creatorType: "Admin",
        createdBy: admin._id,
        coverImage: { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200", publicId: "a_2" },
        author: "TopTrainer Trust & Safety",
        title: "Our Commitment to Quality Coaching",
        category: "Community Guidelines",
        shortDescription: "How we vet our trainers and ensure that every session you book meets our rigorous quality standards.",
        tags: ["Trust", "Safety", "Community"],
        sections: [
          { type: "heading", content: "Vetting Process" },
          { type: "paragraph", content: "Every trainer on our platform goes through a strict 3-step verification process to ensure they have the real-world experience they claim." }
        ],
        status: "published"
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        creatorType: "Admin",
        createdBy: admin._id,
        coverImage: { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200", publicId: "a_3" },
        author: "TopTrainer Events",
        title: "Announcing the 2026 Global Leadership Summit",
        category: "Events",
        shortDescription: "Join us this fall for a 3-day virtual summit featuring keynote speeches from Fortune 500 CEOs.",
        tags: ["Summit", "Leadership", "Events"],
        sections: [
          { type: "heading", content: "Save the Date" },
          { type: "paragraph", content: "Mark your calendars for October 15th. Early bird tickets go on sale next week." }
        ],
        status: "published"
      }
    ];

    const allArticles = [...trainerArticles, ...adminArticles];
    const inserted = await Article.insertMany(allArticles);
    
    console.log(`Successfully seeded ${inserted.length} distinct articles (Half Trainer, Half Admin).`);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding articles:", error);
    mongoose.connection.close();
  }
};

seedSplitArticles();
