import type { ReactNode } from "react";

type BudgetCreateStepShellProps = {
    step: string;
    title: string;
    children: ReactNode;
};

export const BudgetCreateStepShell = ({ step, title, children }: BudgetCreateStepShellProps) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00C950] text-white text-[11px] font-bold flex items-center justify-center">
                        {step}
                    </span>
                    <h3 className="text-gray-900 font-semibold text-sm">{title}</h3>
                </div>
            </div>

            <div className="p-5 sm:p-6">{children}</div>
        </div>
    );
};