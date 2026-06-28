import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
const adminSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },

    email: {
         type: String,
         required: [true, 'Email is required'],
    },

    password: {
        type: String,
        required: [true, 'Password is required'],   
    }
},
{
        timestamps: true     
}
);

adminSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const Admin = mongoose.models.admin || mongoose.model('Admin', adminSchema);                            

export default Admin;    