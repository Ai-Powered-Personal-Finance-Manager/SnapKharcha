"use client";

import { useState } from "react";
import {
  Plus, Search, Filter, ScanLine,
  Utensils, ShoppingBag, Car, Zap, Wifi,
  Heart, BookOpen, Dumbbell, ShoppingCart,
  Plane, Pencil as PencilIcon, MoreHorizontal,
  AlertTriangle, CheckCircle2, X, ChevronDown,
  Receipt, Calendar, Tag, ArrowDownLeft,
  TrendingDown, Wallet, Clock,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type Budget = {
  id: string;
  label: string;
  icon: React.ElementType;
  spent: number;
  total: number;
  color: string;
  hex: string;
  iconBg: string;
  iconColor: string;
};

type Expense = {
  id: number;
  budgetId: string;
  merchant: string;
  note: string;
  amount: number;
  date: string;
  time: string;
  paymentMode: "UPI" | "Card" | "Cash" | "Net Banking";
  receiptAttached: boolean;
};

// ─── Budgets (only created ones — user's actual budgets) ──────
const budgets: Budget[] = [
  { id: "food",          label: "Food & Dining",   icon: Utensils,     spent: 5400,  total: 6000,  color: "bg-orange-50",   hex: "#f97316", iconBg: "bg-orange-50",  iconColor: "text-orange-500" },
  { id: "shopping",      label: "Shopping",        icon: ShoppingBag,  spent: 3850,  total: 4000,  color: "bg-yellow-50",   hex: "#f59e0b", iconBg: "bg-yellow-50",  iconColor: "text-yellow-600" },
  { id: "transport",     label: "Transport",       icon: Car,          spent: 1100,  total: 2000,  color: "bg-blue-50",     hex: "#3b82f6", iconBg: "bg-blue-50",    iconColor: "text-blue-500"   },
  { id: "utilities",     label: "Utilities",       icon: Zap,          spent: 890,   total: 1500,  color: "bg-purple-50",   hex: "#8b5cf6", iconBg: "bg-purple-50",  iconColor: "text-purple-500" },
  { id: "subscriptions", label: "Subscriptions",   icon: Wifi,         spent: 649,   total: 1000,  color: "bg-pink-50",     hex: "#ec4899", iconBg: "bg-pink-50",    iconColor: "text-pink-500"   },
  { id: "health",        label: "Health",          icon: Heart,        spent: 200,   total: 2000,  color: "bg-teal-50",     hex: "#14b8a6", iconBg: "bg-teal-50",    iconColor: "text-teal-500"   },
  { id: "education",     label: "Education",       icon: BookOpen,     spent: 499,   total: 1000,  color: "bg-indigo-50",   hex: "#6366f1", iconBg: "bg-indigo-50",  iconColor: "text-indigo-500" },
  { id: "gym",           label: "Gym & Fitness",   icon: Dumbbell,     spent: 1200,  total: 1200,  color: "bg-green-50",    hex: "#22c55e", iconBg: "bg-green-50",   iconColor: "text-green-500"  },
  { id: "groceries",     label: "Groceries",       icon: ShoppingCart, spent: 2800,  total: 4000,  color: "bg-lime-50",     hex: "#84cc16", iconBg: "bg-lime-50",    iconColor: "text-lime-600"   },
  { id: "travel",        label: "Travel",          icon: Plane,        spent: 0,     total: 5000,  color: "bg-sky-50",      hex: "#0ea5e9", iconBg: "bg-sky-50",     iconColor: "text-sky-500"    },
];

// ─── Expenses (linked to budget IDs) ─────────────────────────
const allExpenses: Expense[] = [
    { id: 1,  budgetId: "food",      merchant: "Starbucks",         note: "Morning coffee + croissant",    amount: 480,  date: "Today",     time: "09:14 AM", paymentMode: "UPI",         receiptAttached: false },
    { id: 2,  budgetId: "food",      merchant: "Zomato",            note: "Lunch — biryani",               amount: 340,  date: "Today",     time: "01:32 PM", paymentMode: "UPI",         receiptAttached: true  },
    { id: 3,  budgetId: "transport", merchant: "Ola",               note: "Office commute",                amount: 220,  date: "Today",     time: "08:45 AM", paymentMode: "UPI",         receiptAttached: false },
    { id: 4,  budgetId: "shopping",  merchant: "Amazon",            note: "USB-C hub",                     amount: 1299, date: "Yesterday", time: "03:10 PM", paymentMode: "Card",        receiptAttached: true  },
    { id: 5,  budgetId: "food",      merchant: "Swiggy",            note: "Dinner — pizza",                amount: 520,  date: "Yesterday", time: "08:55 PM", paymentMode: "UPI",         receiptAttached: false },
    { id: 6,  budgetId: "groceries", merchant: "D-Mart",            note: "Weekly groceries",              amount: 1840, date: "Yesterday", time: "06:20 PM", paymentMode: "Cash",        receiptAttached: false },
    { id: 7,  budgetId: "utilities", merchant: "MSEB",              note: "Electricity bill — April",      amount: 890,  date: "Apr 9",     time: "11:00 AM", paymentMode: "Net Banking", receiptAttached: true  },
    { id: 8,  budgetId: "subscriptions", merchant: "Netflix",       note: "Monthly subscription",         amount: 199,  date: "Apr 8",     time: "12:00 AM", paymentMode: "Card",        receiptAttached: false },
    { id: 9,  budgetId: "subscriptions", merchant: "Spotify",       note: "Music premium",                amount: 119,  date: "Apr 8",     time: "12:00 AM", paymentMode: "Card",        receiptAttached: false },
    { id: 10, budgetId: "education", merchant: "Udemy",             note: "Next.js course",               amount: 499,  date: "Apr 7",     time: "09:30 PM", paymentMode: "Card",        receiptAttached: true  },
    { id: 11, budgetId: "gym",       merchant: "Cult.fit",          note: "Monthly membership",           amount: 1200, date: "Apr 1",     time: "12:00 AM", paymentMode: "UPI",         receiptAttached: true  },
    { id: 12, budgetId: "food",      merchant: "Café Coffee Day",   note: "Client meeting",               amount: 680,  date: "Apr 6",     time: "03:45 PM", paymentMode: "Card",        receiptAttached: true  },
    { id: 13, budgetId: "shopping",  merchant: "Myntra",            note: "Summer t-shirts × 3",          amount: 1299, date: "Apr 5",     time: "07:22 PM", paymentMode: "UPI",         receiptAttached: false },
    { id: 14, budgetId: "transport", merchant: "IRCTC",             note: "Train tickets — Pune",         amount: 480,  date: "Apr 4",     time: "10:00 AM", paymentMode: "Net Banking", receiptAttached: true  },
    { id: 15, budgetId: "health",    merchant: "Apollo Pharmacy",   note: "Vitamins + paracetamol",       amount: 200,  date: "Apr 3",     time: "05:15 PM", paymentMode: "Cash",        receiptAttached: false },
    { id: 16, budgetId: "groceries", merchant: "BigBasket",         note: "Fruits & vegetables",          amount: 680,  date: "Apr 2",     time: "02:10 PM", paymentMode: "UPI",         receiptAttached: false },
    { id: 17, budgetId: "shopping",  merchant: "Nykaa",             note: "Skincare products",            amount: 852,  date: "Apr 1",     time: "04:40 PM", paymentMode: "Card",        receiptAttached: false },
    { id: 18, budgetId: "subscriptions", merchant: "Amazon Prime",  note: "Annual plan (monthly share)",  amount: 145,  date: "Apr 1",     time: "12:00 AM", paymentMode: "Card",        receiptAttached: false },
    { id: 19, budgetId: "food",      merchant: "Barbeque Nation",   note: "Family dinner",                amount: 2200, date: "Apr 1",     time: "08:30 PM", paymentMode: "Card",        receiptAttached: true  },
    { id: 20, budgetId: "groceries", merchant: "Reliance Fresh",    note: "Daily essentials",             amount: 280,  date: "Apr 1",     time: "09:00 AM", paymentMode: "Cash",        receiptAttached: false },
];

// ─── Helpers ──────────────────────────────────────────────────
const paymentColors: Record<string, string> = {
    "UPI":         "bg-[#00C950]/8 text-[#00C950]",
    "Card":        "bg-blue-50 text-blue-500",
    "Cash":        "bg-amber-50 text-amber-600",
    "Net Banking": "bg-purple-50 text-purple-500",
};

const totalSpent   = allExpenses.reduce((a, e) => a + e.amount, 0);
const todayExpenses = allExpenses.filter((e) => e.date === "Today");
const todayTotal   = todayExpenses.reduce((a, e) => a + e.amount, 0);

// Group expenses by date
const grouped: Record<string, Expense[]> = {};
allExpenses.forEach((e) => {
    if (!grouped[e.date]) grouped[e.date] = [];
    grouped[e.date].push(e);
});
const dateGroups = Object.entries(grouped);

// ─── Add Expense Modal ────────────────────────────────────────
function AddExpenseModal({ onClose }: { onClose: () => void }) {
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
    const [amount, setAmount]   = useState("");
    const [merchant, setMerchant] = useState("");
    const [note, setNote]       = useState("");
    const [step, setStep]       = useState<1 | 2>(1);

    const remaining = selectedBudget
        ? selectedBudget.total - selectedBudget.spent
        : null;
    const wouldExceed = selectedBudget && amount
        ? Number(amount) > (selectedBudget.total - selectedBudget.spent)
        : false;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-50">
            <div>
                <h3 className="text-gray-900 font-bold text-base">Add Expense</h3>
                <p className="text-gray-400 text-xs mt-0.5">Charge to one of your active budgets</p>
            </div>
            <button onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                <X size={15} />
            </button>
            </div>

            <div className="px-6 py-5 space-y-4">

            {/* Step 1: Choose budget */}
            <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                1. Choose Budget *
                </label>
                {selectedBudget ? (
                <button
                    onClick={() => setSelectedBudget(null)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-[#00C950] bg-[#00C950]/5 transition-all">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${selectedBudget.iconBg}`}>
                    <selectedBudget.icon size={16} className={selectedBudget.iconColor} />
                    </div>
                    <div className="flex-1 text-left">
                    <p className="text-gray-800 text-sm font-semibold">{selectedBudget.label}</p>
                    <p className="text-gray-400 text-[11px]">
                        ₹{(selectedBudget.total - selectedBudget.spent).toLocaleString()} remaining of ₹{selectedBudget.total.toLocaleString()}
                    </p>
                    </div>
                    <CheckCircle2 size={16} className="text-[#00C950] shrink-0" />
                </button>
                ) : (
                <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                    {budgets.map((b) => {
                    const rem = b.total - b.spent;
                    const pct = Math.round((b.spent / b.total) * 100);
                    const Icon = b.icon;
                    const isFull = rem <= 0;
                    return (
                        <button key={b.id}
                        onClick={() => !isFull && setSelectedBudget(b)}
                        disabled={isFull}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all ${isFull ? "border-gray-100 opacity-40 cursor-not-allowed" : "border-gray-200 hover:border-[#00C950]/40 hover:bg-[#00C950]/3 cursor-pointer"}`}>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${b.iconBg}`}>
                            <Icon size={14} className={b.iconColor} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-gray-700 text-xs font-semibold truncate">{b.label}</p>
                            <p className={`text-[10px] font-mono ${isFull ? "text-red-400" : "text-gray-400"}`}>
                            {isFull ? "Budget full" : `₹${rem.toLocaleString()} left`}
                            </p>
                            {/* Mini bar */}
                            <div className="mt-1 h-1 bg-gray-100 rounded-full overflow-hidden w-full">
                            <div className="h-full rounded-full"
                                style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: pct >= 90 ? "#ef4444" : b.hex }} />
                            </div>
                        </div>
                        </button>
                    );
                    })}
                </div>
                )}
            </div>

            {/* Step 2: Details — only shown after budget selected */}
            {selectedBudget && (
                <>
                {/* Amount */}
                <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                    2. Amount *
                    </label>
                    <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${wouldExceed ? "border-red-300 bg-red-50/30" : "border-gray-200 focus-within:border-[#00C950] focus-within:bg-[#00C950]/2"}`}>
                    <span className="text-gray-500 font-semibold text-sm">₹</span>
                    <input
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 bg-transparent text-gray-900 text-xl font-bold font-mono outline-none placeholder:text-gray-300"
                    />
                    </div>
                    {/* Remaining indicator */}
                    {remaining !== null && (
                    <div className={`flex items-center gap-1.5 mt-1.5 text-[11px] ${wouldExceed ? "text-red-500" : "text-gray-400"}`}>
                        {wouldExceed
                        ? <><AlertTriangle size={11} /> Exceeds remaining budget of ₹{remaining.toLocaleString()}</>
                        : <><Wallet size={11} /> ₹{remaining.toLocaleString()} available in {selectedBudget.label}</>
                        }
                    </div>
                    )}
                </div>

                {/* Merchant */}
                <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                    3. Merchant / Where *
                    </label>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 focus-within:border-[#00C950] transition-all">
                    <Receipt size={14} className="text-gray-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="e.g. Zomato, D-Mart, Amazon…"
                        value={merchant}
                        onChange={(e) => setMerchant(e.target.value)}
                        className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-300"
                    />
                    </div>
                </div>

                {/* Note */}
                <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                    4. Note (optional)
                    </label>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 focus-within:border-[#00C950] transition-all">
                    <Tag size={14} className="text-gray-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="e.g. lunch with team, birthday gift…"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-300"
                    />
                    </div>
                </div>

                {/* Date + Payment row */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">Date</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-gray-200 focus-within:border-[#00C950] transition-all">
                        <Calendar size={13} className="text-gray-400 shrink-0" />
                        <input type="date" defaultValue="2025-04-11"
                        className="flex-1 bg-transparent text-xs text-gray-700 outline-none" />
                    </div>
                    </div>
                    <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">Payment</label>
                    <div className="relative">
                        <select className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border-2 border-gray-200 text-xs text-gray-700 bg-white outline-none focus:border-[#00C950] transition-all">
                        <option>UPI</option>
                        <option>Card</option>
                        <option>Cash</option>
                        <option>Net Banking</option>
                        </select>
                        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    </div>
                </div>

                {/* Scan receipt */}
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-xs font-medium hover:border-[#00C950]/40 hover:text-[#00C950] hover:bg-[#00C950]/3 transition-all">
                    <ScanLine size={14} /> Scan Receipt (optional)
                </button>
                </>
            )}
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-6 pb-6">
            <button onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                Cancel
            </button>
            <button
                disabled={!selectedBudget || !amount || !merchant}
                className="flex-1 py-3 rounded-xl bg-[#00C950] text-white text-sm font-semibold shadow-md shadow-[#00C950]/20 hover:bg-[#00b347] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                Add Expense
            </button>
            </div>
        </div>
        </div>
    );
}

// ─── Budget Health Pill ───────────────────────────────────────
function BudgetHealthBar({ b }: { b: Budget }) {
    const pct = Math.min(Math.round((b.spent / b.total) * 100), 100);
    const over = pct >= 90;
    const full = pct >= 100;
    const Icon = b.icon;

    return (
        <div className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${full ? "border-red-100 bg-red-50/40" : over ? "border-amber-100 bg-amber-50/30" : "border-gray-100 bg-white hover:border-gray-200"}`}>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${b.iconBg}`}>
            <Icon size={15} className={b.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
            <p className="text-gray-700 text-xs font-semibold truncate">{b.label}</p>
            <p className={`text-[10px] font-bold font-mono shrink-0 ml-2 ${full ? "text-red-500" : over ? "text-amber-600" : "text-gray-500"}`}>
                {pct}%
            </p>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, backgroundColor: full ? "#ef4444" : over ? "#f59e0b" : b.hex }} />
            </div>
            <div className="flex justify-between mt-1">
            <p className="text-[10px] text-gray-400 font-mono">₹{b.spent.toLocaleString()}</p>
            <p className="text-[10px] text-gray-400 font-mono">₹{b.total.toLocaleString()}</p>
            </div>
        </div>
        </div>
    );
}

// ─── Expense Row ──────────────────────────────────────────────
function ExpenseRow({ e }: { e: Expense }) {
    const budget = budgets.find((b) => b.id === e.budgetId)!;
    const Icon   = budget.icon;

    return (
        <div className="group flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/60 transition-colors">
        {/* Category icon */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${budget.iconBg}`}>
            <Icon size={16} className={budget.iconColor} />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
            <p className="text-gray-800 text-sm font-medium">{e.merchant}</p>
            {e.receiptAttached && (
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-[#00C950]/8 text-[#00C950]">
                Receipt
                </span>
            )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
            <p className="text-gray-400 text-[11px] truncate">{e.note || budget.label}</p>
            <span className="text-gray-200 text-[11px]">·</span>
            <p className="text-gray-300 text-[11px] shrink-0">{e.time}</p>
            </div>
        </div>

        {/* Budget tag */}
        <span className={`hidden md:block text-[10px] font-semibold px-2 py-1 rounded-lg shrink-0 ${budget.iconBg} ${budget.iconColor}`}>
            {budget.label}
        </span>

        {/* Payment mode */}
        <span className={`hidden lg:block text-[10px] font-semibold px-2 py-1 rounded-lg shrink-0 ${paymentColors[e.paymentMode]}`}>
            {e.paymentMode}
        </span>

        {/* Amount */}
        <p className="text-gray-900 text-sm font-bold font-mono shrink-0">
            −₹{e.amount.toLocaleString()}
        </p>

        {/* Actions — hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0">
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <PencilIcon size={13} />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <MoreHorizontal size={13} />
            </button>
        </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────
export default function ExpensesPage() {
    const [showModal, setShowModal]         = useState(false);
    const [activeBudgetFilter, setFilter]   = useState<string>("all");
    const [searchQuery, setSearch]          = useState("");

    // Filter expenses
    const filtered = allExpenses.filter((e) => {
        const matchesBudget = activeBudgetFilter === "all" || e.budgetId === activeBudgetFilter;
        const matchesSearch = searchQuery === "" ||
        e.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.note.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesBudget && matchesSearch;
    });

    // Regroup after filtering
    const filteredGrouped: Record<string, Expense[]> = {};
    filtered.forEach((e) => {
        if (!filteredGrouped[e.date]) filteredGrouped[e.date] = [];
        filteredGrouped[e.date].push(e);
    });
    const filteredGroups = Object.entries(filteredGrouped);

    const nearLimitBudgets = budgets.filter((b) => (b.spent / b.total) >= 0.9);

    return (
        <>
        {showModal && <AddExpenseModal onClose={() => setShowModal(false)} />}

        <div className="flex gap-6">

            {/* ── Left: main content ─────────────────────────────── */}
            <div className="flex-1 min-w-0 space-y-5">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                <h2 className="text-gray-900 font-bold text-xl tracking-tight">Expenses</h2>
                <p className="text-gray-400 text-sm mt-0.5">April 2025 · Logged against your active budgets</p>
                </div>
                <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors">
                    <ScanLine size={14} /> Scan Receipt
                </button>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C950] text-white text-xs font-semibold shadow-md shadow-[#00C950]/20 hover:bg-[#00b347] transition-colors">
                    <Plus size={14} /> Add Expense
                </button>
                </div>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-gray-400 text-xs">Total Spent</p>
                <p className="text-gray-900 text-xl font-bold font-mono mt-1">₹{totalSpent.toLocaleString()}</p>
                <p className="text-gray-400 text-[11px] mt-1">across all budgets</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-gray-400 text-xs">Today</p>
                <p className="text-gray-900 text-xl font-bold font-mono mt-1">₹{todayTotal.toLocaleString()}</p>
                <p className="text-gray-400 text-[11px] mt-1">{todayExpenses.length} transactions</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-gray-400 text-xs">Avg per Day</p>
                <p className="text-gray-900 text-xl font-bold font-mono mt-1">₹1,674</p>
                <div className="flex items-center gap-1 mt-1 text-[#00C950] text-[11px] font-semibold">
                    <TrendingDown size={11} /> −8% vs last week
                </div>
                </div>
            </div>

            {/* Near-limit warning */}
            {nearLimitBudgets.length > 0 && activeBudgetFilter === "all" && (
                <div className="flex items-start gap-3 px-4 py-3.5 rounded-2xl bg-amber-50 border border-amber-100">
                <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                    <p className="text-amber-700 text-xs leading-relaxed">
                    <span className="font-semibold">
                        {nearLimitBudgets.map((b) => b.label).join(", ")}
                    </span>
                    {" "}
                    {nearLimitBudgets.length === 1 ? "is" : "are"} near the limit. New expenses in {nearLimitBudgets.length === 1 ? "this category" : "these categories"} will be flagged.
                    </p>
                </div>
                </div>
            )}

            {/* Search + filter bar */}
            <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-gray-200 focus-within:border-[#00C950] focus-within:ring-2 focus-within:ring-[#00C950]/10 transition-all">
                <Search size={14} className="text-gray-400 shrink-0" />
                <input type="text" placeholder="Search expenses…"
                    value={searchQuery}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none" />
                {searchQuery && (
                    <button onClick={() => setSearch("")}>
                    <X size={13} className="text-gray-400 hover:text-gray-600" />
                    </button>
                )}
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-500 text-xs font-medium hover:bg-gray-50 transition-colors">
                <Filter size={13} /> Filter
                </button>
            </div>

            {/* Budget filter chips */}
            <div className="flex items-center gap-2 flex-wrap">
                <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeBudgetFilter === "all" ? "bg-[#00C950] text-white shadow-sm" : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                All Budgets
                </button>
                {budgets.map((b) => {
                const Icon = b.icon;
                const isActive = activeBudgetFilter === b.id;
                const expCount = allExpenses.filter((e) => e.budgetId === b.id).length;
                if (expCount === 0) return null;
                return (
                    <button key={b.id}
                    onClick={() => setFilter(isActive ? "all" : b.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${isActive ? `text-white shadow-sm` : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"}`}
                    style={isActive ? { backgroundColor: b.hex } : {}}>
                    <Icon size={11} />
                    {b.label}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>
                        {expCount}
                    </span>
                    </button>
                );
                })}
            </div>

            {/* Expenses list grouped by date */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {filteredGroups.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Receipt size={20} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm font-medium">No expenses found</p>
                    <p className="text-gray-400 text-xs">Try a different filter or add your first expense</p>
                    <button onClick={() => setShowModal(true)}
                    className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00C950] text-white text-xs font-semibold">
                    <Plus size={13} /> Add Expense
                    </button>
                </div>
                ) : (
                filteredGroups.map(([date, expenses]) => {
                    const dayTotal = expenses.reduce((a, e) => a + e.amount, 0);
                    return (
                    <div key={date}>
                        {/* Date header */}
                        <div className="flex items-center justify-between px-5 py-2.5 bg-gray-50/70 border-y border-gray-50 first:border-t-0">
                        <div className="flex items-center gap-2">
                            <Clock size={12} className="text-gray-400" />
                            <p className="text-gray-500 text-xs font-semibold">{date}</p>
                        </div>
                        <p className="text-gray-500 text-xs font-mono">−₹{dayTotal.toLocaleString()}</p>
                        </div>
                        {/* Expense rows */}
                        <div className="divide-y divide-gray-50/80">
                        {expenses.map((e) => <ExpenseRow key={e.id} e={e} />)}
                        </div>
                    </div>
                    );
                })
                )}

                {/* Footer total */}
                {filteredGroups.length > 0 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50/50">
                    <p className="text-gray-500 text-xs font-medium">
                    {filtered.length} expense{filtered.length !== 1 ? "s" : ""}
                    {activeBudgetFilter !== "all" && ` in ${budgets.find((b) => b.id === activeBudgetFilter)?.label}`}
                    </p>
                    <p className="text-gray-800 text-sm font-bold font-mono">
                    −₹{filtered.reduce((a, e) => a + e.amount, 0).toLocaleString()}
                    </p>
                </div>
                )}
            </div>

            </div>

            {/* ── Right: Budget health sidebar ─────────────────── */}
            <div className="hidden xl:flex flex-col w-72 shrink-0 space-y-5">

            {/* Budget health */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-50">
                <div>
                    <h3 className="text-gray-900 font-semibold text-sm">Budget Health</h3>
                    <p className="text-gray-400 text-[11px] mt-0.5">Click to filter expenses</p>
                </div>
                <ArrowDownLeft size={14} className="text-gray-300" />
                </div>
                <div className="p-3 space-y-2">
                {budgets.map((b) => <BudgetHealthBar key={b.id} b={b} />)}
                </div>
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
                <h3 className="text-gray-900 font-semibold text-sm">This Month</h3>
                {[
                { label: "Budgets created",   value: budgets.length.toString(),                                          color: "text-gray-900" },
                { label: "Budgets at limit",  value: budgets.filter((b) => b.spent >= b.total).length.toString(),       color: "text-red-500"  },
                { label: "Budgets near limit",value: nearLimitBudgets.length.toString(),                                 color: "text-amber-600"},
                { label: "Total expenses",    value: allExpenses.length.toString(),                                      color: "text-gray-900" },
                { label: "Largest expense",   value: `₹${Math.max(...allExpenses.map((e) => e.amount)).toLocaleString()}`, color: "text-gray-900"},
                ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                    <p className="text-gray-400 text-xs">{s.label}</p>
                    <p className={`text-xs font-bold font-mono ${s.color}`}>{s.value}</p>
                </div>
                ))}
            </div>

            {/* AI tip */}
            <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-4">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#00C950]/15 rounded-full blur-2xl" />
                <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-[#00C950] flex items-center justify-center shrink-0">
                    <Zap size={11} className="text-white" />
                    </div>
                    <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider">AI Tip</p>
                </div>
                <p className="text-white text-xs leading-relaxed">
                    You've spent <span className="text-[#00C950] font-semibold">₹2,200 in one food expense</span> (Barbeque Nation). Spreading dining-out across smaller visits keeps your budget healthier.
                </p>
                </div>
            </div>

            </div>
        </div>
        </>
    );
}