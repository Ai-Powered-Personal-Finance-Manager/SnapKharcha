"use client";

import { ErrorFallback } from "@/src/components/ErrorFallback";
import { ExpenseDeleteDialog } from "@/src/features/expenses/components/ExpenseDeleteDialog";
import { ExpenseFormModal } from "@/src/features/expenses/components/ExpenseFormModal";
import { useDeleteExpense, useGetExpenseById, useUpdateExpense } from "@/src/features/expenses/api";
import { useGetBudgets } from "@/src/features/budgets/api";
import { ExpenseFormValues } from "@/src/features/expenses/types";
import { formatExpenseDate, formatExpensePaymentMethod, formatExpenseTime } from "@/src/utils/expense";
import { AlertTriangle, ArrowLeft, PencilLine, Receipt, Trash2 } from "lucide-react";
import { getCategoryIcon } from "@/src/utils/budget";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ExpenseDetailsPageSkeleton from "@/src/components/loading-skeletons/ExpenseDetailsPageSkeleton";
import { PageHeader } from "@/src/components/PageHeader";

const formatCurrency = (value: number) => `Rs.${value.toLocaleString()}`;

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
    const Icon = getCategoryIcon(expense.category.name, expense.category.tags);


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
                    date: new Date(`${values.date}T00:00:00Z`).toISOString(),
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
                <PageHeader
                    title={expense.merchant || "Expense"}
                    description={expense.category.name}
                    back={true}
                    action={[
                        {
                            label: "Edit",
                            icon: PencilLine,
                            variant: "outline",
                            onClick: () => setEditOpen(true),
                        },
                        {
                            label: "Delete",
                            icon: Trash2,
                            variant: "light-danger",
                            onClick: () => setDeleteOpen(true),
                        },
                    ]}
                />

                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                                    style={{ backgroundColor: `${categoryColor}18` }}
                                >
                                    <Icon size={24} style={{ color: categoryColor }} />
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
                                <p className="text-xs text-gray-500">Rs.{remainingBudget.toLocaleString()} remaining of Rs.{linkedBudget.amount.toLocaleString()}</p>
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