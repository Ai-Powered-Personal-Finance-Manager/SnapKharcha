"use client";

import { useMemo, useState, type CSSProperties, type ComponentType } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info, Utensils, ShoppingBag, Car, Zap, Wifi, Heart, BookOpen, Dumbbell, ShoppingCart, Plane, Pencil, Gamepad2, Coffee, Bus, Scissors, Gift, Home, Music, Shirt, Baby, PawPrint, Wrench, Sparkles } from "lucide-react";
import { useCreateCategory, useGetCategories } from "@/src/hooks/budgets/useCategories";
import { useCreateBudget, useGetBudgets } from "@/src/hooks/budgets/useBudgets";
import type { BudgetApiItem } from "@/src/types/budget";
import { BudgetCategoryStep } from "@/src/components/budgets/create-budget/BudgetCategoryStep";
import { BudgetNameStep } from "@/src/components/budgets/create-budget/BudgetNameStep";
import { BudgetAmountPeriodStep } from "@/src/components/budgets/create-budget/BudgetAmountPeriodStep";
import { BudgetAlertStep } from "@/src/components/budgets/create-budget/BudgetAlertStep";
import { BudgetNotesStep } from "@/src/components/budgets/create-budget/BudgetNotesStep";
import { BudgetPreviewSidebar } from "@/src/components/budgets/create-budget/BudgetPreviewSidebar";
import type { BudgetCategoryOption, BudgetPeriod, CategoryMap } from "@/src/components/budgets/create-budget/types";
import { PageHeader } from "@/src/components/PageHeader";
import { tr } from "zod/locales";

const iconMap: Record<string, ComponentType<{ size?: number; className?: string; style?: CSSProperties }>> = {
    food: Utensils,
    groceries: ShoppingCart,
    shopping: ShoppingBag,
    transport: Car,
    utilities: Zap,
    subscriptions: Wifi,
    health: Heart,
    education: BookOpen,
    gym: Dumbbell,
    travel: Plane,
    entertainment: Gamepad2,
    coffee: Coffee,
    publictravel: Bus,
    salon: Scissors,
    gifts: Gift,
    rent: Home,
    music: Music,
    clothing: Shirt,
    kids: Baby,
    pets: PawPrint,
    stationery: Pencil,
    repairs: Wrench,
};

const colorPalette: Record<string, { hex: string; bg: string; text: string }> = {
    "#f97316": { hex: "#f97316", bg: "bg-orange-50", text: "text-orange-500" },
    "#84cc16": { hex: "#84cc16", bg: "bg-lime-50", text: "text-lime-600" },
    "#f59e0b": { hex: "#f59e0b", bg: "bg-yellow-50", text: "text-yellow-600" },
    "#3b82f6": { hex: "#3b82f6", bg: "bg-blue-50", text: "text-blue-500" },
    "#8b5cf6": { hex: "#8b5cf6", bg: "bg-purple-50", text: "text-purple-500" },
    "#ec4899": { hex: "#ec4899", bg: "bg-pink-50", text: "text-pink-500" },
    "#14b8a6": { hex: "#14b8a6", bg: "bg-teal-50", text: "text-teal-500" },
    "#6366f1": { hex: "#6366f1", bg: "bg-indigo-50", text: "text-indigo-500" },
    "#22c55e": { hex: "#22c55e", bg: "bg-green-50", text: "text-green-600" },
    "#0ea5e9": { hex: "#0ea5e9", bg: "bg-sky-50", text: "text-sky-500" },
    "#a855f7": { hex: "#a855f7", bg: "bg-violet-50", text: "text-violet-500" },
    "#d97706": { hex: "#d97706", bg: "bg-amber-50", text: "text-amber-600" },
    "#0891b2": { hex: "#0891b2", bg: "bg-cyan-50", text: "text-cyan-600" },
    "#be185d": { hex: "#be185d", bg: "bg-rose-50", text: "text-rose-600" },
    "#7c3aed": { hex: "#7c3aed", bg: "bg-purple-50", text: "text-purple-600" },
    "#b45309": { hex: "#b45309", bg: "bg-amber-50", text: "text-amber-700" },
    "#db2777": { hex: "#db2777", bg: "bg-pink-50", text: "text-pink-600" },
    "#0284c7": { hex: "#0284c7", bg: "bg-sky-50", text: "text-sky-600" },
    "#65a30d": { hex: "#65a30d", bg: "bg-lime-50", text: "text-lime-600" },
    "#78716c": { hex: "#78716c", bg: "bg-stone-50", text: "text-stone-500" },
    "#94a3b8": { hex: "#94a3b8", bg: "bg-gray-100", text: "text-gray-500" },
};

const periods = [
    { id: "monthly", label: "Monthly", desc: "Resets on the 1st of every month" },
    { id: "custom", label: "Custom", desc: "Set your own start & end date" },
] as const;

const alertOptions = [50, 75, 90, 95];

const getLastDayOfMonth = (date: Date): number => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const parseDate = (dateStr: string): Date => new Date(`${dateStr}T00:00:00`);

const getInitialCustomDateRange = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    return {
        startDate: formatDate(new Date(currentYear, currentMonth, 1)),
        endDate: formatDate(new Date(currentYear, currentMonth, getLastDayOfMonth(today))),
    };
};

export function CreateBudgetPage() {
    const router = useRouter();
    const { data: categoriesData } = useGetCategories();
    const { data: budgetsData } = useGetBudgets();
    const { mutate: createCategory, isPending: isCreatingCategory } = useCreateCategory();
    const createBudgetMutation = useCreateBudget();

    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [period, setPeriod] = useState<BudgetPeriod>("monthly");
    const [customStartDate, setCustomStartDate] = useState(() => getInitialCustomDateRange().startDate);
    const [customEndDate, setCustomEndDate] = useState(() => getInitialCustomDateRange().endDate);
    const [alertAt, setAlertAt] = useState(80);
    const [alertEnabled, setAlertEnabled] = useState(true);
    const [searchCat, setSearchCat] = useState("");
    const [note, setNote] = useState("");
    const [showCustomCategoryForm, setShowCustomCategoryForm] = useState(false);
    const [customCategoryName, setCustomCategoryName] = useState("");
    const [customCategoryTagInput, setCustomCategoryTagInput] = useState("");
    const [customCategoryTags, setCustomCategoryTags] = useState<string[]>([]);
    const [customCategoryColor, setCustomCategoryColor] = useState("#00C950");

    const categoryMap = useMemo(() => {
        if (!categoriesData?.data) {
            return {} as CategoryMap;
        }

        return categoriesData.data.reduce((accumulator, category) => {
            accumulator[category.id] = category;
            return accumulator;
        }, {} as CategoryMap);
    }, [categoriesData]);

    const usedCategoryIds = useMemo(() => {
        const budgets = budgetsData?.data?.budget ?? [];
        return new Set(budgets.map((budget: BudgetApiItem) => budget.categoryId));
    }, [budgetsData]);

    const allCategories = useMemo(() => {
        if (!categoriesData?.data) {
            return [];
        }

        return categoriesData.data.map((category) => ({
            id: category.id,
            label: category.name,
            icon: iconMap[category.id] || Sparkles,
            hex: category.color || "#94a3b8",
            bg: colorPalette[category.color]?.bg || "bg-gray-100",
            text: colorPalette[category.color]?.text || "text-gray-500",
            desc: category.tags?.join(", ") || "User category",
        })) as BudgetCategoryOption[];
    }, [categoriesData]);

    const filteredCats = allCategories.filter(
        (category) =>
            category.label.toLowerCase().includes(searchCat.toLowerCase()) ||
            category.desc.toLowerCase().includes(searchCat.toLowerCase()),
    );

    const availableCats = filteredCats.filter((category) => !usedCategoryIds.has(category.id));
    const existingCats = filteredCats.filter((category) => usedCategoryIds.has(category.id));

    const selectedCategory = selectedCategoryId
        ? allCategories.find((category) => category.id === selectedCategoryId) ?? null
        : null;

    const customCategory = {
        name: customCategoryName,
        tagInput: customCategoryTagInput,
        tags: customCategoryTags,
        color: customCategoryColor,
    };

    const addCustomCategoryTag = (tagValue: string) => {
        const nextTag = tagValue.trim();

        if (!nextTag) {
            return;
        }

        setCustomCategoryTags((currentTags) => {
            if (currentTags.some((tag) => tag.toLowerCase() === nextTag.toLowerCase())) {
                return currentTags;
            }

            return [...currentTags, nextTag];
        });
        setCustomCategoryTagInput("");
    };

    const removeCustomCategoryTag = (tagToRemove: string) => {
        setCustomCategoryTags((currentTags) => currentTags.filter((tag) => tag !== tagToRemove));
    };

    const handleCustomCategoryTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();
        addCustomCategoryTag(customCategoryTagInput);
    };

    const handleCreateCustomCategory = () => {
        const trimmedName = customCategoryName.trim();

        if (!trimmedName || !customCategoryColor) {
            return;
        }

        createCategory(
            {
                name: trimmedName,
                tags: customCategoryTags,
                color: customCategoryColor,
                icon: null,
            },
            {
                onSuccess: (response) => {
                    setSelectedCategoryId(response.data?.id ?? null);
                    setShowCustomCategoryForm(false);
                    setCustomCategoryName("");
                    setCustomCategoryTagInput("");
                    setCustomCategoryTags([]);
                    setCustomCategoryColor("#00C950");
                },
            },
        );
    };

    const alertAmount = amount ? Math.round((Number(amount) * alertAt) / 100) : null;

    const dateError = useMemo(() => {
        if (period !== "custom" || !customStartDate || !customEndDate) {
            return "";
        }

        const startDate = parseDate(customStartDate);
        const endDate = parseDate(customEndDate);

        return endDate < startDate ? "End date cannot be before start date" : "";
    }, [period, customStartDate, customEndDate]);

    const canSubmit = Boolean(selectedCategoryId && name && amount && Number(amount) > 0 && !dateError);

    const handleCreateBudget = async () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        let startingDate: string;
        let expireDate: string;

        if (period === "monthly") {
            startingDate = formatDate(new Date(currentYear, currentMonth, 1));
            expireDate = formatDate(new Date(currentYear, currentMonth, getLastDayOfMonth(today)));
        } else {
            startingDate = customStartDate;
            expireDate = customEndDate;
        }

        createBudgetMutation.mutate(
            {
                name: name || selectedCategory?.label || "Unnamed Budget",
                amount: Number(amount),
                startingDate,
                expireDate,
                categoryId: selectedCategoryId!,
                note: note || undefined,
                alert: alertEnabled,
                alertLimit: alertEnabled ? alertAt : null,
            },
            {
                onSuccess: () => {
                    router.push("/budgets");
                },
            },
        );
    };

    const activeBudgets = budgetsData?.data?.budget ?? [];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Create Budget"
                description="Set a spending limit for a category you care about"
                back={true}
            />

            <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-blue-50/70 border border-blue-100">
                <Info size={15} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-blue-700 text-xs leading-relaxed">
                    <span className="font-semibold">How budgets work: </span>
                    Budgets are spending limits per category. When you log an expense, you choose which budget to deduct from. You can only create one budget per category. Greyed out categories already have a budget.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-5">
                    <BudgetCategoryStep
                        selectedCategory={selectedCategory}
                        searchCat={searchCat}
                        setSearchCat={setSearchCat}
                        availableCats={availableCats}
                        existingCats={existingCats}
                        showCustomCategoryForm={showCustomCategoryForm}
                        setShowCustomCategoryForm={setShowCustomCategoryForm}
                        customCategory={customCategory}
                        setCustomCategoryName={setCustomCategoryName}
                        setCustomCategoryTagInput={setCustomCategoryTagInput}
                        setCustomCategoryTags={setCustomCategoryTags}
                        setCustomCategoryColor={setCustomCategoryColor}
                        onSelectCategory={setSelectedCategoryId}
                        onAddCustomCategoryTag={addCustomCategoryTag}
                        onRemoveCustomCategoryTag={removeCustomCategoryTag}
                        onCustomCategoryTagKeyDown={handleCustomCategoryTagKeyDown}
                        onCreateCustomCategory={handleCreateCustomCategory}
                        isCreatingCategory={isCreatingCategory}
                    />

                    <BudgetNameStep name={name} setName={setName} />

                    <BudgetAmountPeriodStep
                        amount={amount}
                        setAmount={setAmount}
                        period={period}
                        setPeriod={setPeriod}
                        customStartDate={customStartDate}
                        setCustomStartDate={setCustomStartDate}
                        customEndDate={customEndDate}
                        setCustomEndDate={setCustomEndDate}
                        dateError={dateError}
                        periods={periods}
                    />

                    <BudgetAlertStep
                        alertEnabled={alertEnabled}
                        setAlertEnabled={setAlertEnabled}
                        alertAt={alertAt}
                        setAlertAt={setAlertAt}
                        amount={amount}
                        alertAmount={alertAmount}
                        alertOptions={alertOptions}
                    />

                    <BudgetNotesStep note={note} setNote={setNote} />

                    <div className="flex items-center gap-3">
                        <Link href="/budgets" className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold text-center hover:bg-gray-50 transition-colors">
                            Cancel
                        </Link>
                        <button
                            onClick={handleCreateBudget}
                            disabled={!canSubmit || createBudgetMutation.isPending}
                            className="flex-1 py-3.5 rounded-xl bg-[#00C950] text-white text-sm font-bold shadow-lg shadow-[#00C950]/25 hover:bg-[#00b347] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            {createBudgetMutation.isPending ? "Creating..." : "Create Budget"}
                        </button>
                    </div>
                </div>

                <BudgetPreviewSidebar
                    selectedCategory={selectedCategory}
                    amount={amount}
                    period={period}
                    customStartDate={customStartDate}
                    customEndDate={customEndDate}
                    alertEnabled={alertEnabled}
                    alertAt={alertAt}
                    budgets={activeBudgets}
                    categoryMap={categoryMap}
                    allCategories={allCategories}
                />
            </div>
        </div>
    );
}
