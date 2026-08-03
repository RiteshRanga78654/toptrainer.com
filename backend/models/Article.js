import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["heading","paragraph", "callout", "quote"],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },

},{_id: false});

const articleSchema = new mongoose.Schema({
   createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "creatorType",
    },

    creatorType: {
        type: String,
        required: true,
        enum: ["Admin", "TrainerProfile"],
    },

  
   trainer: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "TrainerProfile",
  default: null,
},
    coverImage: {
      url: {
        type: String,
        required: true,
    },

    publicId: {
         type: String, 
         required: true, 
        }, 
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
     industry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industry",
      default: null,
    },

    competency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competency",
      default: null,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },

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