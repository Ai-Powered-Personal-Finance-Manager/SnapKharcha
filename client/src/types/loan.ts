import type { ElementType } from "react";

export type LoanStatus = "active" | "completed" | "overdue";

export type LoanTimeUnit = "MONTH" | "YEAR";

export interface LoanApiItem {
    id: string;
    name: string;
    lenderName: string;
    interestRate: number;
    timeValue: number;
    timeUnit: LoanTimeUnit;
    amount: number;
    emiAmount: number;
    note: string | null;
    status: LoanStatus;
    userId: string;
    createdAt: string;
    updatedAt?: string;
    outstandingAmount?: number | null;
    paidMonths?: number | null;
    tenureMonths?: number | null;
    nextDueDate?: string | null;
}

export interface LoanDisplayItem extends LoanApiItem {
    icon: ElementType;
    iconBg: string;
    iconColor: string;
    accentHex: string;
    principal: number;
    outstanding: number;
    emi: number;
    paidMonths: number;
    tenureMonths: number;
    nextDueDate: string;
}

export interface LoanApiListResponse {
    success: boolean;
    message?: string;
    data: LoanApiItem[];
}

export interface LoanMutationResponse {
    success: boolean;
    message: string;
    data?: LoanApiItem;
}

export interface DeleteLoanResponse {
    success: boolean;
    message: string;
}

export type LoanFormValues = {
    name: string;
    lenderName: string;
    interestRate: string;
    timeValue: string;
    timeUnit: LoanTimeUnit;
    amount: string;
    emiAmount: string;
    note: string;
    status: LoanStatus;
};

export type CreateLoanPayload = {
    name: string;
    lenderName: string;
    interestRate: number;
    timeValue: number;
    timeUnit: LoanTimeUnit;
    amount: number;
    emiAmount: number;
    note?: string;
    status: LoanStatus;
};

export type UpdateLoanPayload = Partial<CreateLoanPayload>;