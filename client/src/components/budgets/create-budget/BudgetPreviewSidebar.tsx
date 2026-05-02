import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ChevronRight, Info } from "lucide-react";
import type { BudgetApiItem } from "@/src/types/budget";
import type { BudgetCategoryOption, CategoryMap, BudgetPeriod } from "./types";

type BudgetPreviewSidebarProps = {
    selectedCategory: BudgetCategoryOption | null;
    amount: string;
    period: BudgetPeriod;
    customStartDate: string;
    customEndDate: string;
    alertEnabled: boolean;
    alertAt: number;
    budgets: BudgetApiItem[];
    categoryMap: CategoryMap;
    allCategories: BudgetCategoryOption[];
};

export const BudgetPreviewSidebar = ({
    selectedCategory,
    amount,
    period,
    customStartDate,
    customEndDate,
    alertEnabled,
    alertAt,
    budgets,
    categoryMap,
    allCategories,
}: BudgetPreviewSidebarProps) => {
    const selectedBudget = selectedCategory && amount;
    const activeBudgets = budgets.slice(0, 5);

    return (
        <div className="space-y-4">
            <div className="sticky top-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3 px-1">Live Preview</p>

                <div className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${selectedBudget ? "border-[#00C950]/30 shadow-lg shadow-[#00C950]/8" : "border-gray-200"}`}>
                    <div className="h-1.5 bg-gray-100">
                        {selectedBudget && <div className="h-full w-0 rounded-full transition-all duration-700" style={{ backgroundColor: selectedCategory?.hex }} />}
                    </div>

                    <div className="p-5">
                        <div className="flex items-center gap-3 mb-4">
                            {selectedCategory ? (
                                <>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${selectedCategory.hex}18` }}>
                                        <selectedCategory.icon size={18} style={{ color: selectedCategory.hex }} />
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

                        <div className="mb-4">
                            <p className="text-gray-900 text-3xl font-black font-mono">{amount ? `₹${Number(amount).toLocaleString()}` : <span className="text-gray-200">₹0</span>}</p>
                            <p className="text-gray-400 text-[11px] mt-0.5">
                                {period === "monthly" ? "per month" : period === "custom" ? `${customStartDate} to ${customEndDate}` : "custom period"}
                            </p>
                        </div>

                        <div className="mb-1.5">
                            <div className="flex justify-between mb-1.5">
                                <span className="text-gray-400 text-[11px]">₹0 spent</span>
                                <span className="text-gray-400 text-[11px] font-mono">0%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full">
                                <div className="h-full w-0 rounded-full" style={{ backgroundColor: selectedCategory?.hex || "#e5e7eb" }} />
                            </div>
                            <p className="text-gray-400 text-[11px] mt-1">₹{amount ? Number(amount).toLocaleString() : "0"} remaining</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-50">
                            <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${period === "monthly" ? "bg-blue-50 text-blue-500" : "bg-amber-50 text-amber-600"}`}>
                                {period === "monthly" ? "Monthly" : "Custom"}
                            </span>
                            {alertEnabled && amount && <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-amber-50 text-amber-600">Alert at {alertAt}%</span>}
                            {!alertEnabled && <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-gray-100 text-gray-400">No alerts</span>}
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-y-2">
                    {[
                        { label: "Category selected", done: !!selectedCategory },
                        { label: "Amount set", done: !!amount && Number(amount) > 0 },
                        { label: "Period configured", done: true },
                        { label: "Alert preference saved", done: true },
                    ].map((check) => (
                        <div key={check.label} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${check.done ? "bg-[#00C950]" : "bg-gray-200"}`}>
                                {check.done ? <CheckCircle2 size={10} className="text-white" /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
                            </div>
                            <span className={`text-xs ${check.done ? "text-gray-600" : "text-gray-400"}`}>{check.label}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-5 bg-white rounded-2xl border border-gray-100 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Your Active Budgets</p>
                    <div className="space-y-2">
                        {activeBudgets.map((budget) => {
                            if (!budget.categoryId) {
                                return null;
                            }

                            const category = categoryMap[budget.categoryId];
                            if (!category) {
                                return null;
                            }

                            const cat = allCategories.find((entry) => entry.id === budget.categoryId);
                            const Icon = cat?.icon || (() => null);
                            const accentHex = cat?.hex || category.color || "#94a3b8";

                            return (
                                <div key={budget.id} className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: `${accentHex}18` }}>
                                        <Icon size={11} style={{ color: accentHex }} />
                                    </div>
                                    <span className="text-gray-600 text-xs flex-1">{category.name}</span>
                                    <ChevronRight size={12} className="text-gray-300" />
                                </div>
                            );
                        })}
                        <Link href="/budgets" className="flex items-center gap-1 text-[#00C950] text-xs font-semibold pt-1 hover:underline">
                            View all budgets <ChevronRight size={11} />
                        </Link>
                    </div>
                </div>

                <div className="mt-4 relative overflow-hidden rounded-2xl bg-[#01271E] p-4">
                    <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#00C950]/15 blur-2xl" />
                    <div className="relative">
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#00C950]">
                                <ArrowUpRight size={11} className="text-white" />
                            </div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Preview Tip</p>
                        </div>
                        <p className="text-xs leading-relaxed text-white">Spend a moment choosing the right category and amount. That keeps your budget alerts useful instead of noisy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};