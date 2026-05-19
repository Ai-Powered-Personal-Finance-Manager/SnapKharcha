import { CreditCard, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { Summary } from "../features/dashboard/interface/dashboardInterface";

export const StatsGrid = ({ stats }: { stats: Summary }) => {
  const data = [
    {
      label: "Total Balance",
      value: stats.totalBalance,
      icon: <Wallet size={18} />,
      meta: "Available money",
    },
    {
      label: "Total Spent",
      value: stats.totalSpent,
      icon: <TrendingUp size={18} />,
      meta: "All expenses",
    },
    {
      label: "Total Budget",
      value: stats.totalBudget,
      icon: <PiggyBank size={18} />,
      meta: "Active budgets",
    },
    {
      label: "EMIs",
      value: stats.totalEMIs,
      icon: <CreditCard size={18} />,
      meta: "Monthly EMI",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((s) => (
        <div
          key={s.label}
          className="relative group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-200 overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 group-hover:text-green-600">
              {s.icon}
            </div>

            <div>
              <p className="text-gray-400 text-xs font-medium">{s.label}</p>

              <p className="text-gray-900 text-2xl font-bold mt-1 font-mono">
                {s.value}
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-[11px] mt-2">{s.meta}</p>

          <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-green-500 transition-all duration-300" />
        </div>
      ))}
    </div>
  );
};
