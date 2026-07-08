import mongoose from "mongoose"

const counterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        sequence: {
            type: Number,
            default: 100,
        },
    },{
        timestamps: true,
    }
);

export default mongoose.model("Counter", counterSchema);