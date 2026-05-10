"use client";

import { useMemo } from "react";
import { useUser } from "@/src/components/dashboard-layout/hooks/useUser";
import {
    Wallet, Target, ArrowUpRight, ArrowDownRight, ShoppingCart,
    Utensils, Car, Zap, ShoppingBag, Coffee,
} from "lucide-react";
import { StatsGrid } from "@/src/components/StatsGrid";
import { WelcomeBanner } from "@/src/features/dashboard/components/WelcomeBanner";
import { RecentTransactions } from "@/src/features/dashboard/components/RecentTransactions";
import { BudgetOverview } from "@/src/features/dashboard/components/BudgetOverview";
import { SavingsGoal } from "@/src/features/dashboard/components/SavingsGoal";
import { AIInsight } from "@/src/features/dashboard/components/AIInsight";

// Type for stats
type StatItem = {
    label: string;
    icon?: React.ReactNode;
    value: string;
    change: string;
    trend: "up" | "down";
    sub: string;
    color: "green" | "red";
};

// Function to get dynamic greeting based on time
function getGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return { text: "Good morning" };
    } else if (hour >= 12 && hour < 17) {
        return { text: "Good afternoon" };
    } else if (hour >= 17 && hour < 21) {
        return { text: "Good evening" };
    } else {
        return { text: "Good night" };
    }
}

// Stats data
const stats: StatItem[] = [
    {
        label: "Total Balance",
        icon: <Wallet />,
        value: "Rs.1,24,350",
        change: "+Rs.3,200",
        trend: "up",
        sub: "across all accounts",
        color: "green",
    },
    {
        label: "Monthly Spending",
        icon: <ArrowDownRight />,
        value: "Rs.18,430",
        change: "+12% vs last month",
        trend: "up",
        sub: "of Rs.25,000 budget",
        color: "red",
    },
    {
        label: "Monthly Income",
        icon: <ArrowUpRight />,
        value: "Rs.52,000",
        change: "+Rs.2,000",
        trend: "up",
        sub: "salary + freelance",
        color: "green",
    },
    {
        label: "Savings Rate",
        icon: <Target />,
        value: "64.6%",
        change: "+4.2%",
        trend: "up",
        sub: "Rs.33,570 saved",
        color: "green",
    },
];

// Recent transactions data
const transactions = [
    { icon: Utensils,   label: "Zomato Order",       category: "Food",          amount: "-Rs.340",   time: "2h ago",   color: "orange" },
    { icon: ShoppingCart, label: "Amazon Purchase",  category: "Shopping",      amount: "-Rs.1,299", time: "5h ago",   color: "blue"   },
    { icon: Zap,        label: "Electricity Bill",   category: "Utilities",     amount: "-Rs.890",   time: "Yesterday",color: "yellow" },
    { icon: Car,        label: "Ola Ride",           category: "Transport",     amount: "-Rs.220",   time: "Yesterday",color: "green"  },
    { icon: Coffee,     label: "Starbucks",          category: "Food",          amount: "-Rs.380",   time: "2 days ago",color: "amber" },
    { icon: ShoppingBag,label: "Salary Credit",      category: "Income",        amount: "+Rs.50,000",time: "3 days ago",color: "green" },
];

// Budget data
const budgets = [
    { label: "Food & Dining",  spent: 4200,  total: 6000,  color: "#00C950" },
    { label: "Shopping",       spent: 3800,  total: 4000,  color: "#f59e0b" },
    { label: "Transport",      spent: 1100,  total: 2000,  color: "#3b82f6" },
    { label: "Utilities",      spent: 890,   total: 1500,  color: "#8b5cf6" },
];

export default function DashboardPage() {
    const { user } = useUser();
    const userData = user?.user;
    const greeting = useMemo(() => getGreeting(), []);

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <WelcomeBanner greeting={greeting} userName={userData?.name} />

            {/* Stat Cards */}
            <StatsGrid stats={stats}/>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                {/* Transactions */}
                <RecentTransactions transactions={transactions} />

                {/* Right column */}
                <div className="space-y-5">
                    {/* Budget Overview */}
                    <BudgetOverview budgets={budgets} />

                    {/* Savings Goal */}
                    <SavingsGoal
                        goalName="New MacBook Pro"
                        savedAmount={144000}
                        targetAmount={200000}
                        completionDate="Aug 2025"
                    />

                    {/* Quick AI Insight */}
                    <AIInsight
                        insight="You spend 34% more on food on weekends. Cooking at home 2 days could save you Rs.1,200/month."
                    />
                </div>
            </div>
        </div>
    );
}
