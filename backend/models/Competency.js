import mongoose from "mongoose";

const competencySchema = new mongoose.Schema({
    competencyName: {
        type: String,
        required: [true, "Competency name is required"],
        trim: true,
    },
    icon: {
        type: String,
        required: [true, "Competency icon is required"],
        default: "🏢",

    },
    isActive: {
        type: Boolean,
        default: true,
    },

}, {
    timestamps: true,
})

const Competency = mongoose.models.competency || mongoose.model("Competency", competencySchema);
export default Competency;