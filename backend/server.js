import express from 'express';                              
import dotenv from 'dotenv';                        
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());git branch -a


connectDB();

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);      
});