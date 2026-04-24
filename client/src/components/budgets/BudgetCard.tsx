import { AlertTriangle, MoreHorizontal, PiggyBank } from "lucide-react";
import { Budget, BudgetApiItem } from "@/src/types/budget";

export const BudgetCard = ({ budgetData }: { budgetData: BudgetApiItem }) => {
    const pct = Math.round((budgetData.spendAmount / budgetData.amount) * 100);
    const over = pct >= 90;
    // const Icon = budgetData.icon;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:shadow-gray-100 transition-all duration-200 group">
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-green-200`}>
                        {/* <Icon size={18} className={budgetData.iconColor} /> */}
                        <PiggyBank size={18} className={"text-gray-500"} />
                    </div>
                    <div>
                        <p className="text-gray-800 text-sm font-semibold">{budgetData.name}</p>
                        <p className="text-gray-400 text-[11px]">{budgetData.expenses.length} transactions</p>
                    </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-gray-500">
                    <MoreHorizontal size={16} />
                </button>
            </div>

            {/* Amounts */}
            <div className="flex items-end justify-between mb-2">
                <div>
                    <p className="text-gray-900 text-lg font-bold font-mono">
                        Rs. {budgetData.spendAmount.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-[11px]">of Rs. {budgetData.amount.toLocaleString()} budget</p>
                </div>
                <p className={`text-sm font-bold font-mono ${over ? "text-red-500" : "text-gray-400"}`}>
                    {pct}%
                </p>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                        width: `${Math.min(pct, 100)}%`,
                        backgroundColor: over ? "#ef4444" : "#00C950",
                    }}
                />
            </div>

            {/* Tip row */}
            <div className={`flex items-center gap-1.5 text-[11px] ${over ? "text-red-500" : "text-gray-400"}`}>
                {over && <AlertTriangle size={11} className="shrink-0" />}
                {/* <span>{budgetData.tip}</span> */}
                <span>this is alert section</span>
            </div>
        </div>
    );
}