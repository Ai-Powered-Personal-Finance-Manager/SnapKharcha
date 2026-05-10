"use client";

import { ErrorFallback } from "@/src/components/ErrorFallback";
import { IncomeDeleteDialog, IncomeSourceFormModal } from "@/src/features/incomes/components/IncomeModals";
import { IncomeSourceCard } from "@/src/features/incomes/components/IncomeSourceCard";
import { useGetIncomes, useCreateIncome, useUpdateIncome, useDeleteIncome } from "@/src/features/incomes/api";
import type { IncomeDisplaySource, IncomeFormType, IncomeSourceFormValues } from "@/src/features/incomes/types";
import { buildIncomeSourceFormValues, formatIncomeAmount, formatIncomeDelta, getIncomeDeltaIcon, toIncomeDisplaySource, toIncomeSourcePayload } from "@/src/utils/income";
import { incomeInsight } from "./incomeStatic";
import { AlertTriangle, ArrowRight, CheckCircle2, Info, Plus, ShieldCheck, TrendingDown, Wallet, Zap, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import IncomePageSkeleton from "@/src/components/loading-skeletons/IncomePageSkeleton";

export function IncomePage() {
    const { data: incomeResponse, isLoading, isError, refetch } = useGetIncomes();
    const createMutation = useCreateIncome();
    const updateMutation = useUpdateIncome();
    const deleteMutation = useDeleteIncome();

    const [sourceModalOpen, setSourceModalOpen] = useState(false);
    const [sourceModalDefaultType, setSourceModalDefaultType] = useState<IncomeFormType>("fixed");
    const [editingSource, setEditingSource] = useState<IncomeDisplaySource | null>(null);
    const [deletingSource, setDeletingSource] = useState<IncomeDisplaySource | null>(null);

    const allIncomes = useMemo(
        () => (incomeResponse?.data?.incomes ?? []).map(toIncomeDisplaySource),
        [incomeResponse?.data?.incomes]
    );

    const fixedSources = useMemo(() => allIncomes.filter((i) => i.type === "FIXED"), [allIncomes]);
    const variableSources = useMemo(() => allIncomes.filter((i) => i.type === "VARIABLE"), [allIncomes]);
    const summary = incomeResponse?.data?.summary;

    const totalIncome = summary?.totalIncome ?? 0;
    const fixedIncome = summary?.fixedIncome ?? 0;
    const variableIncome = summary?.variableIncome ?? 0;
    const activeIncome = summary?.activeIncome ?? 0;
    const fixedPercent = totalIncome > 0 ? Math.round((fixedIncome / totalIncome) * 100) : 0;
    const variablePercent = totalIncome > 0 ? Math.round((variableIncome / totalIncome) * 100) : 0;

    const closeSourceModal = () => {
        setSourceModalOpen(false);
        setEditingSource(null);
    };

    const openCreateSource = (type: IncomeFormType) => {
        setSourceModalDefaultType(type);
        setEditingSource(null);
        setSourceModalOpen(true);
    };

    const openEditSource = (source: IncomeDisplaySource) => {
        setSourceModalDefaultType(source.formType);
        setEditingSource(source);
        setSourceModalOpen(true);
    };

    const handleSourceSubmit = async (values: IncomeSourceFormValues) => {
        const payload = toIncomeSourcePayload(values);

        if (editingSource) {
            await updateMutation.mutateAsync({ id: editingSource.id, payload });
        } else {
            await createMutation.mutateAsync(payload);
        }

        closeSourceModal();
    };

    const handleToggleSourceStatus = async (source: IncomeDisplaySource) => {
        await updateMutation.mutateAsync({
            id: source.id,
            payload: { status: source.status === "ACTIVE" ? "PAUSED" : "ACTIVE" },
        });
    };

    const handleDeleteSource = async () => {
        if (!deletingSource) return;
        await deleteMutation.mutateAsync(deletingSource.id);
        setDeletingSource(null);
    };

    if (isLoading) return <IncomePageSkeleton />;
    if (isError) return <ErrorFallback resetErrorBoundary={refetch} />;

    return (
        <>
            <IncomeSourceFormModal
                open={sourceModalOpen}
                mode={editingSource ? "edit" : "create"}
                defaultType={sourceModalDefaultType}
                initialSource={editingSource}
                onClose={closeSourceModal}
                onSubmit={handleSourceSubmit}
                isPending={createMutation.isPending || updateMutation.isPending}
            />

            <IncomeDeleteDialog
                open={Boolean(deletingSource)}
                title="Delete income source?"
                message={deletingSource ? `This will permanently delete "${deletingSource.source}".` : "This will permanently delete the selected income source."}
                confirmLabel="Delete source"
                onClose={() => setDeletingSource(null)}
                onConfirm={handleDeleteSource}
                isPending={deleteMutation.isPending}
            />

            <div className="space-y-6">
                {/* Page header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-gray-900">Income</h2>
                        <p className="mt-0.5 text-sm text-gray-400">Track fixed and variable income sources in one clean dashboard.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => openCreateSource("fixed")}
                            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50"
                        >
                            <Plus size={14} /> Fixed Source
                        </button>
                        <button
                            type="button"
                            onClick={() => openCreateSource("variable")}
                            className="flex items-center gap-2 rounded-xl bg-[#00C950] px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#00C950]/20 transition-colors hover:bg-[#00b347]"
                        >
                            <Plus size={14} /> Variable Source
                        </button>
                    </div>
                </div>

                {/* Overview banner */}
                <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-6">
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    />
                    <div className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[#00C950]/8 blur-3xl" />

                    <div className="relative">
                        <p className="mb-4 text-[11px] uppercase tracking-wider text-white/40">Monthly Income Overview</p>

                        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <div className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                <div className="mb-1 flex items-center gap-2">
                                    <Wallet size={14} className="text-[#00C950]" />
                                    <p className="text-[11px] uppercase tracking-wider text-white/50">Total Income</p>
                                </div>
                                <p className="font-mono text-xl font-bold text-white">{formatIncomeAmount(totalIncome)}</p>
                                <p className="mt-0.5 text-[10px] text-white/30">from all sources</p>
                            </div>

                            <ArrowRight size={18} className="hidden shrink-0 self-center text-white/20 sm:block" />
                            <span className="self-start text-lg font-bold text-white/20 sm:hidden">↓</span>

                            <div className="flex-1 rounded-xl border border-[#00C950]/25 bg-[#00C950]/12 px-4 py-3">
                                <div className="mb-1 flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-[#00C950]" />
                                    <p className="text-[11px] uppercase tracking-wider text-white/50">Fixed Income</p>
                                </div>
                                <p className="font-mono text-xl font-bold text-[#00C950]">{formatIncomeAmount(fixedIncome)}</p>
                                <p className="mt-0.5 text-[10px] text-white/30">{fixedSources.filter(s => s.status === "ACTIVE").length} active fixed sources</p>
                            </div>

                            <ArrowRight size={18} className="hidden shrink-0 self-center text-white/20 sm:block" />
                            <span className="self-start text-lg font-bold text-white/20 sm:hidden">↓</span>

                            <div className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                <div className="mb-1 flex items-center gap-2">
                                    <TrendingDown size={14} className="text-white/60" />
                                    <p className="text-[11px] uppercase tracking-wider text-white/50">Variable Income</p>
                                </div>
                                <p className="font-mono text-xl font-bold text-white">{formatIncomeAmount(variableIncome)}</p>
                                <p className="mt-0.5 text-[10px] text-white/30">{variableSources.length} sources</p>
                            </div>
                        </div>

                        <div>
                            <div className="relative h-2.5 overflow-hidden rounded-full bg-white/8">
                                <div className="absolute bottom-0 top-0 z-10 border-r-2 border-dashed border-white/20" style={{ left: `${fixedPercent}%` }} />
                                <div className="h-full rounded-full bg-[#00C950] transition-all duration-700" style={{ width: `${fixedPercent}%` }} />
                                <div className="absolute right-0 top-0 h-full rounded-full bg-white/20 transition-all duration-700" style={{ width: `${variablePercent}%` }} />
                            </div>
                            <div className="mt-1 flex justify-between">
                                <span className="text-[10px] text-white/20">Fixed {fixedPercent}%</span>
                                <span className="text-[10px] text-white/20">Active: {formatIncomeAmount(activeIncome)}</span>
                                <span className="text-[10px] text-white/20">Variable {variablePercent}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info banner */}
                <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-4">
                    <Info size={15} className="mt-0.5 shrink-0 text-blue-400" />
                    <p className="text-xs leading-relaxed text-blue-700">
                        <span className="font-semibold">How income tracking works: </span>
                        Fixed sources stay active on a predictable credit day. Variable sources are tracked through entries, so logging each receipt keeps your monthly total accurate.
                    </p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                    {[
                        { label: "Total Sources", value: String(allIncomes.length), sub: "all income sources", color: "text-gray-900" },
                        { label: "Fixed Sources", value: String(fixedSources.length), sub: "recurring monthly", color: "text-gray-900" },
                        { label: "Variable Sources", value: String(variableSources.length), sub: "logged manually", color: "text-gray-900" },
                        { label: "Active Income", value: formatIncomeAmount(activeIncome), sub: "currently active", color: "text-[#00C950]" },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white p-4">
                            <p className="mb-2 text-xs text-gray-400">{stat.label}</p>
                            <p className={`font-mono text-xl font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="mt-1 text-[11px] text-gray-400">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Fixed Sources */}
                <div>
                    <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-[15px] font-semibold text-gray-900">Fixed Sources</h3>
                            <p className="text-[11px] text-gray-400">Recurring sources that count automatically when active</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => openCreateSource("fixed")}
                            className="flex items-center gap-1.5 text-xs font-semibold text-[#00C950] hover:underline"
                        >
                            <Plus size={13} /> Add Source
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {fixedSources.map((source) => (
                            <IncomeSourceCard
                                key={source.id}
                                source={source}
                                onEditSource={openEditSource}
                                onToggleStatus={handleToggleSourceStatus}
                                onDeleteSource={setDeletingSource}
                            />
                        ))}

                        <button
                            type="button"
                            onClick={() => openCreateSource("fixed")}
                            className="group flex min-h-50 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-white p-8 transition-all duration-200 hover:border-[#00C950]/40 hover:bg-[#00C950]/2"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-[#00C950]/10">
                                <Plus size={18} className="text-gray-400 transition-colors group-hover:text-[#00C950]" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-400 transition-colors group-hover:text-[#00C950]">Add Fixed Source</p>
                                <p className="mt-0.5 text-[11px] text-gray-300">Salary, rent, recurring payments</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Variable Sources */}
                <div>
                    <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-[15px] font-semibold text-gray-900">Variable Sources</h3>
                            <p className="text-[11px] text-gray-400">Log an entry whenever money lands in one of these sources</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => openCreateSource("variable")}
                            className="flex items-center gap-1.5 text-xs font-semibold text-[#00C950] hover:underline"
                        >
                            <Plus size={13} /> Add Source
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {variableSources.map((source) => (
                            <IncomeSourceCard
                                key={source.id}
                                source={source}
                                onEditSource={openEditSource}
                                onToggleStatus={handleToggleSourceStatus}
                                onDeleteSource={setDeletingSource}
                            />
                        ))}

                        <button
                            type="button"
                            onClick={() => openCreateSource("variable")}
                            className="group flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-white p-8 transition-all duration-200 hover:border-[#00C950]/40 hover:bg-[#00C950]/2"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-[#00C950]/10">
                                <Plus size={18} className="text-gray-400 transition-colors group-hover:text-[#00C950]" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-400 transition-colors group-hover:text-[#00C950]">Add Variable Source</p>
                                <p className="mt-0.5 text-[11px] text-gray-300">YouTube, freelance, sales, etc.</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* AI Tip */}
                <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-4">
                    <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#00C950]/15 blur-2xl" />
                    <div className="relative">
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#00C950]">
                                <Zap size={11} className="text-white" />
                            </div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">AI Tip</p>
                        </div>
                        <p className="text-xs leading-relaxed text-white">{incomeInsight}</p>
                    </div>
                </div>

                {/* Footer tip */}
                <div className="flex items-start gap-3 rounded-2xl border border-[#00C950]/15 bg-[#00C950]/5 px-5 py-4">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#00C950]" />
                    <p className="text-xs leading-relaxed text-[#01271E]">
                        <span className="font-semibold text-[#00C950]">Income dashboard ready: </span>
                        Fixed sources contribute automatically, while variable receipts need manual logging.
                    </p>
                </div>
            </div>
        </>
    );
}