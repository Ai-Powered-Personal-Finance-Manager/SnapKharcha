"use client";

import { Target } from "lucide-react";

interface SavingsGoalProps {
    goalName: string;
    savedAmount: number;
    targetAmount: number;
    completionDate: string;
}

export function SavingsGoal({ goalName, savedAmount, targetAmount, completionDate }: SavingsGoalProps) {
    const percentage = Math.round((savedAmount / targetAmount) * 100);
    const remainingAmount = targetAmount - savedAmount;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
            {/* Header with title and icon */}
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-gray-900 font-semibold text-sm">Savings Goal</h3>
                <Target size={15} className="text-[#00C950]" />
            </div>

            {/* Goal name */}
            <p className="text-gray-400 text-[11px] mb-4">{goalName}</p>

            {/* Circular progress + stats */}
            <div className="flex items-center gap-5">
                {/* Circular progress indicator */}
                <div className="relative w-20 h-20 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                        {/* Background circle */}
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                        {/* Progress circle */}
                        <circle
                            cx="18"
                            cy="18"
                            r="15.9"
                            fill="none"
                            stroke="#00C950"
                            strokeWidth="3"
                            strokeDasharray={`${percentage} 100`}
                            strokeLinecap="round"
                        />
                    </svg>
                    {/* Percentage text in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-900">{percentage}%</span>
                    </div>
                </div>

                {/* Saved and remaining amounts */}
                <div className="space-y-1.5">
                    <div>
                        <p className="text-[10px] text-gray-400">Saved so far</p>
                        <p className="text-sm font-bold font-mono text-gray-900">Rs.{savedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400">Remaining</p>
                        <p className="text-sm font-bold font-mono text-gray-500">Rs.{remainingAmount.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Completion date footer */}
            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <p className="text-[11px] text-gray-400">Est. completion</p>
                <p className="text-[11px] font-semibold text-gray-700">{completionDate}</p>
            </div>
        </div>
    );
}
