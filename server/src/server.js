import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import { createRequire } from "module";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import passport from "./config/passport.js";
import prisma from "./config/prisma.js";
import errorHandler from "./middleware/errorHandler.js";
import authRouter from "./routes/authRoutes.js";
import budgetRouter from "./routes/budgetRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
const require = createRequire(import.meta.url);
const swaggerOutput = require("./swagger-output.json");

const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // if using cookies or auth
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Session is required by passport temporarily during OAuth redirect
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set true in production with HTTPS
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get("/", (req, res) => {
  res.send("API running...");
});

//routes
app.use("/api/auth", authRouter);

//budget
app.use("/api/budget", budgetRouter);

//category
app.use("/api/category", categoryRouter);

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
