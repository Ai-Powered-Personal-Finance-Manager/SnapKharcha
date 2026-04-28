import prisma from "../config/prisma.js";

// ─────────────────────────────────────────
// CREATE EXPENSE
// ─────────────────────────────────────────
export const createExpense = async (req, res, next) => {
  try {
    const { amount, note, budgetId } = req.body;
    const userId = req.user.id;

    // ───── Validation ─────
    if (amount === undefined || !budgetId) {
      return res.status(400).json({
        success: false,
        message: "amount and budgetId are required",
      });
    }

    const parsedAmount = Number(amount);

    if (!Number.isInteger(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "amount must be a valid positive integer",
      });
    }

    // ───── Transaction (FULL SAFETY) ─────
    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch budget inside transaction (important)
      const budget = await tx.budget.findFirst({
        where: { id: budgetId, userId },
      });

      if (!budget) {
        throw new Error("Invalid budgetId");
      }

      const spend = budget.spendAmount ?? 0;
      const available = budget.amount - spend;

      // 2. Check balance safely inside transaction
      if (parsedAmount > available) {
        throw new Error(
          `Cannot exceed budget. Remaining amount is ${available}`,
        );
      }

      // 3. Create expense
      const expense = await tx.expense.create({
        data: {
          amount: parsedAmount,
          note: note || null,
          userId,
          budgetId,
          categoryId: budget.categoryId,
        },
      });

      // 4. Update budget safely
      const updatedBudget = await tx.budget.update({
        where: { id: budgetId },
        data: {
          spendAmount: {
            increment: parsedAmount,
          },
        },
      });

      // 5. return category (optional)
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
    // clean error handling
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

    return res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expenses,
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
    const { amount, note, budgetId } = req.body;
    const userId = req.user.id;

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
      // 1. Get existing expense
      const existingExpense = await tx.expense.findFirst({
        where: { id, userId },
      });

      if (!existingExpense) {
        throw new Error("Expense not found");
      }

      const oldBudgetId = existingExpense.budgetId;
      const oldAmount = existingExpense.amount;

      // 2. Determine new budget
      const newBudgetId = budgetId ?? oldBudgetId;

      const budget = await tx.budget.findFirst({
        where: { id: newBudgetId, userId },
      });

      if (!budget) {
        throw new Error("Invalid budgetId");
      }

      const finalAmount = parsedAmount !== undefined ? parsedAmount : oldAmount;

      // 3. If budget changed → rollback old + apply new
      if (oldBudgetId !== newBudgetId) {
        // rollback old budget
        await tx.budget.update({
          where: { id: oldBudgetId },
          data: {
            spendAmount: {
              decrement: oldAmount,
            },
          },
        });

        // check new budget availability
        const available = budget.amount - (budget.spendAmount ?? 0);

        if (finalAmount > available) {
          throw new Error(
            `Cannot exceed budget. Remaining amount is ${available}`,
          );
        }

        // apply new budget
        await tx.budget.update({
          where: { id: newBudgetId },
          data: {
            spendAmount: {
              increment: finalAmount,
            },
          },
        });
      } else {
        // same budget → adjust diff
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

      // 4. Update expense
      const updatedExpense = await tx.expense.update({
        where: { id },
        data: {
          amount: finalAmount,
          note: note ?? existingExpense.note,
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
