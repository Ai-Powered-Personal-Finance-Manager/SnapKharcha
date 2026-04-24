interface BudgetBannerProps {
    totalBudget: number;
    totalSpent: number;
    overallPct: number;
}

export const BudgetBanner = ({
    totalBudget,
    totalSpent,
    overallPct
}: BudgetBannerProps) => {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-6">
            {/* Background pattern */}
            <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#00C950]/10 rounded-full blur-3xl" />

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                    <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Total Budget</p>
                    <p className="text-white text-xl font-bold font-mono">Rs.{totalBudget.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Spent</p>
                    <p className="text-white text-xl font-bold font-mono">Rs.{totalSpent.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Remaining</p>
                    <p className="text-[#00C950] text-xl font-bold font-mono">Rs.{(totalBudget - totalSpent).toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Overall Used</p>
                    <p className="text-white text-xl font-bold font-mono">{overallPct}%</p>
                </div>
            </div>

            {/* Overall progress */}
            <div className="relative mt-5">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full bg-[#00C950] transition-all duration-700"
                        style={{ width: `${overallPct}%` }}
                    />
                </div>
                <div className="flex justify-between mt-1.5">
                    <p className="text-white/30 text-[10px]">0%</p>
                    <p className="text-white/30 text-[10px]">100%</p>
                </div>
            </div>
        </div>
    )
}