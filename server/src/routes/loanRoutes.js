import express from "express";
import { createLoan } from "../controllers/loanController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const loanRoutes = express();

loanRoutes.post("/", authMiddleware, createLoan);

export default loanRoutes;
