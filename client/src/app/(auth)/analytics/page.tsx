import {
    TrendingUp, TrendingDown, ArrowUpRight,
    Utensils, ShoppingBag, Car, Zap, Wifi,
    Heart, MoreHorizontal, Zap as ZapIcon,
    CalendarDays, Clock, BarChart2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type Period = "7d" | "30d" | "3m" | "6m" | "1y";

// ─── Static data ──────────────────────────────────────────────

// Monthly income vs expense (last 6 months)
const incomeVsExpense = [
    { month: "Nov", income: 58000, expense: 32000 },
    { month: "Dec", income: 64000, expense: 41000 },
    { month: "Jan", income: 58000, expense: 28000 },
    { month: "Feb", income: 60000, expense: 35000 },
    { month: "Mar", income: 71000, expense: 38000 },
    { month: "Apr", income: 91000, expense: 18430 },  // current (partial)
];

// Daily spending — last 30 days (abbreviated to 14 for display)
const dailySpend = [
    420, 0, 1290, 340, 0, 2100, 890,
    0, 560, 380, 1800, 220, 0, 3200,
];
const maxDaily = Math.max(...dailySpend);

// Category breakdown
const categories = [
    { icon: Utensils,    label: "Food & Dining",  amount: 5400,  pct: 29, color: "#f97316", bgClass: "bg-orange-50", textClass: "text-orange-500" },
    { icon: ShoppingBag, label: "Shopping",       amount: 3850,  pct: 21, color: "#f59e0b", bgClass: "bg-yellow-50", textClass: "text-yellow-600" },
    { icon: Car,         label: "Transport",      amount: 1100,  pct: 6,  color: "#3b82f6", bgClass: "bg-blue-50",   textClass: "text-blue-500"   },
    { icon: Zap,         label: "Utilities",      amount: 890,   pct: 5,  color: "#8b5cf6", bgClass: "bg-purple-50", textClass: "text-purple-500" },
    { icon: Wifi,        label: "Subscriptions",  amount: 649,   pct: 4,  color: "#ec4899", bgClass: "bg-pink-50",   textClass: "text-pink-500"   },
    { icon: Heart,       label: "Health",         amount: 200,   pct: 1,  color: "#14b8a6", bgClass: "bg-teal-50",   textClass: "text-teal-500"   },
    { icon: BarChart2,   label: "Other",          amount: 6341,  pct: 34, color: "#94a3b8", bgClass: "bg-gray-100",  textClass: "text-gray-500"   },
];

// Day-of-week avg spending
const dowData = [
    { day: "Mon", avg: 420  },
    { day: "Tue", avg: 380  },
    { day: "Wed", avg: 610  },
    { day: "Thu", avg: 520  },
    { day: "Fri", avg: 1240 },
    { day: "Sat", avg: 1890 },
    { day: "Sun", avg: 980  },
];
const maxDow = Math.max(...dowData.map((d) => d.avg));

// Top merchants
const merchants = [
    { name: "Zomato",       category: "Food",      amount: 2840, txns: 8,  change: 18  },
    { name: "Amazon",       category: "Shopping",  amount: 2299, txns: 3,  change: -5  },
    { name: "Ola / Uber",   category: "Transport", amount: 1100, txns: 12, change: -12 },
    { name: "Swiggy",       category: "Food",      amount: 980,  txns: 4,  change: 22  },
    { name: "Netflix",      category: "Subs",      amount: 649,  txns: 1,  change: 0   },
    { name: "D-Mart",       category: "Shopping",  amount: 580,  txns: 2,  change: 8   },
];

// Monthly saving rate
const savingRate = [
    { month: "Nov", rate: 45 },
    { month: "Dec", rate: 36 },
    { month: "Jan", rate: 52 },
    { month: "Feb", rate: 42 },
    { month: "Mar", rate: 46 },
    { month: "Apr", rate: 64 },
];

// AI insights
const insights = [
    { tag: "Overspend",  color: "text-red-500",    bg: "bg-red-50",       text: "Weekend food delivery spend is 3× your weekday average. Cooking at home 2 Saturdays could save Rs.1,800/month." },
    { tag: "Trend",      color: "text-amber-600",  bg: "bg-amber-50",     text: "Shopping spend has risen 3 months in a row — up 34% since January. Your Amazon orders are the main driver." },
    { tag: "Win 🎉",     color: "text-[#00C950]",  bg: "bg-[#00C950]/8",  text: "Your savings rate this month is 64% — the highest in 6 months. Keep it up through May!" },
    { tag: "Tip",        color: "text-blue-500",   bg: "bg-blue-50",      text: "You have 5 active subscriptions totalling Rs.649/month. Review if you're using all of them." },
];

// ─── Mini bar chart helper ─────────────────────────────────────
function MiniBar({ value, max, color, label, subLabel }: {
    value: number; max: number; color: string; label: string; subLabel?: string;
}) {
    const pct = Math.round((value / max) * 100);
    return (
        <div className="flex items-end gap-3">
        <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
            <span className="text-gray-700 text-xs font-medium">{label}</span>
            {subLabel && <span className="text-gray-400 text-[11px]">{subLabel}</span>}
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, backgroundColor: color }} />
            </div>
        </div>
        <span className="text-gray-700 text-xs font-semibold font-mono w-20 text-right shrink-0">
            Rs.{value.toLocaleString()}
        </span>
        </div>
    );
}

// ─── Donut SVG ────────────────────────────────────────────────
function DonutChart() {
    // Build SVG donut from category percentages
    const r = 54;
    const cx = 64;
    const cy = 64;
    const circumference = 2 * Math.PI * r;
    let cumulative = 0;

    const slices = categories.map((c) => {
        const dashArray = (c.pct / 100) * circumference;
        const dashOffset = circumference - cumulative * circumference / 100;
        const slice = { ...c, dashArray, dashOffset: -(cumulative / 100) * circumference };
        cumulative += c.pct;
        return slice;
    });

    return (
        <svg viewBox="0 0 128 128" className="w-36 h-36 -rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth="16" />
        {slices.map((s, i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={s.color} strokeWidth="16"
            strokeDasharray={`${s.dashArray} ${circumference - s.dashArray}`}
            strokeDashoffset={s.dashOffset}
            className="transition-all duration-700"
            />
        ))}
        {/* Center hole */}
        <circle cx={cx} cy={cy} r={38} fill="white" />
        </svg>
    );
}

// ─── Page ─────────────────────────────────────────────────────
export default function AnalyticsPage() {
    const totalExpense = incomeVsExpense[incomeVsExpense.length - 1].expense;
    const totalIncome  = incomeVsExpense[incomeVsExpense.length - 1].income;
    const savedThisMonth = totalIncome - totalExpense;
    const maxIncomeExp = Math.max(...incomeVsExpense.map((d) => d.income));

    return (
        <div className="space-y-6">

        {/* Header + period tabs */}
        <div className="flex items-start justify-between">
            <div>
            <h2 className="text-gray-900 font-bold text-xl tracking-tight">Analytics</h2>
            <p className="text-gray-400 text-sm mt-0.5">Deep-dive into your spending patterns</p>
            </div>
            {/* Period selector */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-0.5">
            {(["7d","30d","3m","6m","1y"] as Period[]).map((p) => (
                <button key={p}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${p === "30d" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>
                {p}
                </button>
            ))}
            </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
            { label: "Total Spent",     value: `Rs.${totalExpense.toLocaleString()}`,  sub: "this month",          trend: "+12% vs Mar",   up: false, color: "text-gray-900" },
            { label: "Total Income",    value: `Rs.${totalIncome.toLocaleString()}`,   sub: "this month",          trend: "+28% vs Mar",   up: true,  color: "text-gray-900" },
            { label: "Saved",           value: `Rs.${savedThisMonth.toLocaleString()}`,sub: "net savings",         trend: "+18% vs Mar",   up: true,  color: "text-[#00C950]"},
            { label: "Avg Daily Spend", value: "Rs.614",                              sub: "per day this month",  trend: "−8% vs Mar",    up: true,  color: "text-gray-900" },
            ].map((k) => (
            <div key={k.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-gray-400 text-xs">{k.label}</p>
                <p className={`text-2xl font-bold font-mono mt-1 ${k.color}`}>{k.value}</p>
                <div className={`flex items-center gap-1 mt-2 text-[11px] font-semibold ${k.up ? "text-[#00C950]" : "text-red-500"}`}>
                {k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {k.trend}
                </div>
                <p className="text-gray-400 text-[11px] mt-0.5">{k.sub}</p>
            </div>
            ))}
        </div>

        {/* Row 1 — Income vs Expense bar chart + Donut */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

            {/* Income vs Expense — grouped bar */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-5">
                <div>
                <h3 className="text-gray-900 font-semibold text-sm">Income vs Expenses</h3>
                <p className="text-gray-400 text-[11px] mt-0.5">Last 6 months</p>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#00C950]" /><span className="text-gray-500">Income</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-gray-200" /><span className="text-gray-500">Expenses</span></div>
                </div>
            </div>

            {/* Bars */}
            <div className="flex items-end gap-3 h-44">
                {incomeVsExpense.map((d, i) => {
                const incH = Math.round((d.income / maxIncomeExp) * 100);
                const expH = Math.round((d.expense / maxIncomeExp) * 100);
                const isCurrent = i === incomeVsExpense.length - 1;
                return (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    {/* Grouped bars */}
                    <div className="flex items-end gap-0.5 w-full">
                        {/* Income bar */}
                        <div className="flex-1 rounded-t-md transition-all duration-700 group relative"
                        style={{ height: `${incH * 1.6}px`, backgroundColor: isCurrent ? "#00C950" : "#d1fae5" }}>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
                            Rs.{(d.income / 1000).toFixed(0)}k
                        </div>
                        </div>
                        {/* Expense bar */}
                        <div className="flex-1 rounded-t-md transition-all duration-700 group relative"
                        style={{ height: `${expH * 1.6}px`, backgroundColor: isCurrent ? "#fca5a5" : "#f3f4f6" }}>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
                            Rs.{(d.expense / 1000).toFixed(0)}k
                        </div>
                        </div>
                    </div>
                    <span className={`text-[11px] font-medium ${isCurrent ? "text-[#00C950]" : "text-gray-400"}`}>{d.month}</span>
                    </div>
                );
                })}
            </div>
            </div>

            {/* Donut — category breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
                <div>
                <h3 className="text-gray-900 font-semibold text-sm">By Category</h3>
                <p className="text-gray-400 text-[11px] mt-0.5">This month</p>
                </div>
                <button className="text-gray-300 hover:text-gray-500"><MoreHorizontal size={16} /></button>
            </div>

            <div className="flex flex-col items-center">
                <div className="relative">
                <DonutChart />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-gray-900 text-sm font-bold font-mono">Rs.18.4k</p>
                    <p className="text-gray-400 text-[10px]">total</p>
                </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-3 space-y-2">
                {categories.slice(0, 5).map((c) => {
                const Icon = c.icon;
                return (
                    <div key={c.label} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                    <span className="text-gray-600 text-[11px] flex-1 truncate">{c.label}</span>
                    <span className="text-gray-500 text-[11px] font-mono font-medium">{c.pct}%</span>
                    </div>
                );
                })}
                <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                <span className="text-gray-400 text-[11px] flex-1">Other</span>
                <span className="text-gray-400 text-[11px] font-mono">34%</span>
                </div>
            </div>
            </div>
        </div>

        {/* Row 2 — Daily spend sparkline + Day of week heatmap */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* Daily spend */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-5">
                <div>
                <h3 className="text-gray-900 font-semibold text-sm">Daily Spending</h3>
                <p className="text-gray-400 text-[11px] mt-0.5">Last 14 days · avg Rs.614/day</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#00C950] font-semibold bg-[#00C950]/8 px-2.5 py-1 rounded-full">
                <TrendingDown size={11} /> −8% vs last period
                </div>
            </div>

            <div className="flex items-end gap-1.5 h-32">
                {dailySpend.map((v, i) => {
                const h = v === 0 ? 4 : Math.max(Math.round((v / maxDaily) * 100), 8);
                const isHigh = v === maxDaily;
                return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
                        Rs.{v.toLocaleString()}
                    </div>
                    <div
                        className={`w-full rounded-t-md transition-all duration-500 cursor-pointer hover:opacity-80 ${v === 0 ? "bg-gray-100 rounded-md" : isHigh ? "bg-red-400" : "bg-[#00C950]"}`}
                        style={{ height: `${h}%` }}
                    />
                    </div>
                );
                })}
            </div>

            <div className="flex justify-between mt-2">
                <span className="text-[10px] text-gray-300">Apr 1</span>
                <span className="text-[10px] text-gray-300">Apr 14</span>
            </div>

            {/* High spend day callout */}
            <div className="mt-4 flex items-center gap-2 px-3 py-2.5 bg-red-50 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                <p className="text-red-600 text-[11px]">
                Highest spend: <span className="font-semibold">Rs.3,200</span> on Apr 14 · Shopping spree
                </p>
            </div>
            </div>

            {/* Day-of-week pattern */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-5">
                <div>
                <h3 className="text-gray-900 font-semibold text-sm">Spending by Day</h3>
                <p className="text-gray-400 text-[11px] mt-0.5">Average per day of week</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-full">
                <CalendarDays size={11} /> Saturday is peak
                </div>
            </div>

            <div className="flex items-end gap-2 h-36 mb-3">
                {dowData.map((d) => {
                const pct = Math.round((d.avg / maxDow) * 100);
                const isWeekend = d.day === "Sat" || d.day === "Sun";
                const isPeak = d.avg === maxDow;
                return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group relative">
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
                        Rs.{d.avg}
                    </div>
                    <div className="w-full flex flex-col justify-end" style={{ height: "120px" }}>
                        <div
                        className={`w-full rounded-t-xl transition-all duration-500 ${isPeak ? "bg-amber-400" : isWeekend ? "bg-amber-100" : "bg-[#00C950]/20"}`}
                        style={{ height: `${pct}%` }}
                        />
                    </div>
                    <span className={`text-[11px] font-medium ${isPeak ? "text-amber-500" : isWeekend ? "text-amber-400" : "text-gray-400"}`}>
                        {d.day}
                    </span>
                    </div>
                );
                })}
            </div>

            <div className="flex items-center gap-3 text-[11px]">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-amber-400" /><span className="text-gray-500">Weekend</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#00C950]/20" /><span className="text-gray-500">Weekday</span></div>
            </div>
            </div>
        </div>

        {/* Row 3 — Category detail bars + Savings rate */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* Category bars with budget comparison */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-5">
                <div>
                <h3 className="text-gray-900 font-semibold text-sm">Category Breakdown</h3>
                <p className="text-gray-400 text-[11px] mt-0.5">Spent vs budget limit</p>
                </div>
            </div>
            <div className="space-y-4">
                {categories.slice(0, 6).map((c) => {
                const Icon = c.icon;
                const budget = [6000,4000,2000,1500,1000,2000][categories.indexOf(c)];
                const overBudget = c.amount > budget;
                return (
                    <div key={c.label}>
                    <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${c.bgClass}`}>
                            <Icon size={12} className={c.textClass} />
                        </div>
                        <span className="text-gray-700 text-xs font-medium">{c.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold font-mono ${overBudget ? "text-red-500" : "text-gray-700"}`}>
                            Rs.{c.amount.toLocaleString()}
                        </span>
                        <span className="text-gray-300 text-[11px]">/ Rs.{budget.toLocaleString()}</span>
                        </div>
                    </div>
                    {/* Dual bar: budget (grey) behind, spent in front */}
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden relative">
                        <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min((c.amount / budget) * 100, 100)}%`, backgroundColor: overBudget ? "#ef4444" : c.color }} />
                    </div>
                    </div>
                );
                })}
            </div>
            </div>

            {/* Savings rate trend */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-5">
                <div>
                <h3 className="text-gray-900 font-semibold text-sm">Savings Rate</h3>
                <p className="text-gray-400 text-[11px] mt-0.5">% of income saved each month</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#00C950] font-semibold bg-[#00C950]/8 px-2.5 py-1 rounded-full">
                <TrendingUp size={11} /> Best month yet
                </div>
            </div>

            <div className="flex items-end gap-3 h-36 mb-3">
                {savingRate.map((d, i) => {
                const isCurrent = i === savingRate.length - 1;
                const isLow = d.rate < 40;
                return (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
                        {d.rate}% saved
                    </div>
                    {/* Rate label on current */}
                    {isCurrent && (
                        <span className="text-[10px] font-bold text-[#00C950] absolute -top-5">{d.rate}%</span>
                    )}
                    <div className="w-full flex flex-col justify-end" style={{ height: "128px" }}>
                        <div
                        className={`w-full rounded-t-xl transition-all duration-700 ${isCurrent ? "bg-[#00C950]" : isLow ? "bg-red-100" : "bg-[#00C950]/20"}`}
                        style={{ height: `${(d.rate / 70) * 100}%` }}
                        />
                    </div>
                    <span className={`text-[11px] font-medium ${isCurrent ? "text-[#00C950]" : "text-gray-400"}`}>{d.month}</span>
                    </div>
                );
                })}
            </div>

            {/* Target line annotation */}
            <div className="flex items-center gap-2 px-3 py-2.5 bg-[#00C950]/5 rounded-xl border border-[#00C950]/15">
                <div className="w-2 h-2 rounded-full bg-[#00C950]" />
                <p className="text-[#01271E] text-[11px]">
                Your savings rate goal is <span className="font-semibold">30%</span>. You're exceeding it by <span className="font-semibold text-[#00C950]">+34 points</span> this month.
                </p>
            </div>
            </div>
        </div>

        {/* Row 4 — Top merchants */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div>
                <h3 className="text-gray-900 font-semibold text-sm">Top Merchants</h3>
                <p className="text-gray-400 text-[11px] mt-0.5">Where your money actually goes</p>
            </div>
            <button className="flex items-center gap-1 text-[#00C950] text-xs font-semibold hover:underline">
                All merchants <ArrowUpRight size={12} />
            </button>
            </div>
            <div className="divide-y divide-gray-50">
            {merchants.map((m, i) => {
                const positive = m.change <= 0;
                return (
                <div key={m.name} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                    {/* Rank */}
                    <span className="text-gray-300 text-xs font-bold w-4 shrink-0">#{i + 1}</span>

                    {/* Avatar initial */}
                    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-gray-500 text-xs font-bold">{m.name[0]}</span>
                    </div>

                    {/* Name + category */}
                    <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-sm font-medium">{m.name}</p>
                    <p className="text-gray-400 text-[11px]">{m.category} · {m.txns} transactions</p>
                    </div>

                    {/* Spend bar */}
                    <div className="hidden md:block w-32">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00C950] rounded-full"
                        style={{ width: `${Math.round((m.amount / merchants[0].amount) * 100)}%` }} />
                    </div>
                    </div>

                    {/* Change */}
                    {m.change !== 0 && (
                    <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${positive ? "bg-[#00C950]/8 text-[#00C950]" : "bg-red-50 text-red-500"}`}>
                        {positive ? <TrendingDown size={10} /> : <TrendingUp size={10} />}
                        {positive ? "" : "+"}{m.change}%
                    </div>
                    )}
                    {m.change === 0 && <span className="text-gray-300 text-[11px] w-14 text-center">—</span>}

                    {/* Amount */}
                    <p className="text-gray-800 text-sm font-semibold font-mono shrink-0 w-20 text-right">
                    Rs.{m.amount.toLocaleString()}
                    </p>
                </div>
                );
            })}
            </div>
        </div>

        {/* Row 5 — AI Insights grid */}
        <div>
            <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-[#00C950] flex items-center justify-center">
                <ZapIcon size={13} className="text-white" />
            </div>
            <h3 className="text-gray-900 font-semibold text-sm">AI-Generated Insights</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {insights.map((ins, i) => (
                <div key={i} className={`flex items-start gap-3 px-4 py-4 rounded-2xl border ${ins.bg} border-transparent`}>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/60 shrink-0 ${ins.color}`}>
                    {ins.tag}
                </span>
                <p className="text-gray-700 text-xs leading-relaxed">{ins.text}</p>
                </div>
            ))}
            </div>
        </div>

        {/* Time-of-day heat strip */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
            <div>
                <h3 className="text-gray-900 font-semibold text-sm">Spending by Time of Day</h3>
                <p className="text-gray-400 text-[11px] mt-0.5">When you spend the most</p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <Clock size={12} /> Peak: 8–9 PM
            </div>
            </div>
            <div className="flex items-end gap-1 h-16">
            {[2,1,0,0,0,1,3,8,6,7,9,12,14,10,8,6,11,15,22,18,14,10,6,3].map((v, i) => {
                const pct = (v / 22) * 100;
                const isPeak = v >= 18;
                return (
                <div key={i} className="flex-1 group relative">
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
                    {i}:00
                    </div>
                    <div
                    className={`w-full rounded-t-sm transition-all duration-300 ${isPeak ? "bg-amber-400" : "bg-[#00C950]/30"}`}
                    style={{ height: `${Math.max(pct, 4)}%` }}
                    />
                </div>
                );
            })}
            </div>
            <div className="flex justify-between mt-2">
            <span className="text-[10px] text-gray-300">12 AM</span>
            <span className="text-[10px] text-gray-300">6 AM</span>
            <span className="text-[10px] text-gray-300">12 PM</span>
            <span className="text-[10px] text-gray-300">6 PM</span>
            <span className="text-[10px] text-gray-300">11 PM</span>
            </div>
        </div>

        </div>
    );
}