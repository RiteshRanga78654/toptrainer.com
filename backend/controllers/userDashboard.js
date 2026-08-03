import User from "../models/user.js"
import Workshop from "../models/workshops.js"
import Article from "../models/Article.js";
import TrainerProfile from "../models/trainerProfile.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

export const getUserDashboard = asyncHandler(
    async (req, res) => {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const newTrainersCount = await TrainerProfile.countDocuments({
            status: "approved",
            createdAt: {
                $gte: lastWeek,
            },
        });

        const newTrainers = await TrainerProfile.find({
            status: "approved",
            createdAt: {
                $gte: lastWeek
            },
        })
            .sort({ createdAt: -1 }).limit(6).select("trainerId fullName profilePhoto subjectLine expertiseDomain isFeatured");


        const newArticleCount = await Article.countDocuments({ status: "published", createdAt: { $gte: lastWeek, }, }); const newArticles = await Article.find({ status: "published", createdAt: { $gte: lastWeek, }, })
            .sort({ publishedAt: -1 })
            .limit(6)
            .select("title coverImage author category views likes publishedAt");

        const currentDate = new Date();

        const upcomingWorkshops = await Workshop.find({
            status: "published",
            "schedule.startDate": {
                $gte: currentDate,
            },
        })
            .populate(
                "createdBy",
                "trainerId fullName profilePhoto"
            ).sort({
                "schedule.startDate": 1,
            })
            .limit(6)
            .select(
                "basicInforamtion schedule pricing analytics creatorType createBy"
            );

        const recommendedTrainers = await TrainerProfile.find({
            status: "approved",


        }).sort({
            isFeatured: -1,
            createdAt: -1,
        }).limit(6)
            .select(
                "trainerId fullName subjectLine profilePhoto expertiseDomain additionalDetails.trainingExperience isFeatured "
            );

        const latestArticles = await Article.find({
            status: "published",

        }).sort({
            publishedAt: -1,
        }).limit(6).select(
            "title coverImage author category views likes publishedAt"
        );
        res.status(200).json({
            success: true,
            date: {
                user: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    eamil: user.email,
                },

                newTrainers: {
                    count: newTrainersCount,
                    trainers: newTrainers,
                },
                newArticles: {
                    count: newArticleCount,
                    articles: newArticles,
                },
                upcomingWorkshops,
                recommendedTrainers,
                latestArticles,
            }
        })

    }
);


export const toggleShortlistTrainer = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const trainerId = req.params.trainerId;

  const trainer = await TrainerProfile.findById(trainerId);
  if (!trainer) {
    return res.status(404).json({
      success: false,
      message: "Trainer not found",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const alreadyShortlisted = user.shortlistedTrainers.some(
    (id) => id.toString() === trainerId.toString()
  );

  if (alreadyShortlisted) {
    user.shortlistedTrainers = user.shortlistedTrainers.filter(
      (id) => id.toString() !== trainerId.toString()
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Trainer removed from shortlisted",
      isShortlisted: false,
    });
  }

  user.shortlistedTrainers.push(trainerId);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Trainer added to shortlist",
    isShortlisted: true,
  });
});


export const getShortlistedTrainers = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate({
    path: "shortlistedTrainers",
    match: { status: "approved" },
    select:
      " trainerId fullName profilePhoto subjectLine expertiseDomain contactInfo.location additionalDetails.trainingExperience additionalDetails.feesPerDay isFeatured status",
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    count: user.shortlistedTrainers.length,
    trainers: user.shortlistedTrainers,
  });
});


export const removeShortlistedTrainer = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const trainerId = req.params.trainerId;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const wasShortlisted = user.shortlistedTrainers.some(
    (id) => id.toString() === trainerId.toString()
  );

  if (!wasShortlisted) {
    return res.status(200).json({
      success: true,
      message: "Trainer already removed from shortlist",
      isShortlisted: false,
      trainerId,
    });
  }

  user.shortlistedTrainers = user.shortlistedTrainers.filter(
    (id) => id.toString() !== trainerId.toString()
  );
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Trainer removed from shortlisted",
    isShortlisted: false,
    trainerId,
  });
});

export const toggleSaveWorkshop = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const workshopId = req.params.workshopId;

  const workshop = await Workshop.findById(workshopId);
  if (!workshop) {
    return res.status(404).json({
      success: false,
      message: "Workshop not found",
    });
  }

  if (workshop.status !== "published") {
    return res.status(400).json({
      success: false,
      message: "This workshop is not available",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const alreadySaved = user.savedWorkshops.some(
    (id) => id.toString() === workshopId.toString()
  );

  if (alreadySaved) {
    user.savedWorkshops = user.savedWorkshops.filter(
      (id) => id.toString() !== workshopId.toString()
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Workshop removed from saved",
      isSaved: false,
      workshopId,
    });
  }

  user.savedWorkshops.push(workshopId);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Workshop saved successfully",
    isSaved: true,
    workshopId,
  });
});

export const removeSavedWorkshop = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const workshopId = req.params.workshopId;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const wasSaved = user.savedWorkshops.some(
    (id) => id.toString() === workshopId.toString()
  );

  if (!wasSaved) {
    return res.status(200).json({
      success: true,
      message: "Workshop already removed",
      isSaved: false,
      workshopId,
    });
  }

  user.savedWorkshops = user.savedWorkshops.filter(
    (id) => id.toString() !== workshopId.toString()
  );

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Workshop removed from saved",
    isSaved: false,
    workshopId,
  });
});

export const getSavedWorkshopStatus = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const workshopId = req.params.workshopId;

  const user = await User.findById(userId).select("savedWorkshops");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isSaved = user.savedWorkshops.some(
    (id) => id.toString() === workshopId.toString()
  );

  return res.status(200).json({
    success: true,
    workshopId,
    isSaved,
  });
});

export const getUserWorkshops = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    const now = new Date();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // ── 1. Upcoming Workshops ──────────────────────────────────
    const upcomingQuery = {
        status: "published",
        "schedule.startDate": { $gte: now },
    };

    if (req.query.industry) upcomingQuery["classification.industry"] = req.query.industry;
    if (req.query.competency) upcomingQuery["classification.competency"] = req.query.competency;
    if (req.query.deliveryMode) upcomingQuery["schedule.deliveryMode"] = req.query.deliveryMode;

    if (req.query.search) {
        upcomingQuery.$or = [
            { "basicInformation.title": { $regex: req.query.search, $options: "i" } },
            { "basicInformation.shortDescription": { $regex: req.query.search, $options: "i" } },
            { "classification.industry": { $regex: req.query.search, $options: "i" } },
            { "classification.competency": { $regex: req.query.search, $options: "i" } },
        ];
    }

    const upcomingWorkshops = await Workshop.find(upcomingQuery)
        .sort({ "schedule.startDate": 1 })
        .skip(skip)
        .limit(limit)
        .populate("createdBy", "fullName profilePhoto")
        .select(
            "basicInformation.title basicInformation.coverImage basicInformation.shortDescription schedule pricing classification analytics createdBy status"
        );

    const upcomingTotal = await Workshop.countDocuments(upcomingQuery);

    // ── 2. Saved Workshops ─────────────────────────────────────
    const userWithSaved = await User.findById(userId).populate({
        path: "savedWorkshops",
        match: { status: "published" },
        populate: { path: "createdBy", select: "fullName profilePhoto" },
        select: "basicInformation.title basicInformation.coverImage basicInformation.shortDescription schedule pricing classification analytics status createdBy",
    });

    // ── 3. New This Week ───────────────────────────────────────
    const newWorkshops = await Workshop.find({
        status: "published",
        createdAt: { $gte: oneWeekAgo },
    })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("createdBy", "fullName profilePhoto")
        .select(
            "basicInformation.title basicInformation.coverImage basicInformation.shortDescription schedule pricing classification analytics createdBy"
        );

    const newWorkshopsCount = await Workshop.countDocuments({
        status: "published",
        createdAt: { $gte: oneWeekAgo },
    });

    res.status(200).json({
        success: true,
        data: {
            upcoming: {
                total: upcomingTotal,
                page,
                pages: Math.ceil(upcomingTotal / limit),
                count: upcomingWorkshops.length,
                workshops: upcomingWorkshops,
            },
            saved: {
                count: userWithSaved?.savedWorkshops?.length || 0,
                workshops: userWithSaved?.savedWorkshops || [],
            },
            newThisWeek: {
                count: newWorkshopsCount,
                workshops: newWorkshops,
            },
        },
    });
});

export const toggleSaveArticle = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const articleId = req.params.articleId;

  const article = await Article.findById(articleId);
  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article not found",
    });
  }

  if (article.status !== "published") {
    return res.status(400).json({
      success: false,
      message: "This article is not available",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const alreadySaved = user.savedArticles.some(
    (id) => id.toString() === articleId.toString()
  );

  if (alreadySaved) {
    user.savedArticles = user.savedArticles.filter(
      (id) => id.toString() !== articleId.toString()
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Article removed from saved",
      isSaved: false,
      articleId,
    });
  }

  user.savedArticles.push(articleId);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Article saved successfully",
    isSaved: true,
    articleId,
  });
});

export const removeSavedArticle = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const articleId = req.params.articleId;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const wasSaved = user.savedArticles.some(
    (id) => id.toString() === articleId.toString()
  );

  if (!wasSaved) {
    return res.status(200).json({
      success: true,
      message: "Article already removed",
      isSaved: false,
      articleId,
    });
  }

  user.savedArticles = user.savedArticles.filter(
    (id) => id.toString() !== articleId.toString()
  );

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Article removed from saved",
    isSaved: false,
    articleId,
  });
});

export const getUserArticles = asyncHandler(async (req, res) => {
 
    const userId = req.user._id;
 
    const page  = Number(req.query.page)  || 1;
    const limit = Number(req.query.limit) || 10;
    const skip  = (page - 1) * limit;
 
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
 
    // ── 1. All Published Articles ─────────────────────────────
    const query = { status: "published" };
 
    if (req.query.category) query.category = req.query.category;
    if (req.query.featured) query.featured = true;
 
    if (req.query.search) {
        query.$or = [
            { title:            { $regex: req.query.search, $options: "i" } },
            { shortDescription: { $regex: req.query.search, $options: "i" } },
            { category:         { $regex: req.query.search, $options: "i" } },
            { tags: { $elemMatch: { $regex: req.query.search, $options: "i" } } },
        ];
    }
 
    const articles = await Article.find(query)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .select(
            "title coverImage category shortDescription author tags views likes featured publishedAt createdAt"
        );
 
    const total = await Article.countDocuments(query);
 
    // ── 2. Saved Articles (user ne bookmark kiye hue) ─────────
    const userWithSaved = await User.findById(userId).populate({
        path:  "savedArticles",
        match: { status: "published" },
        select:
            "title coverImage category shortDescription author tags views likes featured publishedAt createdAt",
    });
 
    // ── 3. New This Week ──────────────────────────────────────
    const newArticles = await Article.find({
        status:    "published",
        createdAt: { $gte: oneWeekAgo },
    })
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
            "title coverImage category shortDescription author publishedAt createdAt"
        );
 
    const newArticlesCount = await Article.countDocuments({
        status:    "published",
        createdAt: { $gte: oneWeekAgo },
    });
 
    // ── 4. Featured Articles ──────────────────────────────────
    const featuredArticles = await Article.find({
        status:   "published",
        featured: true,
    })
        .limit(3)
        .select(
            "title coverImage category shortDescription author views likes publishedAt"
        );
 
    res.status(200).json({
        success: true,
        data: {
            // Tab 1 — All articles
            articles: {
                total,
                page,
                pages:    Math.ceil(total / limit),
                count:    articles.length,
                articles,
            },
            // Tab 2 — Saved / Bookmarked
            saved: {
                count:    userWithSaved?.savedArticles?.length || 0,
                articles: userWithSaved?.savedArticles         || [],
            },
            // Tab 3 — New this week
            newThisWeek: {
                count:    newArticlesCount,
                articles: newArticles,
            },
            // Tab 4 — Featured / Trending
            featured: {
                count:    featuredArticles.length,
                articles: featuredArticles,
            },
        },
    });
});
 

export const getArticleById = asyncHandler(async (req, res) => {
 
    const userId    = req.user._id;
    const articleId = req.params.articleId;
 
    const article = await Article.findByIdAndUpdate(
        articleId,
        { $inc: { views: 1 } },
        { new: true }
    ).populate("createdBy", "fullName profilePhoto subjectLine expertiseDomain");
 
    if (!article) {
        return res.status(404).json({
            success: false,
            message: "Article not found",
        });
    }
 
    if (article.status !== "published") {
        return res.status(403).json({
            success: false,
            message: "This article is not available",
        });
    }
 
    const user = await User.findById(userId).select("savedArticles");
    const isSaved = user.savedArticles
        .some((id) => id.toString() === articleId.toString());
 
    res.status(200).json({
        success: true,
        data: {
            article,
            isSaved,  // frontend ko pata chalega bookmark icon show karna hai ya nahi
        },
    });
});
 

