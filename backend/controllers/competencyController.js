import Competency from "../models/Competency.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

export const createCompetency = asyncHandler(async (req, res) => {
  const { name, icon, isActive, trainers = [], workshops = [] } = req.body;

  const competency = await Competency.create({
    name,
    icon,
    isActive,
    trainers,
    workshops,
    createdBy: req.admin?._id,
  });

  res.status(201).json({
    success: true,
    message: "Competency created successfully",
    competency,
  });
});

export const getAllCompetencies = asyncHandler(async (req, res) => {
  const competencies = await Competency.find()
  .populate("trainers", "trainerId fullName profilePhoto")
.populate("workshops", "basicInformation.title")
.sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: competencies.length,
    competencies,
  });
});

export const getSingleCompetency = asyncHandler(async (req, res) => {
  const competency = await Competency.findById(req.params.id)
  .populate("trainers", "trainerId fullName profilePhoto")
  .populate("workshops", "basicInformation.title");

  if (!competency) {
    return res.status(404).json({
      success: false,
      message: "Competency not found",
    });
  }

  res.status(200).json({
    success: true,
    competency,
  });
});

export const getActiveCompetencies = asyncHandler(async (req, res) => {
  const competencies = await Competency.find({ isActive: true })
    .populate(
      "trainers",
      "trainerId fullName profilePhoto expertiseDomain additionalDetails tagsLine entityType"
    )
    .sort({
      name: 1,
    });

  res.status(200).json({
    success: true,
    count: competencies.length,
    competencies,
  });
});

export const updateCompetency = asyncHandler(async (req, res) => {
  const {
  name,
  icon,
  trainers,
  workshops,
  isActive,
} = req.body;

  const competency = await Competency.findByIdAndUpdate(
    req.params.id,
    { name, icon, isActive, trainers, workshops },
    { new: true, runValidators: true }
  );

  if (!competency) {
    return res.status(404).json({
      success: false,
      message: "Competency not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Competency updated successfully",
    competency,
  });
});

export const deleteCompetency = asyncHandler(async (req, res) => {
  const competency = await Competency.findById(req.params.id);

  if (!competency) {
    return res.status(404).json({
      success: false,
      message: "Competency not found",
    });
  }

  await competency.deleteOne();

  res.status(200).json({
    success: true,
    message: "Competency deleted successfully",
  });
});

export const toggleCompetencyStatus = asyncHandler(async (req, res) => {
  const competency = await Competency.findById(req.params.id);

  if (!competency) {
    return res.status(404).json({
      success: false,
      message: "Competency not found",
    });
  }

  competency.isActive = !competency.isActive;
  await competency.save();

  res.status(200).json({
    success: true,
    message: competency.isActive ? "Competency activated" : "Competency deactivated",
    data: competency,
  });
});