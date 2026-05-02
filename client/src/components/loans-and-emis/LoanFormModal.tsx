"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ChevronDown, Loader2, X } from "lucide-react";
import type { LoanApiItem, LoanFormValues } from "@/src/types/loan";
import { buildLoanFormValues, formatLoanAmount } from "@/src/utils/loan";

type LoanFormModalProps = {
    open: boolean;
    mode: "create" | "edit";
    initialLoan?: LoanApiItem | null;
    onClose: () => void;
    onSubmit: (values: LoanFormValues) => void;
    isPending?: boolean;
};

export const LoanFormModal = ({
    open,
    mode,
    initialLoan,
    onClose,
    onSubmit,
    isPending,
}: LoanFormModalProps) => {
    const [formState, setFormState] = useState<LoanFormValues>(() => buildLoanFormValues(initialLoan));

    useEffect(() => {
        if (!open) {
            return;
        }

        setFormState(buildLoanFormValues(initialLoan));
    }, [initialLoan, open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, open]);

    if (!open) {
        return null;
    }

    const parsedAmount = Number(formState.amount);
    const parsedEmiAmount = Number(formState.emiAmount);
    const parsedInterestRate = Number(formState.interestRate);
    const parsedTimeValue = Number(formState.timeValue);

    const canSubmit =
        formState.name.trim().length > 0 &&
        formState.lenderName.trim().length > 0 &&
        Number.isFinite(parsedAmount) &&
        parsedAmount > 0 &&
        Number.isFinite(parsedEmiAmount) &&
        parsedEmiAmount >= 0 &&
        Number.isFinite(parsedInterestRate) &&
        parsedInterestRate >= 0 &&
        Number.isFinite(parsedTimeValue) &&
        parsedTimeValue > 0;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!canSubmit) {
            return;
        }

        onSubmit({
            ...formState,
            name: formState.name.trim(),
            lenderName: formState.lenderName.trim(),
            amount: String(parsedAmount),
            emiAmount: String(parsedEmiAmount),
            interestRate: String(parsedInterestRate),
            timeValue: String(parsedTimeValue),
            note: formState.note.trim(),
        });
    };

    const title = mode === "edit" ? "Edit Loan" : "Add Loan";
    const description =
        mode === "edit"
            ? "Update the loan name, lender, EMI details, or repayment status."
            : "Add a new loan and keep EMI impact visible in your budgets.";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <div
                className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/20"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 border-b border-gray-50 px-6 pb-4 pt-6">
                    <div>
                        <h3 className="text-base font-bold text-gray-900">{title}</h3>
                        <p className="mt-0.5 text-xs text-gray-400">{description}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
                        aria-label="Close loan modal"
                    >
                        <X size={15} />
                    </button>
                </div>

                <form className="space-y-4 px-6 py-5" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold text-gray-500">Loan name</label>
                            <input
                                value={formState.name}
                                onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                                placeholder="Home Loan"
                                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15"
                            />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold text-gray-500">Lender name</label>
                            <input
                                value={formState.lenderName}
                                onChange={(event) => setFormState((current) => ({ ...current, lenderName: event.target.value }))}
                                placeholder="XYZ Bank"
                                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500">Loan amount</label>
                            <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 transition-colors focus-within:border-[#00C950] focus-within:ring-2 focus-within:ring-[#00C950]/15">
                                <span className="text-sm font-semibold text-gray-400">Rs.</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={formState.amount}
                                    onChange={(event) => setFormState((current) => ({ ...current, amount: event.target.value }))}
                                    className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500">EMI amount</label>
                            <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 transition-colors focus-within:border-[#00C950] focus-within:ring-2 focus-within:ring-[#00C950]/15">
                                <span className="text-sm font-semibold text-gray-400">Rs.</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={formState.emiAmount}
                                    onChange={(event) => setFormState((current) => ({ ...current, emiAmount: event.target.value }))}
                                    className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500">Interest rate</label>
                            <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 transition-colors focus-within:border-[#00C950] focus-within:ring-2 focus-within:ring-[#00C950]/15">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formState.interestRate}
                                    onChange={(event) => setFormState((current) => ({ ...current, interestRate: event.target.value }))}
                                    className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                />
                                <span className="text-sm font-semibold text-gray-400">%</span>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500">Repayment period</label>
                            <div className="grid grid-cols-[1fr_110px] gap-2">
                                <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={formState.timeValue}
                                    onChange={(event) => setFormState((current) => ({ ...current, timeValue: event.target.value }))}
                                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15"
                                />
                                <div className="relative">
                                    <select
                                        value={formState.timeUnit}
                                        onChange={(event) =>
                                            setFormState((current) => ({
                                                ...current,
                                                timeUnit: event.target.value as LoanFormValues["timeUnit"],
                                            }))
                                        }
                                        className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 pr-8 text-sm text-gray-900 outline-none transition-colors focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15"
                                    >
                                        <option value="MONTH">Months</option>
                                        <option value="YEAR">Years</option>
                                    </select>
                                    <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500">Status</label>
                            <div className="relative">
                                <select
                                    value={formState.status}
                                    onChange={(event) =>
                                        setFormState((current) => ({
                                            ...current,
                                            status: event.target.value as LoanFormValues["status"],
                                        }))
                                    }
                                    className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 pr-8 text-sm text-gray-900 outline-none transition-colors focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15"
                                >
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500">Note</label>
                        <textarea
                            rows={4}
                            value={formState.note}
                            onChange={(event) => setFormState((current) => ({ ...current, note: event.target.value }))}
                            placeholder="Add a short note about this loan"
                            className="flex min-h-24 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15"
                        />
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-3 text-xs text-gray-500">
                        EMI preview will affect your budgets by {formatLoanAmount(parsedEmiAmount || 0)} per month.
                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!canSubmit || isPending}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#00C950] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#00b848] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" />
                                    {mode === "edit" ? "Saving..." : "Adding..."}
                                </>
                            ) : mode === "edit" ? (
                                "Save changes"
                            ) : (
                                "Add Loan"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};