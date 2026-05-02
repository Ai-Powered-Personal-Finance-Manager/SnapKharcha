import { Banknote, Car, CheckCircle2, Clock, GraduationCap, Home, AlertTriangle } from "lucide-react";
import type { ElementType } from "react";
import type { LoanApiItem, LoanDisplayItem, LoanFormValues, LoanStatus, LoanTimeUnit } from "@/src/types/loan";

const loanStatusConfig: Record<LoanStatus, { label: string; bg: string; text: string; icon: ElementType }> = {
    active: { label: "Active", bg: "bg-blue-50", text: "text-blue-500", icon: Clock },
    completed: { label: "Paid Off", bg: "bg-[#00C950]/8", text: "text-[#00C950]", icon: CheckCircle2 },
    overdue: { label: "Overdue", bg: "bg-red-50", text: "text-red-500", icon: AlertTriangle },
};

const loanThemes = [
    { match: ["home"], icon: Home, iconBg: "bg-blue-50", iconColor: "text-blue-500", accentHex: "#3b82f6" },
    { match: ["car", "auto"], icon: Car, iconBg: "bg-amber-50", iconColor: "text-amber-600", accentHex: "#f59e0b" },
    { match: ["education", "student"], icon: GraduationCap, iconBg: "bg-[#00C950]/8", iconColor: "text-[#00C950]", accentHex: "#00C950" },
    { match: ["personal"], icon: Banknote, iconBg: "bg-orange-50", iconColor: "text-orange-500", accentHex: "#f97316" },
] as const;

export const formatLoanAmount = (value: number) => `Rs. ${value.toLocaleString()}`;

export const loanAmountToMonths = (value: number, unit: LoanTimeUnit) => {
    if (unit === "YEAR") {
        return value * 12;
    }

    return value;
};

export const formatLoanDuration = (value: number, unit: LoanTimeUnit) => {
    return unit === "YEAR" ? `${value} yr` : `${value} mo`;
};

export const normalizeLoanStatus = (status?: string | null): LoanStatus => {
    const normalized = status?.trim().toUpperCase();

    if (normalized === "PAID" || normalized === "PAID OFF" || normalized === "COMPLETED") {
        return "completed";
    }

    if (normalized === "OVERDUE") {
        return "overdue";
    }

    return "active";
};

export const toLoanApiStatus = (status: LoanStatus) => {
    return status === "completed" ? "PAID" : "ACTIVE";
};

export const buildLoanFormValues = (loan?: LoanApiItem | null): LoanFormValues => {
    const normalizedStatus = normalizeLoanStatus(loan?.status);

    return {
        name: loan?.name ?? "",
        lenderName: loan?.lenderName ?? "",
        interestRate: loan ? String(loan.interestRate) : "",
        timeValue: loan ? String(loan.timeValue) : "",
        timeUnit: loan?.timeUnit ?? "YEAR",
        amount: loan ? String(loan.amount) : "",
        emiAmount: loan ? String(loan.emiAmount) : "",
        note: loan?.note ?? "",
        status: normalizedStatus === "completed" ? "completed" : "active",
    };
};

export const getLoanTheme = (loanName: string, status: LoanStatus = "active") => {
    const normalizedName = loanName.toLowerCase();
    const preset = loanThemes.find((theme) => theme.match.some((keyword) => normalizedName.includes(keyword)));

    if (preset) {
        return preset;
    }

    if (status === "completed") {
        return {
            icon: Banknote,
            iconBg: "bg-[#00C950]/8",
            iconColor: "text-[#00C950]",
            accentHex: "#00C950",
        };
    }

    if (status === "overdue") {
        return {
            icon: Banknote,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
            accentHex: "#ef4444",
        };
    }

    return {
        icon: Banknote,
        iconBg: "bg-gray-100",
        iconColor: "text-gray-500",
        accentHex: "#94a3b8",
    };
};

export const toLoanDisplayItem = (loan: LoanApiItem): LoanDisplayItem => {
    const normalizedStatus = normalizeLoanStatus(loan.status);
    const theme = getLoanTheme(loan.name, normalizedStatus);
    const tenureMonths = loan.tenureMonths ?? loanAmountToMonths(loan.timeValue, loan.timeUnit);
    const paidMonths = loan.paidMonths ?? (normalizedStatus === "completed" ? tenureMonths : 0);

    return {
        ...loan,
        status: normalizedStatus,
        icon: theme.icon,
        iconBg: theme.iconBg,
        iconColor: theme.iconColor,
        accentHex: theme.accentHex,
        principal: loan.amount,
        outstanding: loan.outstandingAmount ?? (normalizedStatus === "completed" ? 0 : loan.amount),
        emi: loan.emiAmount,
        paidMonths,
        tenureMonths,
        nextDueDate: loan.nextDueDate ?? "—",
    };
};

export const loanStatusMeta = loanStatusConfig;