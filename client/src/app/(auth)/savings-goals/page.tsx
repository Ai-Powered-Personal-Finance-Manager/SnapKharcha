import {
  Plus, Target, Trophy, Clock, TrendingUp,
  CheckCircle2, AlertCircle, Flame, MoreHorizontal,
  Plane, Laptop, GraduationCap, Home, Car,
  Smartphone, Heart, Umbrella, ArrowUpRight,
  CalendarDays, Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type GoalStatus = "on-track" | "at-risk" | "met" | "missed";
type GoalPeriod = "monthly" | "yearly";

type Goal = {
  id: number;
  icon: React.ElementType;
  label: string;
  description: string;
  period: GoalPeriod;
  target: number;
  saved: number;
  deadline: string;       // display string
  color: string;          // tailwind bg class for icon
  iconColor: string;
  accentHex: string;
  status: GoalStatus;
  monthlyContribution?: number;   // for yearly goals
  streak?: number;                // months in a row goal was hit
};

// ─── Data ─────────────────────────────────────────────────────
const monthlyGoals: Goal[] = [
  {
    id: 1, icon: Flame, label: "No-Spend Weekend",
    description: "Spend Rs.0 on eating out every weekend this month",
    period: "monthly", target: 1, saved: 1,
    deadline: "Apr 30, 2025", color: "bg-orange-50", iconColor: "text-orange-500", accentHex: "#f97316",
    status: "met", streak: 3,
  },
  {
    id: 2, icon: Smartphone, label: "Gadget Fund",
    description: "Save Rs.5,000 this month for new earphones",
    period: "monthly", target: 5000, saved: 3200,
    deadline: "Apr 30, 2025", color: "bg-blue-50", iconColor: "text-blue-500", accentHex: "#3b82f6",
    status: "at-risk", streak: 1,
  },
  {
    id: 3, icon: Heart, label: "Health Buffer",
    description: "Set aside Rs.2,000/month for medical emergencies",
    period: "monthly", target: 2000, saved: 2000,
    deadline: "Apr 30, 2025", color: "bg-red-50", iconColor: "text-red-500", accentHex: "#ef4444",
    status: "met", streak: 6,
  },
  {
    id: 4, icon: Umbrella, label: "Rainy Day Fund",
    description: "Add Rs.3,000 to emergency fund this month",
    period: "monthly", target: 3000, saved: 800,
    deadline: "Apr 30, 2025", color: "bg-teal-50", iconColor: "text-teal-500", accentHex: "#14b8a6",
    status: "at-risk",
  },
];

const yearlyGoals: Goal[] = [
  {
    id: 5, icon: Laptop, label: "MacBook Pro",
    description: "Save up for the new MacBook Pro M4",
    period: "yearly", target: 200000, saved: 144000,
    deadline: "Dec 31, 2025", color: "bg-[#00C950]/8", iconColor: "text-[#00C950]", accentHex: "#00C950",
    status: "on-track", monthlyContribution: 16000, streak: 9,
  },
  {
    id: 6, icon: Plane, label: "Europe Trip",
    description: "Summer vacation to Europe with family",
    period: "yearly", target: 350000, saved: 98000,
    deadline: "Jun 30, 2025", color: "bg-purple-50", iconColor: "text-purple-500", accentHex: "#8b5cf6",
    status: "at-risk", monthlyContribution: 12000,
  },
  {
    id: 7, icon: GraduationCap, label: "MBA Fund",
    description: "Savings towards MBA entrance & fees",
    period: "yearly", target: 500000, saved: 85000,
    deadline: "Dec 31, 2025", color: "bg-amber-50", iconColor: "text-amber-600", accentHex: "#f59e0b",
    status: "on-track", monthlyContribution: 35000,
  },
  {
    id: 8, icon: Home, label: "Home Down Payment",
    description: "20% down payment for a 2BHK in Mumbai",
    period: "yearly", target: 1000000, saved: 320000,
    deadline: "Dec 31, 2026", color: "bg-rose-50", iconColor: "text-rose-500", accentHex: "#f43f5e",
    status: "on-track", monthlyContribution: 30000,
  },
  {
    id: 9, icon: Car, label: "Car Upgrade",
    description: "Replace the Maruti with a Tata Nexon",
    period: "yearly", target: 180000, saved: 180000,
    deadline: "Mar 31, 2025", color: "bg-sky-50", iconColor: "text-sky-500", accentHex: "#0ea5e9",
    status: "met", streak: 12,
  },
];

// ─── Helpers ──────────────────────────────────────────────────
const statusConfig: Record<GoalStatus, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  "met":      { label: "Goal Met!",  bg: "bg-[#00C950]/8",  text: "text-[#00C950]",  icon: CheckCircle2 },
  "on-track": { label: "On Track",   bg: "bg-blue-50",      text: "text-blue-500",   icon: TrendingUp   },
  "at-risk":  { label: "At Risk",    bg: "bg-amber-50",     text: "text-amber-600",  icon: AlertCircle  },
  "missed":   { label: "Missed",     bg: "bg-red-50",       text: "text-red-500",    icon: AlertCircle  },
};

const metCount      = [...monthlyGoals, ...yearlyGoals].filter((g) => g.status === "met").length;
const onTrackCount  = [...monthlyGoals, ...yearlyGoals].filter((g) => g.status === "on-track").length;
const atRiskCount   = [...monthlyGoals, ...yearlyGoals].filter((g) => g.status === "at-risk").length;
const totalSaved    = yearlyGoals.reduce((a, g) => a + g.saved, 0);
const totalTargeted = yearlyGoals.reduce((a, g) => a + g.target, 0);

// ─── GoalCard ─────────────────────────────────────────────────
function GoalCard({ g }: { g: Goal }) {
  const Icon   = g.icon;
  const pct    = Math.min(Math.round((g.saved / g.target) * 100), 100);
  const cfg    = statusConfig[g.status];
  const StatusIcon = cfg.icon;
  const remaining  = Math.max(g.target - g.saved, 0);

  return (
    <div className={`group relative bg-white rounded-2xl border overflow-hidden hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 ${g.status === "met" ? "border-[#00C950]/20" : "border-gray-100"}`}>

      {/* Met ribbon */}
      {g.status === "met" && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 bg-[#00C950] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm shadow-[#00C950]/30">
            <Trophy size={10} /> Met!
          </div>
        </div>
      )}

      {/* Progress fill bar at top */}
      <div className="h-1 bg-gray-100 w-full">
        <div className="h-full transition-all duration-700 rounded-r-full"
          style={{ width: `${pct}%`, backgroundColor: g.accentHex }} />
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${g.color}`}>
              <Icon size={18} className={g.iconColor} />
            </div>
            <div>
              <p className="text-gray-800 text-sm font-semibold">{g.label}</p>
              <p className="text-gray-400 text-[11px] leading-snug mt-0.5 max-w-[180px]">{g.description}</p>
            </div>
          </div>
          {g.status !== "met" && (
            <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-gray-500">
              <MoreHorizontal size={16} />
            </button>
          )}
        </div>

        {/* Progress numbers */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-gray-900 text-xl font-bold font-mono">
              Rs.{g.saved.toLocaleString()}
            </p>
            <p className="text-gray-400 text-[11px]">of Rs.{g.target.toLocaleString()}</p>
          </div>
          <p className="text-2xl font-black font-mono" style={{ color: g.accentHex }}>{pct}%</p>
        </div>

        {/* Bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: g.accentHex }} />
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
            <CalendarDays size={11} />
            <span>{g.deadline}</span>
          </div>
          <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
            <StatusIcon size={11} />
            {cfg.label}
          </div>
        </div>

        {/* Extras */}
        {(g.monthlyContribution || g.streak) && (
          <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-4">
            {g.monthlyContribution && g.status !== "met" && (
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <TrendingUp size={11} className="text-[#00C950]" />
                +Rs.{g.monthlyContribution.toLocaleString()}/mo target
              </div>
            )}
            {g.streak && (
              <div className="flex items-center gap-1.5 text-[11px] text-amber-500">
                <Flame size={11} />
                {g.streak} month streak
              </div>
            )}
            {remaining > 0 && g.status !== "met" && (
              <div className="ml-auto text-[11px] text-gray-400">
                Rs.{remaining.toLocaleString()} left
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function GoalsPage() {
  return (
    <div className="space-y-7">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-gray-900 font-bold text-xl tracking-tight">Savings Goals</h2>
          <p className="text-gray-400 text-sm mt-0.5">April 2025 · Track what you're saving toward</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C950] text-white text-xs font-semibold shadow-md shadow-[#00C950]/20 hover:bg-[#00b347] transition-colors">
          <Plus size={14} /> New Goal
        </button>
      </div>

      {/* Summary banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-6">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#00C950]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 mb-5">
          <div>
            <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Total Saved</p>
            <p className="text-white text-2xl font-bold font-mono">Rs.{(totalSaved / 100000).toFixed(1)}L</p>
            <p className="text-white/30 text-[11px] mt-1">across yearly goals</p>
          </div>
          <div>
            <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Goals Met</p>
            <div className="flex items-end gap-2">
              <p className="text-white text-2xl font-bold font-mono">{metCount}</p>
              <p className="text-white/40 text-sm mb-0.5">/ {monthlyGoals.length + yearlyGoals.length}</p>
            </div>
            <p className="text-[#00C950] text-[11px] mt-1 font-medium">this period</p>
          </div>
          <div>
            <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">On Track</p>
            <p className="text-white text-2xl font-bold font-mono">{onTrackCount}</p>
            <p className="text-white/30 text-[11px] mt-1">goals progressing well</p>
          </div>
          <div>
            <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">At Risk</p>
            <p className="text-amber-400 text-2xl font-bold font-mono">{atRiskCount}</p>
            <p className="text-white/30 text-[11px] mt-1">need attention</p>
          </div>
        </div>

        {/* Overall yearly progress */}
        <div className="relative">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-white/40 text-[11px]">Overall yearly goal progress</p>
            <p className="text-white/60 text-[11px] font-mono">
              Rs.{(totalSaved / 100000).toFixed(1)}L / Rs.{(totalTargeted / 100000).toFixed(1)}L
            </p>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#00C950] rounded-full transition-all duration-700"
              style={{ width: `${Math.round((totalSaved / totalTargeted) * 100)}%` }} />
          </div>
        </div>
      </div>

      {/* AI nudge */}
      {atRiskCount > 0 && (
        <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-amber-50 border border-amber-100">
          <Zap size={15} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-amber-700 text-xs leading-relaxed">
            <span className="font-semibold">AI Suggestion: </span>
            Your <span className="font-semibold">Europe Trip</span> goal is at risk — you're Rs.94,000 behind schedule with only 2 months left.
            Consider increasing your monthly contribution by Rs.15,000 or extending the deadline.
          </p>
        </div>
      )}

      {/* Monthly goals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 font-semibold text-[15px]">Monthly Goals</h3>
            <p className="text-gray-400 text-[11px] mt-0.5">Reset on May 1 · {monthlyGoals.filter(g => g.status === "met").length}/{monthlyGoals.length} met this month</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-[#00C950] font-semibold hover:underline">
            <Plus size={13} /> Add Monthly Goal
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {monthlyGoals.map((g) => <GoalCard key={g.id} g={g} />)}
        </div>
      </div>

      {/* Yearly goals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 font-semibold text-[15px]">Yearly Goals</h3>
            <p className="text-gray-400 text-[11px] mt-0.5">Long-term targets · {yearlyGoals.filter(g => g.status === "met").length}/{yearlyGoals.length} completed</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-[#00C950] font-semibold hover:underline">
            <Plus size={13} /> Add Yearly Goal
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {yearlyGoals.map((g) => <GoalCard key={g.id} g={g} />)}

          {/* Add card */}
          <button className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 hover:border-[#00C950]/40 hover:bg-[#00C950]/2 transition-all duration-200 group min-h-[200px]">
            <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#00C950]/10 flex items-center justify-center transition-colors">
              <Plus size={18} className="text-gray-400 group-hover:text-[#00C950] transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-gray-400 group-hover:text-[#00C950] text-sm font-medium transition-colors">Add a Goal</p>
              <p className="text-gray-300 text-[11px] mt-0.5">House, trip, gadget, education…</p>
            </div>
          </button>
        </div>
      </div>

      {/* Completed goals history */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <div>
            <h3 className="text-gray-900 font-semibold text-sm">Completed Goals</h3>
            <p className="text-gray-400 text-[11px] mt-0.5">Goals you've already crushed 🎉</p>
          </div>
          <button className="flex items-center gap-1 text-[#00C950] text-xs font-semibold hover:underline">
            View all <ArrowUpRight size={12} />
          </button>
        </div>
        {[
          { icon: Car,    label: "Car Upgrade",       amount: 180000, date: "Mar 2025", streak: 12 },
          { icon: Laptop, label: "Old Laptop Fund",   amount: 65000,  date: "Nov 2024", streak: 5  },
          { icon: Plane,  label: "Goa Trip",          amount: 25000,  date: "Aug 2024", streak: 3  },
        ].map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#00C950]/8 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-[#00C950]" />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 text-sm font-medium">{c.label}</p>
                <p className="text-gray-400 text-[11px]">Completed {c.date} · {c.streak}-month streak</p>
              </div>
              <div className="text-right">
                <p className="text-gray-800 text-sm font-semibold font-mono">Rs.{c.amount.toLocaleString()}</p>
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <CheckCircle2 size={11} className="text-[#00C950]" />
                  <span className="text-[#00C950] text-[11px] font-medium">Done</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}