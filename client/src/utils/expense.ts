import type { ExpenseListItem, ExpenseFormValues, ExpensePaymentMethod } from "@/src/features/expenses/types";

const paymentMethodLabels: Record<ExpensePaymentMethod, string> = {
    BANK: "Bank",
    WALLET: "Wallet",
    CASH: "Cash",
};

export const expensePaymentMethodOptions = [
    { value: "BANK" as const, label: "Bank" },
    { value: "WALLET" as const, label: "Wallet" },
    { value: "CASH" as const, label: "Cash" },
] as const;

const toLocalDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return date;
};

export const getExpenseDateKey = (value?: string | null) => {
    if (!value) {
        return "unknown-date";
    }

    const date = toLocalDate(value);

    if (!date) {
        return "unknown-date";
    }

    return date.toISOString().slice(0, 10);
};

const isSameDay = (left: Date, right: Date) => {
    return (
        left.getFullYear() === right.getFullYear() &&
        left.getMonth() === right.getMonth() &&
        left.getDate() === right.getDate()
    );
};

export const toDateInputValue = (value?: string | null) => {
    if (!value) {
        return "";
    }

    const date = toLocalDate(value);

    if (!date) {
        return "";
    }

    return date.toISOString().slice(0, 10);
};

export const formatExpensePaymentMethod = (value?: string | null) => {
    if (!value) {
        return "Not set";
    }

    return paymentMethodLabels[value as ExpensePaymentMethod] ?? value;
};

export const formatExpenseDate = (value?: string | null) => {
    if (!value) {
        return "Not set";
    }

    const date = toLocalDate(value);

    if (!date) {
        return "Not set";
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

export const formatExpenseTime = (value?: string | null) => {
    if (!value) {
        return "";
    }

    const date = toLocalDate(value);

    if (!date) {
        return "";
    }

    return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatExpenseGroupLabel = (value?: string | null) => {
    if (!value) {
        return "Unknown date";
    }

    const date = toLocalDate(value);

    if (!date) {
        return "Unknown date";
    }

    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    if (isSameDay(date, now)) {
        return "Today";
    }

    if (isSameDay(date, yesterday)) {
        return "Yesterday";
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
    });
};

export const buildExpenseFormValues = (expense?: ExpenseListItem | null): ExpenseFormValues => {
    return {
        amount: expense ? String(expense.amount) : "",
        merchant: expense?.merchant ?? "",
        note: expense?.note ?? "",
        budgetId: expense?.budgetId ?? "",
        paymentMethod: (expense?.paymentMethod as ExpensePaymentMethod) ?? "BANK",
        date: toDateInputValue(expense?.date ?? expense?.createdAt ?? null),
    };
};