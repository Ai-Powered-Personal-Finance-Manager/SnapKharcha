import {
    Banknote,
    Briefcase,
    Building2,
    CheckCircle2,
    Clock,
    Home,
    ShoppingBag,
    TrendingDown,
    TrendingUp,
    Youtube,
} from "lucide-react";
import type {
    CreateIncomeSourcePayload,
    IncomeApiSource,
    IncomeDisplaySource,
    IncomeFormStatus,
    IncomeFormType,
    IncomeSourceFormValues,
} from "@/src/features/incomes/types";
import type { ElementType } from "react";

const incomeThemes = [
    {
        match: ["salary", "primary", "income", "office"],
        icon: Building2,
        iconBg: "bg-[#00C950]/8",
        iconColor: "text-[#00C950]",
        accentHex: "#00C950",
    },
    {
        match: ["consult", "freelance", "developer", "code"],
        icon: Briefcase,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        accentHex: "#3b82f6",
    },
    {
        match: ["youtube", "content", "adsense"],
        icon: Youtube,
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
        accentHex: "#ef4444",
    },
    {
        match: ["resell", "shop", "sales", "store"],
        icon: ShoppingBag,
        iconBg: "bg-pink-50",
        iconColor: "text-pink-500",
        accentHex: "#ec4899",
    },
    {
        match: ["rent", "rental"],
        icon: Home,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-500",
        accentHex: "#8b5cf6",
    },
] as const;

// ─── Formatters ───────────────────────────────────────────────────────────────

export const formatIncomeAmount = (value: number) =>
    `Rs.${value.toLocaleString("en-IN")}`;

export const formatIncomeDelta = (value: number) => {
    const prefix = value >= 0 ? "+" : "-";
    return `${prefix}Rs.${Math.abs(value).toLocaleString("en-IN")}`;
};

export const formatCreditDay = (value?: number | null) => {
    if (!value) return "—";
    const suffix =
        value % 10 === 1 && value % 100 !== 11 ? "st" :
        value % 10 === 2 && value % 100 !== 12 ? "nd" :
        value % 10 === 3 && value % 100 !== 13 ? "rd" : "th";
    return `${value}${suffix}`;
};

export const formatIncomeDate = (value?: string | null) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
    });
};

export const formatIncomeDateInput = (value?: string | null) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
};

// ─── Normalizers ──────────────────────────────────────────────────────────────

export const toFormType = (type: string): IncomeFormType =>
    type === "VARIABLE" ? "variable" : "fixed";

export const toFormStatus = (status: string): IncomeFormStatus =>
    status === "ACTIVE" ? "active" : "pause";

export const toApiStatus = (status: IncomeFormStatus): "ACTIVE" | "PAUSED" =>
    status === "active" ? "ACTIVE" : "PAUSED";

// ─── Form Builder ─────────────────────────────────────────────────────────────

export const buildIncomeSourceFormValues = (
    source?: IncomeApiSource | null,
    defaultType: IncomeFormType = "fixed",
): IncomeSourceFormValues => ({
    type: source ? toFormType(source.type) : defaultType,
    source: source?.source ?? "",
    company: source?.company ?? "",
    position: source?.position ?? "",
    amount: source ? String(source.amount ?? "") : "",
    status: source ? toFormStatus(source.status) : "active",
    note: source?.note ?? "",
    creditDay: source?.creditDay ? String(source.creditDay) : "",
});

// ─── Payload Builder ──────────────────────────────────────────────────────────

export const toIncomeSourcePayload = (values: IncomeSourceFormValues): CreateIncomeSourcePayload => {
    const isFixed = values.type === "fixed";

    return {
        source: values.source.trim(),
        company: values.company.trim(),
        position: values.position.trim(),
        status: toApiStatus(values.status),
        type: isFixed ? "FIXED" : "VARIABLE",
        amount: Number(values.amount) || 0,
        ...(values.note.trim() && { note: values.note.trim() }),
        ...(isFixed && { creditDay: Number(values.creditDay) }),
    };
};

// ─── Theme ────────────────────────────────────────────────────────────────────

const getIncomeTheme = (source: string, company: string, type: string) => {
    const text = `${source} ${company}`.toLowerCase();
    const preset = incomeThemes.find((t) => t.match.some((kw) => text.includes(kw)));

    if (preset) return preset;

    return type === "VARIABLE"
        ? { icon: Banknote, iconBg: "bg-amber-50", iconColor: "text-amber-600", accentHex: "#f59e0b" }
        : { icon: Banknote, iconBg: "bg-gray-100", iconColor: "text-gray-500", accentHex: "#94a3b8" };
};

// ─── Display Mapper ───────────────────────────────────────────────────────────

export const toIncomeDisplaySource = (source: IncomeApiSource): IncomeDisplaySource => {
    const theme = getIncomeTheme(source.source, source.company, source.type);
    const formStatus = toFormStatus(source.status);
    const isPaused = formStatus === "pause";

    return {
        ...source,
        formType: toFormType(source.type),
        formStatus,
        icon: theme.icon,
        iconBg: isPaused ? "bg-gray-100" : theme.iconBg,
        iconColor: isPaused ? "text-gray-400" : theme.iconColor,
        accentHex: isPaused ? "#cbd5e1" : theme.accentHex,
        statusLabel: source.status === "ACTIVE" ? "Active" : "Paused",
        typeLabel: source.type === "FIXED" ? "Fixed" : "Variable",
        creditDayLabel: formatCreditDay(source.creditDay),
    };
};

export const getIncomeStatusIcon = (status: IncomeFormStatus): ElementType =>
    status === "active" ? CheckCircle2 : Clock;

export const getIncomeDeltaIcon = (positive: boolean): ElementType =>
    positive ? TrendingUp : TrendingDown;