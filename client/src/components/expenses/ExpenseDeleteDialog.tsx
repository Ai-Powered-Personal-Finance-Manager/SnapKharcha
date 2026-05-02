"use client";

import { DeleteConfirmModal } from "../DeleteConfirmModal";

type ExpenseDeleteDialogProps = {
    open: boolean;
    expenseLabel: string;
    onClose: () => void;
    onConfirm: () => void;
    isPending?: boolean;
};

export const ExpenseDeleteDialog = ({
    open,
    expenseLabel,
    onClose,
    onConfirm,
    isPending,
}: ExpenseDeleteDialogProps) => {
    return (
        <DeleteConfirmModal
            open={open}
            title="Delete expense?"
            description={`This will permanently delete ${expenseLabel}.`}
            confirmLabel="Delete expense"
            onClose={onClose}
            onConfirm={onConfirm}
            isPending={isPending}
        />
    );
};
