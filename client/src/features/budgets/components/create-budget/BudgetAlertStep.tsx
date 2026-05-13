import { Bell } from "lucide-react";
import { BudgetCreateStepShell } from "./BudgetCreateStepShell";

type BudgetAlertStepProps = {
    alertEnabled: boolean;
    setAlertEnabled: (value: boolean | ((current: boolean) => boolean)) => void;
    alertAt: number;
    setAlertAt: (value: number) => void;
    amount: string;
    alertAmount: number | null;
    alertOptions: number[];
};

export const BudgetAlertStep = ({
    alertEnabled,
    setAlertEnabled,
    alertAt,
    setAlertAt,
    amount,
    alertAmount,
    alertOptions,
}: BudgetAlertStepProps) => {
    return (
        <BudgetCreateStepShell step="4" title="Spending Alert">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-500 text-xs">Notify me when I&apos;ve used this much of my budget:</p>
                    <button
                        type="button"
                        onClick={() => setAlertEnabled((current) => !current)}
                        className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${alertEnabled ? "bg-[#00C950]" : "bg-gray-200"}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${alertEnabled ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                </div>

                {alertEnabled ? (
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            {alertOptions.map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setAlertAt(value)}
                                    className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all ${alertAt === value ? "border-[#00C950] bg-[#00C950] text-white shadow-sm shadow-[#00C950]/25" : "border-gray-200 text-gray-600 hover:border-[#00C950]/40"}`}
                                >
                                    {value}%
                                </button>
                            ))}
                        </div>

                        {alertAmount !== null && amount && (
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-100">
                                <Bell size={14} className="text-amber-500 shrink-0" />
                                <p className="text-amber-700 text-xs">
                                    You&apos;ll be notified when spending reaches <span className="font-bold font-mono">Rs. {alertAmount.toLocaleString()}</span> ({alertAt}% of Rs. {Number(amount).toLocaleString()})
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-gray-400 text-xs">No alerts will be sent for this budget.</div>
                )}
            </div>
        </BudgetCreateStepShell>
    );
};