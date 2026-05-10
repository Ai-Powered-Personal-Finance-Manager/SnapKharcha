"use client";

import { ArrowUpRight } from "lucide-react";

// Transaction type definition
type Transaction = {
    icon: React.ComponentType<{ size?: number }>;
    label: string;
    category: string;
    amount: string;
    time: string;
    color: string;
};

// Color mapping for transaction category icons
const categoryColors: Record<string, string> = {
    orange: "bg-orange-50 text-orange-500",
    blue: "bg-blue-50 text-blue-500",
    yellow: "bg-yellow-50 text-yellow-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-500",
};

interface RecentTransactionsProps {
    transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
    return (
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Header section with title and view all link */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div>
                    <h3 className="text-gray-900 font-semibold text-sm">Recent Transactions</h3>
                    <p className="text-gray-400 text-[11px] mt-0.5">Last 7 days</p>
                </div>
                <button className="text-[#00C950] text-xs font-semibold hover:underline flex items-center gap-1">
                    View all <ArrowUpRight size={12} />
                </button>
            </div>

            {/* Transactions list */}
            <div className="divide-y divide-gray-50">
                {transactions.map((t, i) => {
                    const Icon = t.icon;
                    const isIncome = t.amount.startsWith("+");
                    return (
                        <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                            {/* Icon container */}
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${categoryColors[t.color]}`}>
                                <Icon size={16} />
                            </div>

                            {/* Transaction details */}
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-800 text-sm font-medium truncate">{t.label}</p>
                                <p className="text-gray-400 text-[11px]">{t.category} · {t.time}</p>
                            </div>

                            {/* Amount */}
                            <p className={`text-sm font-semibold font-mono shrink-0 ${isIncome ? "text-[#00C950]" : "text-gray-800"}`}>
                                {t.amount}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
