import express from 'express';
import connectDB from './utils/dbConnector.js';
import dotenv from 'dotenv';
import cors from 'cors'
import UserRouter from './routes/User.js';
import AttendanceCategoryRouter from './routes/Attandance.js'
import AttendanceRecordRouter from './routes/AttandanceRecord.js'
import StreakRouter from './routes/Streak.js'
import cookieParser from 'cookie-parser';
import ContactRouter from './routes/ContactUs.js';



dotenv.config();
connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors(
    {
    origin: "https://attend-x-beige.vercel.app",
    credentials: true,
  }
));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use('/api/users', UserRouter);
app.use('/api/attendance-category', AttendanceCategoryRouter);
app.use('/api/attendance-record', AttendanceRecordRouter);
app.use('/api/streak', StreakRouter);
app.use('/api',ContactRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
