"use client";

import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { Loader2, X } from "lucide-react";
import { useUpdateBudget } from "@/src/hooks/budgets/useBudgets";
import type { BudgetApiItem } from "@/src/types/budget";

type BudgetFormState = {
    name: string;
    amount: string;
    startingDate: string;
    expireDate: string;
    note: string;
    alert: boolean;
    alertLimit: string;
};

const toDateInputValue = (value: string) => {
    return value ? value.slice(0, 10) : "";
};

const buildInitialFormState = (budget: BudgetApiItem): BudgetFormState => {
    const isAlertEnabled = budget.alert ?? budget.alertLimit !== null;

    return {
        name: budget.name,
        amount: String(budget.amount),
        startingDate: toDateInputValue(budget.startingDate),
        expireDate: toDateInputValue(budget.expireDate),
        note: budget.note ?? "",
        alert: isAlertEnabled,
        alertLimit: String(budget.alertLimit ?? Math.round(budget.amount * 0.8)),
    };
};

const parseDateValue = (value: string) => new Date(`${value}T00:00:00`);

type BudgetEditModalProps = {
    open: boolean;
    budgetData: BudgetApiItem;
    onClose: () => void;
};

export const BudgetEditModal = ({ open, budgetData, onClose }: BudgetEditModalProps) => {
    const formId = useId();
    const updateBudgetMutation = useUpdateBudget();
    const [formState, setFormState] = useState(() => buildInitialFormState(budgetData));

    useEffect(() => {
        if (!open) {
            return;
        }

        setFormState(buildInitialFormState(budgetData));
    }, [budgetData, open]);

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

    const dateError = useMemo(() => {
        if (!formState.startingDate || !formState.expireDate) {
            return "";
        }

        return parseDateValue(formState.expireDate) < parseDateValue(formState.startingDate)
            ? "End date cannot be before start date"
            : "";
    }, [formState.expireDate, formState.startingDate]);

    const parsedAmount = Number(formState.amount);
    const parsedAlertLimit = Number(formState.alertLimit);
    const canSubmit =
        formState.name.trim().length > 0 &&
        Number.isFinite(parsedAmount) &&
        parsedAmount > 0 &&
        formState.startingDate.length > 0 &&
        formState.expireDate.length > 0 &&
        !dateError &&
        (!formState.alert || (Number.isFinite(parsedAlertLimit) && parsedAlertLimit >= 0));

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!canSubmit) {
            return;
        }

        updateBudgetMutation.mutate(
            {
                id: budgetData.id,
                payload: {
                    name: formState.name.trim(),
                    amount: parsedAmount,
                    startingDate: formState.startingDate,
                    expireDate: formState.expireDate,
                    note: formState.note.trim() ? formState.note.trim() : undefined,
                    alert: formState.alert,
                    alertLimit: formState.alert ? parsedAlertLimit : null,
                },
            },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[1px]"
            onClick={onClose}
        >
            <div
                className="w-full max-w-140 overflow-hidden rounded-3xl bg-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Edit Budget</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Update the budget name, amount, dates, or alert settings.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                        aria-label="Close edit modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form className="space-y-4 px-6 py-5" onSubmit={handleSubmit}>
                    <div className="rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Category</p>
                        <p className="mt-1 text-sm font-medium text-gray-800">{budgetData.category.name}</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5 sm:col-span-2">
                            <label htmlFor={`${formId}-name`} className="text-xs font-semibold text-gray-500">
                                Budget name
                            </label>
                            <input
                                id={`${formId}-name`}
                                value={formState.name}
                                onChange={(event) =>
                                    setFormState((current) => ({ ...current, name: event.target.value }))
                                }
                                placeholder="Monthly groceries"
                                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor={`${formId}-amount`} className="text-xs font-semibold text-gray-500">
                                Budget amount
                            </label>
                            <input
                                id={`${formId}-amount`}
                                type="number"
                                min="0"
                                step="1"
                                value={formState.amount}
                                onChange={(event) =>
                                    setFormState((current) => ({ ...current, amount: event.target.value }))
                                }
                                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor={`${formId}-alert-limit`} className="text-xs font-semibold text-gray-500">
                                Alert limit
                            </label>
                            <input
                                id={`${formId}-alert-limit`}
                                type="number"
                                min="0"
                                step="1"
                                value={formState.alertLimit}
                                onChange={(event) =>
                                    setFormState((current) => ({ ...current, alertLimit: event.target.value }))
                                }
                                disabled={!formState.alert}
                                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor={`${formId}-starting-date`} className="text-xs font-semibold text-gray-500">
                                Start date
                            </label>
                            <input
                                id={`${formId}-starting-date`}
                                type="date"
                                value={formState.startingDate}
                                onChange={(event) =>
                                    setFormState((current) => ({
                                        ...current,
                                        startingDate: event.target.value,
                                    }))
                                }
                                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor={`${formId}-expire-date`} className="text-xs font-semibold text-gray-500">
                                End date
                            </label>
                            <input
                                id={`${formId}-expire-date`}
                                type="date"
                                value={formState.expireDate}
                                onChange={(event) =>
                                    setFormState((current) => ({
                                        ...current,
                                        expireDate: event.target.value,
                                    }))
                                }
                                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15"
                            />
                        </div>
                    </div>

                    <label className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
                        <input
                            type="checkbox"
                            checked={formState.alert}
                            onChange={(event) =>
                                setFormState((current) => ({
                                    ...current,
                                    alert: event.target.checked,
                                }))
                            }
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#00C950] focus:ring-[#00C950]"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Enable alerts</p>
                            <p className="text-xs text-gray-500">
                                Alert the user once spending reaches the chosen limit.
                            </p>
                        </div>
                    </label>

                    <div className="space-y-1.5">
                        <label htmlFor={`${formId}-note`} className="text-xs font-semibold text-gray-500">
                            Note
                        </label>
                        <textarea
                            id={`${formId}-note`}
                            value={formState.note}
                            onChange={(event) =>
                                setFormState((current) => ({ ...current, note: event.target.value }))
                            }
                            rows={4}
                            className="flex min-h-24 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15"
                            placeholder="Add a short note about this budget"
                        />
                    </div>

                    {dateError && <p className="text-xs font-medium text-red-500">{dateError}</p>}

                    <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!canSubmit || updateBudgetMutation.isPending}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#00C950] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#00b848] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                        >
                            {updateBudgetMutation.isPending ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save changes"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};