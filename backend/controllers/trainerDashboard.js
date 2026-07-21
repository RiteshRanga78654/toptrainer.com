import TrainerProfile from "../models/trainerProfile.js";                           
import Workshop from "../models/workshops.js";          
import Article from "../models/Article.js";     
import Review from "../models/review.js";               
import asyncHandler from "../middleware/asyncMiddlewire.js";                 




export const getTrainerDashboardData = asyncHandler(                    
async (req, res) => {   
const trainerId = req.trainer._id;

const trainer = await TrainerProfile.findById(trainerId)
.select('-password');

if (!trainer) {
    return res.status(404).json({
        message: "Trainer not found",
    });                                                         
}

const myWorkshops = await Workshop.find({ createdBy: trainerId, creatorType: "TrainerProfile" })
.sort({ createdAt: -1 });               
const myArticles = await Article.find({ createdBy: trainerId})
.sort({createdAt: -1});

const totalWorkshops = myWorkshops.length; 
const publishedWorkshops = myWorkshops.filter(workshop => workshop.status === "published").length;   
const draftWorkshop = myWorkshops.filter(workshop => workshop.status === "draft").length;   

const now = new Date();         
 const upcomingSessions = myWorkshops.filter(
      (workshop) =>
        workshop.status === "published" &&
        workshop.schedule?.startDate &&
        new Date(workshop.schedule.startDate) > now
    ).length;


let totalEnrollments = 0;
    let totalCapacity = 0;
    let totalViews = 0;
    let totalRating = 0;

    myWorkshops.forEach((workshop) => {

      totalEnrollments +=
        workshop.analytics?.enrolledCount || 0;

      totalCapacity +=
        workshop.schedule?.maxCapacity || 0;

      totalViews +=
        workshop.analytics?.views || 0;

      totalRating +=
        workshop.analytics?.rating || 0;

    });
const fillRate = totalCapacity > 0 ? Math.round((totalEnrollments/ totalCapacity)* 100): 0;

    const averageWorkshopRating =
      totalWorkshops > 0
        ? Number((totalRating / totalWorkshops).toFixed(1))
        : 0;


const totalArticles = myArticles.length;
const publishedArticles = myArticles.filter(articles => articles.status === 'published').length;
const draftArticles = myArticles.filter(article => article.status === "draft").length;
    const articleViews = myArticles.reduce(
      (sum, article) => sum + (article.views || 0),
      0
    );
const profileView = totalViews + articleViews;

    // ✅ FIX: Review is the Mongoose MODEL, not an array — Review.length /
    // Review.reduce() were crashing this whole endpoint with a TypeError.
    // Fetch this trainer's actual review documents first.
    const myReviews = await Review.find({ trainer: trainerId });

    const averageReviewRating =
      myReviews.length > 0
        ? Number(
            (
              myReviews.reduce(
                (sum, review) => sum + review.rating,
                0
              ) / myReviews.length
            ).toFixed(1)
          )
        : 0;

    const totalReviews = myReviews.length;

    const recentArticles = myArticles.slice(0, 5).map(articles => ({
        _id:             articles._id,
        title:           articles.title,
        status:          articles.status,
        views:           articles.views || 0,
        coverImage:      articles.coverImage?.url || "", // ✅ added, frontend expects this
        publishedAt:     articles.publishedAt,
        createdAt:       articles.createdAt,
    }));
 
    const recentWorkshops = myWorkshops.slice(0, 4).map(workshop => ({
           _id: workshop._id,
        title: workshop.basicInformation?.title,
        status: workshop.status,
        startDate: workshop.schedule?.startDate,
        endDate: workshop.schedule?.endDate,
        location: workshop.schedule?.location,
        deliveryMode: workshop.schedule?.deliveryMode,
        maxCapacity: workshop.schedule?.maxCapacity || 0, // ✅ added, frontend expects this
        enrolledCount: workshop.analytics?.enrolledCount || 0,
        views: workshop.analytics?.views || 0,
        rating: workshop.analytics?.rating || 0,
        price: workshop.pricing?.price || 0,
        coverImage:
          workshop.basicInformation?.coverImage?.url || "",
        createdAt: workshop.createdAt,
    }));


    res.status(200).json({
        success: true,
        data: {
            stats: {
                profileView,
                publishedArticles,
                totalWorkshops,
                totalArticles,
                publishedWorkshops,
                upcomingSessions,
                fillRate,
                totalReviews,          // ✅ added
                averageReviewRating,   // ✅ added
                averageWorkshopRating, // ✅ added (was computed but never returned before)
            },
            recentArticles,
            recentWorkshops,
            trainer: {
                  _id:          trainer._id,
                fullName:     trainer.fullName,
                email:        trainer.email,
                profilePhoto: trainer.profilePhoto,
                status:       trainer.status,
                isFeatured:   trainer.isFeatured,
            },
        },
    });
});


export const getMyWorkshops = asyncHandler(
    async(req, res)=> {
        const trainerId = req.trainer._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = {
            createdBy: trainerId,
            creatorType: "TrainerProfile",
        }
        if(req.query.status){
            query.status = req.query.status;
        }

         if (req.query.search) {
        query.$or = [
            {
                "basicInformation.title": {
                    $regex: req.query.search,
                    $options: "i",
                },
            },
            {
                "basicInformation.category": {
                    $regex: req.query.search,
                    $options: "i",
                },
            },
            {
                "classification.industry": {
                    $regex: req.query.search,
                    $options: "i",
                },
            },
            {
                "classification.competency": {
                    $regex: req.query.search,
                    $options: "i",
                },
            },
        ];
    }

    const workshops = await Workshop.find(query)
    .sort({ created: -1})
    .skip(skip)
    .limit(limit);

    const total = await Workshop.countDocuments(query);

   res.status(200).json({
        success: true,
        total,          // ✅ pehle "totals" tha (undefined) — crash ho raha tha
        page,
        pages: Math.ceil(total / limit),
        count: workshops.length,
        workshops,
    })


    });

export const getMyArticles = asyncHandler(async (req, res) => {

    const trainerId = req.trainer._id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {
        createdBy: trainerId,
    };

    if (req.query.status) {
        query.status = req.query.status;
    }

    if (req.query.search) {
        query.$or = [
            {
                title: {
                    $regex: req.query.search,
                    $options: "i",
                },
            },
            {
                category: {
                    $regex: req.query.search,
                    $options: "i",
                },
            },
            {
                tags: {
                    $regex: req.query.search,
                    $options: "i",
                },
            },
        ];
    }

    const articles = await Article.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Article.countDocuments(query);

    res.status(200).json({
        success: true,
        total,
        page,
        pages: Math.ceil(total / limit),
        count: articles.length,
        articles,
    });

});

export const getTrainerAnalytics = asyncHandler(async (req, res) => {

    const trainerId = req.trainer._id;

    // -----------------------------
    // Workshops
    // -----------------------------
    const workshops = await Workshop.find({
        createdBy: trainerId,
        creatorType: "TrainerProfile",
    });

    // -----------------------------
    // Articles
    // -----------------------------
    const articles = await Article.find({
        createdBy: trainerId,
    });

    // -----------------------------
    // Workshop Stats
    // -----------------------------
    const workshopStats = {
        total: workshops.length,

        published: workshops.filter(
            workshop => workshop.status === "published"
        ).length,

        draft: workshops.filter(
            workshop => workshop.status === "draft"
        ).length,

        totalViews: workshops.reduce(
            (sum, workshop) =>
                sum + (workshop.analytics?.views || 0),
            0
        ),

        totalEnrolled: workshops.reduce(
            (sum, workshop) =>
                sum + (workshop.analytics?.enrolledCount || 0),
            0
        ),
    };

    // -----------------------------
    // Article Stats
    // -----------------------------
    const articleStats = {
        total: articles.length,

        published: articles.filter(
            article => article.status === "published"
        ).length,

        draft: articles.filter(
            article => article.status === "draft"
        ).length,

        totalViews: articles.reduce(
            (sum, article) =>
                sum + (article.views || 0),
            0
        ),

        totalLikes: articles.reduce(
            (sum, article) =>
                sum + (article.likes || 0),
            0
        ),
    };

    // -----------------------------
    // Reviews
    // -----------------------------
    const recentReviews = await Review.find({
        trainer: trainerId,
    })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "firstName lastName");

    const totalReviews = await Review.countDocuments({
        trainer: trainerId,
    });

    const avgRatingData = await Review.aggregate([
        {
            $match: {
                trainer: req.trainer._id,
            },
        },
        {
            $group: {
                _id: null,
                avgRating: {
                    $avg: "$rating",
                },
            },
        },
    ]);

    const avgRating =
        avgRatingData.length > 0
            ? Number(avgRatingData[0].avgRating.toFixed(1))
            : 0;

    // -----------------------------
    // Top Workshop
    // -----------------------------
    const topWorkshop = workshops
        .sort(
            (a, b) =>
                (b.analytics?.enrolledCount || 0) -
                (a.analytics?.enrolledCount || 0)
        )[0];


    const topArticle = articles
        .sort(
            (a, b) =>
                (b.views || 0) -
                (a.views || 0)
        )[0];

    // -----------------------------
    // Response
    // -----------------------------
    res.status(200).json({
        success: true,

        data: {

            workshopStats,

            articleStats,

            reviews: {
                total: totalReviews,
                avgRating,
                recent: recentReviews,
            },

            topWorkshop: topWorkshop
                ? {
                      _id: topWorkshop._id,
                      title:
                          topWorkshop.basicInformation?.title,
                      category:
                          topWorkshop.basicInformation?.category,
                      status: topWorkshop.status,
                      enrolled:
                          topWorkshop.analytics?.enrolledCount,
                      views:
                          topWorkshop.analytics?.views,
                      rating:
                          topWorkshop.analytics?.rating,
                  }
                : null,

            topArticle: topArticle
                ? {
                      _id: topArticle._id,
                      title: topArticle.title,
                      status: topArticle.status,
                      views: topArticle.views,
                      likes: topArticle.likes,
                      createdAt: topArticle.createdAt,
                  }
                : null,
        },
    });

});