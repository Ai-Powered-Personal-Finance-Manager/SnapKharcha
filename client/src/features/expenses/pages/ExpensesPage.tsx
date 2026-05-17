"use client";

import { useDashboard } from "@/src/components/dashboard-layout/hooks/useDashboard";
import { ErrorFallback } from "@/src/components/ErrorFallback";
import ExpenseSkeletonLoading from "@/src/components/loading-skeletons/ExpenseSkeletonLoading";
import { PageHeader } from "@/src/components/PageHeader";
import { StatsGrid } from "@/src/components/StatsGrid";
import { useGetBudgets } from "@/src/features/budgets/api";
import {
  useCreateExpense,
  useDeleteExpense,
  useGetExpenses,
  useUpdateExpense,
} from "@/src/features/expenses/api";
import { ExpenseFormModal } from "@/src/features/expenses/components/ExpenseFormModal";
import type {
  ExpenseFormValues,
  ExpenseListItem,
} from "@/src/features/expenses/types";
import { formatExpensePaymentMethod } from "@/src/utils/expense";
import {
  ArrowDownLeft,
  Filter,
  Plus,
  ScanLine,
  Search,
  TrendingDown,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ExpenseDeleteDialog } from "../components/ExpenseDeleteDialog";
import { ExpenseList } from "../components/ExpenseList";
import { expenseInsight } from "./expenseStatic";

const formatCurrency = (value: number) => `Rs.${value.toLocaleString()}`;

export function ExpensesPage() {
  //dashboard
  const { dashbaord, isLoading: isDashboardLoading } = useDashboard();

  const router = useRouter();

  const {
    data: expensesResponse,
    isLoading: isExpensesLoading,
    isError: isExpensesError,
    refetch: refetchExpenses,
  } = useGetExpenses();
  const {
    data: budgetsResponse,
    isLoading: isBudgetsLoading,
    isError: isBudgetsError,
    refetch: refetchBudgets,
  } = useGetBudgets();
  const createExpenseMutation = useCreateExpense();
  const updateExpenseMutation = useUpdateExpense();
  const deleteExpenseMutation = useDeleteExpense();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseListItem | null>(
    null,
  );
  const [deletingExpense, setDeletingExpense] =
    useState<ExpenseListItem | null>(null);
  const [activeBudgetFilter, setActiveBudgetFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const budgets = budgetsResponse?.data?.budget ?? [];
  const expenses = expensesResponse?.data?.expenses ?? [];
  const summary = expensesResponse?.data?.summary;

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const budgetMatch =
        activeBudgetFilter === "all" || expense.budgetId === activeBudgetFilter;
      const searchText = searchQuery.toLowerCase().trim();
      const searchable = [
        expense.merchant,
        expense.note,
        expense.category?.name,
        expense.budget?.name,
        formatExpensePaymentMethod(expense.paymentMethod),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const searchMatch =
        searchText.length === 0 || searchable.includes(searchText);

      return budgetMatch && searchMatch;
    });
  }, [activeBudgetFilter, expenses, searchQuery]);

  const activeBudgetLabel =
    activeBudgetFilter === "all"
      ? undefined
      : budgets.find((budget) => budget.id === activeBudgetFilter)?.name;

  const nearLimitBudgets = useMemo(() => {
    return budgets.filter((budget) => {
      const amount = budget.amount || 0;
      const spent = budget.spendAmount ?? 0;
      return amount > 0 && spent / amount >= 0.9;
    });
  }, [budgets]);

  const dynamicSidebarStats = useMemo(() => {
    const budgetsAtLimit = budgets.filter(
      (b) => (b.spendAmount ?? 0) >= b.amount,
    ).length;
    const budgetsNearLimit = budgets.filter((b) => {
      const pct = (b.spendAmount ?? 0) / (b.amount || 1);
      return pct >= 0.9 && pct < 1;
    }).length;
    const largestExpense = expenses.reduce(
      (max, e) => Math.max(max, e.amount),
      0,
    );

    return [
      { label: "Budgets created", value: budgets.length.toString() },
      { label: "Budgets at limit", value: budgetsAtLimit.toString() },
      { label: "Budgets near limit", value: budgetsNearLimit.toString() },
      {
        label: "Total expenses",
        value: summary?.totalTransactions.toString() || "0",
      },
      {
        label: "Largest expense",
        value: `Rs. ${largestExpense.toLocaleString()}`,
      },
    ];
  }, [budgets, expenses, summary]);

  const handleExpenseSubmit = (values: ExpenseFormValues) => {
    const payload = {
      amount: Number(values.amount),
      merchant: values.merchant.trim(),
      note: values.note.trim() || undefined,
      budgetId: values.budgetId,
      paymentMethod: values.paymentMethod,
      date: new Date(`${values.date}T00:00:00Z`).toISOString(),
    };

    if (editingExpense) {
      updateExpenseMutation.mutate(
        { id: editingExpense.id, payload },
        {
          onSuccess: () => {
            setEditingExpense(null);
          },
        },
      );
      return;
    }

    createExpenseMutation.mutate(payload, {
      onSuccess: () => {
        setShowCreateModal(false);
      },
    });
  };

  const handleDeleteExpense = () => {
    if (!deletingExpense) {
      return;
    }

    deleteExpenseMutation.mutate(deletingExpense.id, {
      onSuccess: () => {
        setDeletingExpense(null);
      },
    });
  };

  const resetErrorBoundary = () => {
    refetchExpenses();
    refetchBudgets();
  };

  if (isExpensesLoading || isBudgetsLoading) {
    return <ExpenseSkeletonLoading />;
  }

  if (isExpensesError || isBudgetsError) {
    return <ErrorFallback resetErrorBoundary={resetErrorBoundary} />;
  }

  if (isExpensesError || isBudgetsError || isDashboardLoading || !dashbaord) {
    return <ErrorFallback resetErrorBoundary={resetErrorBoundary} />;
  }

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Expenses"
          description="Manage your spending by logging expenses against your budgets"
          action={[
            {
              icon: ScanLine,
              label: "Scan Receipt",
              variant: "outline",
              onClick: () => {}, // TODO: Implement receipt scanning
            },
            {
              icon: Plus,
              label: "Add Expense",
              variant: "primary",
              onClick: () => setShowCreateModal(true),
            },
          ]}
        />

        <StatsGrid stats={dashbaord.summary} />

        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 transition-all focus-within:border-[#00C950] focus-within:ring-2 focus-within:ring-[#00C950]/10">
            <Search size={14} className="shrink-0 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses…"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")}>
                <span className="text-gray-400 hover:text-gray-600">×</span>
              </button>
            )}
          </div>
          <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50">
            <Filter size={13} /> Filter
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveBudgetFilter("all")}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              activeBudgetFilter === "all"
                ? "bg-[#00C950] text-white shadow-sm"
                : "border border-gray-200 bg-white text-gray-500 hover:border-gray-300"
            }`}
          >
            All Budgets
          </button>
          {budgets.map((budget) => {
            const expenseCount = expenses.filter(
              (expense) => expense.budgetId === budget.id,
            ).length;

            if (expenseCount === 0) {
              return null;
            }

            const isActive = activeBudgetFilter === budget.id;
            const categoryColor = budget.category.color ?? "#94a3b8";

            return (
              <button
                key={budget.id}
                type="button"
                onClick={() =>
                  setActiveBudgetFilter(isActive ? "all" : budget.id)
                }
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                }`}
                style={isActive ? { backgroundColor: categoryColor } : {}}
              >
                <span>{budget.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}
                >
                  {expenseCount}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_18rem]">
          <ExpenseList
            expenses={filteredExpenses}
            activeBudgetLabel={activeBudgetLabel}
            onAddExpense={() => setShowCreateModal(true)}
            onView={(expense) => router.push(`/expenses/${expense.id}`)}
            onEdit={(expense) => setEditingExpense(expense)}
            onDelete={(expense) => setDeletingExpense(expense)}
          />

          <div className="hidden space-y-5 xl:flex xl:flex-col">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
              <div className="flex items-center justify-between border-b border-gray-50 px-4 py-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Budget Health
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Click to filter expenses
                  </p>
                </div>
                <ArrowDownLeft size={14} className="text-gray-300" />
              </div>
              <div className="space-y-2 p-3">
                {budgets.slice(0, 5).map((budget) => {
                  const progress =
                    budget.amount > 0
                      ? Math.min(
                          Math.round(
                            ((budget.spendAmount ?? 0) / budget.amount) * 100,
                          ),
                          100,
                        )
                      : 0;
                  const isFull = progress >= 100;
                  const isNear = progress >= 90;
                  const categoryColor = budget.category.color ?? "#94a3b8";

                  return (
                    <button
                      key={budget.id}
                      type="button"
                      onClick={() =>
                        setActiveBudgetFilter(
                          activeBudgetFilter === budget.id ? "all" : budget.id,
                        )
                      }
                      className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all hover:shadow-sm ${
                        isFull
                          ? "border-red-100 bg-red-50/40"
                          : isNear
                            ? "border-amber-100 bg-amber-50/30"
                            : "border-gray-100 bg-white hover:border-gray-200"
                      }`}
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${categoryColor}18` }}
                      >
                        <TrendingDown
                          size={15}
                          style={{ color: categoryColor }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center justify-between">
                          <p className="truncate text-xs font-semibold text-gray-700">
                            {budget.name}
                          </p>
                          <p
                            className={`ml-2 shrink-0 font-mono text-[10px] font-bold ${isFull ? "text-red-500" : isNear ? "text-amber-600" : "text-gray-500"}`}
                          >
                            {progress}%
                          </p>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${progress}%`,
                              backgroundColor: isFull
                                ? "#ef4444"
                                : isNear
                                  ? "#f59e0b"
                                  : categoryColor,
                            }}
                          />
                        </div>
                        <div className="mt-1 flex justify-between">
                          <p className="text-[10px] font-mono text-gray-400">
                            {formatCurrency(budget.spendAmount ?? 0)}
                          </p>
                          <p className="text-[10px] font-mono text-gray-400">
                            {formatCurrency(budget.amount)}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">
                This Month
              </h3>
              {dynamicSidebarStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between"
                >
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-xs font-bold font-mono text-gray-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-4">
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#00C950]/15 blur-2xl" />
              <div className="relative">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#00C950]">
                    <Zap size={11} className="text-white" />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                    AI Tip
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-white">
                  {expenseInsight}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExpenseFormModal
        open={showCreateModal || Boolean(editingExpense)}
        mode={editingExpense ? "edit" : "create"}
        budgets={budgets}
        initialExpense={editingExpense}
        onClose={() => {
          setShowCreateModal(false);
          setEditingExpense(null);
        }}
        onSubmit={handleExpenseSubmit}
        isPending={
          createExpenseMutation.isPending || updateExpenseMutation.isPending
        }
      />

      <ExpenseDeleteDialog
        open={Boolean(deletingExpense)}
        expenseLabel={
          deletingExpense?.merchant || deletingExpense?.note || "this expense"
        }
        onClose={() => setDeletingExpense(null)}
        onConfirm={handleDeleteExpense}
        isPending={deleteExpenseMutation.isPending}
      />
    </>
  );
}
