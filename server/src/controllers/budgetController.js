import { Prisma } from "@prisma/client";
import prisma from "../config/prisma.js";

// ─────────────────────────────────────────
// CREATE BUDGET
// ─────────────────────────────────────────

export const createBudget = async (req, res, next) => {
  try {
    const {
      amount,
      name,
      startingDate,
      expireDate,
      categoryId,
      note,
      alert,
      alertLimit,
    } = req.body;

    const userId = req.user.id;

    // ───── Required fields ─────
    if (!amount || !name || !startingDate || !expireDate || !categoryId) {
      return res.status(400).json({
        success: false,
        message:
          "amount, name, startingDate, expireDate, and categoryId are required",
      });
    }

    // ───── Validate category ─────
    const category = await prisma.category.findUnique({
      where: { id: categoryId, userId },
    });

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Invalid categoryId: category does not exist",
      });
    }

    // ───── Parse amount ─────
    const parsedAmount = Number(amount);

    if (!Number.isInteger(parsedAmount) || parsedAmount < 0) {
      return res.status(400).json({
        success: false,
        message: "amount must be a valid positive integer",
      });
    }

    // ───── Validate dates ─────
    const start = new Date(startingDate);
    const end = new Date(expireDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    // ───── Boolean normalize ─────
    const parsedAlert =
      typeof alert === "boolean" ? alert : alert === "true" || alert === "1";

    // ───── Build data ─────
    const data = {
      name,
      amount: parsedAmount,
      startingDate: start,
      expireDate: end,
      userId,
      categoryId,

      spendAmount: 0,

      alert: parsedAlert,
    };

    if (note) data.note = note;

    // alertLimit (Decimal safe)
    if (alertLimit !== undefined && alertLimit !== null && alertLimit !== "") {
      data.alertLimit = new Prisma.Decimal(alertLimit);
    }

    // ───── Create budget ─────
    const budget = await prisma.budget.create({
      data,
    });

    return res.status(201).json({
      success: true,
      message: "Budget created successfully",
      data: budget,
    });
  } catch (error) {
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
    } = req.body;

    const userId = req.user.id;

    // ───── Check ownership ─────
    const existing = await prisma.budget.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    // ───── Validate dates ─────
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

    // ───── Validate amount ─────
    let parsedAmount = existing.amount;

    if (amount !== undefined) {
      parsedAmount = Number(amount);

      if (!Number.isInteger(parsedAmount) || parsedAmount < 0) {
        return res.status(400).json({
          success: false,
          message: "amount must be a valid positive integer",
        });
      }
    }

    // ───── Build update object ─────
    const data = {
      name: name ?? existing.name,
      amount: parsedAmount,
      startingDate: start,
      expireDate: end,
      categoryId: categoryId ?? existing.categoryId,
      note: note ?? existing.note,
      alert: alert ?? existing.alert,
    };

    // ───── alertLimit safe update ─────
    if (alertLimit !== undefined) {
      data.alertLimit =
        alertLimit === null || alertLimit === ""
          ? null
          : new Prisma.Decimal(alertLimit);
    }

    // spendAmount intentionally NOT included

    // ───── Update budget ─────
    const updated = await prisma.budget.update({
      where: { id },
      data,
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
      return res.status(409).json({
        success: false,
        message: "Duplicate entry detected",
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
