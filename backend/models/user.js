import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

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

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.getSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.models.User || mongoose.model('User', userSchema);                            

export default User;    