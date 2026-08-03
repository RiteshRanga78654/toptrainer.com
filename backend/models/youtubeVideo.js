import mongoose from "mongoose";

const youtubeVideoSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      default: "",
      trim: true,
    },

    scope: {
      type: String,
      enum: ["home", "entity"],
      required: true,
      default: "home",
    },

    entityType: {
      type: String,
      enum: ["Industry", "Department", "Competency"],
      default: null,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "entityType",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("YoutubeVideo", youtubeVideoSchema);