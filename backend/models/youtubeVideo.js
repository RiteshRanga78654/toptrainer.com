import mongoose from "mongoose";

const youtubeVideoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("YoutubeVideo", youtubeVideoSchema);
