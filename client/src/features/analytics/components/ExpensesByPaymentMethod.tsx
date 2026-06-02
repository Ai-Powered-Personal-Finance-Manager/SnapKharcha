"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, type TooltipContentProps } from "recharts";

interface PaymentMethodItem {
  paymentMethod: string;
  totalAmount: number;
  transactionCount: number;
}

interface ExpensesByPaymentMethodProps {
  data: PaymentMethodItem[];
}

const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-lg">
        <p className="text-xs font-semibold text-gray-900">{data.name}</p>
        <p className="text-xs font-semibold text-gray-700 mt-1">Rs.{data.value.toLocaleString()}</p>
        <p className="text-xs text-gray-500 mt-1">{data.count} transactions</p>
      </div>
    );
  }
  return null;
};

export function ExpensesByPaymentMethod({ data }: ExpensesByPaymentMethodProps) {
  const colors = {
    CASH: "#f59e0b",
    BANK: "#3b82f6",
    WALLET: "#10b981",
  };

  const chartData = data.map((item) => ({
    name: item.paymentMethod,
    value: item.totalAmount,
    count: item.transactionCount,
    fill: colors[item.paymentMethod as keyof typeof colors] || "#94a3b8",
  }));

  const totalAmount = data.reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="mb-6">
        <h3 className="text-gray-900 font-semibold text-sm">Expenses by Payment Method</h3>
        <p className="text-gray-400 text-[11px] mt-0.5">Total: Rs.{totalAmount.toLocaleString()}</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            cornerRadius={8}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Breakdown */}
      <div className="mt-6 space-y-2">
        {data.map((item) => (
          <div key={item.paymentMethod} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors[item.paymentMethod as keyof typeof colors] }}
              />
              <span className="text-gray-600">{item.paymentMethod}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Rs.{item.totalAmount.toLocaleString()}</span>
              <span className="text-gray-400">({item.transactionCount} transactions)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
