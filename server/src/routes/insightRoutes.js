import express from "express";
import { generateInsights } from "../controllers/insightController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const insightRouter = express.Router();

insightRouter.get("/", authMiddleware, generateInsights);

export default insightRouter;
