// controllers/insight.controller.js

import prisma from "../config/prisma.js";

export const generateInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    const insights = [];

    // =====================================================
    // RULE 1 — Budget almost full warning
    // =====================================================

    const budgets = await prisma.budget.findMany({
      where: { userId },
      include: {
        category: true,
      },
    });

    for (const budget of budgets) {
      const spent = budget.spendAmount || 0;

      const percentage = (spent / budget.amount) * 100;

      if (percentage >= 80) {
        insights.push({
          type: "WARNING",
          insight: `Your ${budget.category.name} budget is ${percentage.toFixed(
            0,
          )}% used`,
        });
      }
    }

    // =====================================================
    // RULE 2 — Overspending compared to last month
    // =====================================================

    const expenses = await prisma.expense.findMany({
      where: { userId },
      include: {
        category: true,
      },
    });

    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const groupedExpenses = {};

    for (const expense of expenses) {
      const category = expense.category.name;

      if (!groupedExpenses[category]) {
        groupedExpenses[category] = {
          thisMonth: 0,
          lastMonth: 0,
        };
      }

      const expenseDate = new Date(expense.date);

      const expenseMonth = expenseDate.getMonth();
      const expenseYear = expenseDate.getFullYear();

      // THIS MONTH
      if (expenseMonth === currentMonth && expenseYear === currentYear) {
        groupedExpenses[category].thisMonth += expense.amount;
      }

      // LAST MONTH
      if (expenseMonth === currentMonth - 1 && expenseYear === currentYear) {
        groupedExpenses[category].lastMonth += expense.amount;
      }
    }

    for (const category in groupedExpenses) {
      const thisMonthExpense = groupedExpenses[category].thisMonth;

      const lastMonthExpense = groupedExpenses[category].lastMonth;

      if (lastMonthExpense > 0 && thisMonthExpense > lastMonthExpense * 1.2) {
        insights.push({
          type: "ALERT",
          insight: `You spent 20% more on ${category} than last month`,
        });
      }
    }

    // =====================================================
    // RULE 4 — Unbudgeted balance sitting idle
    // =====================================================

    const incomeData = await prisma.income.aggregate({
      where: {
        userId,
        status: "ACTIVE",
      },
      _sum: {
        amount: true,
      },
    });

    const totalIncome = incomeData._sum.amount || 0;

    const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);

    const availableForBudget = totalIncome - totalBudget;

    if (availableForBudget > totalIncome * 0.3) {
      insights.push({
        type: "TIP",
        insight: `You have Rs ${availableForBudget} unbudgeted — consider saving it`,
      });
    }

    // =====================================================
    // RULE 5 — Consistent overspending pattern
    // =====================================================

    for (const budget of budgets) {
      const spent = budget.spendAmount || 0;

      if (spent > budget.amount) {
        insights.push({
          type: "PATTERN",
          insight: `You consistently overspend on ${budget.category.name} — consider increasing budget`,
        });
      }
    }

    // =====================================================
    // RULE 6 — EMI taking too much of income
    // =====================================================

    const loanData = await prisma.loan.aggregate({
      where: {
        userId,
        status: "ACTIVE",
      },
      _sum: {
        emiAmount: true,
      },
    });

    const totalEMIs = loanData._sum.emiAmount || 0;

    if (totalIncome > 0 && totalEMIs > totalIncome * 0.4) {
      const percentage = ((totalEMIs / totalIncome) * 100).toFixed(0);

      insights.push({
        type: "ALERT",
        insight: `Your EMIs are ${percentage}% of income — financially risky`,
      });
    }

    // =====================================================
    // RULE 7 — Good behavior positive insight
    // =====================================================

    let allBudgetsHealthy = true;

    for (const budget of budgets) {
      const spent = budget.spendAmount || 0;

      const percentage = (spent / budget.amount) * 100;

      if (percentage >= 60) {
        allBudgetsHealthy = false;
        break;
      }
    }

    if (allBudgetsHealthy && budgets.length > 0) {
      insights.push({
        type: "POSITIVE",
        insight: "Great job! You're well within your budgets this month",
      });
    }

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,
      count: insights.length,
      insights,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate insights",
    });
  }
};
