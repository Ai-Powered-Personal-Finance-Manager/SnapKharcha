"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, type TooltipContentProps } from "recharts";

interface BudgetItem {
  budgetId: string;
  budgetName: string;
  budgetAmount: number;
  spentAmount: number;
  remainingAmount: number;
  percentageUsed: number;
  categoryName: string;
  categoryIcon: string | null;
  categoryColor: string | null;
}

interface BudgetComparisonProps {
  data: BudgetItem[];
}
const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-lg">
        <p className="text-xs font-semibold text-gray-900">{data.name}</p>
        <p className="text-xs text-gray-600 mt-1">{data.categoryName}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs font-semibold mt-1" style={{ color: entry.color }}>
            {entry.name}: Rs.{entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function BudgetComparison({ data }: BudgetComparisonProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-gray-900 font-semibold text-sm">Budget Comparison</h3>
        <p className="text-gray-400 text-xs mt-2">No budgets found</p>
      </div>
    );
  }

  // Transform data for the chart
  const chartData = data.map((budget) => ({
    name: budget.budgetName,
    "Budget": budget.budgetAmount,
    "Spent": budget.spentAmount,
    budgetId: budget.budgetId,
    isOverBudget: budget.spentAmount >= budget.budgetAmount,
    categoryName: budget.categoryName,
  }));

  // Calculate summary
  const totalBudget = data.reduce((sum, b) => sum + b.budgetAmount, 0);
  const totalSpent = data.reduce((sum, b) => sum + b.spentAmount, 0);
  const avgPercentage = Math.round((totalSpent / totalBudget) * 100);


  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="mb-6">
        <h3 className="text-gray-900 font-semibold text-sm">Budget Comparison</h3>
        <p className="text-gray-400 text-[11px] mt-0.5">Spent vs budget limit across all categories</p>
      </div>

      {/* Chart */}
      <div className="w-full h-screen">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 60, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 11, fill: "#666" }}
            />
            <YAxis 
              domain={[0, 20000]}
              ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000]}
              tick={{ fontSize: 11, fill: "#666" }}
              label={{ value: "Amount (Rs.)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip content={CustomTooltip} />
            <Legend 
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="square"
            />
            <Bar dataKey="Budget" fill="#00C950" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Spent" fill="#3b82f6" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isOverBudget ? "#ef4444" : "#3b82f6"} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-0 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4">
        <div>
          <p className="text-gray-400 text-xs">Total Budget</p>
          <p className="text-gray-900 font-semibold text-sm mt-1">Rs.{totalBudget.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Total Spent</p>
          <p className="text-gray-900 font-semibold text-sm mt-1">Rs.{totalSpent.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Usage Rate</p>
          <p className={`font-semibold text-sm mt-1 ${avgPercentage > 100 ? "text-red-500" : "text-[#00C950]"}`}>
            {avgPercentage}%
          </p>
        </div>
      </div>
    </div>
  );
}
