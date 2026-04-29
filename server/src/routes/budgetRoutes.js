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

budgetRouter.post(
  "/",
  authMiddleware,
  createBudget,
); /* #swagger.tags = ['Budget'] */

budgetRouter.get(
  "/",
  authMiddleware,
  getBudgets,
); /* #swagger.tags = ['Budget'] */

budgetRouter.get(
  "/:id",
  authMiddleware,
  getBudgetById,
); /* #swagger.tags = ['Budget'] */

budgetRouter.patch(
  "/:id",
  authMiddleware,
  updateBudget,
); /* #swagger.tags = ['Budget'] */

budgetRouter.delete(
  "/:id",
  authMiddleware,
  deleteBudget,
); /* #swagger.tags = ['Budget'] */

export default budgetRouter;
