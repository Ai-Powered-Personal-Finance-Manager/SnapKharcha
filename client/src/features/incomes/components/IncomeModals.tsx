"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Plus, X } from "lucide-react";
import type { IncomeDisplaySource, IncomeFormType, IncomeSourceFormValues } from "@/src/features/incomes/types";
import { buildIncomeSourceFormValues, formatCreditDay, formatIncomeAmount } from "@/src/utils/income";

type IncomeSourceFormModalProps = {
    open: boolean;
    mode: "create" | "edit";
    defaultType?: IncomeFormType;
    initialSource?: IncomeDisplaySource | null;
    onClose: () => void;
    onSubmit: (values: IncomeSourceFormValues) => void;
    isPending?: boolean;
};

type IncomeDeleteDialogProps = {
    open: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    onClose: () => void;
    onConfirm: () => void;
    isPending?: boolean;
};

export const IncomeSourceFormModal = ({
    open,
    mode,
    defaultType = "fixed",
    initialSource,
    onClose,
    onSubmit,
    isPending,
}: IncomeSourceFormModalProps) => {
    const [formState, setFormState] = useState<IncomeSourceFormValues>(() =>
        buildIncomeSourceFormValues(initialSource, defaultType)
    );

    useEffect(() => {
        if (open) setFormState(buildIncomeSourceFormValues(initialSource, defaultType));
    }, [defaultType, initialSource, open]);

    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose, open]);

    if (!open) return null;

    const parsedAmount = Number(formState.amount);
    const parsedCreditDay = Number(formState.creditDay);
    const isFixed = formState.type === "fixed";
    const isCreate = mode === "create";

    const canSubmit =
        formState.source.trim().length > 0 &&
        formState.company.trim().length > 0 &&
        formState.position.trim().length > 0 &&
        (isFixed
            ? Number.isFinite(parsedAmount) && parsedAmount > 0 &&
              Number.isFinite(parsedCreditDay) && parsedCreditDay >= 1 && parsedCreditDay <= 31
            : true);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!canSubmit) return;
        onSubmit({
            ...formState,
            source: formState.source.trim(),
            company: formState.company.trim(),
            position: formState.position.trim(),
            amount: formState.amount.trim(),
            note: formState.note.trim(),
            creditDay: formState.creditDay.trim(),
        });
    };

    const inputCls = "h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15";
    const selectCls = `${inputCls} appearance-none`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <div
                className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/20"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 border-b border-gray-50 px-6 pb-4 pt-6">
                    <div>
                        <h3 className="text-base font-bold text-gray-900">
                            {mode === "edit" ? "Edit Income Source" : "Add Income Source"}
                        </h3>
                        <p className="mt-0.5 text-xs text-gray-400">
                            {isCreate
                                ? "Create a fixed or variable income source."
                                : "Update the source details below."}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
                        aria-label="Close modal"
                    >
                        <X size={15} />
                    </button>
                </div>

                <form className="space-y-4 px-6 py-5" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">

                        {/* Type */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold text-gray-500">Type</label>
                            <select
                                value={formState.type}
                                onChange={(e) => setFormState((f) => ({
                                    ...f,
                                    type: e.target.value as IncomeFormType,
                                    amount: "",
                                    creditDay: "",
                                }))}
                                disabled={mode === "edit"}
                                className={selectCls}
                            >
                                <option value="fixed">Fixed</option>
                                <option value="variable">Variable</option>
                            </select>
                        </div>

                        {/* Source */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold text-gray-500">Source</label>
                            <input
                                value={formState.source}
                                onChange={(e) => setFormState((f) => ({ ...f, source: e.target.value }))}
                                placeholder="Primary Salary"
                                className={inputCls}
                            />
                        </div>

                        {/* Company */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500">Company</label>
                            <input
                                value={formState.company}
                                onChange={(e) => setFormState((f) => ({ ...f, company: e.target.value }))}
                                placeholder="Infosys"
                                className={inputCls}
                            />
                        </div>

                        {/* Position */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500">Position</label>
                            <input
                                value={formState.position}
                                onChange={(e) => setFormState((f) => ({ ...f, position: e.target.value }))}
                                placeholder="Software Engineer"
                                className={inputCls}
                            />
                        </div>

                        {/* Amount */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500">Amount</label>
                            <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 transition-colors focus-within:border-[#00C950] focus-within:ring-2 focus-within:ring-[#00C950]/15">
                                <span className="text-sm font-semibold text-gray-400">Rs.</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={formState.amount}
                                    onChange={(e) => setFormState((f) => ({ ...f, amount: e.target.value }))}
                                    className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                    placeholder="50000"
                                />
                            </div>
                            <p className="text-[10px] text-gray-400">
                                {isFixed
                                    ? "Fixed monthly amount for this source."
                                    : "Optional for variable sources."}
                            </p>
                        </div>

                        {/* Status */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500">Status</label>
                            <select
                                value={formState.status}
                                onChange={(e) => setFormState((f) => ({ ...f, status: e.target.value as IncomeSourceFormValues["status"] }))}
                                className={selectCls}
                            >
                                <option value="active">Active</option>
                                <option value="pause">Paused</option>
                            </select>
                        </div>

                        {/* Credit Day */}
                        {isFixed ? (
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500">Credit Day</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="31"
                                    value={formState.creditDay}
                                    onChange={(e) => setFormState((f) => ({ ...f, creditDay: e.target.value }))}
                                    className={inputCls}
                                    placeholder="1–31"
                                />
                            </div>
                        ) : (
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500">Credit Day</label>
                                <div className="flex h-11 items-center rounded-xl border border-gray-200 bg-gray-50 px-3 text-xs text-gray-400">
                                    Variable sources use entries instead of a fixed credit day.
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Note */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500">Note</label>
                        <textarea
                            rows={4}
                            value={formState.note}
                            onChange={(e) => setFormState((f) => ({ ...f, note: e.target.value }))}
                            placeholder="Add a short note about this income source"
                            className="flex min-h-24 w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15"
                        />
                    </div>

                    {/* Preview */}
                    <div className="rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-3 text-xs text-gray-500">
                        {isFixed ? (
                            <>Monthly impact preview: {formatIncomeAmount(parsedAmount || 0)} credits on {formatCreditDay(parsedCreditDay)}.</>
                        ) : (
                            <>Variable income can be logged as entries later.</>
                        )}
                    </div>

                    {/* Actions */}
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
                                <><Loader2 size={14} className="animate-spin" />{mode === "edit" ? "Saving..." : "Adding..."}</>
                            ) : mode === "edit" ? "Save changes" : (
                                <><Plus size={14} />Add Source</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const IncomeDeleteDialog = ({
    open,
    title,
    message,
    confirmLabel,
    onClose,
    onConfirm,
    isPending,
}: IncomeDeleteDialogProps) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[1px]"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                        <X size={18} />
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Close delete dialog"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 py-6">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">{message}</p>

                    <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isPending}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isPending ? (
                                <><Loader2 size={14} className="animate-spin" />Deleting...</>
                            ) : confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};