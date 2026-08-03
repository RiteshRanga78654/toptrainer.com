import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as OpenIDConnectStrategy } from "passport-openidconnect";

import User from "../models/user.js";
import TrainerProfile from "../models/trainerProfile.js";
import generateToken from "../utils/generationToken.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();

const linkedInClientId = process.env.LINKEDIN_CLIENT_ID;
const linkedInClientSecret = process.env.LINKEDIN_CLIENT_SECRET;
const linkedInCallbackUrl = process.env.LINKEDIN_CALLBACK_URL || "http://localhost:5000/api/auth/linkedin/callback";
const frontendUrl = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

// LinkedIn retired the old r_emailaddress / r_liteprofile (v1/v2) scopes.
// New sign-in flow is "Sign In with LinkedIn using OpenID Connect", which
// uses standard OIDC endpoints instead of a legacy passport-linkedin package.
if (linkedInClientId && linkedInClientSecret) {
  passport.use(
    "linkedin",
    new OpenIDConnectStrategy(
      {
        issuer: "https://www.linkedin.com/oauth",
        authorizationURL: "https://www.linkedin.com/oauth/v2/authorization",
        tokenURL: "https://www.linkedin.com/oauth/v2/accessToken",
        userInfoURL: "https://api.linkedin.com/v2/userinfo",
        clientID: linkedInClientId,
        clientSecret: linkedInClientSecret,
        callbackURL: linkedInCallbackUrl,
        scope: ["openid", "profile", "email"],
        passReqToCallback: true,
      },
      async (_req, _issuer, profile, done) => {
        try {
          // passport-openidconnect maps the /userinfo response into profile,
          // but LinkedIn's raw claims are also available on profile._json.
          const raw = profile._json || {};
          const email =
            profile.emails?.[0]?.value?.toLowerCase() ||
            raw.email?.toLowerCase();

          if (!email) {
            return done(null, false, { message: "LinkedIn account did not return an email." });
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
            message: "No existing trainer or user account found for this LinkedIn email.",
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
} else {
  console.warn("LinkedIn OAuth environment variables are not set. LinkedIn login is disabled.");
}

export const linkedInAuthRedirect = passport.authenticate("linkedin", {
  session: false,
});

export const linkedInAuthCallback = (req, res, next) => {
  passport.authenticate("linkedin", { session: false }, async (err, account, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "LinkedIn login failed",
      });
    }

    if (!account) {
      return res.status(404).json({
        success: false,
        message: info?.message || "No matching trainer or user account found for this LinkedIn email.",
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
    redirectUrl.searchParams.set("provider", "linkedin");
    redirectUrl.searchParams.set("user", encodeURIComponent(JSON.stringify(account)));

    return res.redirect(redirectUrl.toString());
  })(req, res, next);
};