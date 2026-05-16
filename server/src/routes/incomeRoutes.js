import express from "express";
import {
  createIncome,
  deleteIncome,
  getIncomeById,
  getIncomes,
  updateIncome,
} from "../controllers/incomeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const incomeRouter = express();

incomeRouter.post("/", authMiddleware, createIncome);

incomeRouter.get("/", authMiddleware, getIncomes);

incomeRouter.get("/:id", authMiddleware, getIncomeById);

incomeRouter.patch("/:id", authMiddleware, updateIncome);

incomeRouter.delete("/:id", authMiddleware, deleteIncome);

export default incomeRouter;
