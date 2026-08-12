import TeamMember from "../models/teamMember.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";
import { resolvePermissions } from "../utils/permissions.js";

export const createTeamMember = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    timezone,
    password,
    confirmPassword,
    role = "standard_member",
    permissions = [],
    isActive = true,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  const existing = await TeamMember.findOne({ email: email?.toLowerCase() });
  if (existing) {
    return res.status(400).json({
      success: false,
      message: "A team member with this email already exists",
    });
  }

  const member = await TeamMember.create({
    fullName,
    email,
    phone,
    timezone,
    password,
    role,
    permissions: resolvePermissions(role, permissions),
    isActive,
    createdBy: req.admin?._id,
  });

  res.status(201).json({
    success: true,
    message: "Team member created successfully",
    data: member,
  });
});

export const getAllTeamMembers = asyncHandler(async (req, res) => {
  const { search, role, status } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { fullName: new RegExp(search.trim(), "i") },
      { email: new RegExp(search.trim(), "i") },
    ];
  }
  if (role) filter.role = role;
  if (status) filter.isActive = status === "active";

  const members = await TeamMember.find(filter)
    .select("-password")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: members.length,
    data: members,
  });
});

export const getSingleTeamMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id)
    .select("-password")
    .populate("createdBy", "name email");

  if (!member) {
    return res.status(404).json({
      success: false,
      message: "Team member not found",
    });
  }

  res.status(200).json({
    success: true,
    data: member,
  });
});

export const updateTeamMember = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    timezone,
    password,
    role,
    permissions,
    isActive,
  } = req.body;

  const member = await TeamMember.findById(req.params.id);
  if (!member) {
    return res.status(404).json({
      success: false,
      message: "Team member not found",
    });
  }

  if (fullName !== undefined) member.fullName = fullName;
  if (email !== undefined) member.email = email;
  if (phone !== undefined) member.phone = phone;
  if (timezone !== undefined) member.timezone = timezone;
  if (isActive !== undefined) member.isActive = isActive;

  if (role !== undefined) {
    member.role = role;
    member.permissions = resolvePermissions(role, permissions || member.permissions);
  } else if (permissions !== undefined && member.role !== "administrator") {
    member.permissions = resolvePermissions(member.role, permissions);
  }

  if (password) {
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    member.password = password;
  }

  await member.save();

  res.status(200).json({
    success: true,
    message: "Team member updated successfully",
    data: member,
  });
});

export const deleteTeamMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);
  if (!member) {
    return res.status(404).json({
      success: false,
      message: "Team member not found",
    });
  }

  await member.deleteOne();

  res.status(200).json({
    success: true,
    message: "Team member deleted successfully",
  });
});
