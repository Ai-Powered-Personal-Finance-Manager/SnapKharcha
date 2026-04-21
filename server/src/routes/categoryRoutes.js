import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/", authMiddleware, createCategory);

categoryRouter.get("/", authMiddleware, getCategories);

categoryRouter.get("/:id", authMiddleware, getCategoryById);

categoryRouter.patch("/:id", authMiddleware, updateCategory);

categoryRouter.delete("/:id", authMiddleware, deleteCategory);

export default categoryRouter;
