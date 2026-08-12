import Department from "../models/department.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

export const createDepartment = asyncHandler(async (req, res) => {
  const { name, icon, isActive, trainers = [], workshops = [] } = req.body;

  const department = await Department.create({
    name,
    icon,
    trainers,
    workshops,
    isActive,
    createdBy: req.admin?._id,
  });

  res.status(201).json({
    success: true,
    message: "Department created successfully",
    department,
  });
});

export const getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find()
  .populate("trainers", "trainerId fullName profilePhoto")
.populate("workshops", "basicInformation.title")
.sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: departments.length,
    departments,
  });
});

export const getSingleDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id)
.populate("trainers", "trainerId fullName profilePhoto")
.populate("workshops", "basicInformation.title");
  if (!department) {
    return res.status(404).json({
      success: false,
      message: "Department not found",
    });
  }

  res.status(200).json({
    success: true,
    department,
  });
});

export const getActiveDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({ isActive: true })
    .populate(
      "trainers",
      "trainerId fullName profilePhoto expertiseDomain additionalDetails tagsLine entityType"
    )
    .sort({
      name: 1,
    });

  res.status(200).json({
    success: true,
    count: departments.length,
    departments,
  });
});

export const updateDepartment = asyncHandler(async (req, res) => {
  const { name, icon,  trainers,
  workshops, isActive } = req.body;

  const department = await Department.findByIdAndUpdate(
    req.params.id,
    { name, icon, isActive, trainers, workshops },
    { new: true, runValidators: true }
  );

  if (!department) {
    return res.status(404).json({
      success: false,
      message: "Department not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Department updated successfully",
    department,
  });
});

export const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    return res.status(404).json({
      success: false,
      message: "Department not found",
    });
  }

  await department.deleteOne();

  res.status(200).json({
    success: true,
    message: "Department deleted successfully",
  });
});

export const toggleDepartmentStatus = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    return res.status(404).json({
      success: false,
      message: "Department not found",
    });
  }

  department.isActive = !department.isActive;
  await department.save();

  res.status(200).json({
    success: true,
    message: department.isActive ? "Department activated" : "Department deactivated",
    data: department,
  });
});