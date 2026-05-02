import type { ElementType } from "react";

export type IncomeFormType = "fixed" | "variable";
export type IncomeFormStatus = "active" | "pause";
export type IncomeSourceType = "FIXED" | "VARIABLE";

export interface IncomeApiEntry {
    id: string;
    amount: number;
    note: string | null;
    date: string;
    sourceId: string;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IncomeApiSource {
    id: string;
    name: string;
    description: string | null;
    sourceType: IncomeSourceType;
    amount: number | null;
    creditDay: number | null;
    active: boolean;
    userId: string;
    createdAt: string;
    updatedAt?: string;
    entries: IncomeApiEntry[];
    thisMonth?: number;
    lastMonth?: number;
    entryCount?: number;
}

export interface IncomeSummary {
    totalMonthlyIncome: number;
    fixedIncome: number;
    variableIncome: number;
    lastMonthIncome: number;
    delta: number;
    deltaPositive: boolean;
    fixedActiveCount: number;
    fixedPausedCount: number;
    variableSourceCount: number;
    entryCount: number;
}

export interface IncomeHistoryPoint {
    key: string;
    label: string;
    total: number;
    fixed: number;
    variable: number;
    isCurrent: boolean;
}

export interface IncomeApiListData {
    fixedSources: IncomeApiSource[];
    variableSources: IncomeApiSource[];
    summary: IncomeSummary;
    history: IncomeHistoryPoint[];
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

export interface IncomeEntryMutationResponse {
    success: boolean;
    message: string;
    data?: IncomeApiEntry;
}

export interface DeleteIncomeResponse {
    success: boolean;
    message: string;
}

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

export type IncomeEntryFormValues = {
    amount: string;
    note: string;
    date: string;
};

export type CreateIncomeSourcePayload = {
    name: string;
    description?: string;
    sourceType: IncomeSourceType;
    amount?: number | null;
    creditDay?: number | null;
    active: boolean;
};

export type UpdateIncomeSourcePayload = Partial<CreateIncomeSourcePayload>;

export type CreateIncomeEntryPayload = {
    sourceId: string;
    amount: number;
    note?: string;
    date: string;
};

export type UpdateIncomeEntryPayload = Partial<Omit<CreateIncomeEntryPayload, "sourceId">>;

export interface IncomeDisplayEntry extends IncomeApiEntry {
    displayDate: string;
}

export interface IncomeDisplaySource extends IncomeApiSource {
    formType: IncomeFormType;
    status: IncomeFormStatus;
    company: string;
    position: string;
    sourceNote: string;
    icon: ElementType;
    iconBg: string;
    iconColor: string;
    accentHex: string;
    currentMonthAmount: number;
    previousMonthAmount: number;
    statusLabel: string;
    typeLabel: string;
    latestEntries: IncomeDisplayEntry[];
}