import mongoose from "mongoose";

const industrySchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    icon:{
        type:String,
        default:"🏢"
    },

    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },

    isActive:{
        type:Boolean,
        default:true
    },

    trainers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"TrainerProfile"
        }
    ],

    workshops:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Workshop"
        }
    ]

},
{timestamps:true}
);

export default mongoose.model("Industry",industrySchema);