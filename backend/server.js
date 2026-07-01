import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRouter.js";
import trainerRouter from "./routes/trainerRouter.js";
import adminAuthRouter from "./routes/adminAuthRouter.js";
import workshopRouter from "./routes/workshopRouter.js";
import articleRouter from "./routes/articleRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import industryRouter from "./routes/industryRouter.js";
import competencyRouter from "./routes/competencyRouter.js";
import mediaRouter from "./routes/mediaRouter.js";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/trainers", trainerRouter);
app.use("/api/admin", adminAuthRouter);
app.use("/api/workshops", workshopRouter);
app.use("/api/articles", articleRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/industries", industryRouter);
app.use("/api/competencies", competencyRouter);
app.use("/api/media", mediaRouter);


connectDB();


app.use(errorMiddleware);
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});