"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
    AlertTriangle,
    Calendar,
    ChevronDown,
    Loader2,
    Receipt,
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
import ReceiptScanner from "./ReceiptScanner";

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
    const [formState, setFormState] = useState<ExpenseFormValues>(() => buildExpenseFormValues(initialExpense));

    useEffect(() => {
        if (!open) {
            return;
        }

        setFormState(buildExpenseFormValues(initialExpense));
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
        !Number.isNaN(new Date(`${formState.date}T00:00:00`).getTime()) &&
        formState.paymentMethod.length > 0;

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

    const handleScanComplete = (scannedData: any) => {
        console.log("Scanned data received in modal:", scannedData);
        if (scannedData) {
            setFormState((current) => ({
                ...current,
                amount: String(scannedData.amount),
                merchant: scannedData.merchant,
                date: scannedData.date,
            }));
            if (scannedData.note) {
                setFormState((current) => ({ ...current, note: scannedData.note }));
            }
            if (scannedData.paymentMethod) {
                setFormState((current) => ({
                    ...current,
                    paymentMethod: scannedData.paymentMethod,
                }));
            }
            if (scannedData.category) {
                const matchedBudget = budgets.find(
                    (budget) =>
                        budget.category.name.toLowerCase() ===
                        scannedData.category.toLowerCase(),
                );
                if (matchedBudget) {
                    setFormState((current) => ({ ...current, budgetId: matchedBudget.id }));
                }
            }
        }
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
                            Budget *
                        </label>

                        <div className="relative">
                            <select
                                value={formState.budgetId}
                                onChange={(event) =>
                                    setFormState((current) => ({
                                        ...current,
                                        budgetId: event.target.value,
                                    }))
                                }
                                className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-900 outline-none transition-all focus:border-[#00C950] focus:ring-1 focus:ring-[#00C950]"
                            >
                                <option value="">Select a budget...</option>
                                {budgets.map((budget) => {
                                    const budgetRemaining = Math.max(
                                        budget.amount - (budget.spendAmount ?? 0),
                                        0,
                                    );
                                    const isFull = budgetRemaining <= 0;
                                    return (
                                        <option
                                            key={budget.id}
                                            value={budget.id}
                                            disabled={isFull}
                                        >
                                            {budget.name} ({budget.category.name})
                                            {isFull
                                                ? " - Full"
                                                : ` - Rs.${budgetRemaining.toLocaleString()} left`}
                                        </option>
                                    );
                                })}
                            </select>
                            <ChevronDown
                                size={14}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                        </div>

                        {selectedBudget && (
                            <div className="mt-2.5 rounded-xl bg-[#00C950]/5 border border-[#00C950]/20 px-4 py-2.5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-700">
                                            {selectedBudget.name}
                                        </p>
                                        <p className="text-[11px] text-gray-500 mt-0.5">
                                            {selectedBudget.category.name}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold text-gray-900">
                                            Rs.{remaining!.toLocaleString()} remaining
                                        </p>
                                        <p className="text-[10px] text-gray-500">
                                            of Rs.{selectedBudget.amount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${Math.min(
                                                ((selectedBudget.spendAmount ?? 0) /
                                                    selectedBudget.amount) *
                                                    100,
                                                100,
                                            )}%`,
                                            backgroundColor:
                                                ((selectedBudget.spendAmount ?? 0) /
                                                    selectedBudget.amount) *
                                                    100 >=
                                                90
                                                    ? "#ef4444"
                                                    : "#00C950",
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                            Amount *
                        </label>
                        <div
                            className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all ${
                                wouldExceed
                                    ? "border-red-300 bg-red-50/30"
                                    : "border-gray-200 focus-within:border-[#00C950] focus-within:bg-[#00C950]/2"
                            }`}
                        >
                            <span className="text-sm font-semibold text-gray-500">
                                Rs.
                            </span>
                            <input
                                type="number"
                                placeholder="0"
                                value={formState.amount}
                                onChange={(event) =>
                                    setFormState((current) => ({
                                        ...current,
                                        amount: event.target.value,
                                    }))
                                }
                                className="flex-1 bg-transparent text-xl font-bold font-mono text-gray-900 outline-none placeholder:text-gray-300"
                            />
                        </div>
                        {remaining !== null && (
                            <div
                                className={`mt-1.5 flex items-center gap-1.5 text-[11px] ${wouldExceed ? "text-red-500" : "text-gray-400"}`}
                            >
                                {wouldExceed ? (
                                    <>
                                        <AlertTriangle size={11} /> Exceeds remaining budget of
                                        Rs.{remaining.toLocaleString()}
                                    </>
                                ) : (
                                    <>
                                        <Wallet size={11} /> Rs.{remaining.toLocaleString()}{" "}
                                        available in {selectedBudget.name}
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                            Merchant / Where *
                        </label>
                        <div className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus-within:border-[#00C950]">
                            <Receipt size={14} className="shrink-0 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g. Zomato, D-Mart, Amazon…"
                                value={formState.merchant}
                                onChange={(event) =>
                                    setFormState((current) => ({
                                        ...current,
                                        merchant: event.target.value,
                                    }))
                                }
                                className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                            Note (optional)
                        </label>
                        <div className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus-within:border-[#00C950]">
                            <Tag size={14} className="shrink-0 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g. lunch with team, birthday gift…"
                                value={formState.note}
                                onChange={(event) =>
                                    setFormState((current) => ({
                                        ...current,
                                        note: event.target.value,
                                    }))
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
                                        setFormState((current) => ({
                                            ...current,
                                            date: event.target.value,
                                        }))
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
                                            paymentMethod: event.target
                                                .value as ExpenseFormValues["paymentMethod"],
                                        }))
                                    }
                                    className={`w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-3 py-2.5 pr-8 text-xs outline-none transition-all focus:border-[#00C950] ${
                                        formState.paymentMethod
                                            ? "text-gray-700"
                                            : "text-gray-400"
                                    }`}
                                >
                                    <option value="" >
                                        Select payment method
                                    </option>
                                    {expensePaymentMethodOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    size={13}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    <ReceiptScanner onScanComplete={handleScanComplete} />

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
                </form>
            </div>
        </div>
    );
};