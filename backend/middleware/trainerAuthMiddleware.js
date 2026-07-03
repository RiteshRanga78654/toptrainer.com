import jwt from 'jsonwebtoken';
import TrainerProfile from '../models/trainerProfile.js';

export const protectTrainer = async (req,res, next) => {
    try{
        const token = req.cookies.trainerToken;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Please login frist",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

       const trainer = await TrainerProfile.findById(decoded.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    req.trainer = trainer;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};