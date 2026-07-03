import Competency from "../models/Competency.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

export const createCompetency = asyncHandler(
    async (req, res) => {
        const { name, icon } = req.body;
        const competency = await Competency.create({ 
            name,
             icon, 
             createdBy: req.admin?._id,
             }); 
             res.status(201).json({ 
                success: true,
                 message: "Competency created successfully", competency, });
    }

);

export const getAllCompetencies = asyncHandler(
    async (req, res) => { 
    const compentencies = await Competency.find() .sort({ createdAt: -1 });
     res.status(200).json({ 
        success: true, 
        count: compentencies.length, 
        compentencies, });
     });

export const getSingleCompetency = asyncHandler(
    async (req, res) => {
     const competency = await Competency.findById(req.params.id);
      if (!competency) {
         return res.status(404).json({
             success: false, 
             message: "competency not found", 
            }); 
        } 
        res.status(200).json({ 
            success: true,
             competency, });
             });

export const updateCompetency = asyncHandler(
    async (req, res) => { 
    const competency = await Competency.findByIdAndUpdate( 
        req.params.id,
         req.body, { 
        new: true, 
        runValidators: true, 

    } );
     if (!competency) { 
        return res.status(404).json({
             success: false, 
             message: "competency not found", 
            }); 
        }
         res.status(200).json({
             success: true, 
             message: "competency updated successfully", 
             competency, });
             });

export const deleteCompetency = asyncHandler(
    async (req, res) => { 
    const competency = await Competency.findById(req.params.id);
     if (!competency) { 
        return res.status(404).json({
         success: false,
         message: "Competency not found",
         }); 
        } 
        await competency.deleteOne(); 
        res.status(200).json({
             success: true,
              message: "Competency deleted successfully",
             });
             });

export const toggleCompetencyStatus = asyncHandler(
    async (req, res) => { 
        const competency = await Competency.findById(req.params.id); 
        if (!competency) {
             return res.status(404).json({ 
                success: false,
                 message: "competency not found",
                 });
                 } competency.isActive = !competency.isActive;
                  await competency.save();
                   res.status(200).json({ 
                    success: true, 
                    message: competency.isActive ? "Competency activated" : "Competency deactivated", 
                    competency, });
                 });
