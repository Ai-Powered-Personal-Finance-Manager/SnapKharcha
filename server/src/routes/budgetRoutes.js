import express from "express";
import {
  createBudget,
  deleteBudget,
  getBudgetById,
  getBudgets,
  updateBudget,
} from "../controllers/budgetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const budgetRouter = express.Router();

budgetRouter.post("/", authMiddleware, createBudget);

budgetRouter.get("/", authMiddleware, getBudgets);

budgetRouter.get("/:id", authMiddleware, getBudgetById);

budgetRouter.patch("/:id", authMiddleware, updateBudget);

budgetRouter.delete("/:id", authMiddleware, deleteBudget);

export default budgetRouter;
