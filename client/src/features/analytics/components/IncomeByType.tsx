"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
} from "recharts";

interface IncomeItem {
  type: string;
  totalAmount: number;
  count: number;
}

interface IncomeByTypeProps {
  data: IncomeItem[];
}

type IncomeChartItem = {
  name: string;
  value: number;
  count: number;
  fill: string;
};

function IncomeTypeTooltip({
  active,
  payload,
}: TooltipContentProps) {
  if (active && payload && payload.length) {
    const tooltipData = payload[0].payload as IncomeChartItem;

    return (
      <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
        <p className="font-semibold">{tooltipData.name}</p>
        <p>Rs.{tooltipData.value.toLocaleString()}</p>
        <p className="text-gray-300">{tooltipData.count} transactions</p>
      </div>
    );
  }

  return null;
}

export function IncomeByType({ data }: IncomeByTypeProps) {
  const colors = {
    FIXED: "#00C950",
    VARIABLE: "#f59e0b",
  };

  const chartData: IncomeChartItem[] = data.map((item) => ({
    name: item.type === "FIXED" ? "Fixed Income" : "Variable Income",
    value: item.totalAmount,
    count: item.count,
    fill: colors[item.type as keyof typeof colors] || "#94a3b8",
  }));

  const totalIncome = data.reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="mb-5">
        <h3 className="text-gray-900 font-semibold text-sm">Income by Type</h3>
        <p className="text-gray-400 text-[11px] mt-0.5">Total: Rs.{totalIncome.toLocaleString()}</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Tooltip content={IncomeTypeTooltip} />
          <Legend verticalAlign="bottom" height={28} iconType="circle" />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={92}
            paddingAngle={4}
            cornerRadius={10}
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} stroke="#ffffff" strokeWidth={2} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Breakdown */}
      <div className="mt-4 space-y-2">
        {data.map((item) => (
          <div key={item.type} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors[item.type as keyof typeof colors] }}
              />
              <span className="text-gray-600">{item.type === "FIXED" ? "Fixed Income" : "Variable Income"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Rs.{item.totalAmount.toLocaleString()}</span>
              <span className="text-gray-400">({item.count} sources)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
