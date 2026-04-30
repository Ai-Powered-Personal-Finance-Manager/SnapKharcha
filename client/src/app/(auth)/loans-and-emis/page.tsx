import {
  Plus, Home, Car, GraduationCap, CreditCard,
  Banknote, TrendingDown, AlertTriangle, CheckCircle2,
  Calendar, Percent, MoreHorizontal, Info,
  ArrowRight, Wallet, ShieldCheck, Clock,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type LoanStatus = "active" | "completed" | "overdue";

type Loan = {
  id: number;
  icon: React.ElementType;
  label: string;
  lender: string;
  principal: number;
  outstanding: number;
  emi: number;
  interestRate: number;
  tenureMonths: number;
  paidMonths: number;
  nextDueDate: string;
  status: LoanStatus;
  iconBg: string;
  iconColor: string;
  accentHex: string;
};

// ─── Data ─────────────────────────────────────────────────────
const loans: Loan[] = [
  {
    id: 1, icon: Home, label: "Home Loan",
    lender: "SBI Home Finance",
    principal: 6000000, outstanding: 4500000,
    emi: 52000, interestRate: 8.5,
    tenureMonths: 240, paidMonths: 60,
    nextDueDate: "May 1, 2025", status: "active",
    iconBg: "bg-blue-50", iconColor: "text-blue-500", accentHex: "#3b82f6",
  },
  {
    id: 2, icon: Car, label: "Car Loan",
    lender: "HDFC Auto Finance",
    principal: 600000, outstanding: 180000,
    emi: 12000, interestRate: 9.2,
    tenureMonths: 60, paidMonths: 45,
    nextDueDate: "May 3, 2025", status: "active",
    iconBg: "bg-amber-50", iconColor: "text-amber-600", accentHex: "#f59e0b",
  },
  {
    id: 3, icon: Banknote, label: "Personal Loan",
    lender: "Bajaj Finance",
    principal: 200000, outstanding: 80000,
    emi: 8500, interestRate: 14.0,
    tenureMonths: 24, paidMonths: 14,
    nextDueDate: "May 5, 2025", status: "active",
    iconBg: "bg-orange-50", iconColor: "text-orange-500", accentHex: "#f97316",
  },
  {
    id: 4, icon: GraduationCap, label: "Education Loan",
    lender: "Bank of Baroda",
    principal: 400000, outstanding: 0,
    emi: 0, interestRate: 7.5,
    tenureMonths: 60, paidMonths: 60,
    nextDueDate: "—", status: "completed",
    iconBg: "bg-[#00C950]/8", iconColor: "text-[#00C950]", accentHex: "#00C950",
  },
];

// ─── Computed ─────────────────────────────────────────────────
const activeLoans      = loans.filter((l) => l.status === "active");
const totalEMI         = activeLoans.reduce((a, l) => a + l.emi, 0);
const totalOutstanding = activeLoans.reduce((a, l) => a + l.outstanding, 0);
const monthlyIncome    = 91000;   // pulled from income page
const disposableIncome = monthlyIncome - totalEMI;
const emiToIncomePct   = Math.round((totalEMI / monthlyIncome) * 100);
const safeThreshold    = 40;      // RBI guideline: keep EMI/income < 40%

// ─── Helpers ──────────────────────────────────────────────────
const statusConfig: Record<LoanStatus, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  active:    { label: "Active",    bg: "bg-blue-50",      text: "text-blue-500",   icon: Clock       },
  completed: { label: "Paid Off",  bg: "bg-[#00C950]/8",  text: "text-[#00C950]",  icon: CheckCircle2},
  overdue:   { label: "Overdue",   bg: "bg-red-50",       text: "text-red-500",    icon: AlertTriangle},
};

// ─── LoanCard ─────────────────────────────────────────────────
function LoanCard({ loan }: { loan: Loan }) {
  const Icon    = loan.icon;
  const paidPct = Math.round((loan.paidMonths / loan.tenureMonths) * 100);
  const remaining = loan.tenureMonths - loan.paidMonths;
  const cfg     = statusConfig[loan.status];
  const StatusIcon = cfg.icon;

  return (
    <div className={`group bg-white rounded-2xl border overflow-hidden hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 ${loan.status === "completed" ? "border-[#00C950]/15" : "border-gray-100"}`}>

      {/* Progress strip at top */}
      <div className="h-1 bg-gray-100">
        <div className="h-full rounded-r-full transition-all duration-700"
          style={{ width: `${paidPct}%`, backgroundColor: loan.accentHex }} />
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${loan.iconBg}`}>
              <Icon size={18} className={loan.iconColor} />
            </div>
            <div>
              <p className="text-gray-800 text-sm font-semibold">{loan.label}</p>
              <p className="text-gray-400 text-[11px]">{loan.lender}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
              <StatusIcon size={11} /> {cfg.label}
            </div>
            {loan.status !== "completed" && (
              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-gray-500">
                <MoreHorizontal size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Key numbers grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Outstanding</p>
            <p className={`text-sm font-bold font-mono ${loan.status === "completed" ? "text-[#00C950]" : "text-gray-900"}`}>
              {loan.status === "completed" ? "₹0 — Paid!" : `₹${(loan.outstanding / 100000).toFixed(1)}L`}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Monthly EMI</p>
            <p className={`text-sm font-bold font-mono ${loan.status === "completed" ? "text-gray-400" : "text-gray-900"}`}>
              {loan.status === "completed" ? "—" : `₹${loan.emi.toLocaleString()}`}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Interest Rate</p>
            <div className="flex items-center gap-1">
              <p className="text-gray-900 text-sm font-bold font-mono">{loan.interestRate}%</p>
              <Percent size={11} className="text-gray-400" />
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">
              {loan.status === "completed" ? "Tenure" : "Remaining"}
            </p>
            <p className="text-gray-900 text-sm font-bold font-mono">
              {loan.status === "completed" ? `${loan.tenureMonths / 12}yr` : `${remaining} mo`}
            </p>
          </div>
        </div>

        {/* Repayment progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[11px] text-gray-400">Repayment progress</p>
            <p className="text-[11px] font-semibold font-mono" style={{ color: loan.accentHex }}>{paidPct}%</p>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${paidPct}%`, backgroundColor: loan.accentHex }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-400">{loan.paidMonths} months paid</span>
            <span className="text-[10px] text-gray-400">{loan.tenureMonths} months total</span>
          </div>
        </div>

        {/* Next due / completed note */}
        {loan.status !== "completed" ? (
          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
              <Calendar size={12} />
              <span>Next due: <span className="font-semibold text-gray-700">{loan.nextDueDate}</span></span>
            </div>
            <button className="text-[11px] font-semibold text-blue-500 hover:underline">Pay Now</button>
          </div>
        ) : (
          <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
            <CheckCircle2 size={13} className="text-[#00C950]" />
            <p className="text-[#00C950] text-[11px] font-semibold">Fully repaid · Great job! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function LoansPage() {
  const overBudget = emiToIncomePct > safeThreshold;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-gray-900 font-bold text-xl tracking-tight">Loans & EMIs</h2>
          <p className="text-gray-400 text-sm mt-0.5">Manage your loans · EMIs auto-deducted from income</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C950] text-white text-xs font-semibold shadow-md shadow-[#00C950]/20 hover:bg-[#00b347] transition-colors">
          <Plus size={14} /> Add Loan
        </button>
      </div>

      {/* ── Disposable income calculator — the key feature ── */}
      <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-6">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#00C950]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <p className="text-white/40 text-[11px] uppercase tracking-wider mb-4">Disposable Income Calculator</p>

          {/* Flow equation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
            {/* Income */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <Wallet size={14} className="text-[#00C950]" />
                <p className="text-white/50 text-[11px] uppercase tracking-wider">Monthly Income</p>
              </div>
              <p className="text-white text-xl font-bold font-mono">₹{monthlyIncome.toLocaleString()}</p>
              <p className="text-white/30 text-[10px] mt-0.5">from Income page</p>
            </div>

            <ArrowRight size={18} className="text-white/20 shrink-0 self-center hidden sm:block" />
            <span className="text-white/20 text-lg font-bold sm:hidden self-start">↓</span>

            {/* EMI */}
            <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown size={14} className="text-red-400" />
                <p className="text-white/50 text-[11px] uppercase tracking-wider">Total EMIs</p>
              </div>
              <p className="text-red-400 text-xl font-bold font-mono">−₹{totalEMI.toLocaleString()}</p>
              <p className="text-white/30 text-[10px] mt-0.5">{activeLoans.length} active loans</p>
            </div>

            <ArrowRight size={18} className="text-white/20 shrink-0 self-center hidden sm:block" />
            <span className="text-white/20 text-lg font-bold sm:hidden self-start">↓</span>

            {/* Disposable */}
            <div className="flex-1 bg-[#00C950]/12 border border-[#00C950]/25 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={14} className="text-[#00C950]" />
                <p className="text-white/50 text-[11px] uppercase tracking-wider">For Budgets</p>
              </div>
              <p className="text-[#00C950] text-xl font-bold font-mono">₹{disposableIncome.toLocaleString()}</p>
              <p className="text-white/30 text-[10px] mt-0.5">max budget available</p>
            </div>
          </div>

          {/* EMI health meter */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <p className="text-white/40 text-[11px]">EMI-to-Income Ratio</p>
                <div className="group relative">
                  <Info size={11} className="text-white/25 cursor-pointer" />
                </div>
              </div>
              <p className={`text-[11px] font-bold font-mono ${overBudget ? "text-red-400" : "text-[#00C950]"}`}>
                {emiToIncomePct}% {overBudget ? "— Over safe limit!" : "— Healthy"}
              </p>
            </div>
            <div className="h-2.5 bg-white/8 rounded-full overflow-hidden relative">
              {/* Safe zone marker */}
              <div className="absolute top-0 bottom-0 border-r-2 border-dashed border-white/20 z-10"
                style={{ left: `${safeThreshold}%` }} />
              <div className={`h-full rounded-full transition-all duration-700 ${overBudget ? "bg-red-400" : "bg-[#00C950]"}`}
                style={{ width: `${Math.min(emiToIncomePct, 100)}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-white/20">0%</span>
              <span className="text-[10px] text-white/20">Safe limit: {safeThreshold}%</span>
              <span className="text-[10px] text-white/20">100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning / healthy strip */}
      {overBudget ? (
        <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-red-50 border border-red-100">
          <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-700 text-xs leading-relaxed">
            <span className="font-semibold">High debt load: </span>
            Your EMI-to-income ratio of {emiToIncomePct}% exceeds the recommended 40% threshold. Consider prepaying your Personal Loan (highest interest at 14%) to free up cash flow.
          </p>
        </div>
      ) : (
        <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-[#00C950]/5 border border-[#00C950]/15">
          <CheckCircle2 size={15} className="text-[#00C950] shrink-0 mt-0.5" />
          <p className="text-[#01271E] text-xs leading-relaxed">
            <span className="font-semibold text-[#00C950]">Healthy debt ratio: </span>
            Your EMIs use {emiToIncomePct}% of your income — well within the 40% safe limit.
            You have ₹{disposableIncome.toLocaleString()} available for budgeting this month.
          </p>
        </div>
      )}

      {/* How this affects budgets — explainer */}
      <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-blue-50/60 border border-blue-100">
        <Info size={15} className="text-blue-400 shrink-0 mt-0.5" />
        <p className="text-blue-700 text-xs leading-relaxed">
          <span className="font-semibold">How this connects to Budgets: </span>
          When you create or edit budgets, the total across all categories is capped at your disposable income of{" "}
          <span className="font-semibold font-mono">₹{disposableIncome.toLocaleString()}</span>.
          EMIs of <span className="font-semibold font-mono">₹{totalEMI.toLocaleString()}</span> are deducted first — automatically.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Active Loans",      value: activeLoans.length.toString(),                          sub: "loans running",            color: "text-gray-900" },
          { label: "Total Outstanding", value: `₹${(totalOutstanding / 100000).toFixed(1)}L`,          sub: "to be repaid",             color: "text-red-500"  },
          { label: "Monthly EMIs",      value: `₹${totalEMI.toLocaleString()}`,                       sub: "deducted from income",     color: "text-gray-900" },
          { label: "Disposable Budget", value: `₹${disposableIncome.toLocaleString()}`,               sub: "available for expenses",   color: "text-[#00C950]"},
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-gray-400 text-xs mb-2">{s.label}</p>
            <p className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-gray-400 text-[11px] mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Active loan cards */}
      <div>
        <h3 className="text-gray-900 font-semibold text-[15px] mb-4">Active Loans</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {activeLoans.map((loan) => <LoanCard key={loan.id} loan={loan} />)}

          {/* Add loan card */}
          <button className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 hover:border-[#00C950]/40 hover:bg-[#00C950]/2 transition-all duration-200 group min-h-[200px]">
            <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#00C950]/10 flex items-center justify-center transition-colors">
              <Plus size={18} className="text-gray-400 group-hover:text-[#00C950] transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-gray-400 group-hover:text-[#00C950] text-sm font-medium transition-colors">Add a Loan</p>
              <p className="text-gray-300 text-[11px] mt-0.5">Home, car, personal, education…</p>
            </div>
          </button>
        </div>
      </div>

      {/* Completed / past loans */}
      <div>
        <h3 className="text-gray-900 font-semibold text-[15px] mb-4">Paid Off Loans</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {loans.filter((l) => l.status === "completed").map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      </div>

    </div>
  );
}