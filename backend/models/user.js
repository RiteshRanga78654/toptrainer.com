import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
firstName: {
    type: String,
    default: "",
    trim: true,
    required: [true, "pleasse enter first name"],
},

lastName:{
     type: String,
    default: "",
    trim: true,
    required: [true, "please enter a last name"],
},

email: {
    type: String,
    default: "",
    required: [true, 'Email is required'],
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
    "Password must contain uppercase, lowercase, number and special character"
  ]
},
 isFeatured: {
    type: Boolean,
    default: false,
  },
},
{
    timestamps: true,
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