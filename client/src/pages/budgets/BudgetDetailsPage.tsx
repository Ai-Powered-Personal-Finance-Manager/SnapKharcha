"use client";

import { ErrorFallback } from "@/src/components/ErrorFallback";
import { useGetBudgetById } from "@/src/hooks/budgets/useBudgets";
import type { BudgetApiItem } from "@/src/types/budget";
import { AlertTriangle, ArrowLeft, Calendar, PiggyBank, TrendingDown } from "lucide-react";
import Link from "next/link";

const formatCurrency = (value: number) => `Rs. ${value.toLocaleString()}`;

const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const buildProgress = (budget: BudgetApiItem) => {
    if (budget.amount <= 0) {
        return 0;
    }

    return Math.min(Math.round((budget.spendAmount / budget.amount) * 100), 100);
};

const BudgetDetailsSkeleton = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-gray-100 animate-pulse" />
                <div className="space-y-2">
                    <div className="h-4 w-24 rounded-full bg-gray-100 animate-pulse" />
                    <div className="h-6 w-48 rounded-full bg-gray-100 animate-pulse" />
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm animate-pulse">
                    <div className="h-8 w-40 rounded-full bg-gray-100" />
                    <div className="mt-6 h-4 w-full rounded-full bg-gray-100" />
                    <div className="mt-3 h-2 w-full rounded-full bg-gray-100" />
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="h-24 rounded-2xl bg-gray-100" />
                        <div className="h-24 rounded-2xl bg-gray-100" />
                    </div>
                </div>
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm animate-pulse">
                    <div className="h-6 w-40 rounded-full bg-gray-100" />
                    <div className="mt-4 space-y-3">
                        <div className="h-12 rounded-2xl bg-gray-100" />
                        <div className="h-12 rounded-2xl bg-gray-100" />
                        <div className="h-12 rounded-2xl bg-gray-100" />
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm animate-pulse">
                <div className="h-6 w-44 rounded-full bg-gray-100" />
                <div className="mt-4 space-y-3">
                    <div className="h-16 rounded-2xl bg-gray-100" />
                    <div className="h-16 rounded-2xl bg-gray-100" />
                    <div className="h-16 rounded-2xl bg-gray-100" />
                </div>
            </div>
        </div>
    );
};

export function BudgetDetailsPage({ budgetId }: { budgetId: string }) {
    const { data: budget, isLoading, isError, refetch } = useGetBudgetById(budgetId);

    if (isLoading) {
        return <BudgetDetailsSkeleton />;
    }

    if (isError || !budget) {
        return <ErrorFallback resetErrorBoundary={refetch} />;
    }

    const categoryColor = budget.category.color ?? "#94a3b8";
    const progress = buildProgress(budget);
    const remaining = Math.max(budget.amount - budget.spendAmount, 0);
    const overBudget = budget.spendAmount > budget.amount;
    const recentExpenses = (budget.expenses ?? []).slice(0, 6);
    const transactionCount = budget.expenses?.length ?? budget.expenseCount ?? 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/budgets"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800"
                >
                    <ArrowLeft size={16} />
                </Link>
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-400">
                        Budget overview
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{budget.name}</h2>
                    <p className="text-sm text-gray-500">{budget.category.name}</p>
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
                                <PiggyBank size={24} style={{ color: categoryColor }} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{budget.category.name}</p>
                                <p className="text-xs text-gray-400">Budget window and spending summary</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Spent</p>
                            <p className={`text-3xl font-bold tracking-tight ${overBudget ? "text-red-500" : "text-gray-900"}`}>
                                {formatCurrency(budget.spendAmount)}
                            </p>
                            <p className="text-xs text-gray-400">of {formatCurrency(budget.amount)} budget</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-400">
                            <span>Progress</span>
                            <span className={overBudget ? "text-red-500" : "text-gray-500"}>{progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                    width: `${progress}%`,
                                    backgroundColor: overBudget ? "#ef4444" : "#00C950",
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                Remaining
                            </p>
                            <p className="mt-2 text-lg font-bold text-gray-900">{formatCurrency(remaining)}</p>
                            <p className="text-xs text-gray-500">
                                {overBudget ? `Over budget by ${formatCurrency(budget.spendAmount - budget.amount)}` : "Still within budget"}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                Transactions
                            </p>
                            <p className="mt-2 text-lg font-bold text-gray-900">{transactionCount}</p>
                            <p className="text-xs text-gray-500">Logged expenses linked to this budget</p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Note</p>
                        <p className="mt-2 text-sm leading-6 text-gray-600">{budget.note ?? "No note added for this budget."}</p>
                    </div>
                </section>

                <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">Budget details</h3>
                    <div className="mt-4 space-y-3 text-sm">
                        <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                            <span className="text-gray-500">Start date</span>
                            <span className="font-medium text-gray-900">{formatDate(budget.startingDate)}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                            <span className="text-gray-500">End date</span>
                            <span className="font-medium text-gray-900">{formatDate(budget.expireDate)}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                            <span className="text-gray-500">Alert status</span>
                            <span className={`font-medium ${budget.alert ? "text-green-600" : "text-gray-500"}`}>
                                {budget.alert ? "Enabled" : "Disabled"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                            <span className="text-gray-500">Alert limit</span>
                            <span className="font-medium text-gray-900">
                                {budget.alertLimit !== null ? formatCurrency(budget.alertLimit) : "Not set"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                            <span className="text-gray-500">Created</span>
                            <span className="font-medium text-gray-900">{formatDate(budget.createdAt)}</span>
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3">
                        <div className="flex items-start gap-2">
                            <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-500" />
                            <p className="text-xs leading-6 text-amber-700">
                                {budget.alert
                                    ? `Alerting is active at ${budget.alertLimit !== null ? formatCurrency(budget.alertLimit) : "your configured threshold"}.`
                                    : "Alerts are currently off for this budget."}
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">Recent expenses</h3>
                        <p className="text-sm text-gray-500">Latest transactions assigned to this budget</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500">
                        <TrendingDown size={13} className="text-[#00C950]" />
                        {transactionCount} records
                    </div>
                </div>

                {recentExpenses.length > 0 ? (
                    <div className="mt-4 space-y-3">
                        {recentExpenses.map((expense) => (
                            <div
                                key={expense.id}
                                className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{expense.note || "Expense"}</p>
                                    <p className="text-xs text-gray-500">{expense.category?.name ?? "Linked expense"}</p>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 text-gray-500">
                                        <Calendar size={13} />
                                        <span>{formatDate(expense.createdAt)}</span>
                                    </div>
                                    <p className="font-semibold text-gray-900">{formatCurrency(expense.amount)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-4 py-10 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-300 shadow-sm">
                            <PiggyBank size={20} />
                        </div>
                        <p className="text-sm font-medium text-gray-900">No expenses yet</p>
                        <p className="mt-1 text-xs text-gray-500">Expenses will appear here once they are linked to this budget.</p>
                    </div>
                )}
            </section>
        </div>
    );
}