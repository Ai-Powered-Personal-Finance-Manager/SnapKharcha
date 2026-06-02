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
          title: `${budget.category.name} Budget`,
          description: `${percentage.toFixed(0)}% of monthly budget used`,
          severity: percentage >= 100 ? "CRITICAL" : "HIGH",
          category: budget.category.name,
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
        const increasePercent = Math.round(
          ((thisMonthExpense - lastMonthExpense) / lastMonthExpense) * 100,
        );

        insights.push({
          type: "ALERT",
          title: `${category} Spending Increased`,
          description: `${increasePercent}% higher than last month`,
          severity: increasePercent >= 50 ? "CRITICAL" : "HIGH",
          category,
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
        title: "Unallocated Income",
        description: `₹${availableForBudget.toLocaleString()} remains unbudgeted`,
        severity: "LOW",
        category: "Savings",
      });
    }

    // =====================================================
    // RULE 5 — Consistent overspending pattern
    // =====================================================

    for (const budget of budgets) {
      const spent = budget.spendAmount || 0;

      if (spent > budget.amount) {
        // insights.push({
        //   type: "PATTERN",
        //   insight: `You consistently overspend on ${budget.category.name} — consider increasing budget`,
        // });
        insights.push({
          type: "PATTERN",
          title: `${budget.category.name} Overspending`,
          description: "Repeatedly exceeding allocated budget",
          severity: "MEDIUM",
          category: budget.category.name,
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
        title: "High EMI Burden",
        description: `EMIs consume ${percentage}% of income`,
        severity: percentage >= 50 ? "CRITICAL" : "HIGH",
        category: "Loans",
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
        title: "Budget Health",
        description: "All budgets are comfortably within limits",
        severity: "INFO",
        category: "Finance",
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
