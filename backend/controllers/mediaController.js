
import asyncHandler from "../middleware/asyncMiddlewire.js";
import cloudinary from "../config/cloudinary.js";

import Media from "../models/media.js";

export const uploadMedia = asyncHandler(
    async (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a file",
            });
        }
        const result = await cloudinary.uploader.upload


            (req.file.path, {
                folder: "toptrainer/media",
            });
        const media = await Media.create({
            fileName: req.file.originalname,
            url: result.secure_url,
            publicId: result.public_id,
            fileType: req.file.mimetype.startsWith("image") ? "image" : "document",
            size: req.file.size,
            uploadedBy: req.admin?._id,
        });
        res.status(201).json({
            success: true,
            message: "Media uploaded successfully",
            media,
        });
    });

export const getAllMedia = asyncHandler(
    async (req, res) => {
        const media = await Media.find()
            .populate("uploadedBy", "name email")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: media.length,
            media,
        });
    });

export const deleteMedia = asyncHandler(
    async (req, res) => {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({
                success: false,
                message: "Media not found",
            });
        }

        await cloudinary.uploader.destroy(media.publicId);
        await media.deleteOne();
        res.status(200).json({
            success: true,
            message: "Media deleted successfully",
        });
    });

export const toggleMediaStatus = asyncHandler(
    async (req, res) => {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({
                success: false,
                message: "Media not found",
            });
        }
        media.inUse = !media.inUse;
        await media.save(); res.status(200).json({
            success: true,
            message: "Media status updated",
            media,
        });
    });