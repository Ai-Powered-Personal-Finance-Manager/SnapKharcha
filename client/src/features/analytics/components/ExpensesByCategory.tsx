"use client";

import { MoreHorizontal } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts";

interface ExpenseCategory {
  categoryId: string;
  categoryName: string;
  categoryIcon: string | null;
  categoryColor: string | null;
  totalAmount: number;
  transactionCount: number;
}

interface ExpensesByCategoryProps {
  data: ExpenseCategory[];
  totalExpenses: number;
}

type ExpenseCategoryChartItem = {
  name: string;
  value: number;
  count: number;
  fill: string;
  percentage: number;
};

function ExpenseCategoryTooltip({
  active,
  payload,
}: TooltipContentProps) {
  if (active && payload && payload.length) {
    const tooltipData = payload[0].payload as ExpenseCategoryChartItem;

    return (
      <div className="rounded-lg bg-gray-800 px-3 py-2 text-xs text-white shadow-lg">
        <p className="font-semibold">{tooltipData.name}</p>
        <p>Rs.{tooltipData.value.toLocaleString("en-IN")}</p>
        <p className="text-gray-300">{tooltipData.count} transactions</p>
        <p className="text-gray-300">{tooltipData.percentage}% of total</p>
      </div>
    );
  }

  return null;
}

const formatCurrency = (value: number) => `Rs.${value.toLocaleString("en-IN")}`;

export function ExpensesByCategory({ data, totalExpenses }: ExpensesByCategoryProps) {
  const sortedData = [...data].sort((left, right) => right.totalAmount - left.totalAmount);
  const visibleCategories = sortedData.slice(0, 8);
  const otherCategories = sortedData.slice(8);

  const chartData: ExpenseCategoryChartItem[] = visibleCategories.map((item) => ({
    name: item.categoryName,
    value: item.totalAmount,
    count: item.transactionCount,
    fill: item.categoryColor || "#94a3b8",
    percentage: totalExpenses > 0 ? Math.round((item.totalAmount / totalExpenses) * 100) : 0,
  }));

  if (otherCategories.length > 0) {
    const otherAmount = otherCategories.reduce((sum, item) => sum + item.totalAmount, 0);
    const otherCount = otherCategories.reduce((sum, item) => sum + item.transactionCount, 0);

    chartData.push({
      name: `Other (${otherCategories.length})`,
      value: otherAmount,
      count: otherCount,
      fill: "#cbd5e1",
      percentage: totalExpenses > 0 ? Math.round((otherAmount / totalExpenses) * 100) : 0,
    });
  }

  const chartHeight = Math.max(240, chartData.length * 42);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Expenses by Category</h3>
          <p className="mt-0.5 text-[11px] text-gray-400">Total: {formatCurrency(totalExpenses)}</p>
        </div>
        <button className="text-gray-300 hover:text-gray-500">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 18, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickFormatter={(value) => formatCurrency(Number(value))}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={130}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#4b5563" }}
          />
          <Tooltip content={ExpenseCategoryTooltip} />
          <Bar dataKey="value" radius={[0, 10, 10, 0]}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} stroke="#ffffff" strokeWidth={2} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Breakdown with amounts */}
      <div className="mt-4 space-y-2">
        {sortedData.slice(0, 5).map((item) => (
          <div key={item.categoryId} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.categoryColor || "#94a3b8" }}
              />
              <span className="text-gray-600">{item.categoryName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">{formatCurrency(item.totalAmount)}</span>
              <span className="text-gray-400">({item.transactionCount} txn)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}