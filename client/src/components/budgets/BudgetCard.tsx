"use client";

import { useDeleteBudget, useUpdateBudget } from "@/src/hooks/budgets/useBudgets";
import type { BudgetApiItem } from "@/src/types/budget";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import {
    AlertTriangle,
    Eye,
    Loader2,
    MoreHorizontal,
    PencilLine,
    PiggyBank,
    Trash2,
    X,
} from "lucide-react";

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

// Mix a color with white so every category gets the same soft pastel tint.
const lightenColor = (hex: string, whitePercent: number = 80) => {
    const normalizedHex = hex.replace("#", "");
    const expandedHex =
        normalizedHex.length === 3
            ? normalizedHex
                  .split("")
                  .map((char) => char + char)
                  .join("")
            : normalizedHex;

    const colorValue = Number.parseInt(expandedHex, 16);

    if (Number.isNaN(colorValue)) {
        return hex;
    }

    const colorWeight = Math.max(0, Math.min(100, 100 - whitePercent)) / 100;
    const whiteWeight = 1 - colorWeight;

    const red = Math.round(((colorValue >> 16) & 255) * colorWeight + 255 * whiteWeight);
    const green = Math.round(((colorValue >> 8) & 255) * colorWeight + 255 * whiteWeight);
    const blue = Math.round((colorValue & 255) * colorWeight + 255 * whiteWeight);

    return `#${[red, green, blue]
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("")}`;
};

export const BudgetCard = ({ budgetData }: { budgetData: BudgetApiItem }) => {
    const router = useRouter();
    const actionRef = useRef<HTMLDivElement>(null);
    const formId = useId();
    const updateBudgetMutation = useUpdateBudget();
    const deleteBudgetMutation = useDeleteBudget();

    const [menuOpen, setMenuOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formState, setFormState] = useState(() => buildInitialFormState(budgetData));

    useEffect(() => {
        if (!menuOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (event.target instanceof Node && actionRef.current?.contains(event.target)) {
                return;
            }

            setMenuOpen(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [menuOpen]);

    useEffect(() => {
        if (!editOpen && !deleteOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setEditOpen(false);
                setDeleteOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [editOpen, deleteOpen]);

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

    const pct = Math.round((budgetData.spendAmount / budgetData.amount) * 100);
    const over = pct >= 90;
    const categoryColor = budgetData.category.color ?? "#94a3b8";
    const lightColor = lightenColor(categoryColor, 80);

    const closeMenu = () => setMenuOpen(false);

    const handleViewBudget = () => {
        closeMenu();
        router.push(`/budgets/${budgetData.id}`);
    };

    const handleEditBudget = () => {
        closeMenu();
        setFormState(buildInitialFormState(budgetData));
        setEditOpen(true);
    };

    const handleDeleteBudget = () => {
        closeMenu();
        setDeleteOpen(true);
    };

    const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
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
                    setEditOpen(false);
                },
            },
        );
    };

    const handleDeleteConfirm = () => {
        deleteBudgetMutation.mutate(budgetData.id, {
            onSuccess: () => {
                setDeleteOpen(false);
            },
        });
    };

    const triggerClassName = menuOpen
        ? "flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors"
        : "flex h-8 w-8 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-700 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100";

    return (
        <div className="group rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-200 hover:shadow-md hover:shadow-gray-100">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: lightColor }}
                    >
                        <PiggyBank size={18} style={{ color: categoryColor }} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">{budgetData.category.name}</p>
                        <p className="text-[11px] text-gray-400">Budget category</p>
                    </div>
                </div>

                <div ref={actionRef} className="relative shrink-0">
                    <button
                        type="button"
                        className={triggerClassName}
                        aria-label="Budget actions"
                        aria-haspopup="menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((value) => !value)}
                    >
                        <MoreHorizontal size={16} />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 top-10 z-30 w-44 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1 shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                            <button
                                type="button"
                                onClick={handleViewBudget}
                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                            >
                                <Eye size={14} />
                                View
                            </button>
                            <button
                                type="button"
                                onClick={handleEditBudget}
                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                            >
                                <PencilLine size={14} />
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteBudget}
                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                            >
                                <Trash2 size={14} />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-2 flex items-end justify-between">
                <div>
                    <p className="text-lg font-bold font-mono text-gray-900">
                        Rs. {budgetData.spendAmount.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-gray-400">of Rs. {budgetData.amount.toLocaleString()} budget</p>
                </div>
                <p className={`text-sm font-bold font-mono ${over ? "text-red-500" : "text-gray-400"}`}>
                    {pct}%
                </p>
            </div>

            <div className="mb-3 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                        width: `${Math.min(pct, 100)}%`,
                        backgroundColor: over ? "#ef4444" : "#00C950",
                    }}
                />
            </div>

            <div className={`flex items-center gap-1.5 text-[11px] ${over ? "text-red-500" : "text-gray-400"}`}>
                {over && <AlertTriangle size={11} className="shrink-0" />}
                <span>
                    {budgetData.alert
                        ? `Alert at Rs. ${budgetData.alertLimit?.toLocaleString() ?? Math.round(budgetData.amount * 0.8).toLocaleString()}`
                        : budgetData.note ?? "No note added"}
                </span>
            </div>

            {editOpen && (
                <div
                    className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[1px]"
                    onClick={() => setEditOpen(false)}
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
                                onClick={() => setEditOpen(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                                aria-label="Close edit modal"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form className="space-y-4 px-6 py-5" onSubmit={handleEditSubmit}>
                            <div className="rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-3">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                    Category
                                </p>
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
                                    <label
                                        htmlFor={`${formId}-alert-limit`}
                                        className="text-xs font-semibold text-gray-500"
                                    >
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
                                    <label
                                        htmlFor={`${formId}-starting-date`}
                                        className="text-xs font-semibold text-gray-500"
                                    >
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
                                    <label
                                        htmlFor={`${formId}-expire-date`}
                                        className="text-xs font-semibold text-gray-500"
                                    >
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
                                    onClick={() => setEditOpen(false)}
                                    className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!canSubmit || updateBudgetMutation.isPending}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#00C950] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#00b848] disabled:cursor-not-allowed disabled:opacity-60"
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
            )}

            {deleteOpen && (
                <div
                    className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[1px]"
                    onClick={() => setDeleteOpen(false)}
                >
                    <div
                        className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="px-6 py-6">
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                                <Trash2 size={18} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Delete budget?</h3>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                This will permanently delete {budgetData.name} and remove its budget limit.
                            </p>

                            <div className="mt-6 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setDeleteOpen(false)}
                                    className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeleteConfirm}
                                    disabled={deleteBudgetMutation.isPending}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {deleteBudgetMutation.isPending ? "Deleting..." : "Delete budget"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};