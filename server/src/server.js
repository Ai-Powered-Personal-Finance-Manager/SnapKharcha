import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import prisma from "./config/prisma.js";
import authRouter from "./routes/authRoutes.js";
import session from "express-session";
import passport from "./config/passport.js";
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
// import swaggerSpec from './config/swagger.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerOutput = require('./swagger-output.json');
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Session is required by passport temporarily during OAuth redirect
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set true in production with HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get("/", (req, res) => {
    res.send("API running...");
});

//routes
app.use("/api/auth", authRouter);

// must be after all routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.log("✅ Prisma connected to the database successfully");
        console.log(`🚀 Server running on port ${PORT}`);
    } catch (error) {
        console.error("❌ Failed to connect to database:", error);
        process.exit(1);
    }
});