"use client";

import { Zap } from "lucide-react";

interface AIInsightProps {
    insight: string;
}

export function AIInsight({ insight }: AIInsightProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-5">
            {/* Decorative gradient background */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#00C950]/15 rounded-full blur-2xl" />

            {/* Content */}
            <div className="relative">
                {/* Header with icon */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-[#00C950] flex items-center justify-center">
                        <Zap size={11} className="text-white" />
                    </div>
                    <p className="text-white/60 text-[11px] font-semibold uppercase tracking-wider">AI Insight</p>
                </div>

                {/* Insight text with highlighted parts */}
                <p className="text-white text-sm leading-relaxed">
                    {insight}
                </p>
            </div>
        </div>
    );
}
