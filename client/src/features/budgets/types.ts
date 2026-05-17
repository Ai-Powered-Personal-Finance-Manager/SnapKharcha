import { LucideIcon } from "lucide-react";
import { ExpenseListItem } from "../expenses/types";

// ─── UI Models ────────────────────────────────────────────────────────────────

export interface Budget {
    icon: LucideIcon;
    label: string;
    spent: number;
    total: number;
    color: string;
    iconBg: string;
    iconColor: string;
    transactions: number;
    tip: string;
}

export interface BudgetSummary {
    totalBudget: number;
    totalSpent: number;
    overallPercentage: number;
    remaining: number;
}

export interface BudgetStats {
    budgets: Budget[];
    summary: BudgetSummary;
}

export interface BudgetCategory {
    id: string;
    label: string;
    icon: LucideIcon;
    hex: string;
    bg: string;
    text: string;
    desc: string;
}

export interface CreateBudgetFormData {
    selectedCategory: BudgetCategory | null;
    amount: string;
    period: "monthly" | "custom";
    alertAt: number;
    alertEnabled: boolean;
    rollover: boolean;
    note: string;
}

// ─── API Models ───────────────────────────────────────────────────────────────

export interface BudgetApiCategory {
    id: string;
    name: string;
    tags: string[];
    icon: string | null;
    userId?: string;
    deletedAt: string | null;
    color: string;
}

export interface BudgetApiItem {
    id: string;
    name: string;
    amount: number;
    startingDate: string;
    expireDate: string;
    spendAmount: number;
    note: string | null;
    alert: boolean | null;
    alertLimit: number | null;
    createdAt: string;
    category: BudgetApiCategory;
    categoryId?: string;
    expenses: ExpenseListItem[];
    expenseCount?: number;
}

export interface BudgetApiData {
    budget: BudgetApiItem[];
    summary: BudgetSummary;
}

export interface BudgetApiResponse {
    success: boolean;
    data: BudgetApiData;
}
