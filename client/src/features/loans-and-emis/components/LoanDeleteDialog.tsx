"use client";

import { DeleteConfirmModal } from "@/src/components/DeleteConfirmModal";

type LoanDeleteDialogProps = {
    open: boolean;
    loanLabel: string;
    onClose: () => void;
    onConfirm: () => void;
    isPending?: boolean;
};

export const LoanDeleteDialog = ({
    open,
    loanLabel,
    onClose,
    onConfirm,
    isPending,
}: LoanDeleteDialogProps) => {
    return (
        <DeleteConfirmModal
            open={open}
            title="Delete loan?"
            description={`This will permanently delete ${loanLabel}.`}
            confirmLabel="Delete loan"
            onClose={onClose}
            onConfirm={onConfirm}
            isPending={isPending}
        />
    );
};
