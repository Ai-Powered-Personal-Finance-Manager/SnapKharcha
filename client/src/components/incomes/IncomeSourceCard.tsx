"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock, MoreHorizontal, Pencil, Trash2, TrendingUp } from "lucide-react";
import type { IncomeDisplaySource } from "@/src/types/income";
import { formatCreditDay, formatIncomeAmount } from "@/src/utils/income";

type IncomeSourceCardProps = {
    source: IncomeDisplaySource;
    onEditSource: (source: IncomeDisplaySource) => void;
    onToggleStatus: (source: IncomeDisplaySource) => void;
    onDeleteSource: (source: IncomeDisplaySource) => void;
};

export const IncomeSourceCard = ({
    source,
    onEditSource,
    onToggleStatus,
    onDeleteSource,
}: IncomeSourceCardProps) => {
    const Icon = source.icon;
    const actionRef = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!menuOpen) return;

        const handlePointerDown = (event: PointerEvent) => {
            if (event.target instanceof Node && actionRef.current?.contains(event.target)) return;
            setMenuOpen(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [menuOpen]);

    const isVariable = source.formType === "variable";
    const isPaused = source.status === "PAUSED";
    const formStatus = source.formStatus;

    const metricLabel = isVariable ? "This month" : !isPaused ? "Monthly amount" : "Paused";
    const metricValue = isVariable
        ? formatIncomeAmount(source.currentMonthAmount)
        : !isPaused
            ? formatIncomeAmount(Number(source.amount ?? 0))
            : formatIncomeAmount(0);

    return (
        <div className={`group overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-100 ${isPaused ? "border-gray-100 opacity-85" : "border-gray-100"}`}>
            <div className="h-1 bg-gray-100">
                <div
                    className="h-full rounded-r-full transition-all duration-700"
                    style={{ width: `${isPaused ? 12 : 100}%`, backgroundColor: source.accentHex }}
                />
            </div>

            <div className="p-5">
                {/* Header */}
                <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${source.iconBg}`}>
                            <Icon size={18} className={source.iconColor} />
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-800">{source.source}</p>
                            <p className="truncate text-[11px] text-gray-400">
                                {source.company || source.position
                                    ? [source.company, source.position].filter(Boolean).join(" · ")
                                    : "Income source"}
                            </p>
                            {source.note && <p className="truncate text-[11px] text-gray-400">{source.note}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${isVariable ? "bg-amber-50 text-amber-600" : "bg-[#00C950]/8 text-[#00C950]"}`}>
                            {isVariable ? <TrendingUp size={11} /> : <CheckCircle2 size={11} />}
                            {source.typeLabel}
                        </div>
                        <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${!isPaused ? "bg-blue-50 text-blue-500" : "bg-gray-100 text-gray-500"}`}>
                            <Clock size={11} /> {source.statusLabel}
                        </div>

                        <div ref={actionRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setMenuOpen((v) => !v)}
                                className="text-gray-300 transition-colors hover:text-gray-500"
                                aria-label="Income source actions"
                                aria-haspopup="menu"
                                aria-expanded={menuOpen}
                            >
                                <MoreHorizontal size={16} />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 top-8 z-20 w-44 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1 shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                                    <button
                                        type="button"
                                        onClick={() => { setMenuOpen(false); onEditSource(source); }}
                                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        <Pencil size={14} /> Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setMenuOpen(false); onToggleStatus(source); }}
                                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        {!isPaused ? <Clock size={14} /> : <CheckCircle2 size={14} />}
                                        {!isPaused ? "Pause" : "Resume"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setMenuOpen(false); onDeleteSource(source); }}
                                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Metrics grid */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-3">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">{metricLabel}</p>
                        <p className={`font-mono text-sm font-bold ${isPaused ? "text-gray-400" : "text-gray-900"}`}>{metricValue}</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">{isVariable ? "Last month" : "Credit day"}</p>
                        <p className="font-mono text-sm font-bold text-gray-900">
                            {isVariable ? formatIncomeAmount(source.previousMonthAmount) : formatCreditDay(source.creditDay)}
                        </p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">Status</p>
                        <p className="font-mono text-sm font-bold text-gray-900">{source.statusLabel}</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">Type</p>
                        <p className="font-mono text-sm font-bold text-gray-900">{source.typeLabel}</p>
                    </div>
                </div>

                {/* Bottom section */}
                {isVariable ? (
                    <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 text-xs text-gray-500">
                        Variable income is tracked manually. Log entries to keep your monthly total accurate.
                    </div>
                ) : (
                    <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 text-xs text-gray-500">
                        Fixed income is counted automatically only when the source is active.
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-4">
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                        <Clock size={12} />
                        {isVariable ? (
                            <span>Variable — log entries manually</span>
                        ) : (
                            <span>Credits on <span className="font-semibold text-gray-700">{formatCreditDay(source.creditDay)}</span></span>
                        )}
                    </div>
                    <div className={`flex items-center gap-1 text-[11px] font-semibold ${!isPaused ? "text-[#00C950]" : "text-gray-400"}`}>
                        <CheckCircle2 size={13} className={!isPaused ? "text-[#00C950]" : "text-gray-300"} />
                        {!isPaused ? "Included in income" : "Paused source"}
                    </div>
                </div>
            </div>
        </div>
    );
};