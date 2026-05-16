import express from "express";
import {
  createLoan,
  deleteLoan,
  getLoanById,
  getLoans,
  updateLoan,
} from "../controllers/loanController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const loanRouter = express();

loanRouter.post("/", authMiddleware, createLoan);

loanRouter.get("/", authMiddleware, getLoans);

loanRouter.get("/:id", authMiddleware, getLoanById);

loanRouter.patch("/:id", authMiddleware, updateLoan);

loanRouter.delete("/:id", authMiddleware, deleteLoan);

export default loanRouter;
