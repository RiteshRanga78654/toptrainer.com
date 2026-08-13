import AboutPage from "../models/AboutPage.js";
import User from "../models/user.js";
import TrainerProfile from "../models/trainerProfile.js";
import Workshop from "../models/workshops.js";
import Article from "../models/Article.js";
import Review from "../models/review.js";
import Industry from "../models/industry.js";
import cloudinary from "../config/cloudinary.js";

const parseIfString = (value, fallback = []) => {
  if (!value) return fallback;

  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  return value;
};

const cleanList = (arr = []) =>
  arr.map(({ id, _id, image, ...rest }) => ({
    ...rest,
    image:
      image?.url || image?.publicId
        ? image
        : { url: "", publicId: "" },
  }));

export const getAboutPage = async (req, res) => {
  try {
    const doc = await AboutPage.findOne().sort({ createdAt: -1 });
    if (!doc) {
      return res.status(200).json({
        success: true,
        about: null,
      });
    }

    return res.status(200).json({
      success: true,
      about: doc,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch about page",
    });
  }
};

export const getStats = async (req, res) => {
  try {
    const [trainers, users, workshops, articles, approvedReviews, expertise] =
      await Promise.all([
        TrainerProfile.countDocuments(),
        User.countDocuments(),
        Workshop.countDocuments({ status: "published" }),
        Article.countDocuments({ status: "published" }),
        Review.find({ status: "approved" }).select("averageRating"),
        Industry.countDocuments(),
      ]);

    const rating = approvedReviews.length
      ? approvedReviews.reduce(
          (sum, r) => sum + (r.averageRating || 0),
          0
        ) / approvedReviews.length
      : 0;

    res.status(200).json({
      success: true,
      stats: {
        trainers,
        users,
        workshops,
        articles,
        rating: Math.round(rating * 10) / 10,
        expertise,
      },
    });
  } catch (error) {
    console.error("getStats error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
};

export const updateAboutPage = async (req, res) => {
  try {
    let about = await AboutPage.findOne();

    const uploadOne = async (file, folder) => {
      if (!file) return null;

      const result = await cloudinary.uploader.upload(file.path, {
        folder,
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    };

    const stats = parseIfString(req.body.stats, []);

    const leadership = cleanList(
      parseIfString(req.body.leadership, [])
    );

    const team = cleanList(
      parseIfString(req.body.team, [])
    );

    const culture = cleanList(
      parseIfString(req.body.culture, [])
    );

    const leadershipFiles = req.files?.leadershipImages || [];
    const teamFiles = req.files?.teamImages || [];
    const cultureFiles = req.files?.cultureImages || [];

    for (let i = 0; i < leadership.length; i++) {
      if (leadershipFiles[i]) {
        leadership[i].image = await uploadOne(
          leadershipFiles[i],
          "toptrainer/about/leadership"
        );
      }
    }

    for (let i = 0; i < team.length; i++) {
      if (teamFiles[i]) {
        team[i].image = await uploadOne(
          teamFiles[i],
          "toptrainer/about/team"
        );
      }
    }

    for (let i = 0; i < culture.length; i++) {
      if (cultureFiles[i]) {
        culture[i].image = await uploadOne(
          cultureFiles[i],
          "toptrainer/about/culture"
        );
      }
    }

    let heroImage;
    if (req.files?.heroImage?.[0]) {
      heroImage = await uploadOne(
        req.files.heroImage[0],
        "toptrainer/about/hero"
      );
    }

    const payload = {
      heroTitle: req.body.heroTitle || "",
      heroSubtitle: req.body.heroSubtitle || "",
      heroBadgeLine1: req.body.heroBadgeLine1 || "",
      heroBadgeLine2: req.body.heroBadgeLine2 || "",
      stats,
      mission: req.body.mission || "",
      vision: req.body.vision || "",
      leadership,
      team,
      culture,
    };

    if (heroImage) {
      payload.heroImage = heroImage;
    }

    if (!about) {
      about = await AboutPage.create(payload);
    } else {
      Object.assign(about, payload);
      await about.save();
    }

    return res.status(200).json({
      success: true,
      message: "About page updated successfully",
      about,
    });
  } catch (error) {
    console.error("updateAboutPage error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update about page",
    });
  }
};