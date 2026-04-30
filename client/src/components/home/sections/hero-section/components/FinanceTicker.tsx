"use client";

export interface TickerItem {
    label: string;
    value: string;
    change?: string;
    trend?: "up" | "down" | "neutral";
}

interface FinanceTickerProps {
    items?: TickerItem[];
    speed?: number; // animation duration in seconds, lower = faster
    className?: string;
}

const DEFAULT_ITEMS: TickerItem[] = [
    { label: "Food", value: "₹6,240", change: "▼ 2.1%", trend: "down" },
    { label: "Transport", value: "₹3,810", change: "▲ 5.4%", trend: "up" },
    { label: "Subscriptions", value: "₹1,490", change: "▼ 0.8%", trend: "down" },
    { label: "Rent", value: "₹9,000", trend: "neutral" },
    { label: "Shopping", value: "₹4,310", change: "▲ 18.2%", trend: "up" },
    { label: "Health", value: "₹2,200", change: "▼ 3.5%", trend: "down" },
    { label: "Savings", value: "₹9,500", change: "▲ 5.1%", trend: "up" },
    { label: "Investments", value: "₹5,000", change: "▲ 12.0%", trend: "up" },
];

const trendColor: Record<string, string> = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-gray-400",
};

export const FinanceTicker = ({
    items = DEFAULT_ITEMS,
    speed = 28,
    className = "",
}: FinanceTickerProps) => {
    // Duplicate items for seamless infinite loop
    const tickerItems = [...items, ...items];

    return (
        <div
        className={`w-full overflow-hidden bg-white/90 backdrop-blur-sm border-t border-green-100 ${className}`}
        >
        <div
            className="flex whitespace-nowrap"
            style={{
            animation: `finance-ticker ${speed}s linear infinite`,
            }}
        >
            {tickerItems.map((item, i) => (
            <div
                key={i}
                className="inline-flex items-center gap-2 px-6 py-2 border-r border-gray-100 shrink-0"
            >
                <span className="text-xs text-gray-500 font-medium">
                {item.label}
                </span>
                <span className="text-xs font-semibold text-gray-900">
                {item.value}
                </span>
                {item.change && (
                <span
                    className={`text-[11px] font-semibold ${trendColor[item.trend ?? "neutral"]}`}
                >
                    {item.change}
                </span>
                )}
            </div>
            ))}
        </div>

        <style>{`
            @keyframes finance-ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
            }
        `}</style>
        </div>
    );
};