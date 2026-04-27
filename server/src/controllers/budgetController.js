import { Prisma } from "@prisma/client";
import prisma from "../config/prisma.js";

// ─────────────────────────────────────────
// CREATE BUDGET
// ─────────────────────────────────────────
export const createBudget = async (req, res, next) => {
  /* #swagger.tags = ['Budget'] */
  try {
    const {
      amount,
      name,
      startingDate,
      expireDate,
      categoryId,
      spendAmount,
      note,
      alert,
      alertLimit,
    } = req.body;

    const userId = req.user.id;

    // handle wrong categoryId
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Invalid categoryId: category does not exist",
      });
    }

    // Required fields validation
    if (!amount || !name || !startingDate || !expireDate || !categoryId) {
      return res.status(400).json({
        success: false,
        message:
          "amount, name, startingDate, expireDate, and categoryId are required",
      });
    }

    // Parse numbers safely
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount)) {
      return res.status(400).json({
        success: false,
        message: "amount must be a valid number",
      });
    }

    // Date validation
    const start = new Date(startingDate);
    const end = new Date(expireDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    // Boolean normalization (important!)
    const parsedAlert =
      typeof alert === "boolean" ? alert : alert === "true" || alert === "1";

    const parsedSpendAmount =
      spendAmount === undefined || spendAmount === null || spendAmount === ""
        ? null
        : Number(spendAmount);

    if (isNaN(parsedSpendAmount)) {
      return res.status(400).json({
        success: false,
        message: "spendAmount must be a valid number",
      });
    }

    const data = {
      name,
      amount: parsedAmount,
      startingDate: start,
      expireDate: end,
      userId,
      categoryId,
      spendAmount: parsedSpendAmount,
      alert: parsedAlert,
    };

    // Optional fields
    if (note) data.note = note;

    // Prisma Decimal safety (important for Postgres precision)
    if (alertLimit != null && alertLimit !== "") {
      data.alertLimit = new Prisma.Decimal(alertLimit);
    }

    const budget = await prisma.budget.create({
      data,
    });

    return res.status(201).json({
      success: true,
      message: "Budget created successfully",
      data: budget,
    });
  } catch (error) {
    // Unique constraint (userId + categoryId)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message: "Budget already exists for this user and category",
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
        createdAt: "desc",
      },
    });

    // total budget
    const totalBudget = budgets.reduce((sum, b) => sum + Number(b.amount), 0);

    // total spent
    const totalSpent = budgets.reduce(
      (sum, b) => sum + Number(b.spendAmount || 0),
      0,
    );

    const remaining = totalBudget - totalSpent;

    const overallPercentage =
      totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    // format budgets
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
      data: {
        budget: formatted,

        summary: {
          totalBudget: totalBudget,
          totalSpent: totalSpent,
          remaining: remaining,
          overallPercentage: overallPercentage,
        },
      },
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
    const {
      name,
      amount,
      startingDate,
      expireDate,
      categoryId,
      note,
      alert,
      alertLimit,
      spendAmount,
    } = req.body;

    const userId = req.user.id;

    // check ownership
    const existing = await prisma.budget.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    // validate dates if provided
    let start = existing.startingDate;
    let end = existing.expireDate;

    if (startingDate) {
      start = new Date(startingDate);
      if (isNaN(start.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid startingDate",
        });
      }
    }

    if (expireDate) {
      end = new Date(expireDate);
      if (isNaN(end.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid expireDate",
        });
      }
    }

    const updated = await prisma.budget.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        amount: amount !== undefined ? Number(amount) : existing.amount,
        startingDate: start,
        expireDate: end,
        categoryId: categoryId ?? existing.categoryId,
        note: note ?? existing.note,
        alert: alert ?? existing.alert,
        alertLimit: alertLimit !== undefined ? alertLimit : existing.alertLimit,
        spendAmount:
          spendAmount !== undefined
            ? Number(spendAmount)
            : existing.spendAmount,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      data: updated,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target;

      return res.status(409).json({
        success: false,
        message: target
          ? `${target.join(", ")} already exists`
          : "Duplicate entry detected",
      });
    }
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
