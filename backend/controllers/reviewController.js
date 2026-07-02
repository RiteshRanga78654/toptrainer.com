import Review from "../models/review.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";
export const createReview = asyncHandler(async (req, res) => {

    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
 
});


export const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find()
      .populate("trainer", "fullName profilePhoto companyName")
      .populate(
        "workshop",
        "basicInformation.title"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

});


export const getSingleReview = asyncHandler(async (req, res) => {

    const review = await Review.findById(
      req.params.id
    )
      .populate("trainer")
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


export const getTrainerReviews = asyncHandler(async (req,res) => {

    const reviews = await Review.find({
      trainer: req.params.trainerId,
    })
      .populate(
        "trainer",
        "fullName profilePhoto companyName"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

});

export const getWorkshopReviews = asyncHandler(async (
  req,
  res
) => {

    const reviews = await Review.find({
      workshop: req.params.workshopId,
    })
      .populate(
        "trainer",
        "fullName profilePhoto"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
 
});

export const getFeaturedReviews = asyncHandler(async (
  req,
  res
) => {
    const reviews = await Review.find({
      isFeatured: true,
    })
      .populate(
        "trainer",
        "fullName profilePhoto"
      )
      .limit(10)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });

});


export const toggleFeaturedReview = asyncHandler(async (req, res) => {
 
    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.isFeatured =
      !review.isFeatured;

    await review.save();

    res.status(200).json({
      success: true,
      message:
        review.isFeatured
          ? "Review marked as featured"
          : "Review removed from featured",
      review,
    });
});

export const updateReview = asyncHandler(async (req,res ) => {

    const review =
      await Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });

});

export const deleteReview =  asyncHandler(async (req, res) => {

    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
 
});