"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

type ErrorFallbackProps = {
    resetErrorBoundary?: () => void;
};

export const ErrorFallback = ({
    resetErrorBoundary,
}: ErrorFallbackProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-110px)] rounded-2xl bg-white border border-gray-100 px-6 py-12">

            {/* Icon */}
            <div className="relative mb-6 flex h-44 w-44 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-gray-200 bg-gray-50/40 animate-ping" />
                <div className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-400 animate-pulse">
                    <AlertTriangle size={100} strokeWidth={1.75} />
                </div>
            </div>

            {/* Text */}
            <h3 className="text-gray-900 text-xl font-bold mb-1.5 tracking-tight">Something went wrong</h3>
            <p className="text-gray-400 text-sm mb-7">Failed to load data. Please try again.</p>

            {/* Retry button */}
            {resetErrorBoundary && (
                <button
                    type="button"
                    onClick={resetErrorBoundary}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C950] text-white text-xs font-semibold shadow-sm shadow-[#00C950]/20 hover:bg-[#00b347] active:scale-95 transition-all duration-150 cursor-pointer"
                >
                    <RefreshCcw size={13} className="group-hover:rotate-180 transition-transform duration-500" />
                    Refetch
                </button>
            )}

            {/* Help link */}
            <a href="/dashboard/help" className="mt-3 text-[11px] text-gray-400 hover:text-[#00C950] transition-colors">
                Contact for Help?
            </a>
        </div>
    );
};