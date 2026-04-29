import { ChevronLeft } from "lucide-react";
import React from "react";

interface PageHeaderProps {
    title: string;
    description: string;
    back?: boolean;
    action?: {
        label: string;
        icon: React.ElementType;
        onClick: () => void;
    }[];
}

export const PageHeader = ({ 
    title, 
    description, 
    back = false, 
    action 
}: PageHeaderProps) => {
    return (
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
                {back && (
                    <button className="h-9 w-9 text-gray-400 hover:text-black border border-gray-300 hover:bg-gray-100 flex items-center justify-center rounded-xl cursor-pointer">
                        <ChevronLeft size={18} />
                    </button>
                )}
                <div>
                    <h2 className="text-gray-900 font-bold text-xl tracking-tight">{title}</h2>
                    <p className="text-gray-400 text-sm mt-0.5">{description}</p>
                </div>
            </div>
            {action && (
                <div className="flex items-center gap-2">
                    {action.map((act, idx) => {
                        const Icon = act.icon;
                        return (
                            <button key={idx} onClick={act.onClick} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C950] text-white text-xs font-semibold shadow-md shadow-[#00C950]/20 hover:bg-[#00b347] transition-colors cursor-pointer">
                                <Icon size={18}/>
                                {act.label}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}