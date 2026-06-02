import { Button } from "@/src/components/ui/button";


type Period = "today" | "yesterday" | "lastweek" | "lastmonth";

interface PeriodSelectorProps {
  activePeriod: Period;
  onPeriodChange: (period: Period) => void;
}

export function PeriodSelector({ activePeriod, onPeriodChange }: PeriodSelectorProps) {
  const periods: { label: string; value: Period }[] = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last Week", value: "lastweek" },
    { label: "Last Month", value: "lastmonth" },
  ];

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
      {periods.map((period) => (
        <Button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          variant={activePeriod === period.value ? "default" : "ghost"}
          size="sm"
          className={`text-xs font-semibold transition-all duration-150 ${
            activePeriod === period.value
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
}
