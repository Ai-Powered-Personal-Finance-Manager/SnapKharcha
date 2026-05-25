"use client";

import { useDashboard } from "@/src/components/dashboard-layout/hooks/useDashboard";
import { useUser } from "@/src/components/dashboard-layout/hooks/useUser";
import { ErrorFallback } from "@/src/components/ErrorFallback";
import { DashboardSkeletonLoading } from "@/src/components/loading-skeletons/DashboardSkeletonLoading";
import { StatsGrid } from "@/src/components/StatsGrid";
import { getGreeting } from "@/src/core/utils/getGreetings";
import { AIInsight } from "@/src/features/dashboard/components/AIInsight";
import { BudgetOverview } from "@/src/features/dashboard/components/BudgetOverview";
import { RecentTransactions } from "@/src/features/dashboard/components/RecentTransactions";
import { SavingsGoal } from "@/src/features/dashboard/components/SavingsGoal";
import { WelcomeBanner } from "@/src/features/dashboard/components/WelcomeBanner";
import { error } from "console";
import {
  Car,
  Coffee,
  CreditCard,
  PiggyBank,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Utensils,
  Wallet,
  Zap,
} from "lucide-react";
import { useMemo } from "react";

// Recent transactions data
const transactions = [
  {
    icon: Utensils,
    label: "Zomato Order",
    category: "Food",
    amount: "-Rs.340",
    time: "2h ago",
    color: "orange",
  },
  {
    icon: ShoppingCart,
    label: "Amazon Purchase",
    category: "Shopping",
    amount: "-Rs.1,299",
    time: "5h ago",
    color: "blue",
  },
  {
    icon: Zap,
    label: "Electricity Bill",
    category: "Utilities",
    amount: "-Rs.890",
    time: "Yesterday",
    color: "yellow",
  },
  {
    icon: Car,
    label: "Ola Ride",
    category: "Transport",
    amount: "-Rs.220",
    time: "Yesterday",
    color: "green",
  },
  {
    icon: Coffee,
    label: "Starbucks",
    category: "Food",
    amount: "-Rs.380",
    time: "2 days ago",
    color: "amber",
  },
  {
    icon: ShoppingBag,
    label: "Salary Credit",
    category: "Income",
    amount: "+Rs.50,000",
    time: "3 days ago",
    color: "green",
  },
];

// Budget data
const budgets = [
  { label: "Food & Dining", spent: 4200, total: 6000, color: "#00C950" },
  { label: "Shopping", spent: 3800, total: 4000, color: "#f59e0b" },
  { label: "Transport", spent: 1100, total: 2000, color: "#3b82f6" },
  { label: "Utilities", spent: 890, total: 1500, color: "#8b5cf6" },
];

export default function DashboardPage() {
  const { user, isLoading: isUserLoading } = useUser();
  const userData = user?.user;
  const greeting = useMemo(() => getGreeting(), []);
  const { dashbaord, isLoading: isDashboardLoading, error, refetch } = useDashboard();
  const statsData = useMemo(() => {
    if(!dashbaord) {
      return [];
    }
    return [
      {
        label: "Total Balance",
        value: `Rs. ${dashbaord?.summary.totalBalance ?? 0}`,
        icon: <Wallet size={18} />,
        meta: "Available money",
      },
      {
        label: "Total Spent",
        value: `Rs. ${dashbaord?.summary.totalSpent ?? 0}`,
        icon: <TrendingUp size={18} />,
        meta: "All expenses",
      },
      {
        label: "Total Budget",
        value: `${dashbaord?.summary.totalBudget ?? 0}`,
        icon: <PiggyBank size={18} />,
        meta: "Active budgets",
      },
      {
        label: "EMIs",
        value: `Rs. ${dashbaord?.summary.totalEMIs ?? 0}`,
        icon: <CreditCard size={18} />,
        meta: "Monthly EMI",
      },
    ]
  }, [dashbaord]);

  if (isDashboardLoading) return <DashboardSkeletonLoading />;

  if(error || !dashbaord) {
    return <ErrorFallback resetErrorBoundary={refetch}/>
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner greeting={greeting} userName={userData?.name} />

      {/* Stat Cards */}
      <StatsGrid stats={statsData} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Transactions */}
        <RecentTransactions transactions={dashbaord.expenses} />

        {/* Right column */}
        <div className="space-y-5">
          {/* Budget Overview */}
          <BudgetOverview budgets={dashbaord.budgets} />

          {/* Savings Goal */}
          <SavingsGoal
            goalName="New MacBook Pro"
            savedAmount={144000}
            targetAmount={200000}
            completionDate="Aug 2025"
          />

          {/* Quick AI Insight */}
          <AIInsight insight="You spend 34% more on food on weekends. Cooking at home 2 days could save you Rs.1,200/month." />
        </div>
      </div>
    </div>
  );
}
