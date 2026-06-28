import jwt from "jsonwebtoken";

const generateToken = (res, id) => {

    const token = jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE || "7d",
        }
    );

    res.cookie("trainerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: (process.env.COOKIES_EXPIRE || 7 )* 24 * 60 * 60 * 1000,
    });

    return token;
};

export default generateToken;