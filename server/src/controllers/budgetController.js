import { Prisma } from "@prisma/client";
import prisma from "../config/prisma.js";

// ─────────────────────────────────────────
// CREATE BUDGET
// ─────────────────────────────────────────
export const createBudget = async (req, res, next) => {
  /* #swagger.tags = ['Budget'] */
  try {
    const { amount, month, year, categoryId } = req.body;
    const userId = req.user.id;

    if (amount == null || month == null || year == null) {
      return res.status(400).json({
        success: false,
        message: "amount, month, and year are required",
      });
    }

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "categoryId is required",
      });
    }

    const data = {
      amount,
      month,
      year,
      userId,
    };

    if (categoryId) {
      data.categoryId = categoryId;
    }

    const budget = await prisma.budget.create({ data });

    return res.status(201).json({
      success: true,
      message: "Budget created successfully",
      data: budget,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message: "Budget already exists",
      });
    }
    next(error);
  }
};

// ─────────────────────────────────────────
// GET BUDGETS
// ─────────────────────────────────────────
export const getBudgets = async (req, res, next) => {
  /* #swagger.tags = ['Budget'] */
  try {
    const userId = req.user.id;

    const budgets = await prisma.budget.findMany({
      where: { userId },
      include: {
        category: true,
      },
      orderBy: {
        year: "desc",
      },
    });

    // handle soft deleted categories
    const formatted = budgets.map((b) => ({
      ...b,
      category: b.category?.deletedAt
        ? {
            id: b.category.id,
            name: "Deleted Category",
            deleted: true,
          }
        : b.category,
    }));

    return res.status(200).json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// GET BUDGET BY ID
// ─────────────────────────────────────────

export const getBudgetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const budget = await prisma.budget.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        category: true,
      },
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    const formatted = {
      ...budget,
      category: budget.category?.deletedAt
        ? {
            id: budget.category.id,
            name: "Deleted Category",
            deleted: true,
          }
        : budget.category,
    };

    return res.status(200).json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// UPDATE BUDGET
// ─────────────────────────────────────────

export const updateBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, month, year, categoryId } = req.body;
    const userId = req.user.id;

    const existing = await prisma.budget.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    const updated = await prisma.budget.update({
      where: { id },
      data: {
        amount: amount ?? existing.amount,
        month: month ?? existing.month,
        year: year ?? existing.year,
        categoryId: categoryId ?? existing.categoryId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// DELETE BUDGET
// ─────────────────────────────────────────

export const deleteBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existing = await prisma.budget.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    await prisma.budget.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
