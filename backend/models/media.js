import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
        trim: true,
    },

    url: {
        type: String,
        required: true,
    },

    publicId: {
         type: String, 
         required: true, 
        }, 
        uploadedBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Admin", 
        },
},{
    timestamps: true,
});

const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);

export default Media;