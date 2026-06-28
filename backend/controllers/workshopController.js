import Workshop from "../models/Workshop.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";
export const createWorkshop = asyncHandler(
  async (req, res) => {

    const creatorId = req.admin?._id || req.trainer?._id;

    const creatorType = req.admin
      ? "User"
      : "TrainerProfile";

    const workshop = await Workshop.create({
      ...req.body,
      createdBy: creatorId,
      creatorType,
    });

    res.status(201).json({
      success: true,
      message:
        workshop.status === "draft"
          ? "Workshop saved as draft"
          : "Workshop published successfully",
      workshop,
    });


});

export const getDraftWorkshops = asyncHandler(
  async (req, res) => {
    const creatorId =
      req.admin?._id || req.trainer?._id;

    const drafts = await Workshop.find({
      createdBy: creatorId,
      status: "draft",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: drafts.length,
      drafts,
    });

});

export const getPublishedWorkshops = asyncHandler(
  async ( req,res ) => {
    const creatorId =
      req.admin?._id || req.trainer?._id;

    const workshops = await Workshop.find({
      createdBy: creatorId,
      status: "published",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workshops.length,
      workshops,
    });

});

export const getSingleWorkshop = asyncHandler(
   async (req,res) => {
  
    const workshop = await Workshop.findById(
      req.params.id
    )
      .populate("createdBy")
      .populate("assignedTrainer");

    if (!workshop) {
      return res.status(404).json({
        success: false,
        message: "Workshop not found",
      });
    }

    res.status(200).json({
      success: true,
      workshop,
    });


});

export const publishWorkshop = asyncHandler(async (req,res) => {
    const workshop = await Workshop.findById(
      req.params.id
    );

    if (!workshop) {
      return res.status(404).json({
        success: false,
        message: "Workshop not found",
      });
    }

    workshop.status = "published";

    await workshop.save();

    res.status(200).json({
      success: true,
      message: "Workshop published successfully",
      workshop,
    });

});

export const updateWorkshop = asyncHandler(async (req,res) => {

    const workshop =
      await Workshop.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!workshop) {
      return res.status(404).json({
        success: false,
        message: "Workshop not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Workshop updated successfully",
      workshop,
    });


});

export const deleteWorkshop = asyncHandler(async (req,res) => {

    const workshop = await Workshop.findById(
      req.params.id
    );

    if (!workshop) {
      return res.status(404).json({
        success: false,
        message: "Workshop not found",
      });
    }

    await workshop.deleteOne();

    res.status(200).json({
      success: true,
      message: "Workshop deleted successfully",
    });


});