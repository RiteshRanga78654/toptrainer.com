import Industry from "../models/industry.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

export const createIndustry = asyncHandler(
    async (req, res) => {
        const { name, icon } = req.body;
        const industry = await Industry.create({ 
            name,
             icon, 
             createdBy: req.admin?._id,
             }); 
             res.status(201).json({ 
                success: true,
                 message: "Industry created successfully", industry, });
    }

);

export const getAllIndustries = asyncHandler(
    async (req, res) => { 
    const industries = await Industry.find() .sort({ createdAt: -1 });
     res.status(200).json({ 
        success: true, 
        count: industries.length, 
        industries, });
     });

export const getSingleIndustry = asyncHandler(
    async (req, res) => {
     const industry = await Industry.findById(req.params.id);
      if (!industry) {
         return res.status(404).json({
             success: false, 
             message: "Industry not found", 
            }); 
        } 
        res.status(200).json({ 
            success: true,
             industry, });
             });

export const updateIndustry = asyncHandler(
    async (req, res) => { 
    const industry = await Industry.findByIdAndUpdate( 
        req.params.id,
         req.body, { 
        new: true, 
        runValidators: true, 

    } );
     if (!industry) { 
        return res.status(404).json({
             success: false, 
             message: "Industry not found", 
            }); 
        }
         res.status(200).json({
             success: true, 
             message: "Industry updated successfully", 
             industry, });
             });

export const deleteIndustry = asyncHandler(
    async (req, res) => { 
    const industry = await Industry.findById(req.params.id);
     if (!industry) { 
        return res.status(404).json({
         success: false,
         message: "Industry not found",
         }); 
        } 
        await industry.deleteOne(); 
        res.status(200).json({
             success: true,
              message: "Industry deleted successfully",
             });
             });

export const toggleIndustryStatus = asyncHandler(
    async (req, res) => { 
        const industry = await Industry.findById(req.params.id); 
        if (!industry) {
             return res.status(404).json({ 
                success: false,
                 message: "Industry not found",
                 });
                 } industry.isActive = !industry.isActive;
                  await industry.save();
                   res.status(200).json({ 
                    success: true, 
                    message: industry.isActive ? "Industry activated" : "Industry deactivated", 
                    industry, });
                 });
