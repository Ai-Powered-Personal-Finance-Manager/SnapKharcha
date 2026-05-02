"use client";

import { useMemo } from "react";
import { useUser } from "@/src/components/dashboard-layout/hooks/useUser";
import {
    TrendingUp, TrendingDown, Wallet, Target,
    ArrowUpRight, ArrowDownRight, ShoppingCart,
    Utensils, Car, Zap, ShoppingBag, Coffee,
    MoreHorizontal, Plus, ScanLine,
} from "lucide-react";
import { StatsGrid } from "@/src/components/StatsGrid";
import { WelcomeBanner } from "@/src/components/dashboard/WelcomeBanner";

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

const transactions = [
    { icon: Utensils,   label: "Zomato Order",       category: "Food",          amount: "-Rs.340",   time: "2h ago",   color: "orange" },
    { icon: ShoppingCart, label: "Amazon Purchase",  category: "Shopping",      amount: "-Rs.1,299", time: "5h ago",   color: "blue"   },
    { icon: Zap,        label: "Electricity Bill",   category: "Utilities",     amount: "-Rs.890",   time: "Yesterday",color: "yellow" },
    { icon: Car,        label: "Ola Ride",           category: "Transport",     amount: "-Rs.220",   time: "Yesterday",color: "green"  },
    { icon: Coffee,     label: "Starbucks",          category: "Food",          amount: "-Rs.380",   time: "2 days ago",color: "amber" },
    { icon: ShoppingBag,label: "Salary Credit",      category: "Income",        amount: "+Rs.50,000",time: "3 days ago",color: "green" },
];

const budgets = [
    { label: "Food & Dining",  spent: 4200,  total: 6000,  color: "#00C950" },
    { label: "Shopping",       spent: 3800,  total: 4000,  color: "#f59e0b" },
    { label: "Transport",      spent: 1100,  total: 2000,  color: "#3b82f6" },
    { label: "Utilities",      spent: 890,   total: 1500,  color: "#8b5cf6" },
];

const categoryColors: Record<string, string> = {
    orange: "bg-orange-50 text-orange-500",
    blue:   "bg-blue-50 text-blue-500",
    yellow: "bg-yellow-50 text-yellow-600",
    green:  "bg-green-50 text-green-600",
    amber:  "bg-amber-50 text-amber-500",
};

export default function DashboardPage() {
    const { user } = useUser();
    const userData = user?.user;
    const greeting = useMemo(() => getGreeting(), []);

    return (
        <div className="space-y-6">

        {/* Welcome Banner */}
        <WelcomeBanner greeting={greeting} userName={userData?.name} />
        {/* <div className="relative overflow-hidden rounded-2xl bg-[#01271E] px-6 py-5">
            <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#00C950]/10 rounded-full blur-3xl" />
            <div className="relative flex items-center justify-between">
                <div>
                    <p className="text-white/50 text-sm">
                        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    </p>
                    <h2 className="text-white text-xl font-semibold mt-0.5">{greeting.text} {greeting.emoji}, {userData?.name || "Guest"}</h2>
                    <p className="text-white/40 text-xs mt-1">Here&apos;s your financial snapshot for today</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00C950] text-white text-xs font-semibold shadow-lg shadow-[#00C950]/25 hover:bg-[#00b347] transition-colors">
                        <Plus size={14} /> Add Expense
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 border border-white/12 text-white/70 text-xs font-semibold hover:bg-white/12 transition-colors">
                        <ScanLine size={14} /> Scan Bill
                    </button>
                </div>
            </div>
        </div> */}

        <StatsGrid stats={stats}/>
        {/* Stat Cards */}
        {/* <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:shadow-gray-100 transition-all duration-200">
                <p className="text-gray-400 text-xs font-medium">{s.label}</p>
                <p className="text-gray-900 text-2xl font-bold mt-1 tracking-tight font-mono">{s.value}</p>
                <div className="flex items-center gap-1.5 mt-2">
                {s.trend === "up" && s.color === "green" ? (
                    <span className="flex items-center gap-1 text-[#00C950] text-[11px] font-semibold bg-[#00C950]/8 px-2 py-0.5 rounded-full">
                    <TrendingUp size={11} /> {s.change}
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-red-500 text-[11px] font-semibold bg-red-50 px-2 py-0.5 rounded-full">
                    <TrendingDown size={11} /> {s.change}
                    </span>
                )}
                </div>
                <p className="text-gray-400 text-[11px] mt-1.5">{s.sub}</p>
            </div>
            ))}
        </div> */}

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

            {/* Transactions */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div>
                <h3 className="text-gray-900 font-semibold text-sm">Recent Transactions</h3>
                <p className="text-gray-400 text-[11px] mt-0.5">Last 7 days</p>
                </div>
                <button className="text-[#00C950] text-xs font-semibold hover:underline flex items-center gap-1">
                View all <ArrowUpRight size={12} />
                </button>
            </div>
            <div className="divide-y divide-gray-50">
                {transactions.map((t, i) => {
                const Icon = t.icon;
                const isIncome = t.amount.startsWith("+");
                return (
                    <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${categoryColors[t.color]}`}>
                        <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-gray-800 text-sm font-medium truncate">{t.label}</p>
                        <p className="text-gray-400 text-[11px]">{t.category} · {t.time}</p>
                    </div>
                    <p className={`text-sm font-semibold font-mono shrink-0 ${isIncome ? "text-[#00C950]" : "text-gray-800"}`}>
                        {t.amount}
                    </p>
                    </div>
                );
                })}
            </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">

            {/* Spending by Category — simple bar chart */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 font-semibold text-sm">Budget Overview</h3>
                <button className="text-gray-400 hover:text-gray-600 transition-colors"><MoreHorizontal size={16} /></button>
                </div>
                <div className="space-y-4">
                {budgets.map((b) => {
                    const pct = Math.round((b.spent / b.total) * 100);
                    const over = pct >= 90;
                    return (
                    <div key={b.label}>
                        <div className="flex items-center justify-between mb-1.5">
                        <span className="text-gray-700 text-xs font-medium">{b.label}</span>
                        <span className={`text-xs font-mono font-semibold ${over ? "text-red-500" : "text-gray-500"}`}>
                            Rs.{b.spent.toLocaleString()} / Rs.{b.total.toLocaleString()}
                        </span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: over ? "#ef4444" : b.color }}
                        />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">{pct}% used</p>
                    </div>
                    );
                })}
                </div>
            </div>

            {/* Savings Goal */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-1">
                <h3 className="text-gray-900 font-semibold text-sm">Savings Goal</h3>
                <Target size={15} className="text-[#00C950]" />
                </div>
                <p className="text-gray-400 text-[11px] mb-4">New MacBook Pro</p>
                {/* Circle progress */}
                <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#00C950" strokeWidth="3"
                        strokeDasharray="72 100" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900">72%</span>
                    </div>
                </div>
                <div className="space-y-1.5">
                    <div>
                    <p className="text-[10px] text-gray-400">Saved so far</p>
                    <p className="text-sm font-bold font-mono text-gray-900">Rs.1,44,000</p>
                    </div>
                    <div>
                    <p className="text-[10px] text-gray-400">Remaining</p>
                    <p className="text-sm font-bold font-mono text-gray-500">Rs.56,000</p>
                    </div>
                </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <p className="text-[11px] text-gray-400">Est. completion</p>
                <p className="text-[11px] font-semibold text-gray-700">Aug 2025</p>
                </div>
            </div>

            {/* Quick AI Insight */}
            <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-5">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#00C950]/15 rounded-full blur-2xl" />
                <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-[#00C950] flex items-center justify-center">
                    <Zap size={11} className="text-white" />
                    </div>
                    <p className="text-white/60 text-[11px] font-semibold uppercase tracking-wider">AI Insight</p>
                </div>
                <p className="text-white text-sm leading-relaxed">
                    You spend <span className="text-[#00C950] font-semibold">34% more</span> on food on weekends. Cooking at home 2 days could save you <span className="text-[#00C950] font-semibold">Rs.1,200/month</span>.
                </p>
                </div>
            </div>

            </div>
        </div>
        </div>
    );
}
