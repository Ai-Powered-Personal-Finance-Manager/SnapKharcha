"use client";

import { BudgetBanner } from "@/src/components/budgets/BudgetBanner";
import { BudgetCardsGrid } from "@/src/components/budgets/BudgetCardsGrid";
import { ErrorFallback } from "@/src/components/ErrorFallback";
import { BudgetSkeletonLoading } from "@/src/components/loading-skeletons/BudgetSkeletonLoading";
import { PageHeader } from "@/src/components/PageHeader";
import { useGetBudgets } from "@/src/hooks/budgets/useBudgets";
import { AlertTriangle, Plus, TrendingDown } from "lucide-react";
import { useRouter } from "next/navigation";

export function BudgetsPage() {
    const router = useRouter();
    
    const { data: budgets, isLoading, isError, refetch } = useGetBudgets();
    const budgetsData = budgets?.data?.budget;
    const summaryData = budgets?.data?.summary;
    
    if (isLoading) {
        return <BudgetSkeletonLoading />; 
    }

    if (isError || !budgets) {
        return <ErrorFallback resetErrorBoundary={refetch} />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader 
                title="Budgets" 
                description="Manage your budgets for different categories." 
                back={false}
                action={[
                    { 
                        label: "Add Budget",
                        icon: Plus, 
                        onClick: () => router.push("/budgets/create") 
                    }
                ]} 
            />

            {/* Overview banner */}
            <BudgetBanner totalBudget={summaryData?.totalBudget} totalSpent={summaryData?.totalSpent} overallPct={summaryData?.overallPercentage} />

            {/* Alert strip — near-limit budgets */}
            {budgetsData?.some((b) => (b.spendAmount / b.amount) >= 0.9) && (
                <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-red-50 border border-red-100">
                    <AlertTriangle size={15} className="text-red-500 shrink-0" />
                    <p className="text-red-600 text-xs font-medium">
                        <span className="font-semibold">
                        {budgetsData?.filter((b) => (b.spendAmount / b.amount) >= 0.9).map((b) => b.category.name).join(", ")}
                        </span>{" "}
                        {budgetsData?.filter((b) => (b.spendAmount / b.amount) >= 0.9).length === 1 ? "is" : "are"} near the limit. Consider adjusting your spending.
                    </p>
                </div>
            )}

            {/* Budget cards grid */}
            <BudgetCardsGrid budgets={budgetsData} />

            {/* Tip */}
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100">
                <TrendingDown size={15} className="text-[#00C950] shrink-0" />
                <p className="text-gray-500 text-xs">
                    <span className="font-semibold text-gray-700">AI Tip: </span>
                    You consistently underspend on Health. Reallocating Rs.500 to Shopping could reduce overage stress.
                </p>
            </div>
        </div>
    );
}
