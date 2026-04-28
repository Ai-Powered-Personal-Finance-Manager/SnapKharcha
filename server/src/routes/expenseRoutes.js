import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../controllers/expenseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const expenseRoute = express();

expenseRoute.post("/", authMiddleware, createExpense);

expenseRoute.get("/", authMiddleware, getExpenses);

expenseRoute.get("/:id", authMiddleware, getExpenseById);

expenseRoute.patch("/:id", authMiddleware, updateExpense);

expenseRoute.delete("/:id", authMiddleware, deleteExpense);

export default expenseRoute;
