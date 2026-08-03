import mongoose from "mongoose";

const competencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Competency name is required"],
      unique: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "🎯",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
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
  {
    timestamps: true,
  }
);

const Competency =
  mongoose.models.Competency || mongoose.model("Competency", competencySchema);

export default Competency;
