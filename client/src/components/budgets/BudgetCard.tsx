"use client";

import { useDeleteBudget } from "@/src/hooks/budgets/useBudgets";
import type { BudgetApiItem } from "@/src/types/budget";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Eye, MoreHorizontal, PencilLine, PiggyBank, Trash2 } from "lucide-react";
import { BudgetEditModal } from "./BudgetEditModal";
import { DeleteConfirmModal } from "../DeleteConfirmModal";

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
    const deleteBudgetMutation = useDeleteBudget();

    const [menuOpen, setMenuOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

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
        setEditOpen(true);
    };

    const handleDeleteBudget = () => {
        closeMenu();
        setDeleteOpen(true);
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
                        <p className="text-[11px] text-gray-400">0 expenses</p>
                    </div>
                </div>

                <div ref={actionRef} className="relative shrink-0">
                    <button
                        type="button"
                        className={`${triggerClassName} cursor-pointer`}
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

            <BudgetEditModal open={editOpen} budgetData={budgetData} onClose={() => setEditOpen(false)} />

            <DeleteConfirmModal
                open={deleteOpen}
                title="Delete budget?"
                description={`This will permanently delete ${budgetData.name} and remove its budget limit.`}
                confirmLabel="Delete budget"
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDeleteConfirm}
                isPending={deleteBudgetMutation.isPending}
            />
        </div>
    );
};
