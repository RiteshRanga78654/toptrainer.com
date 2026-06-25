import User from '../models/user.js';   
import generateToken from '../utils/generationToken.js';
import bcrypt from 'bcryptjs';                      


export const loginAdmin = async (req, res) => {
   try{
    const {email, password} = req.body;

    const admin = await User.findOne({email});

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}