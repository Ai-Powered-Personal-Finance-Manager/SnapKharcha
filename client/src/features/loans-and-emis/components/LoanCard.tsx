"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, CheckCircle2, Eye, MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
import type { LoanDisplayItem } from "@/src/features/loans-and-emis/types";
import { formatLoanAmount, formatLoanDuration, loanStatusMeta } from "@/src/utils/loan";

type LoanCardProps = {
    loan: LoanDisplayItem;
    onView: (loan: LoanDisplayItem) => void;
    onEdit: (loan: LoanDisplayItem) => void;
    onDelete: (loan: LoanDisplayItem) => void;
};

export const LoanCard = ({ loan, onView, onEdit, onDelete }: LoanCardProps) => {
    const Icon = loan.icon;
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

    const paidPct = loan.tenureMonths > 0 ? Math.min(Math.round((loan.paidMonths / loan.tenureMonths) * 100), 100) : 0;
    const remainingMonths = Math.max(loan.tenureMonths - loan.paidMonths, 0);
    const statusConfig = loanStatusMeta[loan.status];
    const StatusIcon = statusConfig.icon;

    return (
        <div className={`group overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-100 ${loan.status === "completed" ? "border-[#00C950]/15" : "border-gray-100"}`}>
            <div className="h-1 bg-gray-100">
                <div className="h-full rounded-r-full transition-all duration-700" style={{ width: `${paidPct}%`, backgroundColor: loan.accentHex }} />
            </div>

            <div className="p-5">
                <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${loan.iconBg}`}>
                            <Icon size={18} className={loan.iconColor} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{loan.name}</p>
                            <p className="text-[11px] text-gray-400">{loan.lenderName}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                            <StatusIcon size={11} /> {statusConfig.label}
                        </div>
                        <div ref={actionRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setMenuOpen((value) => !value)}
                                className="text-gray-300 transition-colors hover:text-gray-500"
                                aria-label="Loan actions"
                                aria-haspopup="menu"
                                aria-expanded={menuOpen}
                            >
                                <MoreHorizontal size={16} />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 top-8 z-20 w-44 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1 shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            onView(loan);
                                        }}
                                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        <Eye size={14} />
                                        View
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            onEdit(loan);
                                        }}
                                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        <PencilLine size={14} />
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            onDelete(loan);
                                        }}
                                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 size={14} />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-3">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">Outstanding</p>
                        <p className={`font-mono text-sm font-bold ${loan.status === "completed" ? "text-[#00C950]" : "text-gray-900"}`}>
                            {loan.status === "completed" ? "Rs. 0 — Paid!" : formatLoanAmount(loan.outstanding)}
                        </p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">Monthly EMI</p>
                        <p className={`font-mono text-sm font-bold ${loan.status === "completed" ? "text-gray-400" : "text-gray-900"}`}>
                            {loan.status === "completed" ? "—" : formatLoanAmount(loan.emi)}
                        </p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">Interest Rate</p>
                        <div className="flex items-center gap-1">
                            <p className="font-mono text-sm font-bold text-gray-900">{loan.interestRate}%</p>
                        </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">{loan.status === "completed" ? "Tenure" : "Remaining"}</p>
                        <p className="font-mono text-sm font-bold text-gray-900">
                            {loan.status === "completed" ? formatLoanDuration(loan.timeValue, loan.timeUnit) : `${remainingMonths} mo`}
                        </p>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="mb-1.5 flex items-center justify-between">
                        <p className="text-[11px] text-gray-400">Repayment progress</p>
                        <p className="font-mono text-[11px] font-semibold" style={{ color: loan.accentHex }}>
                            {paidPct}%
                        </p>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${paidPct}%`, backgroundColor: loan.accentHex }} />
                    </div>
                    <div className="mt-1 flex justify-between">
                        <span className="text-[10px] text-gray-400">{loan.paidMonths} months paid</span>
                        <span className="text-[10px] text-gray-400">{loan.tenureMonths} months total</span>
                    </div>
                </div>

                {loan.status !== "completed" ? (
                    <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                            <Calendar size={12} />
                            <span>
                                Next due: <span className="font-semibold text-gray-700">{loan.nextDueDate}</span>
                            </span>
                        </div>
                        <button type="button" onClick={() => onView(loan)} className="text-[11px] font-semibold text-blue-500 hover:underline">
                            Pay Now
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 border-t border-gray-50 pt-3">
                        <CheckCircle2 size={13} className="text-[#00C950]" />
                        <p className="text-[11px] font-semibold text-[#00C950]">Fully repaid · Great job! 🎉</p>
                    </div>
                )}
            </div>
        </div>
    );
};