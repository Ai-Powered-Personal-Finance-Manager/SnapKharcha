import prisma from "../config/prisma.js";

// Helper function to calculate date range based on period
const getDateRange = (period) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999);

    let startDate = new Date(today);

    switch (period) {
        case "today":
            startDate = new Date(today);
            break;

        case "yesterday":
            startDate = new Date(today);
            startDate.setDate(startDate.getDate() - 1);
            endDate.setHours(0, 0, 0, 0);
            endDate.setDate(endDate.getDate() - 1);
            endDate.setHours(23, 59, 59, 999);
            break;

        case "lastweek":
            startDate = new Date(today);
            startDate.setDate(startDate.getDate() - 7);
            break;

        case "lastmonth":
            startDate = new Date(today);
            startDate.setMonth(startDate.getMonth() - 1);
            break;

        default:
            // Default to lastmonth if no valid period specified
            startDate = new Date(today);
            startDate.setMonth(startDate.getMonth() - 1);
    }

    return { startDate, endDate };
};

export const analyticsController = async (req, res, next) => {
    /* #swagger.tags = ['Analytics'] */
    try {
        const userId = req.user.id;
        const period = (req.query.period || "lastmonth").toLowerCase();

        // Validate period
        const validPeriods = ["today", "yesterday", "lastweek", "lastmonth"];
        if (!validPeriods.includes(period)) {
            return res.status(400).json({
                success: false,
                message: `Invalid period. Valid options are: ${validPeriods.join(", ")}`,
            });
        }

        const { startDate, endDate } = getDateRange(period);

        // 1. TOTAL EXPENSES
        const totalExpenses = await prisma.expense.aggregate({
            where: {
                userId,
                date: { gte: startDate, lte: endDate },
            },
            _sum: { amount: true },
            _count: true,
        });

        // 2. EXPENSES BY CATEGORY
        const expensesByCategory = await prisma.expense.groupBy({
            by: ["categoryId"],
            where: {
                userId,
                date: { gte: startDate, lte: endDate },
            },
            _sum: { amount: true },
            _count: true,
        });

        // Get category details
        const categoryDetails = await prisma.category.findMany({
            where: { userId },
            select: { id: true, name: true, icon: true, color: true },
        });

        const categoryMap = new Map(categoryDetails.map((cat) => [cat.id, cat]));

        const expensesCategoryWithDetails = expensesByCategory.map((exp) => ({
            categoryId: exp.categoryId,
            categoryName: categoryMap.get(exp.categoryId)?.name || "Unknown",
            categoryIcon: categoryMap.get(exp.categoryId)?.icon || null,
            categoryColor: categoryMap.get(exp.categoryId)?.color || null,
            totalAmount: exp._sum.amount || 0,
            transactionCount: exp._count,
        }));

        // 3. EXPENSES BY PAYMENT METHOD
        const expensesByPaymentMethod = await prisma.expense.groupBy({
            by: ["paymentMethod"],
            where: {
                userId,
                date: { gte: startDate, lte: endDate },
            },
            _sum: { amount: true },
            _count: true,
        });

        // ───── 4. TOTAL INCOME ─────
        const totalIncome = await prisma.income.aggregate({
            where: {
                userId,
                createdAt: { gte: startDate, lte: endDate },
            },
            _sum: { amount: true },
            _count: true,
        });

        // ───── 5. INCOME BY TYPE ─────
        const incomeByType = await prisma.income.groupBy({
            by: ["type"],
            where: {
                userId,
                createdAt: { gte: startDate, lte: endDate },
            },
            _sum: { amount: true },
            _count: true,
        });

        // ───── 6. BUDGET COMPARISON ─────
        const budgets = await prisma.budget.findMany({
            where: {
                userId,
                // Budgets that overlap with the period
                startingDate: { lte: endDate },
                expireDate: { gte: startDate },
            },
            select: {
                id: true,
                name: true,
                amount: true,
                category: { select: { id: true, name: true, icon: true, color: true } },
            },
        });

        // Calculate actual spending for each budget in the period
        const budgetComparison = await Promise.all(
            budgets.map(async (budget) => {
                const spent = await prisma.expense.aggregate({
                where: {
                    userId,
                    budgetId: budget.id,
                    date: { gte: startDate, lte: endDate },
                },
                _sum: { amount: true },
                });

                const spentAmount = spent._sum.amount || 0;
                const remaining = Math.max(0, budget.amount - spentAmount);
                const percentageUsed = Math.min(
                100,
                Math.round((spentAmount / budget.amount) * 100)
                );

                return {
                budgetId: budget.id,
                budgetName: budget.name,
                budgetAmount: budget.amount,
                spentAmount,
                remainingAmount: remaining,
                percentageUsed,
                categoryName: budget.category.name,
                categoryIcon: budget.category.icon,
                categoryColor: budget.category.color,
                };
            })
        );

        // 7. TOP MERCHANTS
        const topMerchants = await prisma.expense.groupBy({
            by: ["merchant"],
            where: {
                userId,
                date: { gte: startDate, lte: endDate },
            },
            _sum: { amount: true },
            _count: true,
            orderBy: { _sum: { amount: "desc" } },
            take: 5,
        });

        // 8. LOAN EMI STATUS
        const loans = await prisma.loan.findMany({
            where: { userId, status: "ACTIVE" },
            select: {
                id: true,
                name: true,
                amount: true,
                paidAmount: true,
                emiAmount: true,
            },
        });

        const loanSummary = {
            totalLoans: loans.length,
            totalLoanAmount: loans.reduce((sum, loan) => sum + loan.amount, 0),
            totalPaidAmount: loans.reduce((sum, loan) => sum + loan.paidAmount, 0),
            totalRemainingAmount: loans.reduce(
                (sum, loan) => sum + (loan.amount - loan.paidAmount),
                0
            ),
            totalMonthlyEMI: loans.reduce((sum, loan) => sum + loan.emiAmount, 0),
            loanDetails: loans,
        };

        // ───── 9. CALCULATE NET BALANCE ─────
        const netBalance =
        (totalIncome._sum.amount || 0) - (totalExpenses._sum.amount || 0);

        // ───── BUILD RESPONSE ─────
        return res.status(200).json({
            success: true,
            message: "Analytics data retrieved successfully",
            data: {
                summary: {
                    totalIncome: totalIncome._sum.amount || 0,
                    totalIncomeCount: totalIncome._count,
                    totalExpenses: totalExpenses._sum.amount || 0,
                    totalExpensesCount: totalExpenses._count,
                    netBalance,
                    savingsRate:
                        (totalIncome._sum.amount || 0) > 0
                        ? Math.round(
                            ((netBalance / (totalIncome._sum.amount || 0)) * 100)
                            )
                        : 0,
                },
                expensesByCategory: expensesCategoryWithDetails.sort(
                    (a, b) => b.totalAmount - a.totalAmount
                ),
                expensesByPaymentMethod: expensesByPaymentMethod.map((exp) => ({
                    paymentMethod: exp.paymentMethod,
                    totalAmount: exp._sum.amount || 0,
                    transactionCount: exp._count,
                })),
                incomeByType: incomeByType.map((inc) => ({
                    type: inc.type,
                    totalAmount: inc._sum.amount || 0,
                    count: inc._count,
                })),
                budgetComparison,
                topMerchants: topMerchants.map((merchant) => ({
                    merchant: merchant.merchant,
                    totalAmount: merchant._sum.amount || 0,
                    transactionCount: merchant._count,
                })),
                loanSummary,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default analyticsController;