import { Calendar } from "lucide-react";
import { BudgetCreateStepShell } from "./BudgetCreateStepShell";
import type { BudgetPeriod } from "./types";

type BudgetAmountPeriodStepProps = {
    amount: string;
    setAmount: (value: string) => void;
    period: BudgetPeriod;
    setPeriod: (value: BudgetPeriod) => void;
    customStartDate: string;
    setCustomStartDate: (value: string) => void;
    customEndDate: string;
    setCustomEndDate: (value: string) => void;
    dateError: string;
    periods: readonly { id: BudgetPeriod; label: string; desc: string }[];
};

export const BudgetAmountPeriodStep = ({
    amount,
    setAmount,
    period,
    setPeriod,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    dateError,
    periods,
}: BudgetAmountPeriodStepProps) => {
    return (
        <BudgetCreateStepShell step="3" title="Set Amount & Period">
            <div className="space-y-5">
                <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">Budget Amount *</label>
                    <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 transition-all ${amount && Number(amount) > 0 ? "border-[#00C950] bg-[#00C950]/3" : "border-gray-200 focus-within:border-[#00C950] focus-within:bg-[#00C950]/2"}`}>
                        <span className="text-gray-400 text-2xl font-bold">Rs.</span>
                        <input
                            type="number"
                            placeholder="0"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            className="flex-1 bg-transparent text-gray-900 text-3xl font-black font-mono outline-none placeholder:text-gray-200"
                        />
                        <span className="text-gray-400 text-sm">/ month</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-[11px] text-gray-400">Quick:</span>
                        {[1000, 2000, 3000, 5000, 10000, 15000].map((value) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setAmount(value.toString())}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${amount === value.toString() ? "bg-[#00C950] text-white border-transparent" : "border-gray-200 text-gray-500 hover:border-[#00C950]/40 hover:text-[#00C950]"}`}
                            >
                                Rs.{(value / 1000).toFixed(0)}k
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">Reset Period</label>
                    <div className="grid grid-cols-3 gap-3">
                        {periods.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => setPeriod(option.id)}
                                className={`flex flex-col items-start p-3.5 rounded-xl border-2 text-left transition-all ${period === option.id ? "border-[#00C950] bg-[#00C950]/5" : "border-gray-200 hover:border-gray-300"}`}
                            >
                                <p className={`text-xs font-bold ${period === option.id ? "text-[#00C950]" : "text-gray-700"}`}>{option.label}</p>
                                <p className="text-gray-400 text-[10px] mt-1 leading-snug">{option.desc}</p>
                            </button>
                        ))}
                    </div>

                    {period === "custom" && (
                        <div>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                <div>
                                    <label className="text-[11px] text-gray-400 block mb-1">Start Date</label>
                                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 focus-within:border-[#00C950] transition-all">
                                        <Calendar size={13} className="text-gray-400" />
                                        <input
                                            type="date"
                                            value={customStartDate}
                                            onChange={(event) => setCustomStartDate(event.target.value)}
                                            className="flex-1 bg-transparent text-xs text-gray-700 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] text-gray-400 block mb-1">End Date</label>
                                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 focus-within:border-[#00C950] transition-all">
                                        <Calendar size={13} className="text-gray-400" />
                                        <input
                                            type="date"
                                            value={customEndDate}
                                            onChange={(event) => setCustomEndDate(event.target.value)}
                                            className="flex-1 bg-transparent text-xs text-gray-700 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            {dateError && <p className="text-red-500 text-[11px] mt-2">{dateError}</p>}
                        </div>
                    )}
                </div>
            </div>
        </BudgetCreateStepShell>
    );
};