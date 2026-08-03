import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import passport from "passport";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware.js";
import "./config/passportGoogle.js";
import "./config/passpotLinkedin.js";       
import userRouter from "./routes/userRouter.js";
import userDashBoard from "./routes/userDashboardRouter.js";
import trainerRouter from "./routes/trainerRouter.js";
import trainerDashboard from "./routes/trainerDashboardRouter.js"
import adminDashBoard from "./routes/adminDashboardRouter.js"
import adminAuthRouter from "./routes/adminAuthRouter.js"
import workshopRouter from "./routes/workshopRouter.js";
import articleRouter from "./routes/articleRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import industryRouter from "./routes/industryRouter.js";
import competencyRouter from "./routes/competencyRouter.js";
import searchRouter from "./routes/searchRouter.js";
import session from "express-session";          
import youtubeRouter from "./routes/youtubeVideoRouter.js";
import featuredRouter from "./routes/featuredItems.js";
import mediaRouter from "./routes/mediaRouter.js";
import heroImageRouter from "./routes/heroImageRouter.js";
import singleAuthRouter from "./routes/singleAuthRouter.js";
import depaartmentRouter from "./routes/departmentRouter.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config();
console.log("SERVER ENV:", process.env.CLOUDINARY_CLOUD_NAME);

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // or whatever port Next.js runs on
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/users", userRouter);
app.use("/api/trainers", trainerRouter);
app.use("/api/admin", adminDashBoard);
app.use("/api/admin", adminAuthRouter);
app.use("/api/trainer", trainerDashboard);
app.use("/api/user", userDashBoard);
app.use("/api/workshops", workshopRouter);
app.use("/api/articles", articleRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/industries", industryRouter);
app.use("/api/competencies", competencyRouter);
app.use("/api/departments", depaartmentRouter);
app.use("/api/search", searchRouter);
app.use("/api/youtube-videos", youtubeRouter);
app.use("/api/featured-lists", featuredRouter);
app.use("/api/media", mediaRouter);
app.use("/api/hero-images", heroImageRouter);
app.use("/api/auth", singleAuthRouter);

connectDB();

app.use(errorMiddleware);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
