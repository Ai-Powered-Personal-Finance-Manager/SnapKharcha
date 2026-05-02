"use client";

import { ErrorFallback } from "@/src/components/ErrorFallback";
import { ExpenseDeleteDialog } from "@/src/components/expenses/ExpenseDeleteDialog";
import { ExpenseFormModal } from "@/src/components/expenses/ExpenseFormModal";
import { useDeleteExpense, useGetExpenseById, useUpdateExpense } from "@/src/hooks/expenses/useExpenses";
import { useGetBudgets } from "@/src/hooks/budgets/useBudgets";
import { ExpenseFormValues } from "@/src/types/expense";
import { formatExpenseDate, formatExpensePaymentMethod, formatExpenseTime } from "@/src/utils/expense";
import { AlertTriangle, ArrowLeft, PencilLine, Receipt, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ExpenseDetailsPageSkeleton from "@/src/components/loading-skeletons/ExpenseDetailsPageSkeleton";

const formatCurrency = (value: number) => `₹${value.toLocaleString()}`;

export function ExpenseDetailsPage({ expenseId }: { expenseId: string }) {
    const router = useRouter();
    const { data: expense, isLoading, isError, refetch } = useGetExpenseById(expenseId);
    const { data: budgetsResponse } = useGetBudgets();
    const updateExpenseMutation = useUpdateExpense();
    const deleteExpenseMutation = useDeleteExpense();

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    if (isLoading) {
        return <ExpenseDetailsPageSkeleton />;
    }

    if (isError || !expense) {
        return <ErrorFallback resetErrorBoundary={refetch} />;
    }

    const budgets = budgetsResponse?.data?.budget ?? [];
    const categoryColor = expense.category.color ?? "#94a3b8";
    const expenseDateValue = expense.date ?? expense.createdAt;
    const linkedBudget = expense.budget;
    const remainingBudget = Math.max(linkedBudget.amount - (linkedBudget.spendAmount ?? 0), 0);

    const handleExpenseSubmit = (values: ExpenseFormValues) => {
        updateExpenseMutation.mutate(
            {
                id: expense.id,
                payload: {
                    amount: Number(values.amount),
                    merchant: values.merchant.trim(),
                    note: values.note.trim() || undefined,
                    budgetId: values.budgetId,
                    paymentMethod: values.paymentMethod,
                    date: new Date(`${values.date}T00:00:00`).toISOString(),
                },
            },
            {
                onSuccess: () => {
                    setEditOpen(false);
                },
            },
        );
    };

    const handleDeleteConfirm = () => {
        deleteExpenseMutation.mutate(expense.id, {
            onSuccess: () => {
                setDeleteOpen(false);
                router.push("/expenses");
            },
        });
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/expenses"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-400">Expense overview</p>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{expense.merchant || "Expense"}</h2>
                        <p className="text-sm text-gray-500">{expense.category.name}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setEditOpen(true)}
                            className="inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            <PencilLine size={14} /> Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => setDeleteOpen(true)}
                            className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                        >
                            <Trash2 size={14} /> Delete
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                                    style={{ backgroundColor: `${categoryColor}18` }}
                                >
                                    <Receipt size={24} style={{ color: categoryColor }} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{expense.category.name}</p>
                                    <p className="text-xs text-gray-400">Transaction and budget summary</p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Amount</p>
                                <p className="text-3xl font-bold tracking-tight text-gray-900">{formatCurrency(expense.amount)}</p>
                                <p className="text-xs text-gray-400">{formatExpensePaymentMethod(expense.paymentMethod)}</p>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Budget</p>
                                <p className="mt-2 text-lg font-bold text-gray-900">{linkedBudget.name}</p>
                                <p className="text-xs text-gray-500">₹{remainingBudget.toLocaleString()} remaining of ₹{linkedBudget.amount.toLocaleString()}</p>
                            </div>
                            <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Date</p>
                                <p className="mt-2 text-lg font-bold text-gray-900">{formatExpenseDate(expenseDateValue)}</p>
                                <p className="text-xs text-gray-500">{formatExpenseTime(expenseDateValue) || "No time available"}</p>
                            </div>
                        </div>

                        <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Note</p>
                            <p className="mt-2 text-sm leading-6 text-gray-600">{expense.note ?? "No note added for this expense."}</p>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h3 className="text-base font-semibold text-gray-900">Expense details</h3>
                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Merchant</span>
                                <span className="font-medium text-gray-900">{expense.merchant || "Not set"}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Payment method</span>
                                <span className="font-medium text-gray-900">{formatExpensePaymentMethod(expense.paymentMethod)}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Category</span>
                                <span className="font-medium text-gray-900">{expense.category.name}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Budget</span>
                                <span className="font-medium text-gray-900">{expense.budget.name}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Created</span>
                                <span className="font-medium text-gray-900">{formatExpenseDate(expense.createdAt)}</span>
                            </div>
                        </div>

                        <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3">
                            <div className="flex items-start gap-2">
                                <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-500" />
                                <p className="text-xs leading-6 text-amber-700">
                                    Expense tracking stays linked to {expense.budget.name}. Updating the budget or payment details will refresh the summary immediately.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <ExpenseFormModal
                open={editOpen}
                mode="edit"
                budgets={budgets}
                initialExpense={expense}
                onClose={() => setEditOpen(false)}
                onSubmit={handleExpenseSubmit}
                isPending={updateExpenseMutation.isPending}
            />

            <ExpenseDeleteDialog
                open={deleteOpen}
                expenseLabel={expense.merchant || expense.note || "this expense"}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDeleteConfirm}
                isPending={deleteExpenseMutation.isPending}
            />
        </>
    );
}