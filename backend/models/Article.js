import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
    type: {
        type: String,
        enm: ["heading","paragraph", "callout", "quote"],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },

},{_id: false});

const articleSchema = new mongoose.Schema({
    trainer: {
        type: String,
        ref: "TrainerProfile",
        required: true,
    },
    coverImage: {
        type: String,
        default: "",
    },

    author:{
      type: String,
      default: "",
    },
    
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
shortDescription: {
      type: String,
      required: true,
      maxlength: 280,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    sections: [sectionSchema],

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Article", articleSchema);