import prisma from "../config/prisma.js";

export const getDashboardData = async (req, res, next) => {
    /* #swagger.tags = ['Dashboard'] */
    try {
        const userId = req.user.id;

        //Run all queries in parallel for performance
        const [budget, expense, incomeStats, expenseStats, loanStats] = await Promise.all([
            prisma.budget.findMany({
                where: { userId },
                include: { category: true },
                orderBy: { createdAt: "desc" },
            }),

            prisma.expense.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
                take: 5, // recent 5 only for dashboard
            }),

            // Total income from active sources
            prisma.income.aggregate({
                where: { userId, status: "ACTIVE" },
                _sum: { amount: true },
                _count: { id: true },
            }),

            // Total expenses
            prisma.expense.aggregate({
                where: { userId },
                _sum: { amount: true },
                _count: { id: true },
            }),

            // Total active EMIs from loans
            prisma.loan.aggregate({
                where: { userId, status: "ACTIVE" },
                _sum: { emiAmount: true },
            }),
        ]);

        //Calculate summary
        const totalIncome = incomeStats._sum.amount || 0;
        const totalSpent = expenseStats._sum.amount || 0;
        const totalEMIs = loanStats._sum.emiAmount || 0;
        const totalBalance = totalIncome - totalSpent - totalEMIs;
        const totalBudget = budget.length;

        //Format budgets (handle deleted categories)
        const formatted = budget.map((b) => ({
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
                summary: {
                    totalBalance,
                    totalSpent,
                    totalBudget,
                    totalEMIs,
                },
                budgets: formatted,
                expenses: expense,
            },
        });
    } catch (error) {
        next(error);
    }
};