"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
    AlertTriangle,
    Calendar,
    CheckCircle2,
    ChevronDown,
    Loader2,
    Receipt,
    ScanLine,
    Tag,
    Wallet,
    X,
} from "lucide-react";
import { getCategoryIcon } from "@/src/utils/budget";

import type { BudgetApiItem } from "@/src/features/budgets/types";
import type { ExpenseListItem, ExpenseFormValues } from "@/src/features/expenses/types";
import {
    buildExpenseFormValues,
    expensePaymentMethodOptions,
} from "@/src/utils/expense";

type ExpenseFormModalProps = {
    open: boolean;
    mode: "create" | "edit";
    budgets: BudgetApiItem[];
    initialExpense?: ExpenseListItem | null;
    onClose: () => void;
    onSubmit: (values: ExpenseFormValues) => void;
    isPending?: boolean;
};

export const ExpenseFormModal = ({
    open,
    mode,
    budgets,
    initialExpense,
    onClose,
    onSubmit,
    isPending,
}: ExpenseFormModalProps) => {
    const [step, setStep] = useState<1 | 2>(mode === "edit" ? 2 : 1);
    const [formState, setFormState] = useState<ExpenseFormValues>(() => buildExpenseFormValues(initialExpense));

    useEffect(() => {
        if (!open) {
            return;
        }

        setFormState(buildExpenseFormValues(initialExpense));
        setStep(mode === "edit" || Boolean(initialExpense?.budgetId) ? 2 : 1);
    }, [initialExpense, mode, open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, open]);

    const selectedBudget = useMemo(() => {
        return budgets.find((budget) => budget.id === formState.budgetId) ?? null;
    }, [budgets, formState.budgetId]);

    const remaining = selectedBudget ? Math.max(selectedBudget.amount - (selectedBudget.spendAmount ?? 0), 0) : null;
    const parsedAmount = Number(formState.amount);
    const wouldExceed =
        selectedBudget && Number.isFinite(parsedAmount) && parsedAmount > 0
            ? parsedAmount > remaining!
            : false;

    // date constraints for the expense form
    const dateConstraints = useMemo(() => {
        const today = new Date().toLocaleDateString("sv-SE");
        const max = selectedBudget
            ? selectedBudget.expireDate.split("T")[0] < today
                ? selectedBudget.expireDate.split("T")[0]
                : today
            : today;
        const min = selectedBudget ? selectedBudget.startingDate.split("T")[0] : undefined;

        return { min, max };
    }, [selectedBudget]);

    // Ensure the date stays within the budget's constraints when the budget changes
    useEffect(() => {
        if (!formState.date) {
            return;
        }

        const { min, max } = dateConstraints;
        if (min && formState.date < min) {
            setFormState((current) => ({ ...current, date: min }));
        } else if (max && formState.date > max) {
            setFormState((current) => ({ ...current, date: max }));
        }
    }, [dateConstraints, formState.date]);

    const canSubmit =
        formState.budgetId.length > 0 &&
        formState.merchant.trim().length > 0 &&
        Number.isFinite(parsedAmount) &&
        parsedAmount > 0 &&
        formState.date.length > 0 &&
        !Number.isNaN(new Date(`${formState.date}T00:00:00`).getTime());

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!canSubmit) {
            return;
        }

        onSubmit({
            ...formState,
            amount: String(parsedAmount),
            merchant: formState.merchant.trim(),
            note: formState.note.trim(),
        });
    };

    if (!open) {
        return null;
    }

    const title = mode === "edit" ? "Edit Expense" : "Add Expense";
    const description =
        mode === "edit"
            ? "Update the amount, merchant, budget, or payment details."
            : "Charge to one of your active budgets.";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <div
                className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/20"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-50 px-6 pb-4 pt-6">
                    <div>
                        <h3 className="text-base font-bold text-gray-900">{title}</h3>
                        <p className="mt-0.5 text-xs text-gray-400">{description}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
                        aria-label="Close expense modal"
                    >
                        <X size={15} />
                    </button>
                </div>

                <form className="space-y-4 px-6 py-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                            1. Choose Budget *
                        </label>

                        {selectedBudget ? (
                            <button
                                type="button"
                                onClick={() => setFormState((current) => ({ ...current, budgetId: "" }))}
                                className="flex w-full items-center gap-3 rounded-xl border-2 border-[#00C950] bg-[#00C950]/5 px-4 py-3 transition-all"
                            >
                                <div
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                                    style={{ backgroundColor: `${selectedBudget.category.color ?? "#94a3b8"}18` }}
                                >
                                    {(() => {
                                        const Icon = getCategoryIcon(selectedBudget.category.name, selectedBudget.category.tags);
                                        return <Icon size={16} style={{ color: selectedBudget.category.color ?? "#94a3b8" }} />;
                                    })()}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-semibold text-gray-800">{selectedBudget.name}</p>
                                    <p className="text-[11px] text-gray-400">{selectedBudget.category.name}</p>
                                    <p className="text-[11px] text-gray-400">
                                        Rs.{Math.max(selectedBudget.amount - (selectedBudget.spendAmount ?? 0), 0).toLocaleString()} remaining of Rs.{selectedBudget.amount.toLocaleString()}
                                    </p>
                                </div>
                                <CheckCircle2 size={16} className="shrink-0 text-[#00C950]" />
                            </button>
                        ) : (
                            <div className="grid max-h-52 grid-cols-2 gap-2 overflow-y-auto pr-1">
                                {budgets.length > 0 ? (
                                    budgets.map((budget) => {
                                        const budgetRemaining = Math.max(budget.amount - (budget.spendAmount ?? 0), 0);
                                        const budgetPct = budget.amount > 0 ? Math.round(((budget.spendAmount ?? 0) / budget.amount) * 100) : 0;
                                        const iconColor = budget.category.color ?? "#94a3b8";
                                        const iconBg = `${iconColor}18`;
                                        const isFull = budgetRemaining <= 0;

                                        return (
                                            <button
                                                key={budget.id}
                                                type="button"
                                                onClick={() => !isFull && setFormState((current) => ({ ...current, budgetId: budget.id }))}
                                                disabled={isFull}
                                                className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all ${
                                                    isFull
                                                        ? "cursor-not-allowed border-gray-100 opacity-40"
                                                        : "cursor-pointer border-gray-200 hover:border-[#00C950]/40 hover:bg-[#00C950]/3"
                                                }`}
                                            >
                                                <div
                                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                                                    style={{ backgroundColor: iconBg }}
                                                >
                                                    {(() => {
                                                        const Icon = getCategoryIcon(budget.category.name, budget.category.tags);
                                                        return <Icon size={14} style={{ color: iconColor }} />;
                                                    })()}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-xs font-semibold text-gray-700">{budget.name}</p>
                                                    <p className="truncate text-[10px] text-gray-400">{budget.category.name}</p>
                                                    <p className={`mt-0.5 text-[10px] font-mono ${isFull ? "text-red-400" : "text-gray-400"}`}>
                                                        {isFull ? "Budget full" : `Rs.${budgetRemaining.toLocaleString()} left`}
                                                    </p>
                                                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${Math.min(budgetPct, 100)}%`,
                                                                backgroundColor: budgetPct >= 90 ? "#ef4444" : iconColor,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })
                                ) : (
                                    <div className="col-span-2 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-4 py-6 text-center text-xs text-gray-500">
                                        No budgets found.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {selectedBudget && step === 2 && (
                        <>
                            <div>
                                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                    2. Amount *
                                </label>
                                <div
                                    className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all ${
                                        wouldExceed
                                            ? "border-red-300 bg-red-50/30"
                                            : "border-gray-200 focus-within:border-[#00C950] focus-within:bg-[#00C950]/2"
                                    }`}
                                >
                                    <span className="text-sm font-semibold text-gray-500">Rs.</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={formState.amount}
                                        onChange={(event) =>
                                            setFormState((current) => ({ ...current, amount: event.target.value }))
                                        }
                                        className="flex-1 bg-transparent text-xl font-bold font-mono text-gray-900 outline-none placeholder:text-gray-300"
                                    />
                                </div>
                                {remaining !== null && (
                                    <div className={`mt-1.5 flex items-center gap-1.5 text-[11px] ${wouldExceed ? "text-red-500" : "text-gray-400"}`}>
                                        {wouldExceed ? (
                                            <>
                                                <AlertTriangle size={11} /> Exceeds remaining budget of Rs.{remaining.toLocaleString()}
                                            </>
                                        ) : (
                                            <>
                                                <Wallet size={11} /> Rs.{remaining.toLocaleString()} available in {selectedBudget.name}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                    3. Merchant / Where *
                                </label>
                                <div className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus-within:border-[#00C950]">
                                    <Receipt size={14} className="shrink-0 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="e.g. Zomato, D-Mart, Amazon…"
                                        value={formState.merchant}
                                        onChange={(event) =>
                                            setFormState((current) => ({ ...current, merchant: event.target.value }))
                                        }
                                        className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                    4. Note (optional)
                                </label>
                                <div className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus-within:border-[#00C950]">
                                    <Tag size={14} className="shrink-0 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="e.g. lunch with team, birthday gift…"
                                        value={formState.note}
                                        onChange={(event) =>
                                            setFormState((current) => ({ ...current, note: event.target.value }))
                                        }
                                        className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                        Date
                                    </label>
                                    <div className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-3 py-2.5 transition-all focus-within:border-[#00C950]">
                                        <Calendar size={13} className="shrink-0 text-gray-400" />
                                        <input
                                            type="date"
                                            value={formState.date}
                                            min={dateConstraints.min}
                                            max={dateConstraints.max}
                                            onChange={(event) =>
                                                setFormState((current) => ({ ...current, date: event.target.value }))
                                            }
                                            className="flex-1 bg-transparent text-xs text-gray-700 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                        Payment
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formState.paymentMethod}
                                            onChange={(event) =>
                                                setFormState((current) => ({
                                                    ...current,
                                                    paymentMethod: event.target.value as ExpenseFormValues["paymentMethod"],
                                                }))
                                            }
                                            className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-3 py-2.5 pr-8 text-xs text-gray-700 outline-none transition-all focus:border-[#00C950]"
                                        >
                                            {expensePaymentMethodOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-2.5 text-xs font-medium text-gray-400 transition-all hover:border-[#00C950]/40 hover:bg-[#00C950]/3 hover:text-[#00C950]"
                            >
                                <ScanLine size={14} /> Scan Receipt (optional)
                            </button>
                        </>
                    )}

                    {selectedBudget && step === 1 && (
                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00C950] py-3 text-sm font-semibold text-white shadow-md shadow-[#00C950]/20 transition-colors hover:bg-[#00b347]"
                        >
                            Continue
                        </button>
                    )}

                    {selectedBudget && step === 2 && (
                        <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!canSubmit || isPending}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#00C950] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#00b848] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
                                        {mode === "edit" ? "Saving..." : "Adding..."}
                                    </>
                                ) : mode === "edit" ? (
                                    "Save changes"
                                ) : (
                                    "Add Expense"
                                )}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};