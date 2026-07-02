import mongoose from "mongoose";



const basicInformationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        default: "",
        trim: true,
    },

    shortDescription:   {
        type: String,
        default: "",
        maxlength: 150,
    },
    fullDescription: {
        type: String,
        default: "",
    },
    targetAudience: {
        type: String,
        default: "",
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

    thumbnail: {
      url: {
        type: String,
        required: true,
    },

    publicId: {
         type: String, 
         required: true, 
        }, 
    },
}, {_id: false});


const scheduleSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    dateRange: {
      type: String,
      default: "",
    },

    timeSlot: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 1,
    },

    location: {
      type: String,
      default: "",
    },

    venue: {
      type: String,
      default: "",
    },

    deliveryMode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid", "In-Person"],
      default: "Online",
    },

    meetingLink: {
      type: String,
      default: "",
    },

    maxCapacity: {
      type: Number,
      default: 30,
    },
  },{ _id: false });

  const pricingSchema = new mongoose.Schema(
  {
    originalPrice: {
      type: Number,
      default: 0,
    },

    discountedPrice: {
      type: Number,
      default: 0,
    },

    emiPerMonth: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      default: 0,
    },
  }, { _id: false });

const learningDetailsSchema = new mongoose.Schema(
  {
    learningOutcomes: [
      {
        type: String,
      },
    ],

    topicsCovered: [
      {
        type: String,
      },
    ],

    prerequisites: [
      {
        type: String,
      },
    ],

    includedItems: [
      {
        type: String,
      },
    ],
  },{ _id: false });

  const classificationSchema = new mongoose.Schema(
  {
    competency: {
      type: String,
      default: "",
    },

    industry: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],
  },
  { _id: false }
);

const conductedModeSchema = new mongoose.Schema(
  {
    conductedAs: [
      {
        type: String,
        enum: ["Live Online", "Offline", "Recorded"],
      },
    ],
  },
  { _id: false }
);

const mediaGallerySchema = new mongoose.Schema(
  {
    snapshots: [
      {
       url: {
        type: String,
        required: true,
    },

    publicId: {
         type: String, 
         required: true, 
        }, 
      },
    ],
  },
  { _id: false }
);

const analyticsSchema = new mongoose.Schema(
  {
    enrolledCount: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { _id: false }
);

const workshopSchema = new mongoose.Schema(
  {

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "creatorType",
    },

    creatorType: {
      type: String,
      required: true,
      enum: ["User", "TrainerProfile"], // Admin or Trainer
    },

    assignedTrainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainerProfile",
      default: null,
    },

    basicInformation: basicInformationSchema,

    schedule: scheduleSchema,

    pricing: pricingSchema,

    learningDetails: learningDetailsSchema,

    classification: classificationSchema,

    conductedMode: conductedModeSchema,

    mediaGallery: mediaGallerySchema,

    analytics: analyticsSchema,

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    visibility: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


workshopSchema.index({
  "basicInformation.title": "text",
  "basicInformation.shortDescription": "text",
  "classification.industry": "text",
  "classification.competency": "text",
  "classification.tags": "text",
});

export default mongoose.model("Workshop", workshopSchema);