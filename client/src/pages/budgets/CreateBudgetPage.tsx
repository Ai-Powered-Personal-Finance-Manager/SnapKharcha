"use client";

import { useState } from "react";
import Link from "next/link";
import type { BudgetCategory } from "@/src/types/budget";
import {
  ArrowLeft, Utensils, ShoppingBag, Car, Zap, Wifi,
  Heart, BookOpen, Dumbbell, ShoppingCart, Plane,
  Pencil, Gamepad2, Coffee, Bus, Scissors, Gift,
  Home, Music, Shirt, Baby, PawPrint, Wrench,
  AlertTriangle, Bell, CheckCircle2, ChevronRight,
  Info, Sparkles, Calendar,
} from "lucide-react";

// ─── All available budget categories ──────────────────────────
const categories: BudgetCategory[] = [
  { id: "food",           label: "Food & Dining",     icon: Utensils,    hex: "#f97316", bg: "bg-orange-50",  text: "text-orange-500",  desc: "Restaurants, cafés, food delivery" },
  { id: "groceries",      label: "Groceries",         icon: ShoppingCart,hex: "#84cc16", bg: "bg-lime-50",    text: "text-lime-600",    desc: "Supermarket, vegetables, dairy"    },
  { id: "shopping",       label: "Shopping",          icon: ShoppingBag, hex: "#f59e0b", bg: "bg-yellow-50",  text: "text-yellow-600",  desc: "Clothing, electronics, online"     },
  { id: "transport",      label: "Transport",         icon: Car,         hex: "#3b82f6", bg: "bg-blue-50",    text: "text-blue-500",    desc: "Cabs, fuel, auto, metro"          },
  { id: "utilities",      label: "Utilities",         icon: Zap,         hex: "#8b5cf6", bg: "bg-purple-50",  text: "text-purple-500",  desc: "Electricity, water, gas"          },
  { id: "subscriptions",  label: "Subscriptions",     icon: Wifi,        hex: "#ec4899", bg: "bg-pink-50",    text: "text-pink-500",    desc: "Netflix, Spotify, Amazon Prime"   },
  { id: "health",         label: "Health & Medical",  icon: Heart,       hex: "#14b8a6", bg: "bg-teal-50",    text: "text-teal-500",    desc: "Doctor, pharmacy, labs"           },
  { id: "education",      label: "Education",         icon: BookOpen,    hex: "#6366f1", bg: "bg-indigo-50",  text: "text-indigo-500",  desc: "Courses, books, tuition"          },
  { id: "gym",            label: "Gym & Fitness",     icon: Dumbbell,    hex: "#22c55e", bg: "bg-green-50",   text: "text-green-600",   desc: "Membership, equipment, classes"   },
  { id: "travel",         label: "Travel & Trips",    icon: Plane,       hex: "#0ea5e9", bg: "bg-sky-50",     text: "text-sky-500",     desc: "Flights, hotels, sightseeing"     },
  { id: "entertainment",  label: "Entertainment",     icon: Gamepad2,    hex: "#a855f7", bg: "bg-violet-50",  text: "text-violet-500",  desc: "Movies, gaming, events"           },
  { id: "coffee",         label: "Coffee & Tea",      icon: Coffee,      hex: "#d97706", bg: "bg-amber-50",   text: "text-amber-600",   desc: "Cafés, tea stalls, beverages"     },
  { id: "publictravel",   label: "Public Transport",  icon: Bus,         hex: "#0891b2", bg: "bg-cyan-50",    text: "text-cyan-600",    desc: "Bus, metro, train passes"         },
  { id: "salon",          label: "Salon & Grooming",  icon: Scissors,    hex: "#be185d", bg: "bg-rose-50",    text: "text-rose-600",    desc: "Haircut, parlour, grooming"       },
  { id: "gifts",          label: "Gifts & Occasions", icon: Gift,        hex: "#7c3aed", bg: "bg-purple-50",  text: "text-purple-600",  desc: "Birthday gifts, festivals"        },
  { id: "rent",           label: "Rent & Housing",    icon: Home,        hex: "#b45309", bg: "bg-amber-50",   text: "text-amber-700",   desc: "Rent, maintenance, society fees"  },
  { id: "music",          label: "Music & Streaming", icon: Music,       hex: "#db2777", bg: "bg-pink-50",    text: "text-pink-600",    desc: "Concerts, streaming, instruments" },
  { id: "clothing",       label: "Clothing",          icon: Shirt,       hex: "#0284c7", bg: "bg-sky-50",     text: "text-sky-600",     desc: "Clothes, shoes, accessories"      },
  { id: "kids",           label: "Kids & Family",     icon: Baby,        hex: "#f59e0b", bg: "bg-yellow-50",  text: "text-yellow-600",  desc: "School fees, toys, baby items"    },
  { id: "pets",           label: "Pets",              icon: PawPrint,    hex: "#65a30d", bg: "bg-lime-50",    text: "text-lime-600",    desc: "Food, vet, grooming"              },
  { id: "stationery",     label: "Stationery",        icon: Pencil,      hex: "#6366f1", bg: "bg-indigo-50",  text: "text-indigo-500",  desc: "Pens, notebooks, office supplies" },
  { id: "repairs",        label: "Repairs & Service", icon: Wrench,      hex: "#78716c", bg: "bg-stone-50",   text: "text-stone-500",   desc: "Phone, appliance, vehicle repairs"},
  { id: "miscellaneous",  label: "Miscellaneous",     icon: Sparkles,    hex: "#94a3b8", bg: "bg-gray-100",   text: "text-gray-500",    desc: "Everything else that doesn't fit" },
];

// ─── Already created budgets (to disable them) ────────────────
const existingBudgetIds = ["food", "shopping", "transport", "utilities", "subscriptions", "health", "education", "gym", "groceries", "travel"];

// ─── Period options ───────────────────────────────────────────
const periods = [
  { id: "monthly",  label: "Monthly",  desc: "Resets on the 1st of every month" },
  { id: "weekly",   label: "Weekly",   desc: "Resets every Monday" },
  { id: "custom",   label: "Custom",   desc: "Set your own start & end date" },
];

// ─── Alert threshold options ──────────────────────────────────
const alertOptions = [50, 75, 90, 95];

// ─── Component ─────────────────────────────────────────────────
export function CreateBudgetPage() {
    const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(null);
    const [amount, setAmount]         = useState("");
    const [period, setPeriod]         = useState("monthly");
    const [alertAt, setAlertAt]       = useState(80);
    const [alertEnabled, setAlert]    = useState(true);
    const [rollover, setRollover]     = useState(false);
    const [searchCat, setSearchCat]   = useState("");
    const [note, setNote]             = useState("");

    const filteredCats = categories.filter((c) =>
        c.label.toLowerCase().includes(searchCat.toLowerCase()) ||
        c.desc.toLowerCase().includes(searchCat.toLowerCase())
    );

    const availableCats  = filteredCats.filter((c) => !existingBudgetIds.includes(c.id));
    const existingCats   = filteredCats.filter((c) =>  existingBudgetIds.includes(c.id));

    const alertAmount = amount
        ? Math.round((Number(amount) * alertAt) / 100)
        : null;

    const canSubmit = selectedCategory && amount && Number(amount) > 0;

    return (
        <div className="max-w-5xl mx-auto space-y-6">

        {/* Back + header */}
        <div className="flex items-center gap-4">
            <Link href="/budgets"
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors shrink-0">
            <ArrowLeft size={16} />
            </Link>
            <div>
            <h2 className="text-gray-900 font-bold text-xl tracking-tight">Create Budget</h2>
            <p className="text-gray-400 text-sm mt-0.5">Set a spending limit for a category you care about</p>
            </div>
        </div>

        {/* Info callout */}
        <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-blue-50/70 border border-blue-100">
            <Info size={15} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-blue-700 text-xs leading-relaxed">
            <span className="font-semibold">How budgets work: </span>
            Budgets are monthly spending limits per category. When you log an expense, you choose which budget to deduct from.
            You can only create one budget per category. Greyed out categories already have a budget.
            </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* ── Left: Form ────────────────────────────────────── */}
            <div className="xl:col-span-2 space-y-5">

            {/* Step 1: Category picker */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00C950] text-white text-[11px] font-bold flex items-center justify-center">1</span>
                    <h3 className="text-gray-900 font-semibold text-sm">Choose Category</h3>
                    {selectedCategory && (
                    <div className={`ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${selectedCategory.bg} ${selectedCategory.text}`}>
                        <selectedCategory.icon size={11} />
                        {selectedCategory.label}
                        <button onClick={() => setSelectedCategory(null)} className="ml-1 opacity-60 hover:opacity-100">
                        ×
                        </button>
                    </div>
                    )}
                </div>
                </div>

                <div className="p-5">
                {/* Search */}
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 mb-4 focus-within:border-[#00C950] focus-within:ring-2 focus-within:ring-[#00C950]/10 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input type="text" placeholder="Search categories…"
                    value={searchCat}
                    onChange={(e) => setSearchCat(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none" />
                </div>

                {/* Available categories */}
                {availableCats.length > 0 && (
                    <div className="mb-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Available</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableCats.map((c) => {
                        const Icon = c.icon;
                        const isSelected = selectedCategory?.id === c.id;
                        return (
                            <button key={c.id}
                            onClick={() => setSelectedCategory(isSelected ? null : c)}
                            className={`group flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-150 ${isSelected
                                ? "border-[#00C950] bg-[#00C950]/5 shadow-sm"
                                : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"}`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${c.bg}`}>
                                <Icon size={16} className={c.text} />
                            </div>
                            <div className="min-w-0">
                                <p className={`text-xs font-semibold leading-tight ${isSelected ? "text-[#00C950]" : "text-gray-700"}`}>
                                {c.label}
                                </p>
                                <p className="text-gray-400 text-[10px] mt-0.5 leading-snug">{c.desc}</p>
                            </div>
                            {isSelected && (
                                <CheckCircle2 size={14} className="text-[#00C950] shrink-0 ml-auto mt-0.5" />
                            )}
                            </button>
                        );
                        })}
                    </div>
                    </div>
                )}

                {/* Already created */}
                {existingCats.length > 0 && (
                    <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-300 mb-3">Already budgeted</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {existingCats.map((c) => {
                        const Icon = c.icon;
                        return (
                            <div key={c.id}
                            className="flex items-start gap-3 p-3.5 rounded-xl border-2 border-gray-100 opacity-40 cursor-not-allowed">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${c.bg}`}>
                                <Icon size={16} className={c.text} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-500 leading-tight">{c.label}</p>
                                <p className="text-gray-300 text-[10px] mt-0.5">Budget exists</p>
                            </div>
                            </div>
                        );
                        })}
                    </div>
                    </div>
                )}

                {filteredCats.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                    No categories match "<span className="font-medium">{searchCat}</span>"
                    </div>
                )}
                </div>
            </div>

            {/* Step 2: Amount + period */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00C950] text-white text-[11px] font-bold flex items-center justify-center">2</span>
                    <h3 className="text-gray-900 font-semibold text-sm">Set Amount & Period</h3>
                </div>
                </div>

                <div className="p-6 space-y-5">
                {/* Amount input */}
                <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                    Budget Amount *
                    </label>
                    <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 transition-all ${amount && Number(amount) > 0 ? "border-[#00C950] bg-[#00C950]/3" : "border-gray-200 focus-within:border-[#00C950] focus-within:bg-[#00C950]/2"}`}>
                    <span className="text-gray-400 text-2xl font-bold">₹</span>
                    <input
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 bg-transparent text-gray-900 text-3xl font-black font-mono outline-none placeholder:text-gray-200"
                    />
                    <span className="text-gray-400 text-sm">/ {period === "weekly" ? "week" : "month"}</span>
                    </div>
                    {/* Quick presets */}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-[11px] text-gray-400">Quick:</span>
                    {[1000, 2000, 3000, 5000, 10000, 15000].map((v) => (
                        <button key={v}
                        onClick={() => setAmount(v.toString())}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${amount === v.toString() ? "bg-[#00C950] text-white border-transparent" : "border-gray-200 text-gray-500 hover:border-[#00C950]/40 hover:text-[#00C950]"}`}>
                        ₹{(v / 1000).toFixed(0)}k
                        </button>
                    ))}
                    </div>
                </div>

                {/* Period selector */}
                <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                    Reset Period
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                    {periods.map((p) => (
                        <button key={p.id}
                        onClick={() => setPeriod(p.id as any)}
                        className={`flex flex-col items-start p-3.5 rounded-xl border-2 text-left transition-all ${period === p.id ? "border-[#00C950] bg-[#00C950]/5" : "border-gray-200 hover:border-gray-300"}`}>
                        <p className={`text-xs font-bold ${period === p.id ? "text-[#00C950]" : "text-gray-700"}`}>{p.label}</p>
                        <p className="text-gray-400 text-[10px] mt-1 leading-snug">{p.desc}</p>
                        </button>
                    ))}
                    </div>
                    {/* Custom date range */}
                    {period === "custom" && (
                    <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Start Date</label>
                        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 focus-within:border-[#00C950] transition-all">
                            <Calendar size={13} className="text-gray-400" />
                            <input type="date" defaultValue="2025-04-01"
                            className="flex-1 bg-transparent text-xs text-gray-700 outline-none" />
                        </div>
                        </div>
                        <div>
                        <label className="text-[11px] text-gray-400 block mb-1">End Date</label>
                        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 focus-within:border-[#00C950] transition-all">
                            <Calendar size={13} className="text-gray-400" />
                            <input type="date" defaultValue="2025-04-30"
                            className="flex-1 bg-transparent text-xs text-gray-700 outline-none" />
                        </div>
                        </div>
                    </div>
                    )}
                </div>

                {/* Rollover toggle */}
                <div className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div>
                    <p className="text-gray-700 text-sm font-medium">Rollover unspent balance</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">
                        If you spend ₹3,000 of ₹5,000, next month starts with ₹7,000
                    </p>
                    </div>
                    <button onClick={() => setRollover((r) => !r)}
                    className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors shrink-0 ${rollover ? "bg-[#00C950]" : "bg-gray-200"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${rollover ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                </div>
                </div>
            </div>

            {/* Step 3: Alerts */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00C950] text-white text-[11px] font-bold flex items-center justify-center">3</span>
                    <h3 className="text-gray-900 font-semibold text-sm">Spending Alert</h3>
                    </div>
                    <button onClick={() => setAlert((a) => !a)}
                    className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${alertEnabled ? "bg-[#00C950]" : "bg-gray-200"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${alertEnabled ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                </div>
                </div>

                {alertEnabled && (
                <div className="p-6 space-y-4">
                    <p className="text-gray-500 text-xs">
                    Notify me when I've used this much of my budget:
                    </p>
                    <div className="flex gap-3">
                    {alertOptions.map((v) => (
                        <button key={v}
                        onClick={() => setAlertAt(v)}
                        className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all ${alertAt === v ? "border-[#00C950] bg-[#00C950] text-white shadow-sm shadow-[#00C950]/25" : "border-gray-200 text-gray-600 hover:border-[#00C950]/40"}`}>
                        {v}%
                        </button>
                    ))}
                    </div>
                    {alertAmount && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-100">
                        <Bell size={14} className="text-amber-500 shrink-0" />
                        <p className="text-amber-700 text-xs">
                        You'll be notified when spending reaches{" "}
                        <span className="font-bold font-mono">₹{alertAmount.toLocaleString()}</span>
                        {" "}({alertAt}% of ₹{Number(amount).toLocaleString()})
                        </p>
                    </div>
                    )}
                </div>
                )}
                {!alertEnabled && (
                <div className="px-6 py-4">
                    <p className="text-gray-400 text-xs">No alerts will be sent for this budget.</p>
                </div>
                )}
            </div>

            {/* Step 4: Notes */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gray-200 text-gray-500 text-[11px] font-bold flex items-center justify-center">4</span>
                    <h3 className="text-gray-900 font-semibold text-sm">Notes <span className="text-gray-400 font-normal">(optional)</span></h3>
                </div>
                </div>
                <div className="p-6">
                <textarea
                    placeholder="e.g. Includes weekend dining out, office lunches, and coffee. Exclude groceries."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-300 outline-none resize-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all"
                />
                </div>
            </div>

            {/* Submit buttons */}
            <div className="flex items-center gap-3">
                <Link href="/budgets"
                className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold text-center hover:bg-gray-50 transition-colors">
                Cancel
                </Link>
                <button
                disabled={!canSubmit}
                className="flex-1 py-3.5 rounded-xl bg-[#00C950] text-white text-sm font-bold shadow-lg shadow-[#00C950]/25 hover:bg-[#00b347] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                Create Budget
                </button>
            </div>
            </div>

            {/* ── Right: Live Preview ────────────────────────────── */}
            <div className="space-y-4">

            {/* Preview card */}
            <div className="sticky top-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3 px-1">Live Preview</p>

                <div className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${selectedCategory && amount ? "border-[#00C950]/30 shadow-lg shadow-[#00C950]/8" : "border-gray-200"}`}>
                {/* Progress bar top */}
                <div className="h-1.5 bg-gray-100">
                    {selectedCategory && amount && (
                    <div className="h-full w-0 rounded-full transition-all duration-700"
                        style={{ backgroundColor: selectedCategory.hex }} />
                    )}
                </div>

                <div className="p-5">
                    {/* Category */}
                    <div className="flex items-center gap-3 mb-4">
                    {selectedCategory ? (
                        <>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedCategory.bg}`}>
                            <selectedCategory.icon size={18} className={selectedCategory.text} />
                        </div>
                        <div>
                            <p className="text-gray-800 text-sm font-semibold">{selectedCategory.label}</p>
                            <p className="text-gray-400 text-[11px]">{selectedCategory.desc}</p>
                        </div>
                        </>
                    ) : (
                        <>
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-300 text-lg">?</span>
                        </div>
                        <div>
                            <p className="text-gray-300 text-sm font-semibold">Select a category</p>
                            <p className="text-gray-200 text-[11px]">above to preview</p>
                        </div>
                        </>
                    )}
                    </div>

                    {/* Amount display */}
                    <div className="mb-4">
                    <p className="text-gray-900 text-3xl font-black font-mono">
                        {amount ? `₹${Number(amount).toLocaleString()}` : <span className="text-gray-200">₹0</span>}
                    </p>
                    <p className="text-gray-400 text-[11px] mt-0.5">
                        per {period === "weekly" ? "week" : period === "custom" ? "custom period" : "month"}
                    </p>
                    </div>

                    {/* Progress bar (0% at start) */}
                    <div className="mb-1.5">
                    <div className="flex justify-between mb-1.5">
                        <span className="text-gray-400 text-[11px]">₹0 spent</span>
                        <span className="text-gray-400 text-[11px] font-mono">0%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-full w-0 rounded-full"
                        style={{ backgroundColor: selectedCategory?.hex || "#e5e7eb" }} />
                    </div>
                    <p className="text-gray-400 text-[11px] mt-1">
                        ₹{amount ? Number(amount).toLocaleString() : "0"} remaining
                    </p>
                    </div>

                    {/* Meta chips */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-50">
                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${period === "monthly" ? "bg-blue-50 text-blue-500" : period === "weekly" ? "bg-purple-50 text-purple-500" : "bg-amber-50 text-amber-600"}`}>
                        {periods.find(p => p.id === period)?.label}
                    </span>
                    {alertEnabled && amount && (
                        <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-amber-50 text-amber-600">
                        Alert at {alertAt}%
                        </span>
                    )}
                    {rollover && (
                        <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-[#00C950]/8 text-[#00C950]">
                        Rollover ON
                        </span>
                    )}
                    {!alertEnabled && (
                        <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-gray-100 text-gray-400">
                        No alerts
                        </span>
                    )}
                    </div>
                </div>
                </div>

                {/* Validation checklist */}
                <div className="mt-4 space-y-2">
                {[
                    { label: "Category selected",     done: !!selectedCategory },
                    { label: "Amount set",             done: !!amount && Number(amount) > 0 },
                    { label: "Period configured",      done: true },
                    { label: "Alert preference saved", done: true },
                ].map((check) => (
                    <div key={check.label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${check.done ? "bg-[#00C950]" : "bg-gray-200"}`}>
                        {check.done
                        ? <CheckCircle2 size={10} className="text-white" />
                        : <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        }
                    </div>
                    <span className={`text-xs ${check.done ? "text-gray-600" : "text-gray-400"}`}>{check.label}</span>
                    </div>
                ))}
                </div>

                {/* Existing budgets quick reference */}
                <div className="mt-5 bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Your Active Budgets</p>
                <div className="space-y-2">
                    {categories.filter(c => existingBudgetIds.includes(c.id)).slice(0, 5).map((c) => {
                    const Icon = c.icon;
                    return (
                        <div key={c.id} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center ${c.bg}`}>
                            <Icon size={11} className={c.text} />
                        </div>
                        <span className="text-gray-600 text-xs flex-1">{c.label}</span>
                        <ChevronRight size={12} className="text-gray-300" />
                        </div>
                    );
                    })}
                    <Link href="/dashboard/budgets"
                    className="flex items-center gap-1 text-[#00C950] text-xs font-semibold pt-1 hover:underline">
                    View all budgets <ChevronRight size={11} />
                    </Link>
                </div>
                </div>
            </div>
            </div>

        </div>
        </div>
    );
}
