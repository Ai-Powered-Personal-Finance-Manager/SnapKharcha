import {
    Banknote,
    Briefcase,
    Building2,
    CheckCircle2,
    Clock,
    Code2,
    Home,
    ShoppingBag,
    TrendingDown,
    TrendingUp,
    Youtube,
} from "lucide-react";
import type {
    CreateIncomeEntryPayload,
    CreateIncomeSourcePayload,
    IncomeApiEntry,
    IncomeApiSource,
    IncomeDisplayEntry,
    IncomeDisplaySource,
    IncomeFormStatus,
    IncomeFormType,
    IncomeSourceFormValues,
    IncomeSourceType,
    IncomeEntryFormValues,
    UpdateIncomeSourcePayload,
} from "@/src/types/income";
import { ElementType } from "react";

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

const paymentFallbackIcon = Banknote;

export const formatIncomeAmount = (value: number) => `₹${value.toLocaleString()}`;

export const formatIncomeDelta = (value: number) => {
    const prefix = value >= 0 ? "+" : "-";
    return `${prefix}₹${Math.abs(value).toLocaleString()}`;
};

export const formatCreditDay = (value?: number | null) => {
    if (!value) {
        return "—";
    }

    const suffix = value % 10 === 1 && value % 100 !== 11 ? "st" : value % 10 === 2 && value % 100 !== 12 ? "nd" : value % 10 === 3 && value % 100 !== 13 ? "rd" : "th";
    return `${value}${suffix}`;
};

export const formatIncomeDate = (value?: string | null) => {
    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

export const formatIncomeDateInput = (value?: string | null) => {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toISOString().slice(0, 10);
};

export const formatIncomeShortDate = (value?: string | null) => {
    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
    });
};

export const normalizeIncomeFormType = (value?: string | null): IncomeFormType => {
    return value?.toUpperCase() === "VARIABLE" ? "variable" : "fixed";
};

export const normalizeIncomeSourceType = (value?: string | null): IncomeSourceType => {
    return value?.toUpperCase() === "VARIABLE" ? "VARIABLE" : "FIXED";
};

export const normalizeIncomeStatus = (active?: boolean | null): IncomeFormStatus => {
    return active === false ? "pause" : "active";
};

export const splitIncomeDescription = (description?: string | null) => {
    if (!description) {
        return {
            company: "",
            position: "",
            note: "",
        };
    }

    const parts = description
        .split(/\s*(?:\u00b7|\|)\s*/)
        .map((part) => part.trim())
        .filter(Boolean);

    return {
        company: parts[0] ?? "",
        position: parts[1] ?? "",
        note: parts.slice(2).join(" · "),
    };
};

export const composeIncomeDescription = (company: string, position: string, note: string) => {
    return [company.trim(), position.trim(), note.trim()].filter(Boolean).join(" · ");
};

export const buildIncomeSourceFormValues = (source?: IncomeApiSource | null, defaultType: IncomeFormType = "fixed"): IncomeSourceFormValues => {
    const type = source ? normalizeIncomeFormType(source.sourceType) : defaultType;
    const descriptionParts = splitIncomeDescription(source?.description);

    return {
        type,
        source: source?.name ?? "",
        company: descriptionParts.company,
        position: descriptionParts.position,
        amount: source?.sourceType === "FIXED" ? String(source.amount ?? "") : "",
        status: normalizeIncomeStatus(source?.active),
        note: descriptionParts.note,
        creditDay: source?.sourceType === "FIXED" ? String(source.creditDay ?? 1) : "",
    };
};

export const buildIncomeEntryFormValues = (entry?: IncomeApiEntry | null): IncomeEntryFormValues => {
    return {
        amount: entry ? String(entry.amount) : "",
        note: entry?.note ?? "",
        date: formatIncomeDateInput(entry?.date ?? null),
    };
};

export const toIncomeSourcePayload = (values: IncomeSourceFormValues): CreateIncomeSourcePayload => {
    const isFixed = values.type === "fixed";
    const description = composeIncomeDescription(values.company, values.position, values.note);

    return {
        name: values.source.trim(),
        description: description ? description : undefined,
        sourceType: isFixed ? "FIXED" : "VARIABLE",
        amount: isFixed ? Number(values.amount) : null,
        creditDay: isFixed ? Number(values.creditDay) : null,
        active: values.status === "active",
    };
};

export const toIncomeSourceUpdatePayload = (values: IncomeSourceFormValues): UpdateIncomeSourcePayload => {
    return toIncomeSourcePayload(values);
};

export const toIncomeEntryPayload = (
    values: IncomeEntryFormValues,
    sourceId: string,
): CreateIncomeEntryPayload => {
    return {
        sourceId,
        amount: Number(values.amount),
        note: values.note.trim() ? values.note.trim() : undefined,
        date: new Date(`${values.date}T00:00:00`).toISOString(),
    };
};

const getIncomeTheme = (name: string, description: string | null, sourceType: IncomeSourceType) => {
    const normalizedText = `${name} ${description ?? ""}`.toLowerCase();
    const preset = incomeThemes.find((theme) => theme.match.some((keyword) => normalizedText.includes(keyword)));

    if (preset) {
        return preset;
    }

    if (sourceType === "VARIABLE") {
        return {
            icon: paymentFallbackIcon,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
            accentHex: "#f59e0b",
        };
    }

    return {
        icon: paymentFallbackIcon,
        iconBg: "bg-gray-100",
        iconColor: "text-gray-500",
        accentHex: "#94a3b8",
    };
};

export const toIncomeDisplayEntry = (entry: IncomeApiEntry): IncomeDisplayEntry => {
    return {
        ...entry,
        note: entry.note ?? null,
        displayDate: formatIncomeShortDate(entry.date),
    };
};

export const toIncomeDisplaySource = (source: IncomeApiSource): IncomeDisplaySource => {
    const theme = getIncomeTheme(source.name, source.description, source.sourceType);
    const isFixed = source.sourceType === "FIXED";
    const formType = isFixed ? "fixed" : "variable";
    const status = normalizeIncomeStatus(source.active);
    const descriptionParts = splitIncomeDescription(source.description);
    const latestEntries = (source.entries ?? []).slice(0, 3).map(toIncomeDisplayEntry);

    return {
        ...source,
        formType,
        status,
        company: descriptionParts.company,
        position: descriptionParts.position,
        sourceNote: descriptionParts.note,
        icon: theme.icon,
        iconBg: status === "pause" ? "bg-gray-100" : theme.iconBg,
        iconColor: status === "pause" ? "text-gray-400" : theme.iconColor,
        accentHex: status === "pause" ? "#cbd5e1" : theme.accentHex,
        currentMonthAmount: isFixed ? (source.active ? Number(source.amount ?? 0) : 0) : Number(source.thisMonth ?? 0),
        previousMonthAmount: isFixed ? Number(source.amount ?? 0) : Number(source.lastMonth ?? 0),
        statusLabel: status === "active" ? "Active" : "Paused",
        typeLabel: isFixed ? "Fixed" : "Variable",
        latestEntries,
    };
};

export const toIncomeHistoryMax = (history: Array<{ total: number }>) => {
    return Math.max(...history.map((point) => point.total), 1);
};

export const isIncomeSourceActive = (source: IncomeApiSource) => source.active;

export const getIncomeStatusIcon = (status: IncomeFormStatus): ElementType => {
    return status === "active" ? CheckCircle2 : Clock;
};

export const getIncomeDeltaIcon = (deltaPositive: boolean): ElementType => {
    return deltaPositive ? TrendingUp : TrendingDown;
};