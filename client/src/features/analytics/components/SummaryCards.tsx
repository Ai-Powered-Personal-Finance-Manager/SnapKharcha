import { TrendingUp, TrendingDown } from "lucide-react";

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  savingsRate: number;
  totalIncomeCount: number;
  totalExpensesCount: number;
}

export function SummaryCards({
  totalIncome,
  totalExpenses,
  netBalance,
  savingsRate,
  totalIncomeCount,
  totalExpensesCount,
}: SummaryCardsProps) {
  const cards = [
    {
      label: "Total Spent",
      value: `Rs.${totalExpenses.toLocaleString()}`,
      sub: `${totalExpensesCount} transactions`,
      trend: "−8% vs last period",
      up: true,
      color: "text-gray-900",
    },
    {
      label: "Total Income",
      value: `Rs.${totalIncome.toLocaleString()}`,
      sub: `${totalIncomeCount} transactions`,
      trend: "+28% vs last period",
      up: true,
      color: "text-gray-900",
    },
    {
      label: "Saved",
      value: `Rs.${netBalance.toLocaleString()}`,
      sub: "net savings",
      trend: `${savingsRate}% savings rate`,
      up: netBalance > 0,
      color: netBalance > 0 ? "text-[#00C950]" : "text-red-500",
    },
    {
      label: "Avg Daily Spend",
      value: `Rs.${Math.round(totalExpenses / 30).toLocaleString()}`,
      sub: "per day this month",
      trend: "−8% vs last period",
      up: true,
      color: "text-gray-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-400 text-xs">{card.label}</p>
          <p className={`text-2xl font-bold font-mono mt-1 ${card.color}`}>{card.value}</p>
          <div className={`flex items-center gap-1 mt-2 text-[11px] font-semibold ${card.up ? "text-[#00C950]" : "text-red-500"}`}>
            {card.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {card.trend}
          </div>
          <p className="text-gray-400 text-[11px] mt-0.5">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
