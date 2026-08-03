import User from "../models/user.js";
import TrainerProfile from "../models/trainerProfile.js";
import Workshop from "../models/workshops.js";
import Article from "../models/Article.js";
import Review from "../models/review.js";
import YoutubeVideo from "../models/youtubeVideo.js";

import asyncHandler from "../middleware/asyncMiddlewire.js";

export const getDashboardData = asyncHandler(
    async (req, res) => {
        const totalUsers = await User.countDocuments();
        const totalTrainers = await TrainerProfile.countDocuments();
        const totalWorkshops = await Workshop.countDocuments();
        const totalArticles = await Article.countDocuments();
        const totalReviews = await Review.countDocuments();
        const totalVideos = await YoutubeVideo.countDocuments();
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);


        const newUsersThisMonth = await User.countDocuments({
            createdAt: { $gte: startOfMonth }
        });

        const newTrainersThisMonth = await TrainerProfile.countDocuments({
            createdAt: { $gte: startOfMonth }
        });


        const recentWorkshops = await Workshop.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("basicInformation schedule analytics pricing status assignedTrainer createdAt")
            .populate("assignedTrainer", "fullName");

        const recentArticles = await Article.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title category status views coverImage author createdBy creatorType createdAt')
            .populate("createdBy", "firstName lastName fullName email");

        const recentTrainers = await TrainerProfile.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('fullName email status isFeatured expertiseDomain.industry createdAt');

        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('firstName lastName email profileImage isOnline lastActive status createdAt');

        const recentReviews = await Review.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('reviewerName rating comment createdAt');

        res.status(200).json({
            success: true,
            data: {
                stats: {
                    totalUsers,
                    totalTrainers,
                    totalWorkshops,
                    totalArticles,
                    totalReviews,
                    totalVideos,
                    newUsersThisMonth,
                    newTrainersThisMonth,
                },
                recentWorkshops,
                recentArticles,
                recentTrainers,
                recentUsers,
                recentReviews,
            },

        });
    });

export const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = {};

  if (req.query.search) {
    query.$or = [
      { firstName: { $regex: req.query.search, $options: "i" } },
      { lastName: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
      { phoneNumber: { $regex: req.query.search, $options: "i" } },
    ];
  }

  if (req.query.status && req.query.status !== "all") {
    query.status = req.query.status;
  }

  const users = await User.find(query)
    .select(
      "firstName lastName email phoneNumber profileImage isOnline lastSeen status createdAt"
    )
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    count: users.length,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    users,
  });
});

export const getUserById = asyncHandler(
    async (req, res) => {
        const user = await User.findById(req.params.id)
        .select("-password")
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            user
        });
    }
);

export const deleteUserById = asyncHandler(
    async (req, res) => {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    }
);
export const updateUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowed = ["active", "inactive"];
  if (!allowed.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${allowed.join(", ")}`,
    });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.status = status;
  await user.save();

  res.status(200).json({
    success: true,
    message: status === "active" ? "User activated" : "User deactivated",
    user,
  });
});

export const updateTrainerStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowed = ["approved", "inactive"];
  if (!allowed.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${allowed.join(", ")}`,
    });
  }

  const trainer = await TrainerProfile.findById(req.params.id);

  if (!trainer) {
    return res.status(404).json({
      success: false,
      message: "Trainer not found",
    });
  }

  trainer.status = status;
  await trainer.save();

  res.status(200).json({
    success: true,
    message: status === "approved" ? "Trainer activated" : "Trainer deactivated",
    trainer,
  });
});

export const toggleTrainerFeatured = asyncHandler(async (req, res) => {

    const trainer = await TrainerProfile.findById(req.params.id);

    if (!trainer) {
        return res.status(404).json({
            success: false,
            message: 'Trainer not found',
        });
    }

    trainer.isFeatured = !trainer.isFeatured;
    await trainer.save();

    res.status(200).json({
        success: true,
        message: `Trainer ${trainer.isFeatured ? 'marked as featured' : 'removed from featured'}`,
        isFeatured: trainer.isFeatured,
    });
});


export const updateWorkshopStatus = asyncHandler(async (req, res) => {

    const { status } = req.body;

    const allowed = ['draft', 'published'];
    if (!allowed.includes(status)) {
        return res.status(400).json({
            success: false,
            message: `Status must be 'draft' or 'published'`,
        });
    }

    const workshop = await Workshop.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
    );

    if (!workshop) {
        return res.status(404).json({
            success: false,
            message: 'Workshop not found',
        });
    }

    res.status(200).json({
        success: true,
        message: `Workshop status updated to ${status}`,
        workshop,
    });
});

export const updateArticleStatus = asyncHandler(async (req, res) => {

    const { status, featured } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (featured !== undefined) updateData.featured = featured;
    if (status === 'published') updateData.publishedAt = new Date();

    const article = await Article.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
    );

    if (!article) {
        return res.status(404).json({
            success: false,
            message: 'Article not found',
        });
    }

    res.status(200).json({
        success: true,
        message: `Article updated successfully`,
        article,
    });
});


export const getAdminAnalytics = asyncHandler(async (req, res) => {

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const userGrowth = await User.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' },
                    year: { $year: '$createdAt' },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const trainerGrowth = await TrainerProfile.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' },
                    year: { $year: '$createdAt' },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);


    const topIndustries = await TrainerProfile.aggregate([
        { $unwind: '$expertiseDomain.industry' },
        { $group: { _id: '$expertiseDomain.industry', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
    ]);

    const workshopStats = await Workshop.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const articleStats = await Article.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
        success: true,
        data: {
            userGrowth,
            trainerGrowth,
            topIndustries,
            workshopStats,
            articleStats,
        },
    });
});