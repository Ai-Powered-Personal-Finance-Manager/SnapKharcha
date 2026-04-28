import { AlertTriangle, PiggyBank } from "lucide-react";
import { BudgetApiItem } from "@/src/types/budget";
import { BudgetCardActions } from "./BudgetCardActions";

// Utility function to lighten hex color
const lightenColor = (hex: string, percent: number = 20) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${(0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
};

export const BudgetCard = ({ budgetData }: { budgetData: BudgetApiItem }) => {
    const pct = Math.round((budgetData.spendAmount / budgetData.amount) * 100);
    const over = pct >= 90;
    const categoryColor = budgetData.category.color ?? "#94a3b8";
    const lightColor = lightenColor(categoryColor, 50);
    // const transactionCount = budgetData.expenses?.length ?? budgetData.expenseCount ?? 0;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:shadow-gray-100 transition-all duration-200 group">
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: lightColor }}
                    >
                        {/* <Icon size={18} className={budgetData.iconColor} /> */}
                        <PiggyBank size={18} style={{ color: categoryColor }} />
                    </div>
                    <div>
                        <p className="text-gray-800 text-sm font-semibold">{budgetData.category.name}</p>
                        <p className="text-gray-400 text-[11px]">
                            {/* {transactionCount} transaction{transactionCount === 1 ? "" : "s"} */}
                        </p>
                    </div>
                </div>
                <BudgetCardActions budgetData={budgetData} />
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
                <span>
                    {budgetData.alert
                        ? `Alert at Rs. ${budgetData.alertLimit?.toLocaleString() ?? Math.round(budgetData.amount * 0.8).toLocaleString()}`
                        : budgetData.note ?? "No note added"}
                </span>
            </div>
        </div>
    );
}