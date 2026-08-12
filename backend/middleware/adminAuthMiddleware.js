import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import TeamMember from "../models/teamMember.js";

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

           let admin = await Admin.findById(decoded.id);

      if (!admin) {
        admin = await TeamMember.findById(decoded.id);
      }

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (admin.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated. Contact support.",
      });
    }

    req.admin = admin;
    req.isTeamMember = admin.role !== "administrator";

    next();
    } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      
    });
  }
};
