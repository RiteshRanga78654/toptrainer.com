import Article from "../models/Article";

export const createArticle = async (req,res) => {
try{

const creatorID = req.admin?._id || req.trainer?._id;

const creatorType = req.admin ?"User" : "TrainerProfile";

const article = await Article.create({
...req.body,
createyBy: creatorID,
creatorType,

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






} catch (error){
    res.status(500).json({
        success: false,
        message: error.message,
    });
}
};
export const getDraftArticles = async (req,res) => {
    try{
const creatorID = req.admin?._id || req.trainer?._id;

const drafts = await Article.find({
    createBy: creatorID,
    status:"draft",
}).sort({createdAt: -1});

res.status(200).json({
    success: true,
    count: drafts.length,
    drafts,
});
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};
export const getMyPublishedArticles = async (req,res) => {
    try{
const creatorID = req.admin?._id || req.trainer?._id;

const articles = await Article.find({
    createdBy: creatorId,
    status: "published",
}).sort({createdAt: -1});

res.status(200).json({
    success: true,
    count: articles.length,
    articles,
});
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
export const publishArticle= async(req, res) => {
try{

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

    await article.save();

    res.status(200).json({
        success: true,
        message: "Article published successfully",
        article,
    });
}catch (error) {
    res.status(500).json({
        success:false,
        message: error.message,
    })
}
}; 
export const deleteArticle = async (req,res ) => {

    try{
        const article = await Article.findById(
            req.params.id
        );
if(!article){
     return res.status(400).json({
        success: false,
        message: "Article not found",
     })
}

await article.deleteOne();

res.status(200).json({
    success: true,
    message: "Article deleted successfully",
});
} catch (error){
    res.status(500).json({
        success: false,
        message: error.message,
    });
}
};