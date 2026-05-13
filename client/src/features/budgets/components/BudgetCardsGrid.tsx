import { Plus } from "lucide-react";
import { BudgetCard } from "./BudgetCard";
import { BudgetApiItem } from "@/src/features/budgets/types";
import { useRouter } from "next/navigation";

interface gridProps {
    budgets?: BudgetApiItem[];
}

export const BudgetCardsGrid = ({ 
    budgets 
}: gridProps) => {
    const router = useRouter();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {budgets?.map((budget) => (
                <BudgetCard key={budget.id} budgetData={budget} />
            ))}

            {/* Add new budget card */}
            <button onClick={() => router.push("/budgets/create") } className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border-2 border-dashed border-gray-200 p-5 hover:border-[#00C950]/40 hover:bg-[#00C950]/2 transition-all duration-200 min-h-[180px] group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#00C950]/10 flex items-center justify-center transition-colors">
                    <Plus size={18} className="text-gray-400 group-hover:text-[#00C950] transition-colors" />
                </div>
                <p className="text-gray-400 group-hover:text-[#00C950] text-sm font-medium transition-colors">Add Budget</p>
            </button>
        </div>
    )
}