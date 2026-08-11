import mongoose from "mongoose";
import Review from "../models/review.js";
import TrainerProfile from "../models/trainerProfile.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

// Trainer profile links/URLs use the human-readable trainerId code (e.g.
// "TR0001"), but Review.trainer stores the trainer's actual Mongo _id.
// This resolves either form to the real _id so review lookups work
// regardless of which one the caller passes in.
const resolveTrainerObjectId = async (trainerIdParam) => {
  if (!trainerIdParam) return null;

  if (mongoose.Types.ObjectId.isValid(trainerIdParam)) {
    // Could still be a coincidentally valid-looking string, so only
    // trust it once we know it's not also a registered trainerId code.
    const byCode = await TrainerProfile.findOne({
      trainerId: String(trainerIdParam).toUpperCase(),
    }).select("_id");
    if (byCode) return byCode._id;
    return trainerIdParam;
  }

  const byCode = await TrainerProfile.findOne({
    trainerId: String(trainerIdParam).toUpperCase(),
  }).select("_id");

  return byCode?._id || null;
};
export const createReview = asyncHandler(async (req, res) => {
  const {
    trainer,
    workshop,
    sessionInfo,
    ratings,
  } = req.body;

  const existingReview = await Review.findOne({
    user: req.user._id,
    trainer,
  });

  if (existingReview) {
    return res.status(400).json({
      success: false,
      message: "You have already submitted a review for this trainer.",
    });
  }

  const review = await Review.create({
    user: req.user._id,
    trainer,
    workshop: workshop || null,
    sessionInfo,
    ratings,
  });

  const populatedReview = await Review.findById(review._id)
    .populate("user", "name email")
    .populate("trainer", "trainerId fullName profilePhoto companyName")
    .populate("workshop", "basicInformation.title");

  res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    review: populatedReview,
  });
});


export const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    user: req.user._id,
  })
    .populate("trainer", "trainerId fullName profilePhoto companyName")
    .populate("workshop", "basicInformation.title")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
  });
});



export const getAllReviews = asyncHandler(async (req, res) => {
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
      { "sessionInfo.reviewerName": { $regex: keyword, $options: "i" } },
      { "sessionInfo.trainerName": { $regex: keyword, $options: "i" } },
    ];
  }

  const [reviews, count, pending, approved, rejected] = await Promise.all([
    Review.find(query)
      .populate("user", "firstName lastName email")
      .populate("trainer", "trainerId fullName profilePhoto companyName")
      .populate("workshop", "basicInformation.title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Review.countDocuments(query),
    Review.countDocuments({ status: "pending" }),
    Review.countDocuments({ status: "approved" }),
    Review.countDocuments({ status: "rejected" }),
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
    reviews,
  });
});


export const getSingleReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)
    .populate("user", "name email")
    .populate("trainer", "trainerId fullName profilePhoto companyName")
    .populate("workshop");

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  res.status(200).json({
    success: true,
    review,
  });
});


export const getTrainerReviews = asyncHandler(async (req, res) => {
  const trainerObjectId = await resolveTrainerObjectId(req.params.trainerId);

  if (!trainerObjectId) {
    return res.status(404).json({
      success: false,
      message: "Trainer not found",
    });
  }

  const reviews = await Review.find({
    trainer: trainerObjectId,
    status: "approved",
  })
    .populate("user", "firstName lastName")
    .populate("trainer", "trainerId fullName profilePhoto companyName")
    .populate("workshop", "basicInformation.title")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
  });
});

export const getWorkshopReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    workshop: req.params.workshopId,
    status: "approved",
  })
    .populate("user", "name")
    .populate("trainer", "trainerId fullName ")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
  });
});

export const getFeaturedReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    isFeatured: true,
    status: "approved",
  })
    .populate("user", "name")
    .populate("trainer", "trainerId fullName profilePhoto")
    .limit(10)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    reviews,
  });
});

export const toggleFeaturedReview = asyncHandler(async (req, res) => {

  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  // Optional: Sirf approved reviews ko featured banne do


  review.isFeatured = !review.isFeatured;

  await review.save();

  const updatedReview = await Review.findById(review._id)
    .populate("user", "name email")
    .populate("trainer", "trainerId fullName profilePhoto companyName")
    .populate("workshop", "basicInformation.title");

  res.status(200).json({
    success: true,
    message: review.isFeatured
      ? "Review marked as featured successfully"
      : "Review removed from featured successfully",
    review: updatedReview,
  });

});

export const approveReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  review.status = "approved";
  review.isApproved = true;

  await review.save();

  const updatedReview = await Review.findById(review._id)
    .populate("user", "firstName lastName email")
    .populate("trainer", "trainerId fullName profilePhoto companyName")
    .populate("workshop", "basicInformation.title");

  res.status(200).json({
    success: true,
    message: "Review approved successfully",
    review: updatedReview,
  });
});

export const rejectReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  review.status = "rejected";
  review.isApproved = false;
  review.isFeatured = false;

  await review.save();

  const updatedReview = await Review.findById(review._id)
    .populate("user", "firstName lastName email")
    .populate("trainer", "trainerId fullName profilePhoto companyName")
    .populate("workshop", "basicInformation.title");

  res.status(200).json({
    success: true,
    message: "Review rejected successfully",
    review: updatedReview,
  });
});



export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  if (
    review.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "Not authorized",
    });
  }

  review.sessionInfo = req.body.sessionInfo || review.sessionInfo;
  review.ratings = req.body.ratings || review.ratings;

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    review,
  });
});


export const deleteReview = asyncHandler(async (req, res) => {

  const review = await Review.findById(
    req.params.id
  );

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Not authorized",
    });
  }

  await review.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });

});

export const getMyTrainerReviews = asyncHandler(async (req, res) => {
  const trainerIdParam = req.params.trainerId || req.trainer?._id || req.user?.trainerId;

  if (!trainerIdParam) {
    return res.status(400).json({
      success: false,
      message: "Trainer ID missing",
    });
  }

  const trainerObjectId = !req.params.trainerId && mongoose.Types.ObjectId.isValid(trainerIdParam)
    ? trainerIdParam
    : await resolveTrainerObjectId(trainerIdParam);

  if (!trainerObjectId) {
    return res.status(404).json({
      success: false,
      message: "Trainer not found",
    });
  }

  const reviews = await Review.find({
    trainer: trainerObjectId,
  })
    .populate("user", "firstName lastName")
    .populate("trainer", "trainerId fullName profilePhoto companyName")
    .populate("workshop", "basicInformation.title")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: reviews.length,
    reviews,
  });
});
export const getTrainerApprovedReviews = asyncHandler(async (req, res) => {
  const trainerIdParam = req.trainer?._id || req.user?.trainerId || req.params.trainerId;

  if (!trainerIdParam) {
    return res.status(400).json({
      success: false,
      message: "Trainer ID missing",
    });
  }

  const trainerObjectId = mongoose.Types.ObjectId.isValid(trainerIdParam) && !req.params.trainerId
    ? trainerIdParam
    : await resolveTrainerObjectId(trainerIdParam);

  if (!trainerObjectId) {
    return res.status(404).json({
      success: false,
      message: "Trainer not found",
    });
  }

  const reviews = await Review.find({
    trainer: trainerObjectId,
    status: "approved",
  })
    .populate("user", "firstName lastName designation companyName")
    .populate("trainer", "trainerId fullName profilePhoto companyName")
    .populate("workshop", "basicInformation.title")
    .sort({ createdAt: -1 })
    .limit(4);

  const mapped = reviews.map((r) => ({
    _id: r._id,
    rating: r.averageRating || r.ratings?.overAll || 0,
    comment: r.ratings?.overAllComment || "",
    reviewerName: `${r.user?.firstName || ""} ${r.user?.lastName || ""}`.trim() || "Anonymous User",
    reviewerRole: r.user?.designation || "",
    reviewerCompany: r.user?.companyName || "",
    workshopTitle: r.workshop?.basicInformation?.title || "",
    createdAt: r.createdAt,
    trainer: r.trainer,
  }));

  res.status(200).json({
    success: true,
    count: mapped.length,
    reviews: mapped,
  });
});