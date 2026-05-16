"use client";

import { ErrorFallback } from "@/src/components/ErrorFallback";
import { LoanCard } from "@/src/features/loans-and-emis/components/LoanCard";
import { LoanDeleteDialog } from "@/src/features/loans-and-emis/components/LoanDeleteDialog";
import { LoanFormModal } from "@/src/features/loans-and-emis/components/LoanFormModal";
import { useCreateLoan, useDeleteLoan, useGetLoans, useUpdateLoan } from "@/src/features/loans-and-emis/api";
import type { LoanDisplayItem, LoanFormValues } from "@/src/features/loans-and-emis/types";
import { formatLoanAmount, toLoanDisplayItem } from "@/src/utils/loan";
import { loanInsight, loanMonthlyIncome, loanSafeThreshold } from "./loanStatic";
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    Info,
    Plus,
    ShieldCheck,
    TrendingDown,
    Wallet,
    Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoansPageSkeleton from "@/src/components/loading-skeletons/LoanPageSkeleton";
import { PageHeader } from "@/src/components/PageHeader";

export function LoansPage() {
    const router = useRouter();
    const { data: loansResponse, isLoading, isError, refetch } = useGetLoans();
    const createLoanMutation = useCreateLoan();
    const updateLoanMutation = useUpdateLoan();
    const deleteLoanMutation = useDeleteLoan();

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingLoan, setEditingLoan] = useState<LoanDisplayItem | null>(null);
    const [deletingLoan, setDeletingLoan] = useState<LoanDisplayItem | null>(null);

    const remoteLoans = loansResponse?.data ?? [];
    const loans: LoanDisplayItem[] = remoteLoans.map(toLoanDisplayItem);

    const activeLoans = loans.filter((loan) => loan.status === "active");
    const completedLoans = loans.filter((loan) => loan.status === "completed");

    const totalEMI = activeLoans.reduce((sum, loan) => sum + loan.emi, 0);
    const totalOutstanding = activeLoans.reduce((sum, loan) => sum + loan.outstanding, 0);
    const disposableIncome = loanMonthlyIncome - totalEMI;
    const emiToIncomePct = loanMonthlyIncome > 0 ? Math.round((totalEMI / loanMonthlyIncome) * 100) : 0;
    const overBudget = emiToIncomePct > loanSafeThreshold;

    if (isError) {
        return <ErrorFallback resetErrorBoundary={refetch} />;
    }

    const highestInterestLoan = activeLoans.reduce<LoanDisplayItem | null>((currentHighest, loan) => {
        if (!currentHighest || loan.interestRate > currentHighest.interestRate) {
            return loan;
        }

        return currentHighest;
    }, null);

    const handleLoanSubmit = (values: LoanFormValues) => {
        const payload = {
            name: values.name.trim(),
            lenderName: values.lenderName.trim(),
            interestRate: Number(values.interestRate),
            timeValue: Number(values.timeValue),
            timeUnit: values.timeUnit,
            amount: Number(values.amount),
            emiAmount: Number(values.emiAmount),
            note: values.note.trim() ? values.note.trim() : undefined,
            status: values.status,
        };

        if (editingLoan) {
            updateLoanMutation.mutate(
                {
                    id: editingLoan.id,
                    payload,
                },
                {
                    onSuccess: () => {
                        setEditingLoan(null);
                    },
                },
            );
            return;
        }

        createLoanMutation.mutate(payload, {
            onSuccess: () => {
                setShowCreateModal(false);
            },
        });
    };

    const handleDeleteLoan = () => {
        if (!deletingLoan) {
            return;
        }

        deleteLoanMutation.mutate(deletingLoan.id, {
            onSuccess: () => {
                setDeletingLoan(null);
            },
        });
    };

    if (isLoading) {
        return <LoansPageSkeleton />;
    }

    return (
        <>
            <div className="space-y-6">
                <PageHeader
                    title="Loans & EMIs"
                    description="Manage your loans · EMIs auto-deducted from income"
                    action={[
                        {
                            label: "Add Loan",
                            icon: Plus,
                            variant: "primary",
                            onClick: () => setShowCreateModal(true),
                        },
                    ]}
                />

                <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-6">
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    />
                    <div className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[#00C950]/8 blur-3xl" />

                    <div className="relative">
                        <p className="mb-4 text-[11px] uppercase tracking-wider text-white/40">Disposable Income Calculator</p>

                        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <div className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                <div className="mb-1 flex items-center gap-2">
                                    <Wallet size={14} className="text-[#00C950]" />
                                    <p className="text-[11px] uppercase tracking-wider text-white/50">Monthly Income</p>
                                </div>
                                <p className="font-mono text-xl font-bold text-white">{formatLoanAmount(loanMonthlyIncome)}</p>
                                <p className="mt-0.5 text-[10px] text-white/30">from Income page</p>
                            </div>

                            <ArrowRight size={18} className="hidden shrink-0 self-center text-white/20 sm:block" />
                            <span className="self-start text-lg font-bold text-white/20 sm:hidden">↓</span>

                            <div className="flex-1 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                                <div className="mb-1 flex items-center gap-2">
                                    <TrendingDown size={14} className="text-red-400" />
                                    <p className="text-[11px] uppercase tracking-wider text-white/50">Total EMIs</p>
                                </div>
                                <p className="font-mono text-xl font-bold text-red-400">-{formatLoanAmount(totalEMI)}</p>
                                <p className="mt-0.5 text-[10px] text-white/30">{activeLoans.length} active loans</p>
                            </div>

                            <ArrowRight size={18} className="hidden shrink-0 self-center text-white/20 sm:block" />
                            <span className="self-start text-lg font-bold text-white/20 sm:hidden">↓</span>

                            <div className="flex-1 rounded-xl border border-[#00C950]/25 bg-[#00C950]/12 px-4 py-3">
                                <div className="mb-1 flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-[#00C950]" />
                                    <p className="text-[11px] uppercase tracking-wider text-white/50">For Budgets</p>
                                </div>
                                <p className="font-mono text-xl font-bold text-[#00C950]">{formatLoanAmount(disposableIncome)}</p>
                                <p className="mt-0.5 text-[10px] text-white/30">max budget available</p>
                            </div>
                        </div>

                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <p className="text-[11px] text-white/40">EMI-to-Income Ratio</p>
                                    <Info size={11} className="cursor-pointer text-white/25" />
                                </div>
                                <p className={`text-[11px] font-bold font-mono ${overBudget ? "text-red-400" : "text-[#00C950]"}`}>
                                    {emiToIncomePct}% {overBudget ? "— Over safe limit!" : "— Healthy"}
                                </p>
                            </div>
                            <div className="relative h-2.5 overflow-hidden rounded-full bg-white/8">
                                <div className="absolute bottom-0 top-0 z-10 border-r-2 border-dashed border-white/20" style={{ left: `${loanSafeThreshold}%` }} />
                                <div className={`h-full rounded-full transition-all duration-700 ${overBudget ? "bg-red-400" : "bg-[#00C950]"}`} style={{ width: `${Math.min(emiToIncomePct, 100)}%` }} />
                            </div>
                            <div className="mt-1 flex justify-between">
                                <span className="text-[10px] text-white/20">0%</span>
                                <span className="text-[10px] text-white/20">Safe limit: {loanSafeThreshold}%</span>
                                <span className="text-[10px] text-white/20">100%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* {overBudget ? (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
                        <AlertTriangle size={15} className="mt-0.5 shrink-0 text-red-500" />
                        <p className="text-xs leading-relaxed text-red-700">
                            <span className="font-semibold">High debt load: </span>
                            Your EMI-to-income ratio of {emiToIncomePct}% exceeds the recommended 40% threshold. Consider prepaying {highestInterestLoan?.name ?? "your highest-interest loan"} to free up cash flow.
                        </p>
                    </div>
                ) : (
                    <div className="flex items-start gap-3 rounded-2xl border border-[#00C950]/15 bg-[#00C950]/5 px-5 py-4">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#00C950]" />
                        <p className="text-xs leading-relaxed text-[#01271E]">
                            <span className="font-semibold text-[#00C950]">Healthy debt ratio: </span>
                            Your EMIs use {emiToIncomePct}% of your income — well within the 40% safe limit. You have {formatLoanAmount(disposableIncome)} available for budgeting this month.
                        </p>
                    </div>
                )} */}

                <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-4">
                    <Info size={15} className="mt-0.5 shrink-0 text-blue-400" />
                    <p className="text-xs leading-relaxed text-blue-700">
                        <span className="font-semibold">How this connects to Budgets: </span>
                        When you create or edit budgets, the total across all categories is capped at your disposable income of <span className="font-semibold font-mono">{formatLoanAmount(disposableIncome)}</span>. EMIs of <span className="font-semibold font-mono">{formatLoanAmount(totalEMI)}</span> are deducted first automatically.
                    </p>
                </div>

                {loans.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-5 py-4 text-sm text-gray-500">
                        No loans yet. Add your first loan to start tracking EMI impact and repayment progress.
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                    {[
                        { label: "Active Loans", value: activeLoans.length.toString(), sub: "loans running", color: "text-gray-900" },
                        { label: "Total Outstanding", value: formatLoanAmount(totalOutstanding), sub: "to be repaid", color: "text-red-500" },
                        { label: "Monthly EMIs", value: formatLoanAmount(totalEMI), sub: "deducted from income", color: "text-gray-900" },
                        { label: "Disposable Budget", value: formatLoanAmount(disposableIncome), sub: "available for expenses", color: "text-[#00C950]" },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white p-4">
                            <p className="mb-2 text-xs text-gray-400">{stat.label}</p>
                            <p className={`font-mono text-xl font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="mt-1 text-[11px] text-gray-400">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <h3 className="mb-4 text-[15px] font-semibold text-gray-900">Active Loans</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {activeLoans.map((loan) => (
                            <LoanCard
                                key={loan.id}
                                loan={loan}
                                onView={(selectedLoan) => router.push(`/loans-and-emis/${selectedLoan.id}`)}
                                onEdit={(selectedLoan) => setEditingLoan(selectedLoan)}
                                onDelete={(selectedLoan) => setDeletingLoan(selectedLoan)}
                            />
                        ))}

                        <button
                            type="button"
                            onClick={() => setShowCreateModal(true)}
                            className="group flex min-h-50 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-white p-8 transition-all duration-200 hover:border-[#00C950]/40 hover:bg-[#00C950]/2"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-[#00C950]/10">
                                <Plus size={18} className="text-gray-400 transition-colors group-hover:text-[#00C950]" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-400 transition-colors group-hover:text-[#00C950]">Add a Loan</p>
                                <p className="mt-0.5 text-[11px] text-gray-300">Home, car, personal, education…</p>
                            </div>
                        </button>
                    </div>
                </div>

                {completedLoans.length > 0 && (
                    <div>
                        <h3 className="mb-4 text-[15px] font-semibold text-gray-900">Paid Off Loans</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {completedLoans.map((loan) => (
                                <LoanCard
                                    key={loan.id}
                                    loan={loan}
                                    onView={(selectedLoan) => router.push(`/loans-and-emis/${selectedLoan.id}`)}
                                    onEdit={(selectedLoan) => setEditingLoan(selectedLoan)}
                                    onDelete={(selectedLoan) => setDeletingLoan(selectedLoan)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-4">
                    <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#00C950]/15 blur-2xl" />
                    <div className="relative">
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#00C950]">
                                <Zap size={11} className="text-white" />
                            </div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">AI Tip</p>
                        </div>
                        <p className="text-xs leading-relaxed text-white">{loanInsight}</p>
                    </div>
                </div>
            </div>

            <LoanFormModal
                open={showCreateModal || Boolean(editingLoan)}
                mode={editingLoan ? "edit" : "create"}
                initialLoan={editingLoan}
                onClose={() => {
                    setShowCreateModal(false);
                    setEditingLoan(null);
                }}
                onSubmit={handleLoanSubmit}
                isPending={createLoanMutation.isPending || updateLoanMutation.isPending}
            />

            <LoanDeleteDialog
                open={Boolean(deletingLoan)}
                loanLabel={deletingLoan?.name || "this loan"}
                onClose={() => setDeletingLoan(null)}
                onConfirm={handleDeleteLoan}
                isPending={deleteLoanMutation.isPending}
            />
        </>
    );
}