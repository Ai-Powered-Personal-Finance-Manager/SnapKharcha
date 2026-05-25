import { TrendingDown, TrendingUp } from "lucide-react";

interface Props {
    label: string;
    icon?: React.ReactNode;
    value: string;
    trend?: string;
    change?: string;
    color?: "green" | "red";
    meta?: string;
}

export const StatsGrid = ({ 
    stats
} : { 
    stats: Props[] 
}) => {
    return (
        <div className={`grid grid-cols-2 lg:grid-cols-${stats.length} gap-4`}>
            {stats.map((s) => (
                <div key={s.label} className="relative group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:shadow-gray-100 transition-all duration-200 overflow-hidden cursor-pointer">
                    <div className="flex items-center gap-2">
                        {s.icon && (
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 group-hover:text-[#00C950] mb-3">
                                {s.icon}
                            </div>
                        )}
                        <div className="">
                            <p className="text-gray-400 text-xs font-medium">{s.label}</p>
                            <p className="text-gray-900 text-2xl font-bold mt-1 tracking-tight font-mono">{s.value}</p>
                        </div>
                    </div>
                    {s.trend && 
                        <div className="flex items-center gap-1.5 mt-2">
                            {s.trend === "up" && s.color === "green" ? (
                                <span className="flex items-center gap-1 text-[#00C950] text-[11px] font-semibold bg-[#00C950]/8 px-2 py-0.5 rounded-full">
                                    <TrendingUp size={11} /> {s.change}
                                </span>
                            ) : s.trend === "down" && s.color === "red"  ? (
                                <span className="flex items-center gap-1 text-red-500 text-[11px] font-semibold bg-red-50 px-2 py-0.5 rounded-full">
                                    <TrendingDown size={11} /> {s.change}
                                </span>
                            ) : (
                                <span>{s.change}</span>
                            )}
                        </div>
                    }
                    <p className="text-gray-400 text-[11px] mt-1.5">{s.meta}</p>
                    <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-green-500 transition-all duration-300"/>
                </div>
            ))}
        </div>
    )
}