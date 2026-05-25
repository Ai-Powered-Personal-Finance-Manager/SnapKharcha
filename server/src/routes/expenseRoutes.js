import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../controllers/expenseController.js";
import prisma from "../config/prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { scanReceipt } from "../utils/ScanReceipt.js";
import multer from "multer";

const expenseRouter = express.Router();
const upload = multer();

expenseRouter.post("/", authMiddleware, createExpense);

expenseRouter.get("/", authMiddleware, getExpenses);

expenseRouter.post("/scan-receipt", authMiddleware, upload.single("file"), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "Receipt file is required",
            });
        }

        const categories = await prisma.category.findMany({
            where: {
                userId: req.user.id,
                deletedAt: null,
            },
            orderBy: {
                name: "asc",
            },
        });

        const budgets = await prisma.budget.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                category: true,
            },
            orderBy: {
                startingDate: "desc",
            },
        });

        const result = await scanReceipt(file, categories, budgets);

        if (!result.budget) {
            return res.status(422).json({
                message: "You don't have an associated budget for this receipt category.",
            });
        }

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
        message: "Failed to scan receipt",
        });
    }
});

expenseRouter.get("/:id", authMiddleware, getExpenseById);

expenseRouter.patch("/:id", authMiddleware, updateExpense);

expenseRouter.delete("/:id", authMiddleware, deleteExpense);


export default expenseRouter;
