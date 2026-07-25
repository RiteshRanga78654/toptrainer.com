import mongoose from "mongoose";

const heroImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    caption: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const HeroImage = mongoose.model("HeroImage", heroImageSchema);

export default HeroImage;
