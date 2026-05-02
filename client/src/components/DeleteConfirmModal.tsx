"use client";

import { Loader2, Trash2, X } from "lucide-react";
import { useEffect } from "react";

type DeleteConfirmModalProps = {
    open: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    onClose: () => void;
    onConfirm: () => void;
    isPending?: boolean;
};

export const DeleteConfirmModal = ({
    open,
    title,
    description,
    confirmLabel,
    onClose,
    onConfirm,
    isPending,
}: DeleteConfirmModalProps) => {
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
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[1px]"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                        <Trash2 size={18} />
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                        aria-label={`Close ${title.toLowerCase()}`}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 py-6">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>

                    <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isPending}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                confirmLabel
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};