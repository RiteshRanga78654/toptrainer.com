import User from "../models/user.js";
import generateToken from "../utils/generationToken.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";
import cloudinary from "../config/cloudinary.js";

export const registerUser = asyncHandler(
    async (req, res) => {
        const { firstName, lastName, email, phoneNumber, password, comfirmPassword } = req.body;

        if (!firstName || !lastName || !email || !phoneNumber || !password || !comfirmPassword) {
            return res.status(400).json({
                success: false,
                message: "please fill all deatails are required",
            })
        }

        if (password !== comfirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password do not match",

            })
        }

        const existingUser = await User.findOne({
            email,
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }
        const user = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
        });

        const token = generateToken(res, user._id, "userToken");

        user.password = undefined;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user,
        })
    });

export const loginUser = asyncHandler(
    async (req, res) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }
        const user = await User.findOne({
            email,
        }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invaild email and password",
            })
        }

        const isMached = await user.comparePassword(password);
        if (!isMached) {
            return res.status(401).json({
                success: false,
                message: "invalid email and password",
            });
        }
        user.isOnline = true;
        user.lastActive = new Date();

        await user.save({ validateBeforeSave: false });
        const token = generateToken(res, user._id, "userToken");
        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "login successful",
            token,
            user,
        });
    });

export const logoutUser = asyncHandler(
    async (req, res) => {
        await User.findByIdAndUpdate(req.user._id, {
            isOnline: false,
            lastActive: new Date(),
        });

        res.cookie("userToken", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
);

export const getMyProfile = asyncHandler(
    async (req, res) => {
        const user = await User.findById(
            req.user._id,
        )

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "USer not found"
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    }
);

export const updateMyProfile = asyncHandler(
    async (req, res) => {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Whitelist editable fields so nothing else (password, status,
        // role-sensitive flags, etc.) can be overwritten via this route.
        const editableFields = [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "dateOfBirth",
            "gender",
            "city",
            "state",
            "country",
            "address",
            "profession",
            "company",
            "bio",
        ];

        editableFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                user[field] = req.body[field] === "" ? "" : req.body[field];
            }
        });

        // Explicit future-date guard, on top of the schema-level validator,
        // so we can return a clear message before touching Cloudinary.
        if (req.body.dateOfBirth) {
            const dob = new Date(req.body.dateOfBirth);
            if (Number.isNaN(dob.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid date of birth",
                });
            }
            if (dob > new Date()) {
                return res.status(400).json({
                    success: false,
                    message: "Date of birth cannot be in the future",
                });
            }
            user.dateOfBirth = dob;
        }

        // Remove avatar (explicit request from the client, separate from
        // uploading a new one).
        if (req.body.removeAvatar === "true" || req.body.removeAvatar === true) {
            if (user.avatar?.publicId) {
                try {
                    await cloudinary.uploader.destroy(user.avatar.publicId);
                } catch (error) {
                    console.error("Cloudinary avatar deletion error:", error);
                }
            }
            user.avatar = { url: "", publicId: "" };
        }

        // Upload a new avatar (replaces the old one, if any).
        if (req.file) {
            if (user.avatar?.publicId) {
                try {
                    await cloudinary.uploader.destroy(user.avatar.publicId);
                } catch (error) {
                    console.error("Cloudinary avatar deletion error:", error);
                }
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "toptrainer/user-avatars",
            });

            user.avatar = {
                url: result.secure_url,
                publicId: result.public_id,
            };
        }

        await user.save();

        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    });


export const updatePassword = asyncHandler(
    async (req, res) => {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(
            req.user._id,
        ).select("+password");


        const isMatched = await user.comparePassword(oldPassword);
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        user.password = newPassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    })