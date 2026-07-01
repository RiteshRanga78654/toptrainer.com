import Admin from '../models/admin.js';   
import generateToken from '../utils/generationToken.js';
import bcrypt from 'bcryptjs';  
import asyncHandler from '../middleware/asyncMiddlewire.js';                   


export const loginAdmin = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    const admin = await Admin.findOne({email});

    if(!admin){
        return res.status(404).json({
            message: "Invalid email or password",
        });
    }

    const isPasswordMatched = await bcrypt.compare(password, admin.password);                               

    if(!isPasswordMatched){
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

     res.status(200).json({
      success: true,
      token: generateToken(admin._id),
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

});