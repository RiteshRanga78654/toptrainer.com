import Article from "../models/Article.js";
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

export const createArticle = asyncHandler(async (req,res) => {

const creatorID = req.admin?._id || req.trainer?._id;

const creatorType = req.admin ?"Admin" : "TrainerProfile";

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

const article = await Article.create({
...req.body,
coverImage,
createdBy: creatorID,
creatorType,
trainer: req.trainer?._id,

});
res.status(201).json({
    success: true,
    message: `Article ${
    article.status === "draft"
    ? "saved as draft"
    : "published successfully"
    }`,
    article,
});

});
export const getDraftArticles = asyncHandler(async (req,res) => {
const creatorID = req.admin?._id || req.trainer?._id;

const drafts = await Article.find({
    createdBy: creatorID,
    status:"draft",
}).sort({createdAt: -1});

res.status(200).json({
    success: true,
    count: drafts.length,
    drafts,
});
});

export const getMyPublishedArticles = asyncHandler(async (req,res) => {
const creatorID = req.admin?._id || req.trainer?._id;

const articles = await Article.find({
    createdBy: creatorID,
    status: "published",
}).sort({createdAt: -1});

res.status(200).json({
    success: true,
    count: articles.length,
    articles,
});
});

export const publishArticle= asyncHandler(async(req, res) => {

    const article = await Article.findById(
        req.params.id
    );
    if(!article){
        return res.status(404).json({
            success:false,
            message: "Article is not found",
        });
    }
    article.status="published";
    article.publishedAt = new Date();

    await article.save();

    res.status(200).json({
        success: true,
        message: "Article published successfully",
        article,
    });
});

export const deleteArticle = asyncHandler(async (req,res ) => {

    const article = await Article.findById(
        req.params.id
    );
    if(!article){
     return res.status(404).json({
        success: false,
        message: "Article not found",
     })
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



export const getAllArticles = async (req, res)=>{
    try {
        const { keyword, creatorType, page = 1, limit = 10 } = req.query;
        let query = {};

        if (keyword) {
            query.title = { $regex: keyword, $options: "i" };
        }
        
        if (creatorType) {
            query.creatorType = creatorType;
        }

        const skip = (page - 1) * limit;

        const result = await Article.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });
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
