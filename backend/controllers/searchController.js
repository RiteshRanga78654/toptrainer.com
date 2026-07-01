import TrainerProfile from "../models/trainerProfile.js";
import Article from "../models/Article.js";
import workshops from "../models/workshops.js";
import Industry from "../models/industry.js";
import Competency from "../models/Competency.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

const buildSearchRegex = (value) => {
    if (!value) return {};
    return new RegExp(value.trim(), "i");
};

const pagination = (req) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;
    return { page, limit, skip };
};
export const globalSearch = asyncHandler(
    async (req, res) => {
        const keyword = req.query.keyword?.trim();

        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: "Keyword is required for search",
            });
        }

        const searchRegex = buildSearchRegex(keyword);

        const trainerPromise = TrainerProfile.find({
            status: "active",
            $or: [
                { fullName: searchRegex },
                { companyName: searchRegex },
                { subjectLine: searchRegex },
                { tagsLine: searchRegex },
                { "profileSummary.profileSummary": searchRegex },
                { "expertiseDomain.industry": searchRegex },
                { "expertiseDomain.competency": searchRegex },
                { "expertiseDomain.domain": searchRegex },
            ],
        })
            .select("fullName companyName subjectLine tagsLine profileSummary expertiseDomain isFeatured").limit(5);

        const workshopPromise = workshops.find({
            status: "active",
            visibility: true,
            $or: [
                { "basicInformation.title": regex },
                { "basicInformation.shortDescription": regex },
                { "basicInformation.fullDescription": regex },
                { "classification.industry": regex },
                { "classification.competency": regex },
                { "classification.tags": regex },
            ],
        }).select("basicInformation classification pricing analytics schedule assignedTrainer").limit(5);


        const articlePromise = Article.find({
            status: "published",
            $or: [
                { title: searchRegex },
                { category: searchRegex },
                { tags: searchRegex },
                { shortDescription: searchRegex },
            ],
        }).select("title coverImage author category shortDescription featured")
            .limit(5);


        cosnt[trainers, workshops, articles] = await Promise.all([trainerPromise, workshopPromise, articlePromise]);

        res.status(200).json({
            success: true,
            data: {
                trainers,
                workshops,
                articles,
            },

        });

    });

export const searchTrainers = asyncHandler(
    async (req, res) => {
        const { keyword, industry, competency, trainerType, city, isFeatured } = req.query;

        const { page, limit, skip } = pagination(req);
        const filter = {
            status: "approved",
        }
        if (keyword) {
            const searchRegex = buildSearchRegex(keyword);
            filter.$or = [
                { fullName: regex },
                { companyName: regex },
                { subjectLine: regex },
                { tagsLine: regex },
                { "profileSummary.profileSummary": regex },
                { "expertiseDomain.industry": regex },
                { "expertiseDomain.domain": regex },
                { "expertiseDomain.competencies": regex },
            ];
        }
        if (industry) {
            filter["expertiseDomain.industry"] = industry;
        }
        if (competency) {
            filter["expertiseDomain.competency"] = competency;
        }
        if (trainerType) {
            filter["expertiseDomain.trainerType"] = trainerType;
        }
        if (city) {
            filter["contactInfo.location.city"] = buildSearchRegex(city);
        }

        if (isFeatured !== undefined) {
            filter.isFeatured = isFeatured === "true";
        }

        const totalCount = await Trainer.countDocuments(filter);
        const trainers = await Trainer.find(filter)
            .select("-password")
            .sort({
                isFeatured: -1,
                createdAt: -1,
            })
            .skip(skip)
            .limit(limit);
        return res.status(200).json({
            success: true,
            total: totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            trainers,

        })
    });

const searchWorkshops = asyncHandler(
    async (req, res) => {
        const { keyword, industry, competency, deliveryMode, minPrice, maxPrice } = req.query;

        const { page, limit, skip } = pagination(req);
        const filter = {
            status: "published",
            visibility: true,
        };
        if (keyword) {
            const searchRegex = buildSearchRegex(keyword);

            filter.$or = [
                { "basicInformation.title": searchRegex },
                { "basicInformation.shortDescription": searchRegex },
                { "basicInformation.fullDescription": searchRegex },
                { "classification.industry": searchRegex },
                { "classification.competency": searchRegex },
                { "classification.tags": searchRegex },
            ];
        }

        if (industry) {
            filter["classification.industry"] = industry;
        }

        if (competency) {
            filter["classification.competency"] = competency;
        }

        if (deliveryMode) {
            filter["schedule.deliveryMode"] = deliveryMode;
        }

        if (minPrice || maxPrice) {
            filter["pricing.price"] = {};

            if (minPrice) {
                filter["pricing.price"].$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter["pricing.price"].$lte = Number(maxPrice);
            }
        }

        const totalCount = await Workshop.countDocuments(filter);

        const workshops = await Workshop.find(filter)
            .populate("assignedTrainer", "fullName profilePhoto companyName")
            .sort({
                createdAt: -1,
            })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            total: totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            workshops,
        });
    });

export const searchArticles = asyncHandler(
    async (req, res) => {

        const { keyword, category, tag, isFeatured } = req.query;
        const { page, limit, skip } = pagination(req);
        const filter = {
            status: "published",
        };

        if (keyword) {

            const searchRegex = buildSearchRegex(keyword);

            filter.$or = [
                { title: searchRegex },
                { category: searchRegex },
                { shortDescription: searchRegex },
                { author: searchRegex },
                { tags: searchRegex },
            ];
        }

        if (category) {
            filter.category = category;
        }

        if (tag) {
            filter.tags = tag;
        }

        if (featured !== undefined) {
            filter.featured = featured === "true";
        }

        const totalCount = await Article.countDocuments(filter);

        const articles = await Article.find(filter)
            .sort({
                featured: -1,
                publishedAt: -1,
                createdAt: -1,
            })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            total: totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            articles,
        });
    });

export const searchIndustries = asyncHandler(
    async (req, res) => {
        const { keyword } = req.query;
        const filter = {
            isActive: true,
        };
        if (keyword && keyword.trim() !== "") {
            filter.industryName = buildSearchRegex(keyword);
        }

        const industries = await Industry.find(filter)
            .select("industryName icon")
            .sort({ industryName: 1 })
            .limit(20);

        return res.status(200).json({
            success: true,
            count: industries.length,
            industries,

        });
    });

export const searchCompetencies = asyncHandler(
    async (req, res) => {
        const { keyword } = req.query;
        const filter = {
            isActive: true,
        };
        if (keyword && keyword.trim() !== "") {
            filter.competencyName = buildSearchRegex(keyword);
        }

        const competencies = await Competency.find(filter)
            .select("competencyName")
            .sort({ competencyName: 1 })
            .limit(20);

        return res.status(200).json({
            success: true,
            count: competencies.length,
            competencies,
        });
    }
)

export const searchSuggestions = asyncHandler(
    async (req, res) => {
        const { keyword } = req.query;
        if (!keyword || keyword.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Keyword is required for search suggestions",
            });
        }

        const searchRegex = buildSearchRegex(keyword);

        const [trainers, workshops, articles, industries, competencies] = await Promise.all([
            TrainerProfile.find({
                success: "approved",
                fullName: searchRegex,
            }).select("fullName profilePhoto")
                .limit(5),

            Workshop.find({
                status: "published",
                visibility: true,
                "basicInformation.title": searchRegex,
            })
                .select("basicInformation.title")
                .limit(5),

            Article.find({
                status: "published",
                title: searchRegex,
            })
                .select("title")
                .limit(5),
        ]);

        return res.status(200).json({
            success: true,
            suggestions: {
                trainers,
                workshops,
                articles,
            },
        });
    });