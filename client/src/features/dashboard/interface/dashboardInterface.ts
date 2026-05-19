// export interface DashboardResponse {
//   success: true;
//   data: DashboardData;
// }

export interface DashboardData {
  summary: Summary;
  budgets: Budget[];
  expenses: Expense[];
}

export interface Summary {
  totalBalance: number;
  totalSpent: number;
  totalBudget: number;
  totalEMIs: number;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  startingDate: string;
  expireDate: string;
  spendAmount: number;
  note: null;
  alert: boolean;
  alertLimit: null;
  userId: string;
  categoryId: string;
  createdAt: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  userId: string;
  deletedAt: null;
  icon: null;
  tags: [];
  color: string;
}

export interface Expense {
  id: string;
  amount: number;
  note: string;
  userId: string;
  categoryId: string;
  createdAt: string;
  budgetId: string;
  date: string;
  merchant: string;
  paymentMethod: "WALLET" | "CASH";
}
