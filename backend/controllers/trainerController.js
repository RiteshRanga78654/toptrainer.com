import TrainerProfile from '../models/trainerProfile.js';
import generateToken from '../utils/generationToken.js';

export const registerTrainer = async (req, res) => {
  try {
const {email, password, confirmPassword, fullName} = req.body;
if(!email || !password || !confirmPassword || !fullName) {
  return res.status(400).json({
    success: false,
    message: "Please fill all required fields",
  });
}

if(password !== confirmPassword){
  return res.status(400).json({
    success: false,
    message: "passwordm do not match",
  });
}

const existingTrainer = await TrainerProfile.findOne({email});
if(existingTrainer){
  return res.status(400).json({
    success: false,
    message: "Trainer already exists eith this email0,"
  });
}

    const trainer =
      await TrainerProfile.create({
        ...req.body,
      });

    res.status(201).json({
      success: true,
      message:
        "Trainer profile submitted successfully. Waiting for admin approval.",
      trainer,
    });

} catch (error) {

  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
 }
};

export const loginTrainer = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }


    const trainer = await TrainerProfile
      .findOne({ email })
      .select("+password");

    if (!trainer) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

   
    const isMatched =
      await trainer.comparePassword(password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Approval Check
    if (trainer.status !== "approved") {
      return res.status(403).json({
        success: false,
        message:
          `Your account is currently ${trainer.status}. Please wait for admin approval.`,
      });
    }

    const token = generateToken(
      res,
      trainer._id
    );

    trainer.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      trainer,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const logoutTrainer = async (req, res) => {
  try {

    res.cookie("trainerToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

};

export const getMyProfile = async (req, res) => {
  try {

    const trainer = await TrainerProfile.findById(
      req.trainer._id
    );

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      trainer,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateMyProfile = async (req, res) => {
  try {

    const trainer =
      await TrainerProfile.findByIdAndUpdate(
        req.trainer._id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      trainer,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


