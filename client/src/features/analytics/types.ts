export interface AnalyticsData {
  success: boolean;
  message: string;
  data: AnalyticsDataContent;
}

export interface AnalyticsDataContent {
  summary: {
    totalIncome: number;
    totalIncomeCount: number;
    totalExpenses: number;
    totalExpensesCount: number;
    netBalance: number;
    savingsRate: number;
  };
  expensesByCategory: Array<{
    categoryId: string;
    categoryName: string;
    categoryIcon: string | null;
    categoryColor: string | null;
    totalAmount: number;
    transactionCount: number;
  }>;
  expensesByPaymentMethod: Array<{
    paymentMethod: string;
    totalAmount: number;
    transactionCount: number;
  }>;
  incomeByType: Array<{
    type: string;
    totalAmount: number;
    count: number;
  }>;
  budgetComparison: Array<{
    budgetId: string;
    budgetName: string;
    budgetAmount: number;
    spentAmount: number;
    remainingAmount: number;
    percentageUsed: number;
    categoryName: string;
    categoryIcon: string | null;
    categoryColor: string | null;
  }>;
  topMerchants: Array<{
    merchant: string;
    totalAmount: number;
    transactionCount: number;
  }>;
  loanSummary: {
    totalLoans: number;
    totalLoanAmount: number;
    totalPaidAmount: number;
    totalRemainingAmount: number;
    totalMonthlyEMI: number;
    loanDetails: Array<{
      id: string;
      name: string;
      amount: number;
      paidAmount: number;
      emiAmount: number;
    }>;
  };
}
