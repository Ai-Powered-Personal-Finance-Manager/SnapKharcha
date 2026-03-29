"use client";

import Link from "next/link";

type Props = {
    collapsed: boolean;
};

export default function SidebarLogo({ collapsed }: Props) {
    return (
        <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-5 border-b border-white/8 shrink-0"
        >
            {/* Icon mark */}
            <div className="w-8 h-8 rounded-lg bg-[#00C950] flex items-center justify-center shrink-0 shadow-lg shadow-[#00C950]/25">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                    d="M3 13L7 9L10 12L15 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <circle cx="15" cy="5" r="1.5" fill="white" />
                </svg>
            </div>

            {/* Wordmark */}
            {!collapsed && (
                <div className="overflow-hidden">
                    <p className="text-white font-semibold text-[15px] leading-tight tracking-tight whitespace-nowrap">
                        Snap<span className="text-[#00C950]">Kharcha</span>
                    </p>
                    <p className="text-white/40 text-[10px] leading-tight whitespace-nowrap">
                        AI-Powered Finance Manager
                    </p>
                </div>
            )}
        </Link>
    );
}