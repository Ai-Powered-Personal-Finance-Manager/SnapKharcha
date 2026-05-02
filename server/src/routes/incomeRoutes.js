import express from "express";
import {
  createIncome,
  deleteIncome,
  getIncomeById,
  getIncomes,
  updateIncome,
} from "../controllers/incomeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const incomeRoutes = express();

incomeRoutes.post("/", authMiddleware, createIncome);

incomeRoutes.get("/", authMiddleware, getIncomes);

incomeRoutes.get("/:id", authMiddleware, getIncomeById);

incomeRoutes.patch("/:id", authMiddleware, updateIncome);

incomeRoutes.delete("/:id", authMiddleware, deleteIncome);

export default incomeRoutes;
