"use client";

import { ErrorFallback } from "@/src/components/ErrorFallback";
import { LoanDeleteDialog } from "@/src/features/loans-and-emis/components/LoanDeleteDialog";
import { LoanFormModal } from "@/src/features/loans-and-emis/components/LoanFormModal";
import { useDeleteLoan, useGetLoanById, useUpdateLoan } from "@/src/features/loans-and-emis/api";
import { loanFallbackLoans } from "./loanStatic";
import type { LoanDisplayItem, LoanFormValues } from "@/src/features/loans-and-emis/types";
import { formatLoanAmount, formatLoanDuration, toLoanDisplayItem } from "@/src/utils/loan";
import { AlertTriangle, ArrowLeft, Calendar, CheckCircle2, Info, PencilLine, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoanDetailsSkeleton from "@/src/components/loading-skeletons/LoanDetailSkeleton";


export default function LoanDetailsPage({ loanId }: { loanId: string }) {
    const router = useRouter();
    const { data: loan, isLoading, isError, refetch } = useGetLoanById(loanId);
    const updateLoanMutation = useUpdateLoan();
    const deleteLoanMutation = useDeleteLoan();

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const fallbackLoan = loanFallbackLoans.find((entry) => entry.id === loanId) ?? null;
    const displayLoan: LoanDisplayItem | null = loan ? toLoanDisplayItem(loan) : fallbackLoan;

    if (isLoading) {
        return <LoanDetailsSkeleton />;
    }

    if (isError && !displayLoan) {
        return <ErrorFallback resetErrorBoundary={refetch} />;
    }

    if (!displayLoan) {
        return <ErrorFallback resetErrorBoundary={refetch} />;
    }

    const remainingMonths = Math.max(displayLoan.tenureMonths - displayLoan.paidMonths, 0);
    const paidPct = displayLoan.tenureMonths > 0 ? Math.min(Math.round((displayLoan.paidMonths / displayLoan.tenureMonths) * 100), 100) : 0;
    const overBudget = displayLoan.status === "overdue";

    const handleLoanSubmit = (values: LoanFormValues) => {
        updateLoanMutation.mutate(
            {
                id: displayLoan.id,
                payload: {
                    name: values.name.trim(),
                    lenderName: values.lenderName.trim(),
                    interestRate: Number(values.interestRate),
                    timeValue: Number(values.timeValue),
                    timeUnit: values.timeUnit,
                    amount: Number(values.amount),
                    emiAmount: Number(values.emiAmount),
                    note: values.note.trim() ? values.note.trim() : undefined,
                    status: values.status,
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
        deleteLoanMutation.mutate(displayLoan.id, {
            onSuccess: () => {
                setDeleteOpen(false);
                router.push("/loans-and-emis");
            },
        });
    };

    const Icon = displayLoan.icon;

    return (
        <>
            <LoanFormModal
                open={editOpen}
                mode="edit"
                initialLoan={displayLoan}
                onClose={() => setEditOpen(false)}
                onSubmit={handleLoanSubmit}
                isPending={updateLoanMutation.isPending}
            />

            <LoanDeleteDialog
                open={deleteOpen}
                loanLabel={displayLoan.name}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDeleteConfirm}
                isPending={deleteLoanMutation.isPending}
            />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/loans-and-emis"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-400">Loan overview</p>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{displayLoan.name}</h2>
                        <p className="text-sm text-gray-500">{displayLoan.lenderName}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setEditOpen(true)}
                            className="inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            <PencilLine size={14} /> Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => setDeleteOpen(true)}
                            className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                        >
                            <Trash2 size={14} /> Delete
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: `${displayLoan.accentHex}18` }}>
                                    <Icon size={24} style={{ color: displayLoan.accentHex }} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{displayLoan.lenderName}</p>
                                    <p className="text-xs text-gray-400">Loan window and EMI summary</p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Outstanding</p>
                                <p className={`text-3xl font-bold tracking-tight ${overBudget ? "text-red-500" : "text-gray-900"}`}>
                                    {formatLoanAmount(displayLoan.outstanding)}
                                </p>
                                <p className="text-xs text-gray-400">of {formatLoanAmount(displayLoan.principal)} borrowed</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-400">
                                <span>Repayment progress</span>
                                <span className={overBudget ? "text-red-500" : "text-gray-500"}>{paidPct}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${paidPct}%`, backgroundColor: overBudget ? "#ef4444" : displayLoan.accentHex }} />
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Monthly EMI</p>
                                <p className="mt-2 text-lg font-bold text-gray-900">{displayLoan.status === "completed" ? "Rs. 0" : formatLoanAmount(displayLoan.emi)}</p>
                                <p className="text-xs text-gray-500">{displayLoan.status === "completed" ? "Fully repaid" : "Deducted every month"}</p>
                            </div>
                            <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Remaining</p>
                                <p className="mt-2 text-lg font-bold text-gray-900">
                                    {displayLoan.status === "completed" ? formatLoanDuration(displayLoan.timeValue, displayLoan.timeUnit) : `${remainingMonths} mo`}
                                </p>
                                <p className="text-xs text-gray-500">{displayLoan.status === "completed" ? "Tenure completed" : "Months left on schedule"}</p>
                            </div>
                        </div>

                        <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Note</p>
                            <p className="mt-2 text-sm leading-6 text-gray-600">{displayLoan.note ?? "No note added for this loan."}</p>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h3 className="text-base font-semibold text-gray-900">Loan details</h3>
                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Status</span>
                                <span className={`font-medium ${displayLoan.status === "completed" ? "text-[#00C950]" : displayLoan.status === "overdue" ? "text-red-500" : "text-blue-600"}`}>
                                    {displayLoan.status === "completed" ? "Paid Off" : displayLoan.status === "overdue" ? "Overdue" : "Active"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Interest rate</span>
                                <span className="font-medium text-gray-900">{displayLoan.interestRate}%</span>
                            </div>
                            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Repayment period</span>
                                <span className="font-medium text-gray-900">{formatLoanDuration(displayLoan.timeValue, displayLoan.timeUnit)}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">EMI amount</span>
                                <span className="font-medium text-gray-900">{formatLoanAmount(displayLoan.emi)}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Created</span>
                                <span className="font-medium text-gray-900">{new Date(displayLoan.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Next due</span>
                                <span className="font-medium text-gray-900">{displayLoan.nextDueDate}</span>
                            </div>
                        </div>

                        <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3">
                            <div className="flex items-start gap-2">
                                <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-500" />
                                <p className="text-xs leading-6 text-amber-700">
                                    EMI tracking stays linked to your budget plan. High-interest loans are the best place to prepay first when disposable income is tight.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">Repayment context</h3>
                            <p className="text-sm text-gray-500">How this loan affects your disposable budget</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500">
                            <Calendar size={13} className="text-[#00C950]" />
                            {displayLoan.timeValue} {displayLoan.timeUnit === "YEAR" ? "years" : "months"}
                        </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Principal</p>
                            <p className="mt-2 text-lg font-bold text-gray-900">{formatLoanAmount(displayLoan.principal)}</p>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Paid months</p>
                            <p className="mt-2 text-lg font-bold text-gray-900">{displayLoan.paidMonths}</p>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Remaining months</p>
                            <p className="mt-2 text-lg font-bold text-gray-900">{remainingMonths}</p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3">
                        <Info size={15} className="mt-0.5 shrink-0 text-blue-400" />
                        <p className="text-xs leading-relaxed text-blue-700">
                            <span className="font-semibold">Budget impact: </span>
                            This loan uses {formatLoanAmount(displayLoan.emi)} of monthly space. Your repayment strategy should keep the total EMI load below the safe threshold before adding new budgets.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                    <CheckCircle2 size={15} className={displayLoan.status === "completed" ? "text-[#00C950]" : "text-gray-300"} />
                    <p className="text-xs leading-relaxed text-gray-500">
                        {displayLoan.status === "completed"
                            ? "This loan is fully repaid."
                            : "Track payments carefully so this loan does not squeeze your monthly budget."}
                    </p>
                </div>
            </div>
        </>
    );
}