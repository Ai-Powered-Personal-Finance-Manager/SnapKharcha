"use client";

import { useMemo } from "react";
import { Clock, Receipt, Plus } from "lucide-react";
import type { ExpenseApiItem } from "@/src/features/expenses/types";
import { getExpenseDateKey, formatExpenseGroupLabel } from "@/src/utils/expense";
import { ExpenseRow } from "./ExpenseRow";

type ExpenseListProps = {
    expenses: ExpenseApiItem[];
    activeBudgetLabel?: string;
    onAddExpense: () => void;
    onView: (expense: ExpenseApiItem) => void;
    onEdit: (expense: ExpenseApiItem) => void;
    onDelete: (expense: ExpenseApiItem) => void;
};

export const ExpenseList = ({
    expenses,
    activeBudgetLabel,
    onAddExpense,
    onView,
    onEdit,
    onDelete,
}: ExpenseListProps) => {
    const groupedExpenses = useMemo(() => {
        const grouped: Record<string, { label: string; items: ExpenseApiItem[] }> = {};

        expenses.forEach((expense) => {
            const dateValue = expense.date ?? expense.createdAt;
            const groupKey = getExpenseDateKey(dateValue);

            if (!grouped[groupKey]) {
                grouped[groupKey] = {
                    label: formatExpenseGroupLabel(dateValue),
                    items: [],
                };
            }

            grouped[groupKey].items.push(expense);
        });

        return Object.entries(grouped);
    }, [expenses]);

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    if (groupedExpenses.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex flex-col items-center justify-center gap-3 py-16">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
                        <Receipt size={20} className="text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">No expenses found</p>
                    <p className="text-xs text-gray-400">Try a different filter or add your first expense</p>
                    <button
                        type="button"
                        onClick={onAddExpense}
                        className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#00C950] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#00b347]"
                    >
                        <Plus size={13} /> Add Expense
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
            {groupedExpenses.map(([dateLabel, group]) => {
                const dayTotal = group.items.reduce((sum, expense) => sum + expense.amount, 0);

                return (
                    <div key={dateLabel}>
                        <div className="flex items-center justify-between border-y border-gray-50 bg-gray-50/70 px-5 py-2.5 first:border-t-0">
                            <div className="flex items-center gap-2">
                                <Clock size={12} className="text-gray-400" />
                                <p className="text-xs font-semibold text-gray-500">{group.label}</p>
                            </div>
                            <p className="font-mono text-xs text-gray-500">− Rs.{dayTotal.toLocaleString()}</p>
                        </div>

                        <div className="divide-y divide-gray-50/80">
                            {group.items.map((expense) => (
                                <ExpenseRow
                                    key={expense.id}
                                    expense={expense}
                                    onView={onView}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-4">
                <p className="text-xs font-medium text-gray-500">
                    {expenses.length} expense{expenses.length !== 1 ? "s" : ""}
                    {activeBudgetLabel && ` in ${activeBudgetLabel}`}
                </p>
                <p className="font-mono text-sm font-bold text-gray-800">−Rs.{totalAmount.toLocaleString()}</p>
            </div> */}
        </div>
    );
};