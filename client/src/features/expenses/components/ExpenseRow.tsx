"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, MoreHorizontal, PencilLine, Receipt, Trash2 } from "lucide-react";
import type { ExpenseApiItem } from "@/src/features/expenses/types";
import {
    formatExpensePaymentMethod,
    formatExpenseTime,
} from "@/src/utils/expense";

import { getCategoryIcon } from "@/src/utils/budget";

type ExpenseRowProps = {
    expense: ExpenseApiItem;
    onView: (expense: ExpenseApiItem) => void;
    onEdit: (expense: ExpenseApiItem) => void;
    onDelete: (expense: ExpenseApiItem) => void;
};

const paymentColors: Record<string, string> = {
    BANK: "bg-purple-50 text-purple-500",
    UPI: "bg-[#00C950]/8 text-[#00C950]",
    CARD: "bg-blue-50 text-blue-500",
    CASH: "bg-amber-50 text-amber-600",
};

export const ExpenseRow = ({ expense, onView, onEdit, onDelete }: ExpenseRowProps) => {
    const actionRef = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);

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

    const categoryColor = expense.category.color ?? "#94a3b8";
    const timeLabel = formatExpenseTime(expense.date ?? expense.createdAt);
    const paymentMethod = formatExpensePaymentMethod(expense.paymentMethod);
    const noteLabel = expense.note || expense.category.name || expense.budget.name;
    const Icon = getCategoryIcon(expense.category.name, expense.category.tags);

    return (
        <div className="group relative flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-gray-50/60">
            <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${categoryColor}18` }}
            >
                <Icon size={16} style={{ color: categoryColor }} />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-800">{expense.merchant || "Expense"}</p>
                    {expense.receiptAttached && (
                        <span className="rounded-md bg-[#00C950]/8 px-1.5 py-0.5 text-[9px] font-semibold text-[#00C950]">
                            Receipt
                        </span>
                    )}
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                    <p className="truncate text-[11px] text-gray-400">{noteLabel}</p>
                    <span className="text-[11px] text-gray-200">·</span>
                    <p className="shrink-0 text-[11px] text-gray-300">{timeLabel}</p>
                </div>
            </div>

            <span className="hidden shrink-0 rounded-lg bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-500 md:block">
                {expense.budget.name}
            </span>

            <span className={`hidden shrink-0 rounded-lg px-2 py-1 text-[10px] font-semibold lg:block ${paymentColors[expense.paymentMethod ?? ""] ?? "bg-gray-100 text-gray-500"}`}>
                {paymentMethod}
            </span>

            <p className="shrink-0 font-mono text-sm font-bold text-gray-900">− Rs.{expense.amount.toLocaleString()}</p>

            <div ref={actionRef} className="relative flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                    type="button"
                    onClick={() => onEdit(expense)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
                    aria-label="Edit expense"
                >
                    <PencilLine size={13} />
                </button>
                <button
                    type="button"
                    onClick={() => setMenuOpen((value) => !value)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
                    aria-label="Expense actions"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                >
                    <MoreHorizontal size={13} />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 top-9 z-20 w-44 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1 shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                        <button
                            type="button"
                            onClick={() => {
                                setMenuOpen(false);
                                onView(expense);
                            }}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                        >
                            <Eye size={14} />
                            View
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setMenuOpen(false);
                                onDelete(expense);
                            }}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer"
                        >
                            <Trash2 size={14} />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};