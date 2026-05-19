import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../controllers/expenseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { scanReceipt } from "../utils/ScanReceipt.js";
import multer from "multer";

const expenseRouter = express.Router();
const upload = multer();

expenseRouter.post("/", authMiddleware, createExpense);

expenseRouter.get("/", authMiddleware, getExpenses);

expenseRouter.post("/scan-receipt", authMiddleware, upload.single("file"), async (req, res) => {
    console.log("ROUTE HIT");  
    try {
        console.log(req.file);
        const file = req.file;

        const result = await scanReceipt(file);

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
