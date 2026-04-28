"use client";

import { BudgetBanner } from "@/src/components/budgets/BudgetBanner";
import { BudgetCardsGrid } from "@/src/components/budgets/BudgetCardsGrid";
import { ErrorFallback } from "@/src/components/ErrorFallback";
import { BudgetSkeletonLoading } from "@/src/components/BudgetSkeletonLoading";
import { PageHeader } from "@/src/components/PageHeader";
import { useGetBudgets } from "@/src/hooks/budgets/useGetBudgets";
import { Plus, TrendingDown } from "lucide-react";
import { useRouter } from "next/navigation";

// const budgets: Budget[] = [
//     {
//         icon: Utensils,    
//         label: "Food & Dining",  
//         spent: 5400,  
//         total: 6000,  
//         color: "#00C950", 
//         iconBg: "bg-orange-50", 
//         iconColor: "text-orange-500",
//         transactions: 24, 
//         tip: "You eat out most on Fridays.",
//     },
//     {
//         icon: ShoppingBag, label: "Shopping",       spent: 3850,  total: 4000,  color: "#f59e0b", iconBg: "bg-yellow-50", iconColor: "text-yellow-600",
//         transactions: 11, tip: "Near limit — only ₹150 left.",
//     },
//     {
//         icon: Car,         label: "Transport",      spent: 1100,  total: 2000,  color: "#3b82f6", iconBg: "bg-blue-50",   iconColor: "text-blue-500",
//         transactions: 18, tip: "On track this month.",
//     },
//     {
//         icon: Zap,         label: "Utilities",      spent: 890,   total: 1500,  color: "#8b5cf6", iconBg: "bg-purple-50", iconColor: "text-purple-500",
//         transactions: 4,  tip: "Electricity due in 3 days.",
//     },
//     {
//         icon: Wifi,        label: "Subscriptions",  spent: 649,   total: 1000,  color: "#ec4899", iconBg: "bg-pink-50",   iconColor: "text-pink-500",
//         transactions: 5,  tip: "Netflix, Spotify, Prime.",
//     },
//     {
//         icon: Heart,       label: "Health",         spent: 200,   total: 2000,  color: "#14b8a6", iconBg: "bg-teal-50",   iconColor: "text-teal-500",
//         transactions: 2,  tip: "Well under budget.",
//     },
//     {
//         icon: Plane,       label: "Travel",         spent: 0,     total: 5000,  color: "#00C950", iconBg: "bg-sky-50",    iconColor: "text-sky-500",
//         transactions: 0,  tip: "No travel spend yet.",
//     },
//     {
//         icon: BookOpen,    label: "Education",      spent: 499,   total: 1000,  color: "#f97316", iconBg: "bg-orange-50", iconColor: "text-orange-400",
//         transactions: 3,  tip: "Udemy course purchased.",
//     },
// ];

// const totalBudget = budgets.reduce((a, b) => a + b.total, 0);
// const totalSpent  = budgets.reduce((a, b) => a + b.spent, 0);
// const overallPct  = Math.round((totalSpent / totalBudget) * 100);
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
                description="April 2025 · Resets in 19 days" 
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
            {/* {budgets.some((b) => (b.spent / b.total) >= 0.9) && (
                <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-red-50 border border-red-100">
                    <AlertTriangle size={15} className="text-red-500 shrink-0" />
                    <p className="text-red-600 text-xs font-medium">
                        <span className="font-semibold">
                        {budgets.filter((b) => (b.spent / b.total) >= 0.9).map((b) => b.label).join(", ")}
                        </span>{" "}
                        {budgets.filter((b) => (b.spent / b.total) >= 0.9).length === 1 ? "is" : "are"} near the limit. Consider adjusting your spending.
                    </p>
                </div>
            )} */}

            {/* Budget cards grid */}
            <BudgetCardsGrid budgets={budgetsData} />

            {/* Tip */}
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100">
                <TrendingDown size={15} className="text-[#00C950] shrink-0" />
                <p className="text-gray-500 text-xs">
                    <span className="font-semibold text-gray-700">AI Tip: </span>
                    You consistently underspend on Health. Reallocating ₹500 to Shopping could reduce overage stress.
                </p>
            </div>
        </div>
    );
}
