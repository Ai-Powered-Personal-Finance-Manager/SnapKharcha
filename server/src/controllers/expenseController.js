import prisma from "../config/prisma.js";

// ─────────────────────────────────────────
// CREATE EXPENSE
// ─────────────────────────────────────────
export const createExpense = async (req, res, next) => {
  try {
    const { amount, note, budgetId, paymentMethod, date, merchant } = req.body;
    const userId = req.user.id;

    // ───── Validation ─────
    if (
      amount === undefined ||
      !budgetId ||
      !note ||
      !paymentMethod ||
      !date ||
      !merchant
    ) {
      return res.status(400).json({
        success: false,
        message:
          "amount, note, budgetId, paymentMethod, date, and merchant are required",
      });
    }

    const validPaymentMethods = ["CASH", "WALLET", "BANK"];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: `Invalid paymentMethod. Valid options are: ${validPaymentMethods.join(", ")}`,
      });
    }

    if (isNaN(Date.parse(date))) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    const parsedAmount = Number(amount);

    if (!Number.isInteger(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "amount must be a valid positive integer",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const budget = await tx.budget.findFirst({
        where: { id: budgetId, userId },
      });

      if (!budget) {
        throw new Error("Invalid budgetId");
      }

      const spend = budget.spendAmount ?? 0;
      const available = budget.amount - spend;

      if (parsedAmount > available) {
        throw new Error(
          `Cannot exceed budget. Remaining amount is ${available}`,
        );
      }

      const expense = await tx.expense.create({
        data: {
          amount: parsedAmount,
          note: note || null,
          paymentMethod: paymentMethod,
          date: new Date(date),
          merchant: merchant,
          userId,
          budgetId,
          categoryId: budget.categoryId,
        },
      });

      const updatedBudget = await tx.budget.update({
        where: { id: budgetId },
        data: {
          spendAmount: {
            increment: parsedAmount,
          },
        },
      });

      const category = await tx.category.findUnique({
        where: { id: budget.categoryId },
      });

      return {
        ...expense,
        budget: updatedBudget,
        category,
      };
    });

    return res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: result,
    });
  } catch (error) {
    if (error.message.includes("Cannot exceed budget")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Invalid budgetId") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
};

// ─────────────────────────────────────────
// GET EXPENSES
// ─────────────────────────────────────────
export const getExpenses = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Today's start and end
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Get all expenses
    const expenses = await prisma.expense.findMany({
      where: { userId },
      include: {
        category: true,
        budget: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Today's transactions
    const todayStats = await prisma.expense.aggregate({
      where: {
        userId,
        date: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });

    // Overall transactions
    const overallStats = await prisma.expense.aggregate({
      where: { userId },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expenses,

      summary: {
        todayTransactions: todayStats._count.id || 0,
        todayAmount: todayStats._sum.amount || 0,

        totalTransactions: overallStats._count.id || 0,
        totalAmount: overallStats._sum.amount || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// GET EXPENSE BY ID
// ─────────────────────────────────────────
export const getExpenseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await prisma.expense.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        category: true,
        budget: true,
      },
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Expense fetched successfully",
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// UPDATE EXPENSE
// ─────────────────────────────────────────
export const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, note, budgetId, paymentMethod, date, merchant } = req.body;
    const userId = req.user.id;

    if (
      paymentMethod === undefined ||
      date === undefined ||
      merchant === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "paymentMethod, date, and merchant are required",
      });
    }

    const validPaymentMethods = ["CASH", "WALLET", "BANK"];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: `Invalid paymentMethod. Valid options are: ${validPaymentMethods.join(", ")}`,
      });
    }

    if (isNaN(Date.parse(date))) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    const parsedAmount = amount !== undefined ? Number(amount) : undefined;
    if (parsedAmount !== undefined) {
      if (!Number.isInteger(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: "amount must be a valid positive integer",
        });
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingExpense = await tx.expense.findFirst({
        where: { id, userId },
      });

      if (!existingExpense) {
        throw new Error("Expense not found");
      }

      const oldBudgetId = existingExpense.budgetId;
      const oldAmount = existingExpense.amount;
      const oldPaymentMethod = existingExpense.paymentMethod;
      const oldMerchant = existingExpense.merchant;
      const oldDate = existingExpense.date;

      const newBudgetId = budgetId ?? oldBudgetId;
      const budget = await tx.budget.findFirst({
        where: { id: newBudgetId, userId },
      });

      if (!budget) {
        throw new Error("Invalid budgetId");
      }

      const finalAmount = parsedAmount !== undefined ? parsedAmount : oldAmount;

      if (oldBudgetId !== newBudgetId) {
        await tx.budget.update({
          where: { id: oldBudgetId },
          data: {
            spendAmount: {
              decrement: oldAmount,
            },
          },
        });

        const available = budget.amount - (budget.spendAmount ?? 0);

        if (finalAmount > available) {
          throw new Error(
            `Cannot exceed budget. Remaining amount is ${available}`,
          );
        }

        await tx.budget.update({
          where: { id: newBudgetId },
          data: {
            spendAmount: {
              increment: finalAmount,
            },
          },
        });
      } else {
        const diff = finalAmount - oldAmount;

        const available = budget.amount - (budget.spendAmount ?? 0);

        if (diff > 0 && diff > available) {
          throw new Error(
            `Cannot exceed budget. Remaining amount is ${available}`,
          );
        }

        await tx.budget.update({
          where: { id: newBudgetId },
          data: {
            spendAmount: {
              increment: diff,
            },
          },
        });
      }

      const updatedExpense = await tx.expense.update({
        where: { id },
        data: {
          amount: finalAmount,
          note: note ?? existingExpense.note,
          paymentMethod: paymentMethod || oldPaymentMethod,
          date: new Date(date),
          merchant: merchant || oldMerchant,
          budgetId: newBudgetId,
        },
        include: {
          budget: true,
          category: true,
        },
      });

      return updatedExpense;
    });

    return res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: result,
    });
  } catch (error) {
    if (error.message === "Expense not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message.includes("Cannot exceed budget")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
};

// ─────────────────────────────────────────
// DELETE EXPENSE
// ─────────────────────────────────────────
export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // ───── Check expense ownership ─────
    const expense = await prisma.expense.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    // ───── Transaction (safe delete + rollback budget) ─────
    await prisma.$transaction(async (tx) => {
      // 1. Delete expense
      await tx.expense.delete({
        where: { id },
      });

      // 2. Rollback budget spendAmount if linked
      if (expense.budgetId) {
        await tx.budget.update({
          where: { id: expense.budgetId },
          data: {
            spendAmount: {
              decrement: expense.amount,
            },
          },
        });
      }
    });

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
