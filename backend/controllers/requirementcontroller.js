import Requirement from "../models/requirement.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

export const createRequirement = asyncHandler(async (req, res) => {
  const { title, category, format, audienceSize, description } = req.body;

  if (!title || !category || !format) {
    return res.status(400).json({
      success: false,
      message: "Title, category and format are required.",
    });
  }

  const requirement = await Requirement.create({
    user: req.user._id,
    title,
    category,
    format,
    audienceSize: audienceSize || "",
    description: description || "",
  });

  const populated = await Requirement.findById(requirement._id).populate(
    "user",
    "firstName lastName email"
  );

  res.status(201).json({
    success: true,
    message:
      "Requirement submitted successfully. It is now pending admin review and will be visible once approved.",
    requirement: populated,
  });
});

export const getMyRequirements = asyncHandler(async (req, res) => {
  const requirements = await Requirement.find({ user: req.user._id })
    .populate("user", "firstName lastName email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: requirements.length,
    requirements,
  });
});

export const getApprovedRequirements = asyncHandler(async (req, res) => {
  const requirements = await Requirement.find({ status: "approved" })
    .populate("user", "firstName lastName email company")
    .sort({ createdAt: -1 })
    .limit(50);

  res.status(200).json({
    success: true,
    count: requirements.length,
    requirements,
  });
});

export const getAllRequirements = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { status, keyword } = req.query;

  const query = {};

  if (status && status !== "all") {
    query.status = status;
  }

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
    ];
  }

  const [requirements, count, pending, approved, rejected, latestPending] =
    await Promise.all([
      Requirement.find(query)
        .populate("user", "firstName lastName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Requirement.countDocuments(query),
      Requirement.countDocuments({ status: "pending" }),
      Requirement.countDocuments({ status: "approved" }),
      Requirement.countDocuments({ status: "rejected" }),
      Requirement.find({ status: "pending" })
        .populate("user", "firstName lastName email")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

  res.status(200).json({
    success: true,
    count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    stats: {
      pending,
      approved,
      rejected,
      total: pending + approved + rejected,
    },
    latestPending,
    requirements,
  });
});

export const getSingleRequirement = asyncHandler(async (req, res) => {
  const requirement = await Requirement.findById(req.params.id).populate(
    "user",
    "firstName lastName email company profession"
  );

  if (!requirement) {
    return res.status(404).json({
      success: false,
      message: "Requirement not found",
    });
  }

  res.status(200).json({
    success: true,
    requirement,
  });
});

export const approveRequirement = asyncHandler(async (req, res) => {
  const requirement = await Requirement.findById(req.params.id);

  if (!requirement) {
    return res.status(404).json({
      success: false,
      message: "Requirement not found",
    });
  }

  requirement.status = "approved";
  await requirement.save();

  const updated = await Requirement.findById(requirement._id).populate(
    "user",
    "firstName lastName email"
  );

  res.status(200).json({
    success: true,
    message: "Requirement approved successfully",
    requirement: updated,
  });
});

export const rejectRequirement = asyncHandler(async (req, res) => {
  const requirement = await Requirement.findById(req.params.id);

  if (!requirement) {
    return res.status(404).json({
      success: false,
      message: "Requirement not found",
    });
  }

  requirement.status = "rejected";
  await requirement.save();

  const updated = await Requirement.findById(requirement._id).populate(
    "user",
    "firstName lastName email"
  );

  res.status(200).json({
    success: true,
    message: "Requirement rejected successfully",
    requirement: updated,
  });
});

export const deleteRequirement = asyncHandler(async (req, res) => {
  const requirement = await Requirement.findById(req.params.id);

  if (!requirement) {
    return res.status(404).json({
      success: false,
      message: "Requirement not found",
    });
  }

  await requirement.deleteOne();

  res.status(200).json({
    success: true,
    message: "Requirement deleted successfully",
  });
});
