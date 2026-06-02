import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.get("/",authMiddleware, getProfile);

profileRouter.patch("/", authMiddleware, updateProfile);

export default profileRouter;