import Admin from "../models/admin.js";
import TrainerProfile from "../models/trainerProfile.js";
import User from "../models/user.js";
import generateToken from "../utils/generationToken.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

// POST /api/auth/login — single login box, no role selector.
// Tries Admin -> TrainerProfile -> User (in that order) by email, and
// returns whichever one's password matches. Order matters only if the same
// email is somehow registered in more than one collection; admin wins.
export const unifiedLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  // 1) Admin
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    const token = generateToken(res, admin._id, "adminToken");
    return res.status(200).json({
      success: true,
      role: "admin",
      token,
      user: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
      },
    });
  }

  // 2) Trainer
  const trainer = await TrainerProfile.findOne({ email }).select("+password");
  if (trainer && (await trainer.comparePassword(password))) {
    const token = generateToken(res, trainer._id, "trainerToken");
    trainer.password = undefined;
    return res.status(200).json({
      success: true,
      role: "trainer",
      token,
      user: trainer,
    });
  }

  // 3) User
  const user = await User.findOne({ email }).select("+password");
  if (user && (await user.comparePassword(password))) {
    user.isOnline = true;
    user.lastActive = new Date();
    await user.save({ validateBeforeSave: false });
    const token = generateToken(res, user._id, "userToken");
    user.password = undefined;
    return res.status(200).json({
      success: true,
      role: "user",
      token,
      user,
    });
  }

  // Same generic message regardless of which collection almost matched —
  // don't reveal whether an email exists in one role vs another.
  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
});
