export const expenseOverviewCards = [
    {
        label: "Total Spent",
        value: "Rs.36,190",
        meta: "across all budgets",
    },
    {
        label: "Today",
        value: "Rs.1,040",
        meta: "3 transactions",
    },
    {
        label: "Avg per Day",
        value: "Rs.1,674",
        meta: "−8% vs last week",
    },
] as const;

export const expenseSidebarStats = [
    { label: "Budgets created", value: "10" },
    { label: "Budgets at limit", value: "1" },
    { label: "Budgets near limit", value: "2" },
    { label: "Total expenses", value: "20" },
    { label: "Largest expense", value: "₹2,200" },
] as const;

export const expenseInsight =
    "You've spent ₹2,200 in one food expense (Barbeque Nation). Spreading dining-out across smaller visits keeps your budget healthier.";