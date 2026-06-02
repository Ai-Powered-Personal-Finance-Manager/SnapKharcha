import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import analyticsController from "../controllers/analyticsController.js";

const analyticsRouter = express.Router();

analyticsRouter.get("/", authMiddleware, analyticsController);

export default analyticsRouter;