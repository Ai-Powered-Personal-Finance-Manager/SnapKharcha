"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock, MoreHorizontal, Pencil, Plus, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import type { IncomeDisplayEntry, IncomeDisplaySource } from "@/src/types/income";
import { formatCreditDay, formatIncomeAmount } from "@/src/utils/income";

type IncomeSourceCardProps = {
    source: IncomeDisplaySource;
    onEditSource: (source: IncomeDisplaySource) => void;
    onToggleStatus: (source: IncomeDisplaySource) => void;
    onDeleteSource: (source: IncomeDisplaySource) => void;
    onAddEntry: (source: IncomeDisplaySource) => void;
    onEditEntry: (entry: IncomeDisplayEntry, source: IncomeDisplaySource) => void;
    onDeleteEntry: (entry: IncomeDisplayEntry, source: IncomeDisplaySource) => void;
};

const IncomeEntryRow = ({
    entry,
    source,
    onEdit,
    onDelete,
}: {
    entry: IncomeDisplayEntry;
    source: IncomeDisplaySource;
    onEdit: (entry: IncomeDisplayEntry, source: IncomeDisplaySource) => void;
    onDelete: (entry: IncomeDisplayEntry, source: IncomeDisplaySource) => void;
}) => {
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

    return (
        <div className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00C950]/8 text-[#00C950]">
                <TrendingUp size={14} />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <p className="truncate text-xs font-medium text-gray-800">{entry.note || `${source.name} entry`}</p>
                    <span className="text-[10px] text-gray-200">·</span>
                    <p className="shrink-0 text-[10px] text-gray-400">{entry.displayDate}</p>
                </div>
            </div>

            <p className="shrink-0 font-mono text-xs font-semibold text-gray-900">+{formatIncomeAmount(entry.amount)}</p>

            <div ref={actionRef} className="relative shrink-0">
                <button
                    type="button"
                    onClick={() => setMenuOpen((value) => !value)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    aria-label="Income entry actions"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                >
                    <MoreHorizontal size={13} />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1 shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                        <button
                            type="button"
                            onClick={() => {
                                setMenuOpen(false);
                                onEdit(entry, source);
                            }}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                        >
                            <Pencil size={14} />
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setMenuOpen(false);
                                onDelete(entry, source);
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
    );
};

export const IncomeSourceCard = ({
    source,
    onEditSource,
    onToggleStatus,
    onDeleteSource,
    onAddEntry,
    onEditEntry,
    onDeleteEntry,
}: IncomeSourceCardProps) => {
    const Icon = source.icon;
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

    const isVariable = source.formType === "variable";
    const hasPrevious = source.previousMonthAmount > 0;
    const trendPositive = source.currentMonthAmount >= source.previousMonthAmount;
    const trendPct = hasPrevious
        ? Math.round((Math.abs(source.currentMonthAmount - source.previousMonthAmount) / source.previousMonthAmount) * 100)
        : 0;
    const metricLabel = isVariable ? "This month" : source.status === "active" ? "Monthly amount" : "Paused";
    const metricValue = isVariable
        ? formatIncomeAmount(source.currentMonthAmount)
        : source.status === "active"
            ? formatIncomeAmount(Number(source.amount ?? 0))
            : formatIncomeAmount(0);

    return (
        <div className={`group overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-100 ${source.status === "pause" ? "border-gray-100 opacity-85" : "border-gray-100"}`}>
            <div className="h-1 bg-gray-100">
                <div className="h-full rounded-r-full transition-all duration-700" style={{ width: `${source.status === "pause" ? 12 : 100}%`, backgroundColor: source.accentHex }} />
            </div>

            <div className="p-5">
                <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${source.iconBg}`}>
                            <Icon size={18} className={source.iconColor} />
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-800">{source.name}</p>
                            <p className="truncate text-[11px] text-gray-400">
                                {source.company || source.position ? [source.company, source.position].filter(Boolean).join(" · ") : "Income source"}
                            </p>
                            {source.sourceNote && <p className="truncate text-[11px] text-gray-400">{source.sourceNote}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${isVariable ? "bg-amber-50 text-amber-600" : "bg-[#00C950]/8 text-[#00C950]"}`}>
                            {isVariable ? <TrendingUp size={11} /> : <CheckCircle2 size={11} />}
                            {source.typeLabel}
                        </div>
                        <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${source.status === "active" ? "bg-blue-50 text-blue-500" : "bg-gray-100 text-gray-500"}`}>
                            <Clock size={11} /> {source.statusLabel}
                        </div>
                        <div ref={actionRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setMenuOpen((value) => !value)}
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
                                        onClick={() => {
                                            setMenuOpen(false);
                                            onEditSource(source);
                                        }}
                                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        <Pencil size={14} />
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            onToggleStatus(source);
                                        }}
                                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        {source.status === "active" ? <Clock size={14} /> : <CheckCircle2 size={14} />}
                                        {source.status === "active" ? "Pause" : "Resume"}
                                    </button>
                                    {isVariable && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMenuOpen(false);
                                                onAddEntry(source);
                                            }}
                                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            <Plus size={14} />
                                            Log Entry
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            onDeleteSource(source);
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
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">{metricLabel}</p>
                        <p className={`font-mono text-sm font-bold ${source.status === "pause" ? "text-gray-400" : "text-gray-900"}`}>{metricValue}</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">{isVariable ? "Last month" : "Credit day"}</p>
                        <p className="font-mono text-sm font-bold text-gray-900">{isVariable ? formatIncomeAmount(source.previousMonthAmount) : formatCreditDay(source.creditDay)}</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">{isVariable ? "Entries" : "Status"}</p>
                        <p className="font-mono text-sm font-bold text-gray-900">{isVariable ? source.entryCount ?? source.latestEntries.length : source.statusLabel}</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-400">{isVariable ? "Trend" : "Type"}</p>
                        <p className="font-mono text-sm font-bold text-gray-900">{isVariable ? (hasPrevious ? `${trendPositive ? "+" : "-"}${trendPct}%` : "New") : source.typeLabel}</p>
                    </div>
                </div>

                {isVariable ? (
                    <div className="mb-4">
                        <div className="mb-1.5 flex items-center justify-between">
                            <p className="text-[11px] text-gray-400">Repayment progress</p>
                            <p className="font-mono text-[11px] font-semibold" style={{ color: source.accentHex }}>
                                {trendPositive ? "+" : "-"}{trendPct}%
                            </p>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(source.currentMonthAmount, 100)}%`, backgroundColor: source.accentHex }} />
                        </div>
                        <div className="mt-1 flex justify-between">
                            <span className="text-[10px] text-gray-400">This month: {formatIncomeAmount(source.currentMonthAmount)}</span>
                            <span className="text-[10px] text-gray-400">Last month: {formatIncomeAmount(source.previousMonthAmount)}</span>
                        </div>
                    </div>
                ) : (
                    <div className="mb-4 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 text-xs text-gray-500">
                        Fixed income is counted automatically only when the source is active.
                    </div>
                )}

                {isVariable ? (
                    <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-3">
                        <div className="mb-2 flex items-center justify-between">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Latest entries</p>
                            <button type="button" onClick={() => onAddEntry(source)} className="text-[11px] font-semibold text-[#00C950] hover:underline">
                                Log Entry
                            </button>
                        </div>

                        {source.latestEntries.length > 0 ? (
                            <div className="space-y-2">
                                {source.latestEntries.map((entry) => (
                                    <IncomeEntryRow key={entry.id} entry={entry} source={source} onEdit={onEditEntry} onDelete={onDeleteEntry} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 py-2 text-xs text-gray-400">
                                <Clock size={12} /> No entries yet this month
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                            <Clock size={12} />
                            <span>
                                Credits on <span className="font-semibold text-gray-700">{formatCreditDay(source.creditDay)}</span>
                            </span>
                        </div>
                        <div className={`flex items-center gap-1 text-[11px] font-semibold ${source.status === "active" ? "text-[#00C950]" : "text-gray-400"}`}>
                            <CheckCircle2 size={13} className={source.status === "active" ? "text-[#00C950]" : "text-gray-300"} />
                            {source.status === "active" ? "Included in monthly income" : "Paused source"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};