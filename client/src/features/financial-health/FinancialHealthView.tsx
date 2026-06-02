"use client";

import { useUser } from "@/src/components/dashboard-layout/hooks/useUser";
import { getShade } from "@/src/core/utils/getShade";
import {
  Activity,
  ChartLine,
  Lightbulb,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import type { ElementType } from "react";
import { FinancialHealthSkeleton } from "./FinancialHealthSkeleton";
import { useFinancialHealth } from "./hooks/api";
import { InsightInterface } from "./interface/financialHealthInterface";

const columns: {
  key: InsightInterface["type"];
  title: string;
  icon?: ElementType;
  bg: string;
  color?: string;
}[] = [
  { key: "ALERT", title: "Critical", icon: Activity, bg: "#FECACA", color: "#B91C1C" },
  { key: "WARNING", title: "Attention", icon: TriangleAlert, bg: "#FEF08A" , color: "#CA8A04"},
  { key: "TIP", title: "Recommendations", icon: Lightbulb, bg: "#FED7AA", color: "#C2410C" },
  { key: "PATTERN", title: "Patterns", icon: ChartLine, bg: "#E9D5FF", color: "#7C3AED" },
  { key: "POSITIVE", title: "Wins", icon: TrendingUp, bg: "#BBF7D0", color: "#15803D" },
];

export const FinancialHealthView = () => {
  const { user } = useUser();
  const { insights, isLoading, isFetching } = useFinancialHealth(
    user?.user?.id,
  );
  if (isLoading || isFetching) {
    return <FinancialHealthSkeleton />;
  }

  if (!insights && !isLoading) {
    return <div className="text-gray-400">No insights available</div>;
  }

  // Group insights by type
  const grouped =
    insights?.reduce(
      (acc, item) => {
        if (!acc[item.type]) acc[item.type] = [];
        acc[item.type].push(item);
        return acc;
      },
      {} as Record<string, InsightInterface[]>,
    ) ?? {};

  return (
    <div className="h-full">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-gray-900 font-bold text-xl">Financial Health</h2>
        <p className="text-gray-400 text-sm mt-0.5">
          Monitor risks, opportunities, and spending behaviour.
        </p>
      </div>

      {/* KANBAN GRID */}
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-5 lg:grid-cols-3">
        {/* <div className="flex flex-col gap-5"> */}
        {columns.map((column) => {
          const items = grouped[column.key] || [];
          const Icon = column.icon;

          return (
            <div
              key={column.key}
              style={{
                backgroundColor: getShade(column.bg || "", 0.3),
              }}
              className="rounded-2xl border border-gray-200 p-4 text-black"
            >
              {/* COLUMN HEADER */}
              <div className="mb-4 border-l-4 pl-3" style={{ borderLeftColor: column.color }}>
                <div className="flex gap-2 items-end">
                  {Icon && <Icon className="mb-1" style={{ color: column.color }} size={18} />}

                  <h2 className="font-semibold text-lg" style={{ color: column.color }}>
                    {column.title}
                  </h2>
                </div>

                <p className="text-sm text-gray-900">
                  {items.length} insight{items.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* CARDS */}
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: getShade(column.bg || "", 0.5),
                      borderColor: column.color,
                    }}
                  >
                    {/* TITLE + BADGE */}
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">{item.title}</h3>

                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium
                          ${
                            item.severity === "CRITICAL"
                              ? "bg-red-600 text-white"
                              : item.severity === "HIGH"
                                ? "bg-orange-600 text-white"
                                : item.severity === "MEDIUM"
                                  ? "bg-blue-600 text-white"
                                  : item.severity === "LOW"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-600 text-white"
                          }`}
                      >
                        {item.severity}
                      </span>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="mb-3 text-sm text-gray-900">
                      {item.description}
                    </p>

                    {/* CATEGORY */}
                    <div className="text-xs text-black">{item.category}</div>
                  </div>
                ))}

                {/* EMPTY STATE */}
                {items.length === 0 && (
                  <div className="rounded-xl border border-dashed border-zinc-700 p-4 text-center text-sm text-gray-500">
                    No insights
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
