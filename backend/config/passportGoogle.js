import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import User from "../models/user.js";
import TrainerProfile from "../models/trainerProfile.js";
import generateToken from "../utils/generationToken.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL || "https://toptrainer-backend-production.up.railway.app/ckend-production.up.railway.app/ckend-production.up.railway.app/ckend-production.up.railway.app/ckend-production.up.railway.app/ckend-production.up.railway.app/ckend-production.up.railway.app//api/auth/google/callback";
const frontendUrl = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

if (googleClientId && googleClientSecret) {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: googleCallbackUrl,
        passReqToCallback: true,
      },
      async (_req, _accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();

          if (!email) {
            return done(null, false, { message: "Google account did not return an email." });
          }

          const trainer = await TrainerProfile.findOne({ email });
          if (trainer) {
            if (trainer.status === "inactive") {
              return done(null, false, {
                message: "Your trainer account is deactivated. Please contact support.",
              });
            }

            return done(null, {
              _id: trainer._id,
              role: "trainer",
              ...trainer.toObject(),
            });
          }

          const user = await User.findOne({ email });
          if (user) {
            if (user.status === "inactive") {
              return done(null, false, {
                message: "Your user account is deactivated. Please contact support.",
              });
            }

            user.isOnline = true;
            user.lastSeen = new Date();
            await user.save({ validateBeforeSave: false });

            return done(null, {
              _id: user._id,
              role: "user",
              ...user.toObject(),
            });
          }

          return done(null, false, {
            message: "No existing trainer or user account found for this Google email.",
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
} else {
  console.warn("Google OAuth environment variables are not set. Google login is disabled.");
}

export const googleAuthRedirect = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

export const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, async (err, account, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Google login failed",
      });
    }

    if (!account) {
      return res.status(404).json({
        success: false,
        message: info?.message || "No matching trainer or user account found for this Google email.",
      });
    }

    const token = generateToken(
      res,
      account._id,
      account.role === "trainer" ? "trainerToken" : "userToken"
    );

    delete account.password;

    const redirectUrl = new URL(`${frontendUrl}/auth/social-callback`);
    redirectUrl.searchParams.set("token", token);
    redirectUrl.searchParams.set("role", account.role);
    redirectUrl.searchParams.set("provider", "google");
    redirectUrl.searchParams.set("user", encodeURIComponent(JSON.stringify(account)));

    return res.redirect(redirectUrl.toString());
  })(req, res, next);
};
