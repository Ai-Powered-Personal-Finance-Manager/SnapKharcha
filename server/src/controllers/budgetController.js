import prisma from "../config/prisma.js";

// ─────────────────────────────────────────
// CREATE BUDGET
// ─────────────────────────────────────────

export const createBudget = async (req, res, next) => {
  try {
    const { amount, month, year, categoryId } = req.body;

    // 1. basic validation (no falsy bugs)
    if (amount == null || month == null || year == null) {
      return res.status(400).json({
        message: "amount, month, and year are required",
      });
    }

    const userId = req.user.id;

    // 2. decide category (fallback to Overall)
    let finalCategoryId = categoryId;

    if (!finalCategoryId) {
      const overallCategory = await prisma.category.findFirst({
        where: {
          userId,
          name: "Overall",
        },
      });

      if (!overallCategory) {
        return res.status(500).json({
          message: "Default category (Overall) not found",
        });
      }

      finalCategoryId = overallCategory.id;
    } else {
      // 3. validate category belongs to user
      const category = await prisma.category.findFirst({
        where: {
          id: finalCategoryId,
          userId,
        },
      });

      if (!category) {
        return res.status(404).json({
          message: "Invalid category",
        });
      }
    }

    const existingBudget = await prisma.budget.findFirst({
      where: {
        userId,
        categoryId: finalCategoryId,
        month,
        year,
      },
    });

    // 4. upsert budget
    const budget = await prisma.budget.upsert({
      where: {
        userId_categoryId_month_year: {
          userId,
          categoryId: finalCategoryId,
          month,
          year,
        },
      },
      update: {
        amount,
      },
      create: {
        amount,
        month,
        year,
        userId,
        categoryId: finalCategoryId,
      },
    });

    const message = existingBudget
      ? "Budget updated successfully"
      : "Budget created successfully";

    return res.status(200).json({
      success: true,
      message: message,
      data: budget,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// PATCH(UPDATE) BUDGET
// ─────────────────────────────────────────
export const updateBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryId } = req.body;

    const userId = req.user.id;

    if (!categoryId) {
      return res.status(400).json({
        message: "categoryId is required",
      });
    }

    // check budget belongs to user
    const budget = await prisma.budget.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    // update category
    const updatedBudget = await prisma.budget.update({
      where: { id },
      data: {
        categoryId,
      },
    });

    return res.json({
      message: "Category added to budget",
      data: updatedBudget,
    });
  } catch (error) {
    next(error);
  }
};
