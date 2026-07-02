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

export const getMyProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id).select('-password');
    
    if (!admin) {
        return res.status(404).json({
            message: "Admin not found",
        });
    }

    res.status(200).json({
        success: true,
        admin
    });
});

export const updateProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id);
    
    if (!admin) {
        return res.status(404).json({
            message: "Admin not found",
        });
    }

    const { name, email, password } = req.body;
    
    if (name) admin.name = name;
    if (email) admin.email = email;
    if (password) admin.password = password; // Will be hashed by pre-save hook

    const updatedAdmin = await admin.save();

    res.status(200).json({
        success: true,
        admin: {
            id: updatedAdmin._id,
            name: updatedAdmin.name,
            email: updatedAdmin.email,
            role: updatedAdmin.role,
        }
    });
});

export const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie('adminToken', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
});