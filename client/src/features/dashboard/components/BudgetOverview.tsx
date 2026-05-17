// "use client";

// import { MoreHorizontal } from "lucide-react";

// // Budget item type definition
// type BudgetItem = {
//     label: string;
//     spent: number;
//     total: number;
//     color: string;
// };

// interface BudgetOverviewProps {
//     budgets: BudgetItem[];
// }

// export function BudgetOverview({ budgets }: BudgetOverviewProps) {
//     return (
//         <div className="bg-white rounded-2xl border border-gray-100 p-5">
//             {/* Header with title and more options */}
//             <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-gray-900 font-semibold text-sm">Budget Overview</h3>
//                 <button className="text-gray-400 hover:text-gray-600 transition-colors">
//                     <MoreHorizontal size={16} />
//                 </button>
//             </div>

//             {/* Budget bars list */}
//             <div className="space-y-4">
//                 {budgets.map((b) => {
//                     const pct = Math.round((b.spent / b.total) * 100);
//                     const over = pct >= 90;
//                     return (
//                         <div key={b.label}>
//                             {/* Label and amount */}
//                             <div className="flex items-center justify-between mb-1.5">
//                                 <span className="text-gray-700 text-xs font-medium">{b.label}</span>
//                                 <span className={`text-xs font-mono font-semibold ${over ? "text-red-500" : "text-gray-500"}`}>
//                                     Rs.{b.spent.toLocaleString()} / Rs.{b.total.toLocaleString()}
//                                 </span>
//                             </div>

//                             {/* Progress bar */}
//                             <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                                 <div
//                                     className="h-full rounded-full transition-all duration-500"
//                                     style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: over ? "#ef4444" : b.color }}
//                                 />
//                             </div>

//                             {/* Percentage text */}
//                             <p className="text-[10px] text-gray-400 mt-1">{pct}% used</p>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }

"use client";

import { MoreHorizontal } from "lucide-react";
import { Budget } from "../interface/dashboardInterface";


interface BudgetOverviewProps {
  budgets: Budget[];
}

export function BudgetOverview({ budgets }: BudgetOverviewProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 font-semibold text-sm">Budget Overview</h3>

        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {budgets.map((b) => {
          const pct = Math.round((b.spendAmount / b.amount) * 100);
          const over = pct >= 90;

          return (
            <div key={b.id}>
              {/* Label + Amount */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-gray-700 text-xs font-medium">
                  {b.name}
                </span>

                <span
                  className={`text-xs font-mono font-semibold ${
                    over ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  Rs.{b.spendAmount.toLocaleString()} / Rs.
                  {b.amount.toLocaleString()}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(pct, 100)}%`,
                    backgroundColor: over
                      ? "#ef4444"
                      : b.category?.color || "#10b981",
                  }}
                />
              </div>

              {/* Percentage */}
              <p className="text-[10px] text-gray-400 mt-1">{pct}% used</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
