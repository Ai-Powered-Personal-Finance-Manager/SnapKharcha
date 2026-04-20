import express from "express";
import { createBudget, updateBudget } from "../controllers/budgetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const budgetRouter = express.Router();

budgetRouter.post("/", authMiddleware, createBudget);

budgetRouter.patch("/", authMiddleware, updateBudget);

export default budgetRouter;
