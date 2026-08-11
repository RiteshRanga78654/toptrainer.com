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
    // Which page these hero images belong to. Keeps the homepage slider
    // and the workshops-page slider independent while reusing the same
    // model/endpoints.
    scope: {
      type: String,
      enum: ["homepage", "workshops"],
      default: "homepage",
    },
  },
  { timestamps: true }
);

const HeroImage = mongoose.model("HeroImage", heroImageSchema);

export default HeroImage;