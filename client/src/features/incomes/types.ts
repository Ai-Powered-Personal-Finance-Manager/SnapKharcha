import type { ElementType } from "react";

// ─── Enums ────────────────────────────────────────────────────────────────────

export type IncomeSourceType = "FIXED" | "VARIABLE";
export type IncomeFormType = "fixed" | "variable";
export type IncomeFormStatus = "active" | "pause";

// ─── API Models ───────────────────────────────────────────────────────────────

export interface IncomeApiSource {
    id: string;
    source: string;
    company: string;
    position: string;
    note?: string | null;
    status: "ACTIVE" | "PAUSED";
    type: IncomeSourceType;
    amount: number;
    creditDay?: number | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface IncomeSummary {
    totalIncome: number;
    fixedIncome: number;
    variableIncome: number;
    activeIncome: number;
    endedIncome: number;
}

export interface IncomeApiListData {
    incomes: IncomeApiSource[];
    summary: IncomeSummary;
}

export interface IncomeApiListResponse {
    success: boolean;
    message?: string;
    data: IncomeApiListData;
}

export interface IncomeSourceMutationResponse {
    success: boolean;
    message: string;
    data?: IncomeApiSource;
}

export interface DeleteIncomeResponse {
    success: boolean;
    message: string;
}

// ─── Payloads ─────────────────────────────────────────────────────────────────

export type CreateIncomeSourcePayload = {
    source: string;
    company: string;
    position: string;
    note?: string;
    status: "ACTIVE" | "PAUSED";
    type: IncomeSourceType;
    amount: number;
    creditDay?: number | null;
};

export type UpdateIncomeSourcePayload = Partial<CreateIncomeSourcePayload>;

// ─── Form Values ──────────────────────────────────────────────────────────────

export type IncomeSourceFormValues = {
    type: IncomeFormType;
    source: string;
    company: string;
    position: string;
    amount: string;
    status: IncomeFormStatus;
    note: string;
    creditDay: string;
};

// ─── Display Models ───────────────────────────────────────────────────────────

export interface IncomeDisplaySource extends IncomeApiSource {
    formType: IncomeFormType;
    formStatus: IncomeFormStatus;
    icon: ElementType;
    iconBg: string;
    iconColor: string;
    accentHex: string;
    statusLabel: string;
    typeLabel: string;
    creditDayLabel: string;
}
