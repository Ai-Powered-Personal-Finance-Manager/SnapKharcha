import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface PageHeaderProps {
    title: string;
    description: string;
    back?: boolean;
    action?: {
        label: string;
        icon: React.ElementType;
        variant?: "primary" | "outline" | "light-danger" | "danger";
        onClick: () => void;
    }[];
}

const variantStyle = {
    primary: "bg-[#00C950] text-white shadow-md shadow-[#00C950]/20 hover:bg-[#00b347]",
    outline: "border border-gray-300 text-gray-600 hover:bg-gray-100",
    "light-danger": "border border-red-100 text-red-600 bg-red-50 hover:bg-red-100",
    "danger": "text-white bg-red-500 hover:bg-red-600",
}

export const PageHeader = ({ 
    title, 
    description, 
    back = false, 
    action 
}: PageHeaderProps) => {
    const router = useRouter();
    return (
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
                {back && (
                    <button onClick={() => router.back()} className="h-9 w-9 text-gray-400 hover:text-black border border-gray-300 hover:bg-gray-100 flex items-center justify-center rounded-xl cursor-pointer">
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
                        const variant = act.variant ?? "primary";
                        return (
                            <button key={idx} onClick={act.onClick} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${variantStyle[variant]}`}>
                                <Icon size={14}/>
                                {act.label}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}