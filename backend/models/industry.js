import mongoose from  "mongoose";

const industrySchema = new mongoose.Schema({
    industryName: {
        type: String, 
        required: [true, "Industry name is required"],
         trim: true, 
    },
icon: {
     type: String,
 required: [true, "Industry icon is required"], 
 default: "🏢", 

},
 isActive: {
     type: Boolean, 
     default: true, 
 },

}, {
    timestamps: true,
}) 

const Industry = mongoose.models.Industry || mongoose.model("Industry", industrySchema);

export default Industry;