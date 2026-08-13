import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Leadership",
        "Communication",
        "Data Analysis",
        "Project Management",
        "Other",
      ],
      required: true,
    },

    format: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      required: true,
    },

    audienceSize: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Requirement", requirementSchema);