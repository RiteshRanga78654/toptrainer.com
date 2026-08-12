import Admin from "../models/admin.js";
import TrainerProfile from "../models/trainerProfile.js";
import User from "../models/user.js";
import TeamMember from "../models/teamMember.js";
import generateToken from "../utils/generationToken.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

export const unifiedLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    if (admin.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "Your account is deactivated. Please contact our support team.",
      });
    }

    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

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
        permissions: admin.permissions || [],
      },
    });
  }

  const teamMember = await TeamMember.findOne({ email }).select("+password");
  if (teamMember && (await teamMember.matchPassword(password))) {
    if (teamMember.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "Your account is deactivated. Please contact our support team.",
      });
    }

    teamMember.lastLogin = new Date();
    await teamMember.save({ validateBeforeSave: false });

    const token = generateToken(res, teamMember._id, "adminToken");
    return res.status(200).json({
      success: true,
      role: "admin",
      token,
      user: {
        _id: teamMember._id,
        name: teamMember.fullName,
        email: teamMember.email,
        role: "admin",
        permissions: teamMember.permissions || [],
      },
    });
  }

  const trainer = await TrainerProfile.findOne({ email }).select("+password");
  if (trainer && (await trainer.comparePassword(password))) {
    if (trainer.status === "inactive") {
      return res.status(403).json({
        success: false,
        message: "Your account is deactivated. Please contact our support team.",
      });
    }

    const token = generateToken(res, trainer._id, "trainerToken");
    trainer.password = undefined;
    return res.status(200).json({
      success: true,
      role: "trainer",
      token,
      user: trainer,
    });
  }

 const user = await User.findOne({ email }).select("+password");
if (user && (await user.comparePassword(password))) {
  if (user.status === "inactive") {
    return res.status(403).json({
      success: false,
      message: "Your account is deactivated. Please contact our support team.",
    });
  }

  user.isOnline = true;
  user.lastSeen = new Date();
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

  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
});

export const getCurrentSession = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    return res.status(404).json({
      success: false,
      message: "Admin not found",
    });
  }

  const isTeamMember = req.isTeamMember;

  res.status(200).json({
    success: true,
    data: {
      _id: admin._id,
      name: admin.name || admin.fullName,
      email: admin.email,
      role: "admin",
      permissions: admin.permissions || [],
      isTeamMember,
    },
  });
});