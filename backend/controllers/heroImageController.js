import asyncHandler from "../middleware/asyncMiddlewire.js";
import cloudinary from "../config/cloudinary.js";
import HeroImage from "../models/heroImage.js";

export const getHeroImages = asyncHandler(async (req, res) => {
  const images = await HeroImage.find().sort({ order: 1 });
  res.status(200).json({
    success: true,
    data: images,
  });
});

export const getActiveHeroImages = asyncHandler(async (req, res) => {
  const images = await HeroImage.find({ active: true }).sort({ order: 1 });
  res.status(200).json({
    success: true,
    data: images,
  });
});

export const addHeroImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image file",
    });
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "toptrainer/hero",
  });

  const maxOrderDoc = await HeroImage.findOne().sort({ order: -1 });
  const newOrder = maxOrderDoc ? maxOrderDoc.order + 1 : 0;

  const heroImage = await HeroImage.create({
    url: result.secure_url,
    publicId: result.public_id,
    order: newOrder,
  });

  res.status(201).json({
    success: true,
    message: "Hero image uploaded successfully",
    data: heroImage,
  });
});

export const updateHeroImage = asyncHandler(async (req, res) => {
  const { active } = req.body;
  
  const heroImage = await HeroImage.findById(req.params.id);
  
  if (!heroImage) {
    return res.status(404).json({
      success: false,
      message: "Hero image not found",
    });
  }

  if (active !== undefined) {
    heroImage.active = active;
  }

  await heroImage.save();

  res.status(200).json({
    success: true,
    data: heroImage,
  });
});

export const deleteHeroImage = asyncHandler(async (req, res) => {
  const heroImage = await HeroImage.findById(req.params.id);

  if (!heroImage) {
    return res.status(404).json({
      success: false,
      message: "Hero image not found",
    });
  }

  try {
    await cloudinary.uploader.destroy(heroImage.publicId);
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
  }

  await heroImage.deleteOne();

  res.status(200).json({
    success: true,
    message: "Hero image deleted",
  });
});

export const reorderHeroImages = asyncHandler(async (req, res) => {
  const { orderMap } = req.body; // Expecting { [id]: newOrderIndex }
  
  if (!orderMap) {
    return res.status(400).json({
      success: false,
      message: "Please provide orderMap",
    });
  }

  const operations = Object.keys(orderMap).map((id) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { order: orderMap[id] } }
    }
  }));

  if (operations.length > 0) {
    await HeroImage.bulkWrite(operations);
  }

  const updatedImages = await HeroImage.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    data: updatedImages,
  });
});
