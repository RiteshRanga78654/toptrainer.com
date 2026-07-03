import mongoose from "mongoose";


const sessionInfoSchema = new mongoose.Schema({
    reviewerName: {
        type: String,
        required: true,
        trim: true,
    },

    trainerName: {
        type: String,
        required: true,
        trim: true,
    },

    sessionDate: {
        type: Date,
        required: true,
    },

    city: {
        type: String,
        default: "",
    },
    whatsappNumber: {
        type: String,
        default: "",
    },
}, { _id: false });

const ratingsSchema = new mongoose.Schema({
    overAll: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },

    delivery: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },

    contentQuality: {
        type: String,
        min: 1,
        max: 5,
        required: true,
    },
    engagment: {
        type: String,
        min: 1,
        max: 5,
        required: true,
    },

    overAllComment: {
        type: String,
        maxlength: 500,
        default: "",
    },

    deliveryComment: {
        type: String,
        maxlength: 500,
        default: "",
    },

    contentQualityComment: {
        type: String,
        maxlength: 500,
        default: "",
    },
    engagmentComment: {
        type: String,
        maxlength: 500,
        default: "",
    },
}, { _id: false });

const reviewSchema = new mongoose.Schema({
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TrainerProfile",
        required: true,
    },
    workshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workshop",
        default: null,
    },
    sessionInfo: sessionInfoSchema,
    ratings: ratingsSchema,

    averageRating: {
        type: Number,
        default: 0,
    },

    isApproved: {
        type: Boolean,
        default: false,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
}, {
    timeStamps: true,
});


reviewSchema.pre("save", function (next) {
    this.averageRating =
        (
            this.ratings.overall +
            this.ratings.delivery +
            this.ratings.contentQuality +
            this.ratings.engagement
        ) / 4;

    next();
});

reviewSchema.index({
    "sessionInfo.reviewerName": "text",
    "sessionInfo.trainerName": "text",
    "sessionInfo.topic": "text",
});

export default mongoose.model("Review", reviewSchema);