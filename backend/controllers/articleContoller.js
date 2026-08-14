import mongoose from "mongoose";
import Article from "../models/Article.js";
import Industry from "../models/industry.js";
import Competency from "../models/Competency.js";
import Department from "../models/department.js";
import cloudinary from "../config/cloudinary.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

const parseIfString = (value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (error) {
      return {};
    }
  }
  return value || {};
};

const isValidObjectId = (id) =>
  typeof id === "string" && mongoose.Types.ObjectId.isValid(id);

const LINK_FIELDS = ["industry", "competency", "department"];

const sanitizeLinkFields = (body) => {
  LINK_FIELDS.forEach((field) => {
    if (body[field] === "" || body[field] === "null" || body[field] === undefined) {
      body[field] = null;
    }
  });
  return body;
};

const MODEL_BY_FIELD = {
  industry: Industry,
  competency: Competency,
  department: Department,
};

const escapeRegExp = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const resolveLinkFilter = async (field, value) => {
  if (!value) return undefined;

  if (value === "true" || value === "any") {
    return { $ne: null };
  }

  if (isValidObjectId(value)) {
    return value;
  }

  const Model = MODEL_BY_FIELD[field];
  const doc = await Model.findOne({
    name: new RegExp(`^${escapeRegExp(value)}$`, "i"),
  }).select("_id");

  // No matching Industry/Competency/Department found for this name — use a
  // fresh, well-formed (but never-persisted) ObjectId so the query still
  // casts correctly and simply returns zero results, instead of passing a
  // non-ObjectId sentinel straight into a Mongoose ObjectId query (which
  // throws a CastError and surfaces as a 500).
  return doc ? doc._id : new mongoose.Types.ObjectId();
};

const buildArticleQuery = async (queryParams = {}, extraFilters = {}) => {
  const {
    keyword,
    creatorType,
    status,
    industry,
    competency,
    department,
  } = queryParams;

  const query = { ...extraFilters };

  if (keyword) {
    query.title = { $regex: keyword, $options: "i" };
  }

  if (creatorType) {
    query.creatorType = creatorType;
  }

  if (status) {
    query.status = status;
  }

  if (industry) {
    const resolved = await resolveLinkFilter("industry", industry);
    if (resolved !== undefined) query.industry = resolved;
  }

  if (competency) {
    const resolved = await resolveLinkFilter("competency", competency);
    if (resolved !== undefined) query.competency = resolved;
  }

  if (department) {
    const resolved = await resolveLinkFilter("department", department);
    if (resolved !== undefined) query.department = resolved;
  }

  return query;
};

export const createArticle = asyncHandler(async (req, res) => {
  const creatorID = req.admin?._id || req.trainer?._id;
  const creatorType = req.admin ? "Admin" : req.trainer ? "TrainerProfile" : null;

  if (!creatorID || !creatorType) {
    return res.status(401).json({
      success: false,
      message: "Authentication required to create an article",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a cover image",
    });
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "toptrainer/articles/cover",
  });

  const coverImage = {
    url: result.secure_url,
    publicId: result.public_id,
  };

  if (req.body.sections) {
    req.body.sections = parseIfString(req.body.sections);
  }

  if (req.body.tags) {
    req.body.tags = parseIfString(req.body.tags);
  }

  sanitizeLinkFields(req.body);

const article = await Article.create({
  ...req.body,
  coverImage,
  createdBy: creatorID,
  creatorType,
  trainer: req.trainer?._id || req.admin?._id,
});

  res.status(201).json({
    success: true,
    message:
      article.status === "draft"
        ? "Article saved as draft"
        : "Article published successfully",
    article,
  });
});

export const getDraftArticles = asyncHandler(async (req, res) => {
  const creatorID = req.admin?._id || req.trainer?._id;

  const drafts = await Article.find({
    createdBy: creatorID,
    status: "draft",
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: drafts.length,
    drafts,
  });
});

export const getMyPublishedArticles = asyncHandler(async (req, res) => {
  const creatorID = req.admin?._id || req.trainer?._id;

  const articles = await Article.find({
    createdBy: creatorID,
    status: "published",
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: articles.length,
    articles,
  });
});

export const publishArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article is not found",
    });
  }

  article.status = "published";
  article.publishedAt = new Date();

  await article.save();

  res.status(200).json({
    success: true,
    message: "Article published successfully",
    article,
  });
});

export const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article not found",
    });
  }

  if (article.coverImage?.publicId) {
    await cloudinary.uploader.destroy(article.coverImage.publicId);
  }

  await article.deleteOne();

  res.status(200).json({
    success: true,
    message: "Article deleted successfully",
  });
});

export const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article not found",
    });
  }

  if (req.file) {
    if (article.coverImage?.publicId) {
      await cloudinary.uploader.destroy(article.coverImage.publicId);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "toptrainer/articles/cover",
    });

    req.body.coverImage = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  if (req.body.sections !== undefined) {
    req.body.sections = parseIfString(req.body.sections);
  }

  if (req.body.tags !== undefined) {
    req.body.tags = parseIfString(req.body.tags);
  }

  sanitizeLinkFields(req.body);

  const updatedArticle = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Article updated successfully",
    article: updatedArticle,
  });
});

export const getAllAdminArticles = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = await buildArticleQuery(req.query, {
    creatorType: "Admin",
  });

  const articles = await Article.find(query)
    .populate("industry", "name icon")
    .populate("competency", "name icon")
    .populate("department", "name icon")
    .populate("createdBy", "firstName lastName fullName email")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const count = await Article.countDocuments(query);

  res.status(200).json({
    success: true,
    count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    data: articles,
  });
});

export const getAllTrainerArticles = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {
    status: "published",
    creatorType: "TrainerProfile",
  };

  const [articles, count] = await Promise.all([
    Article.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("trainer", "fullName companyName"),
    Article.countDocuments(filter),
  ]);

  res.json({
    success: true,
    count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    data: articles,
  });
};
export const getAllTrainerArticlesAdmin = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = await buildArticleQuery(req.query, {
    creatorType: "TrainerProfile",
  });

  const [articles, count] = await Promise.all([
    Article.find(query)
      .populate("industry", "name icon")
      .populate("competency", "name icon")
      .populate("department", "name icon")
      .populate("trainer", "fullName companyName subjectLine profilePhoto")
      .populate("createdBy", "firstName lastName fullName email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Article.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    data: articles,
  });
});

export const getAllArticles = async (req, res)=>{
    try {
        const { keyword, creatorType, status, industry, competency, department, page = 1, limit = 10 } = req.query;
        let query = {};

        if (keyword) {
            query.title = { $regex: keyword, $options: "i" };
        }
        
        if (creatorType) {
            query.creatorType = creatorType;
        }

        query.status = status || "published";

        if (industry) {
            const resolved = await resolveLinkFilter("industry", industry);
            if (resolved !== undefined) query.industry = resolved;
        }

        if (competency) {
            const resolved = await resolveLinkFilter("competency", competency);
            if (resolved !== undefined) query.competency = resolved;
        }

        if (department) {
            const resolved = await resolveLinkFilter("department", department);
            if (resolved !== undefined) query.department = resolved;
        }

        const skip = (page - 1) * limit;

        const result = await Article.find(query)
            .populate("industry", "name icon")
            .populate("competency", "name icon")
            .populate("department", "name icon")
            .populate("createdBy", "firstName lastName fullName email")
            .populate("trainer", "fullName companyName")
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });
        const count = await Article.countDocuments(query);
        
        res.status(200).json({
            success: true,
            count: count,
            currentPage: Number(page),
            totalPages: Math.ceil(count / limit),
            data: result,
        });

    } catch(error) {
        console.error("error occured while fetching", error);
        res.status(500).json({ success: false, message: "Error fetching articles" });
    }
}
export const getArticleByIdPublic = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid article id",
    });
  }

  const article = await Article.findOne({ _id: id, status: "published" })
    .populate("industry", "name icon")
    .populate("competency", "name icon")
    .populate("department", "name icon")
    .populate("createdBy", "firstName lastName fullName email")
    .populate("trainer", "fullName companyName");

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article not found",
    });
  }

  res.status(200).json({
    success: true,
    article,
  });
});
