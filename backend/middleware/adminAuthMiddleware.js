import jwt from "jsonwebtoken";
import User from "../models/admin.js";

export const protectAdmin = async (req, res, next)  => {
    try{
        const token = req.cookies.adminToken;
        if(!token){
            return res.status(401).json({
                susccess: false,
                message: "Please Login first"
,            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

           const admin = await User.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    req.admin = admin;

    next();
    } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
