import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../controllers/expenseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const expenseRouter = express();

expenseRouter.post("/", authMiddleware, createExpense);

expenseRouter.get("/", authMiddleware, getExpenses);

expenseRouter.get("/:id", authMiddleware, getExpenseById);

expenseRouter.patch("/:id", authMiddleware, updateExpense);

expenseRouter.delete("/:id", authMiddleware, deleteExpense);

export default expenseRouter;
