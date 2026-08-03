import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
  },
  { _id: false }
);

const statSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "Users" },
    num: { type: String, default: "" },
    lbl: { type: String, default: "" },
  },
  { _id: false }
);

const leadershipSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    role: { type: String, default: "" },
    desc: { type: String, default: "" },
    initials: { type: String, default: "" },
    image: { type: mediaSchema, default: () => ({}) },
    linkedin: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  { _id: false }
);


const teamSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    role: { type: String, default: "" },
    category: { type: String, default: "Marketing" },
    joined: { type: String, default: "" },
    initials: { type: String, default: "" },
    image: { type: mediaSchema, default: () => ({}) },
    linkedin: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  { _id: false }
);
const cultureSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    image: { type: mediaSchema, default: () => ({}) },
  },
  { _id: false }
);
const aboutPageSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, default: "" },
    heroSubtitle: { type: String, default: "" },
    heroBadgeLine1: { type: String, default: "" },
    heroBadgeLine2: { type: String, default: "" },
    heroImage: { type: mediaSchema, default: () => ({}) },

    stats: { type: [statSchema], default: [] },
    mission: { type: String, default: "" },
    vision: { type: String, default: "" },

    leadership: { type: [leadershipSchema], default: [] },
    team: { type: [teamSchema], default: [] },
    culture: { type: [cultureSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.AboutPage || mongoose.model("AboutPage", aboutPageSchema);