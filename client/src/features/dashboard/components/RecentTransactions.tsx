"use client";

import { ArrowUpRight, Receipt } from "lucide-react";
import { Expense } from "../interface/dashboardInterface";

interface RecentTransactionsProps {
  transactions: Expense[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <div>
          <h3 className="text-gray-900 font-semibold text-sm">
            Recent Transactions
          </h3>
          <p className="text-gray-400 text-[11px] mt-0.5">Latest expenses</p>
        </div>

        <button className="text-[#00C950] text-xs font-semibold hover:underline flex items-center gap-1">
          View all <ArrowUpRight size={12} />
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-50">
        {transactions?.length === 0 ? (
          <div className="p-5 text-sm text-gray-400">No transactions yet</div>
        ) : (
          transactions
            .slice()
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .slice(0, 7)
            .map((t) => {
              return (
                <div
                  key={t.id}
                  className="group flex items-center gap-4 px-5 py-3.5 transition-all duration-200 hover:bg-green-50/40"
                >
                  {/* ICON */}
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-gray-50 text-gray-500 group-hover:bg-green-100 group-hover:text-[#00C950] transition-all">
                    <Receipt size={16} />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-sm font-medium truncate group-hover:text-[#00C950] transition-colors">
                      {t.note || t.merchant}
                    </p>

                    <p className="text-gray-400 text-[11px] group-hover:text-green-700 transition-colors">
                      {t.merchant} · {new Date(t.date).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Amount */}
                  <p className="text-sm font-semibold font-mono text-gray-800 shrink-0 group-hover:text-[#00C950] transition-colors">
                    -Rs.{t.amount.toLocaleString()}
                  </p>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
