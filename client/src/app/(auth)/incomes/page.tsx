import {
  Plus, Pencil, TrendingUp, TrendingDown,
  Briefcase, Youtube, Code2, ShoppingBag,
  Building2, Repeat2, Zap, MoreHorizontal,
  ArrowUpRight, CalendarDays, Info,
  CheckCircle2, Clock, ChevronRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type IncomeTag = "green" | "blue" | "purple" | "amber" | "red" | "pink";

type FixedSource = {
  id: number;
  icon: React.ElementType;
  label: string;
  description: string;
  amount: number;
  creditDay: number;          // day of month salary hits
  color: IncomeTag;
  active: boolean;
};

type VariableSource = {
  id: number;
  icon: React.ElementType;
  label: string;
  description: string;
  color: IncomeTag;
  thisMonth: number;          // sum of all entries logged this month
  lastMonth: number;
  entries: VariableEntry[];
};

type VariableEntry = {
  id: number;
  amount: number;
  note: string;
  date: string;
};

// ─── Static data ──────────────────────────────────────────────
const fixedSources: FixedSource[] = [
  {
    id: 1, icon: Building2, label: "Primary Salary",
    description: "Infosys Ltd · Software Engineer",
    amount: 50000, creditDay: 1, color: "green", active: true,
  },
  {
    id: 2, icon: Briefcase, label: "Part-time Consulting",
    description: "TechStart Pvt Ltd · UI Consultant",
    amount: 8000, creditDay: 5, color: "blue", active: true,
  },
  {
    id: 3, icon: Building2, label: "Rental Income",
    description: "Flat 3B, Andheri West",
    amount: 12000, creditDay: 10, color: "purple", active: false,
  },
];

const variableSources: VariableSource[] = [
  {
    id: 1, icon: Youtube, label: "YouTube AdSense",
    description: "Tech & Finance channel monetisation",
    color: "red", thisMonth: 4200, lastMonth: 3800,
    entries: [
      { id: 1, amount: 2800, note: "March payout — AdSense",    date: "Apr 3" },
      { id: 2, amount: 1400, note: "Sponsored short",            date: "Apr 8" },
    ],
  },
  {
    id: 2, icon: Code2, label: "Freelance Development",
    description: "Upwork / direct client projects",
    color: "amber", thisMonth: 15000, lastMonth: 22000,
    entries: [
      { id: 1, amount: 9000, note: "Landing page — Client A",   date: "Apr 2" },
      { id: 2, amount: 6000, note: "Bug fixes — Client B",       date: "Apr 11" },
    ],
  },
  {
    id: 3, icon: ShoppingBag, label: "Reselling",
    description: "Meesho / Instagram shop",
    color: "pink", thisMonth: 1800, lastMonth: 2400,
    entries: [
      { id: 1, amount: 1800, note: "April batch settlement",     date: "Apr 6" },
    ],
  },
  {
    id: 4, icon: Zap, label: "Other / Ad-hoc",
    description: "Bonuses, gifts, one-time receipts",
    color: "blue", thisMonth: 0, lastMonth: 5000,
    entries: [],
  },
];

// ─── Computed totals ──────────────────────────────────────────
const fixedTotal   = fixedSources.filter((s) => s.active).reduce((a, s) => a + s.amount, 0);
const variableTotal = variableSources.reduce((a, s) => a + s.thisMonth, 0);
const grandTotal   = fixedTotal + variableTotal;
const lastMonthTotal = fixedTotal + variableSources.reduce((a, s) => a + s.lastMonth, 0);
const delta        = grandTotal - lastMonthTotal;
const deltaPositive = delta >= 0;

// ─── Color maps ───────────────────────────────────────────────
const tagBg: Record<IncomeTag, string> = {
  green:  "bg-[#00C950]/8  text-[#00C950]",
  blue:   "bg-blue-50      text-blue-500",
  purple: "bg-purple-50    text-purple-500",
  amber:  "bg-amber-50     text-amber-600",
  red:    "bg-red-50       text-red-500",
  pink:   "bg-pink-50      text-pink-500",
};
const dotColor: Record<IncomeTag, string> = {
  green:  "bg-[#00C950]",
  blue:   "bg-blue-400",
  purple: "bg-purple-400",
  amber:  "bg-amber-400",
  red:    "bg-red-400",
  pink:   "bg-pink-400",
};
const barColor: Record<IncomeTag, string> = {
  green:  "#00C950",
  blue:   "#3b82f6",
  purple: "#8b5cf6",
  amber:  "#f59e0b",
  red:    "#ef4444",
  pink:   "#ec4899",
};

// ─── Sub-components ───────────────────────────────────────────
function SectionHeader({ title, sub, action }: { title: string; sub: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-gray-900 font-semibold text-sm">{title}</h3>
        <p className="text-gray-400 text-[11px] mt-0.5">{sub}</p>
      </div>
      {action}
    </div>
  );
}

function FixedCard({ s }: { s: FixedSource }) {
  const Icon = s.icon;
  return (
    <div className={`group bg-white rounded-2xl border p-5 hover:shadow-md transition-all duration-200 ${s.active ? "border-gray-100" : "border-gray-100 opacity-60"}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tagBg[s.color]}`}>
            <Icon size={18} />
          </div>
          <div>
            <p className="text-gray-800 text-sm font-semibold">{s.label}</p>
            <p className="text-gray-400 text-[11px]">{s.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!s.active && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">Paused</span>
          )}
          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-gray-500">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-gray-900 text-xl font-bold font-mono">₹{s.amount.toLocaleString()}</p>
          <p className="text-gray-400 text-[11px] mt-0.5">per month</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-gray-400 text-[11px]">
            <CalendarDays size={11} />
            <span>Credits on {s.creditDay}{s.creditDay === 1 ? "st" : s.creditDay === 5 ? "th" : "th"}</span>
          </div>
          <div className="flex items-center gap-1 mt-1 justify-end">
            <div className={`w-1.5 h-1.5 rounded-full ${s.active ? "bg-[#00C950]" : "bg-gray-300"}`} />
            <span className={`text-[11px] font-medium ${s.active ? "text-[#00C950]" : "text-gray-400"}`}>
              {s.active ? "Active" : "Paused"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex gap-2">
        <button className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-700 transition-colors">
          <Pencil size={11} /> Edit
        </button>
        <span className="text-gray-200">·</span>
        <button className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-700 transition-colors">
          <Repeat2 size={11} /> {s.active ? "Pause" : "Resume"}
        </button>
      </div>
    </div>
  );
}

function VariableCard({ s }: { s: VariableSource }) {
  const Icon = s.icon;
  const trend = s.thisMonth >= s.lastMonth;
  const pct = s.lastMonth > 0
    ? Math.round(Math.abs(s.thisMonth - s.lastMonth) / s.lastMonth * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Card header */}
      <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tagBg[s.color]}`}>
            <Icon size={18} />
          </div>
          <div>
            <p className="text-gray-800 text-sm font-semibold">{s.label}</p>
            <p className="text-gray-400 text-[11px]">{s.description}</p>
          </div>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-gray-500">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Amounts */}
      <div className="px-5 py-4">
        <div className="flex items-end justify-between mb-1">
          <div>
            <p className="text-[11px] text-gray-400 mb-0.5">This month</p>
            <p className={`text-xl font-bold font-mono ${s.thisMonth === 0 ? "text-gray-300" : "text-gray-900"}`}>
              {s.thisMonth === 0 ? "₹0" : `₹${s.thisMonth.toLocaleString()}`}
            </p>
          </div>
          {s.lastMonth > 0 && (
            <div className="text-right">
              <p className="text-[11px] text-gray-400 mb-0.5">vs last month</p>
              <div className={`flex items-center gap-1 justify-end text-xs font-semibold ${trend ? "text-[#00C950]" : "text-red-500"}`}>
                {trend ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {pct}%
              </div>
            </div>
          )}
        </div>

        {/* Mini bar — this vs last month */}
        {s.lastMonth > 0 && (
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 w-16 shrink-0">This month</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full"
                  style={{ width: `${Math.min((s.thisMonth / Math.max(s.thisMonth, s.lastMonth)) * 100, 100)}%`, backgroundColor: barColor[s.color] }} />
              </div>
              <span className="text-[10px] font-mono text-gray-500 w-14 text-right shrink-0">₹{(s.thisMonth / 1000).toFixed(1)}k</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 w-16 shrink-0">Last month</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-200 rounded-full"
                  style={{ width: `${Math.min((s.lastMonth / Math.max(s.thisMonth, s.lastMonth)) * 100, 100)}%` }} />
              </div>
              <span className="text-[10px] font-mono text-gray-400 w-14 text-right shrink-0">₹{(s.lastMonth / 1000).toFixed(1)}k</span>
            </div>
          </div>
        )}
      </div>

      {/* Entries log */}
      <div className="px-5 pb-3 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">This month's entries</p>
        {s.entries.length === 0 ? (
          <div className="flex items-center gap-2 py-2 text-gray-300 text-xs">
            <Clock size={12} /> No entries yet this month
          </div>
        ) : (
          s.entries.map((e) => (
            <div key={e.id} className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor[s.color]}`} />
                <span className="text-gray-600 text-xs truncate">{e.note}</span>
                <span className="text-gray-300 text-[11px] shrink-0">{e.date}</span>
              </div>
              <span className="text-gray-800 text-xs font-semibold font-mono shrink-0 ml-3">+₹{e.amount.toLocaleString()}</span>
            </div>
          ))
        )}
      </div>

      {/* Log income CTA */}
      <div className="px-5 pb-5">
        <button className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${tagBg[s.color]} border-transparent hover:opacity-80`}>
          <Plus size={13} /> Log Income Entry
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function IncomePage() {
    return (
        <div className="space-y-7">

        {/* Page header */}
        <div className="flex items-start justify-between">
            <div>
            <h2 className="text-gray-900 font-bold text-xl tracking-tight">Income</h2>
            <p className="text-gray-400 text-sm mt-0.5">April 2025 · Track all your earning sources</p>
            </div>
            <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors">
                <Plus size={14} /> Fixed Source
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C950] text-white text-xs font-semibold shadow-md shadow-[#00C950]/20 hover:bg-[#00b347] transition-colors">
                <Plus size={14} /> Variable Source
            </button>
            </div>
        </div>

        {/* Summary banner */}
        <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-6">
            <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="absolute -top-10 -right-10 w-52 h-52 bg-[#00C950]/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
                <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Total This Month</p>
                <p className="text-white text-2xl font-bold font-mono">₹{grandTotal.toLocaleString()}</p>
                <div className={`flex items-center gap-1 mt-1.5 text-xs font-semibold ${deltaPositive ? "text-[#00C950]" : "text-red-400"}`}>
                {deltaPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {deltaPositive ? "+" : ""}₹{Math.abs(delta).toLocaleString()} vs last month
                </div>
            </div>
            <div>
                <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Fixed Income</p>
                <p className="text-white text-2xl font-bold font-mono">₹{fixedTotal.toLocaleString()}</p>
                <p className="text-white/30 text-[11px] mt-1.5">Guaranteed every month</p>
            </div>
            <div>
                <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Variable Income</p>
                <p className="text-white text-2xl font-bold font-mono">₹{variableTotal.toLocaleString()}</p>
                <p className="text-white/30 text-[11px] mt-1.5">Logged so far this month</p>
            </div>
            <div>
                <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Income Split</p>
                <p className="text-white text-2xl font-bold font-mono">
                {Math.round((fixedTotal / grandTotal) * 100)}
                <span className="text-white/40 text-base font-normal">% fixed</span>
                </p>
                <p className="text-white/30 text-[11px] mt-1.5">{Math.round((variableTotal / grandTotal) * 100)}% variable</p>
            </div>
            </div>

            {/* Stacked bar — fixed vs variable */}
            <div className="relative">
            <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                <div className="h-full bg-[#00C950] rounded-l-full transition-all duration-700"
                style={{ width: `${(fixedTotal / grandTotal) * 100}%` }} />
                <div className="h-full bg-white/20 rounded-r-full"
                style={{ width: `${(variableTotal / grandTotal) * 100}%` }} />
            </div>
            <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#00C950]" />
                <span className="text-white/40 text-[10px]">Fixed ₹{fixedTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-white/40 text-[10px]">Variable ₹{variableTotal.toLocaleString()}</span>
                </div>
            </div>
            </div>
        </div>

        {/* Info callout — explain the model */}
        <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <Info size={15} className="text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-700 leading-relaxed">
            <span className="font-semibold">How income tracking works: </span>
            <span className="text-blue-600">
                Fixed sources (salary, rent) are set once and auto-counted every month.
                Variable sources (YouTube, freelance) need a manual entry each time you receive money — just tap "Log Income Entry" on the card.
            </span>
            </div>
        </div>

        {/* Fixed Sources */}
        <div>
            <SectionHeader
            title="Fixed Income Sources"
            sub="Recurring amounts credited on a predictable schedule"
            action={
                <button className="flex items-center gap-1.5 text-xs text-[#00C950] font-semibold hover:underline">
                <Plus size={13} /> Add Source
                </button>
            }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {fixedSources.map((s) => <FixedCard key={s.id} s={s} />)}
            <button className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border-2 border-dashed border-gray-200 p-5 hover:border-[#00C950]/40 hover:bg-[#00C950]/2 transition-all duration-200 min-h-[160px] group">
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#00C950]/10 flex items-center justify-center transition-colors">
                <Plus size={18} className="text-gray-400 group-hover:text-[#00C950] transition-colors" />
                </div>
                <div className="text-center">
                <p className="text-gray-400 group-hover:text-[#00C950] text-sm font-medium transition-colors">Add Fixed Source</p>
                <p className="text-gray-300 text-[11px] mt-0.5">Salary, rent, recurring payments</p>
                </div>
            </button>
            </div>
        </div>

        {/* Variable Sources */}
        <div>
            <SectionHeader
            title="Variable Income Sources"
            sub="Log entries each time you receive money from these sources"
            action={
                <button className="flex items-center gap-1.5 text-xs text-[#00C950] font-semibold hover:underline">
                <Plus size={13} /> Add Source
                </button>
            }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {variableSources.map((s) => <VariableCard key={s.id} s={s} />)}
            <button className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border-2 border-dashed border-gray-200 p-5 hover:border-[#00C950]/40 hover:bg-[#00C950]/2 transition-all duration-200 min-h-[200px] group">
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#00C950]/10 flex items-center justify-center transition-colors">
                <Plus size={18} className="text-gray-400 group-hover:text-[#00C950] transition-colors" />
                </div>
                <div className="text-center">
                <p className="text-gray-400 group-hover:text-[#00C950] text-sm font-medium transition-colors">Add Variable Source</p>
                <p className="text-gray-300 text-[11px] mt-0.5">YouTube, freelance, selling, etc.</p>
                </div>
            </button>
            </div>
        </div>

        {/* Monthly history strip */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div>
                <h3 className="text-gray-900 font-semibold text-sm">Monthly History</h3>
                <p className="text-gray-400 text-[11px] mt-0.5">Your total income across the last 6 months</p>
            </div>
            <button className="flex items-center gap-1 text-[#00C950] text-xs font-semibold hover:underline">
                Full Report <ArrowUpRight size={12} />
            </button>
            </div>
            <div className="px-5 py-4 grid grid-cols-6 gap-3">
            {[
                { month: "Nov", total: 64000 },
                { month: "Dec", total: 71200 },
                { month: "Jan", total: 58000 },
                { month: "Feb", total: 60000 },
                { month: "Mar", total: lastMonthTotal },
                { month: "Apr", total: grandTotal, current: true },
            ].map((m) => {
                const max = 80000;
                const pct = Math.round((m.total / max) * 100);
                return (
                <div key={m.month} className="flex flex-col items-center gap-2">
                    <span className="font-mono text-[10px] text-gray-500">₹{(m.total / 1000).toFixed(0)}k</span>
                    <div className="w-full h-20 bg-gray-100 rounded-lg overflow-hidden flex items-end">
                    <div
                        className={`w-full rounded-t-lg transition-all duration-700 ${m.current ? "bg-[#00C950]" : "bg-gray-200"}`}
                        style={{ height: `${pct}%` }}
                    />
                    </div>
                    <span className={`text-[11px] font-medium ${m.current ? "text-[#00C950]" : "text-gray-400"}`}>{m.month}</span>
                </div>
                );
            })}
            </div>
        </div>

        </div>
    );
}

// needed for SectionHeader used inline
// function SectionHeader({ title, sub, action }: { title: string; sub: string; action?: React.ReactNode }) {
//     return (
//         <div className="flex items-start justify-between mb-4">
//         <div>
//             <h3 className="text-gray-900 font-semibold text-[15px]">{title}</h3>
//             <p className="text-gray-400 text-[11px] mt-0.5">{sub}</p>
//         </div>
//         {action}
//         </div>
//     );
// }