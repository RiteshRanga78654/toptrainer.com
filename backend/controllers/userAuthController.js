import User from "../models/user.js";
import generateToken from "../utils/generationToken.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

export const registerUser = asyncHandler(
    async (req,res) => {
        const {firstName, lastName, email, phoneNumber, password, comfirmPassword} = req.body;

        if(!firstName || !lastName || !email || !phoneNumber|| !password ||!comfirmPassword){
            return res.status(400).json({
                success: false,
                message: "please fill all deatails are required",
            })
        }

        if(password!== comfirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password do not match",

            })
        }

        const existingUser = await User.findOne({
            email,
        });
        if(existingUser){
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

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Please provide email and password",
        });
    }
    const user = await User.findOne ({
        email,
    }).select("+password");
   
    if(!user) {
        return res.status(401).json({
            success: false,
            message: "Invaild email and password",
        })
    }

    const isMached = await user.comparePassword(password);
    if(!isMached){
        return res.status(401).json({
            success: false,
            message: "invalid email and password",
        });
    }
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
          res.cookie("userToken", "", { 
            httpOnly: true, 
            expires: new Date(0), }); 
            
            res.status(200).json({ 
                success: true, 
                message: "Logged out successfully", });  
        }
    );

    export const getMyProfile = asyncHandler(
        async (req, res) => {
            const user = await User.findById(
                req.user._id,
            )
            
            if(!user){
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
            const user = await User.findByIdAndUpdate(
                req.user._id,
                req.body,
                {
                    new: user,
                    runValidators: true,
                }
            );
        });


    export const updatePassword = asyncHandler(
        async (req, res) => {
            const {oldPassword, newPassword} = req.bpdy;

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