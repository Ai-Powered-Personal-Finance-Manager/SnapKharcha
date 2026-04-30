import express from "express";
import {
  createLoan,
  deleteLoan,
  getLoanById,
  getLoans,
  updateLoan,
} from "../controllers/loanController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const loanRoutes = express();

loanRoutes.post("/", authMiddleware, createLoan);

loanRoutes.get("/", authMiddleware, getLoans);

loanRoutes.get("/:id", authMiddleware, getLoanById);

loanRoutes.patch("/:id", authMiddleware, updateLoan);

loanRoutes.delete("/:id", authMiddleware, deleteLoan);

export default loanRoutes;
