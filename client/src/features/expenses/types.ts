export type ExpensePaymentMethod = "BANK" | "WALLET" | "CASH";

// ─── API Models ───────────────────────────────────────────────────────────────

export interface ExpenseApiCategory {
  id: string;
  name: string;
  userId: string;
  deletedAt: string | null;
  icon: string | null;
  tags: string[];
  color: string | null;
}

export interface ExpenseApiBudget {
  id: string;
  name: string;
  amount: number;
  startingDate: string;
  expireDate: string;
  spendAmount: number | null;
  note: string | null;
  alert: boolean | null;
  alertLimit: number | null;
  userId: string;
  categoryId: string;
  createdAt: string;
}

export interface ExpenseListItem {
  id: string;
  amount: number;
  note: string | null;
  merchant?: string | null;
  paymentMethod?: ExpensePaymentMethod | string | null;
  date?: string | null;
  userId: string;
  categoryId: string;
  createdAt: string;
  updatedAt?: string;
  budgetId: string;
  budget: ExpenseApiBudget;
  category: ExpenseApiCategory;
  receiptAttached?: boolean;
}

export interface ExpenseSummary {
  todayTransactions: number;
  todayAmount: number;
  totalTransactions: number;
  totalAmount: number;
}

export interface ExpenseApiData {
  expenses: ExpenseListItem[];
  summary: ExpenseSummary;
}

export interface SingleExpenseResponse {
    success: boolean;
    message: string;
    data: ExpenseListItem;
}

export interface ExpenseApiListResponse {
  success: boolean;
  message?: string;
  data: ExpenseApiData;
}

export interface ExpenseMutationResponse {
  success: boolean;
  message: string;
  data?: ExpenseApiData;
}

export interface DeleteExpenseResponse {
  success: boolean;
  message: string;
}

// ─── Form Values ──────────────────────────────────────────────────────────────

export type ExpenseFormValues = {
  amount: string;
  merchant: string;
  note: string;
  budgetId: string;
  paymentMethod: ExpensePaymentMethod;
  date: string;
};

export type CreateExpensePayload = {
  amount: number;
  merchant: string;
  note?: string;
  budgetId: string;
  paymentMethod: ExpensePaymentMethod;
  date: string;
};

export type UpdateExpensePayload = Partial<CreateExpensePayload>;
