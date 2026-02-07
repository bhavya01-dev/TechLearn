import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Load env vars
config();

// Connect to database
connectDB();

// Route files
import courses from './routes/courseRoutes.js';
import qotdRoutes from './routes/qotdRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import userRouter from './routes/userRoute.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';

const app = express();

// Enable CORS - Move to the very top to ensure headers are set for all requests
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://tech-learn-amritesh.vercel.app'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(json());

// Simple logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Mount routers
app.use('/api/courses', courses);
app.use('/api/v1/qotd', qotdRoutes);
app.use('/api/v1/leaderboard', leaderboardRoutes);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/leaderboard", leaderboardRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});



const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
