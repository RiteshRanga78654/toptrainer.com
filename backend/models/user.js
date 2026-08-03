import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import generateId from "../utils/generateId.js";


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
      trim: true,
      required: [true, "pleasse enter first name"],
    },

    lastName: {
      type: String,
      default: "",
      trim: true,
      required: [true, "please enter a last name"],
    },

    userId: {
      type: String,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      default: "",
      required: [true, "Email is required"],
    },

    phoneNumber: {
      type: Number,
      required: [true, "Please enter your Phone Number!"],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Password must contain uppercase, lowercase, number and special character",
      ],
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    lastSeen: {
      type: Date,
      default: Date.now,
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    shortlistedTrainers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TrainerProfile",
      },
    ],

    savedWorkshops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workshop",
      },
    ],

    savedArticles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next) {

  if (!this.isNew || this.userId) {
    return next();
  }

  this.userId = await generateId("UR", "user");

  next();

});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);    
    next(); 
});


userSchema.methods.comparePassword = async function (
  enteredPassword
) {
  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};

const User =  mongoose.models.user || mongoose.model("User", userSchema);

export default User;