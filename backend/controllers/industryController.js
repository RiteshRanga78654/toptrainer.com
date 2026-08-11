import Industry from "../models/industry.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";
import workshops from "../models/workshops.js";

export const createIndustry = asyncHandler(async (req, res) => {
const {
  name,
  icon,
  trainers = [],
  workshops = [],
  isActive = true,
} = req.body;
 const industry = await Industry.create({
  name,
  icon,
  trainers,
  workshops,
  isActive,
  createdBy: req.admin?._id,
});
  res.status(201).json({
    success: true,
    message: "Industry created successfully",
    industry,
  });
});

export const getAllIndustries = asyncHandler(async (req, res) => {
 const industries = await Industry.find()
.populate("trainers", "trainerId fullName profilePhoto")
.populate("workshops", "basicInformation.title")
.sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: industries.length,
    industries,
  });
});

export const getSingleIndustry = asyncHandler(async (req, res) => {
 const industry = await Industry.findById(req.params.id)
.populate("trainers", "trainerId fullName profilePhoto")
.populate("workshops", "basicInformation.title");
  if (!industry) {
    return res.status(404).json({
      success: false,
      message: "Industry not found",
    });
  }
  res.status(200).json({
    success: true,
    industry,
  });
});

export const updateIndustry = asyncHandler(async (req, res) => {
  const {
  name,
  icon,
  trainers,
  workshops,
  isActive,
} = req.body;

 const industry = await Industry.findByIdAndUpdate(
  req.params.id,
  {
    name,
    icon,
    trainers,
    workshops,
    isActive,
  },
  {
    new: true,
    runValidators: true,
  }
);
  if (!industry) {
    return res.status(404).json({
      success: false,
      message: "Industry not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Industry updated successfully",
    industry,
  });
});

export const deleteIndustry = asyncHandler(async (req, res) => {
  const industry = await Industry.findById(req.params.id);
  if (!industry) {
    return res.status(404).json({
      success: false,
      message: "Industry not found",
    });
  }
  await industry.deleteOne();
  res.status(200).json({
    success: true,
    message: "Industry deleted successfully",
  });
});

export const toggleIndustryStatus = asyncHandler(async (req, res) => {
  const industry = await Industry.findById(req.params.id);

  if (!industry) {
    return res.status(404).json({
      success: false,
      message: "Industry not found",
    });
  }

  industry.isActive = !industry.isActive;
  await industry.save();

  res.status(200).json({
    success: true,
    data: industry,
  });
});

export const getActiveIndustries = asyncHandler(async (req, res) => {
  const industries = await Industry.find({ isActive: true })
    .populate(
      "trainers",
      "trainerId fullName profilePhoto expertiseDomain additionalDetails tagsLine entityType"
    )
    .sort({ name: 1 });

  res.status(200).json({
    success: true,
    count: industries.length,
    industries,
  });
});