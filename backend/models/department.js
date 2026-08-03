import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      unique: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "🏢",
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
  { timestamps: true }
);

export default mongoose.models.Department ||
  mongoose.model("Department", departmentSchema);
