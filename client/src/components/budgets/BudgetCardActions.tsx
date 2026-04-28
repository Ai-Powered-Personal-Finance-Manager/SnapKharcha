"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { useDeleteBudget, useUpdateBudget } from "@/src/hooks/budgets/useBudgets";
import type { BudgetApiItem } from "@/src/types/budget";
import { Eye, Loader2, MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";

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

export const BudgetCardActions = ({ budgetData }: { budgetData: BudgetApiItem }) => {
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);
    const formId = useId();
    const updateBudgetMutation = useUpdateBudget();
    const deleteBudgetMutation = useDeleteBudget();

    const [menuOpen, setMenuOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formState, setFormState] = useState<BudgetFormState>(() => buildInitialFormState(budgetData));

    useEffect(() => {
        if (!menuOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (event.target instanceof Node && menuRef.current?.contains(event.target)) {
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
        if (editOpen) {
            setFormState(buildInitialFormState(budgetData));
        }
    }, [budgetData, editOpen]);

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
        ? "opacity-100 transition-opacity text-gray-300 hover:text-gray-500"
        : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 transition-opacity text-gray-300 hover:text-gray-500";

    return (
        <div ref={menuRef} className="relative shrink-0">
            <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className={triggerClassName}
                aria-label="Budget actions"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((value) => !value)}
            >
                <MoreHorizontal size={16} />
            </Button>

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

            <Dialog
                open={editOpen}
                onOpenChange={(open) => {
                    setEditOpen(open);
                    if (!open) {
                        setMenuOpen(false);
                    }
                }}
            >
                <DialogContent className="sm:max-w-[560px]">
                    <DialogHeader>
                        <DialogTitle>Edit Budget</DialogTitle>
                        <DialogDescription>
                            Update the budget name, amount, dates, or alert settings.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="space-y-4" onSubmit={handleEditSubmit}>
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
                                <Input
                                    id={`${formId}-name`}
                                    value={formState.name}
                                    onChange={(event) =>
                                        setFormState((current) => ({ ...current, name: event.target.value }))
                                    }
                                    placeholder="Monthly groceries"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor={`${formId}-amount`} className="text-xs font-semibold text-gray-500">
                                    Budget amount
                                </label>
                                <Input
                                    id={`${formId}-amount`}
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={formState.amount}
                                    onChange={(event) =>
                                        setFormState((current) => ({ ...current, amount: event.target.value }))
                                    }
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor={`${formId}-alert-limit`} className="text-xs font-semibold text-gray-500">
                                    Alert limit
                                </label>
                                <Input
                                    id={`${formId}-alert-limit`}
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={formState.alertLimit}
                                    onChange={(event) =>
                                        setFormState((current) => ({ ...current, alertLimit: event.target.value }))
                                    }
                                    disabled={!formState.alert}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor={`${formId}-starting-date`} className="text-xs font-semibold text-gray-500">
                                    Start date
                                </label>
                                <Input
                                    id={`${formId}-starting-date`}
                                    type="date"
                                    value={formState.startingDate}
                                    onChange={(event) =>
                                        setFormState((current) => ({
                                            ...current,
                                            startingDate: event.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor={`${formId}-expire-date`} className="text-xs font-semibold text-gray-500">
                                    End date
                                </label>
                                <Input
                                    id={`${formId}-expire-date`}
                                    type="date"
                                    value={formState.expireDate}
                                    onChange={(event) =>
                                        setFormState((current) => ({
                                            ...current,
                                            expireDate: event.target.value,
                                        }))
                                    }
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
                                className="flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                                placeholder="Add a short note about this budget"
                            />
                        </div>

                        {dateError && <p className="text-xs font-medium text-red-500">{dateError}</p>}

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={!canSubmit || updateBudgetMutation.isPending}>
                                {updateBudgetMutation.isPending ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save changes"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={deleteOpen}
                onOpenChange={(open) => {
                    setDeleteOpen(open);
                    if (!open) {
                        setMenuOpen(false);
                    }
                }}
            >
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete budget?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete {budgetData.name} and remove its budget limit.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            disabled={deleteBudgetMutation.isPending}
                        >
                            {deleteBudgetMutation.isPending ? "Deleting..." : "Delete budget"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};