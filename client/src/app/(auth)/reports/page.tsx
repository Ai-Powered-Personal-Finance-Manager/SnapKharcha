import {
    Download, FileText, Filter, Calendar,
    CheckCircle2, Clock, ArrowUpRight,
    TrendingUp, TrendingDown, Zap,
    FileSpreadsheet, FileImage, Mail,
    ChevronRight, Sparkles, BarChart3,
    PiggyBank, Wallet, RefreshCw,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type ReportStatus = "ready" | "generating" | "scheduled";
type ReportFormat = "pdf" | "csv" | "xlsx";

type Report = {
    id: number;
    title: string;
    description: string;
    period: string;
    generatedOn: string;
    status: ReportStatus;
    format: ReportFormat;
    size: string;
    highlights: { label: string; value: string; up?: boolean }[];
};

// ─── Data ─────────────────────────────────────────────────────
const recentReports: Report[] = [
    {
        id: 1,
        title: "March 2025 — Monthly Summary",
        description: "Complete income, expense, savings & budget analysis",
        period: "Mar 1 – Mar 31, 2025",
        generatedOn: "Apr 1, 2025",
        status: "ready",
        format: "pdf",
        size: "1.2 MB",
        highlights: [
        { label: "Income",   value: "Rs.71,000",  up: true  },
        { label: "Expenses", value: "Rs.38,000",  up: false },
        { label: "Saved",    value: "Rs.33,000",  up: true  },
        { label: "Rate",     value: "46%",       up: true  },
        ],
    },
    {
        id: 2,
        title: "Q1 2025 — Quarterly Overview",
        description: "Jan–Mar spending trends, category analysis & net worth change",
        period: "Jan 1 – Mar 31, 2025",
        generatedOn: "Apr 2, 2025",
        status: "ready",
        format: "pdf",
        size: "3.4 MB",
        highlights: [
        { label: "Income",   value: "Rs.1.89L",   up: true  },
        { label: "Expenses", value: "Rs.1.01L",   up: false },
        { label: "Saved",    value: "Rs.88,000",  up: true  },
        { label: "NW Growth",value: "+Rs.14L",    up: true  },
        ],
    },
    {
        id: 3,
        title: "February 2025 — Monthly Summary",
        description: "Complete income, expense, savings & budget analysis",
        period: "Feb 1 – Feb 28, 2025",
        generatedOn: "Mar 1, 2025",
        status: "ready",
        format: "csv",
        size: "48 KB",
        highlights: [
        { label: "Income",   value: "Rs.60,000",  up: true  },
        { label: "Expenses", value: "Rs.35,000",  up: false },
        { label: "Saved",    value: "Rs.25,000",  up: false },
        { label: "Rate",     value: "42%",       up: false },
        ],
    },
    {
        id: 4,
        title: "Tax Year 2024–25 — Annual Report",
        description: "Full year income summary, tax-deductible expenses, investment gains",
        period: "Apr 1, 2024 – Mar 31, 2025",
        generatedOn: "Apr 3, 2025",
        status: "ready",
        format: "xlsx",
        size: "890 KB",
        highlights: [
        { label: "Total Income",  value: "Rs.7.8L",  up: true  },
        { label: "Total Expense", value: "Rs.4.2L",  up: false },
        { label: "Tax Saved",     value: "Rs.46,500", up: true  },
        { label: "Net Savings",   value: "Rs.3.6L",  up: true  },
        ],
    },
    {
        id: 5,
        title: "April 2025 — Monthly Summary",
        description: "Auto-generating at month end. Preview available.",
        period: "Apr 1 – Apr 30, 2025",
        generatedOn: "—",
        status: "scheduled",
        format: "pdf",
        size: "—",
        highlights: [
        { label: "Income",   value: "Rs.91,000 (so far)", up: true  },
        { label: "Expenses", value: "Rs.18,430",          up: true  },
        { label: "Saved",    value: "Rs.72,570",          up: true  },
        { label: "Rate",     value: "64% (so far)",      up: true  },
        ],
    },
];

// Report type options for custom report builder
const reportTypes = [
    { icon: FileText,   label: "Monthly Summary",    desc: "Full breakdown of a single month",       popular: true  },
    { icon: BarChart3,  label: "Category Deep Dive", desc: "Drill into one spending category",        popular: false },
    { icon: TrendingUp, label: "Trend Analysis",     desc: "Patterns over a chosen date range",       popular: false },
    { icon: PiggyBank,  label: "Savings Report",     desc: "Goal progress + savings rate history",    popular: true  },
    { icon: Wallet,     label: "Tax Summary",        desc: "Income + deductible expenses for ITR",    popular: false },
    { icon: RefreshCw,  label: "Loan Repayment",     desc: "EMI payments, interest paid, outstanding",popular: false },
];

// Format icons + labels
const formatConfig: Record<ReportFormat, { icon: React.ElementType; label: string; color: string; bg: string }> = {
    pdf:  { icon: FileText,        label: "PDF",  color: "text-red-500",   bg: "bg-red-50"   },
    csv:  { icon: FileSpreadsheet, label: "CSV",  color: "text-green-600", bg: "bg-green-50" },
    xlsx: { icon: FileSpreadsheet, label: "XLSX", color: "text-[#00C950]", bg: "bg-[#00C950]/8" },
};

const statusConfig: Record<ReportStatus, { label: string; icon: React.ElementType; color: string; bg: string }> = {
    ready:      { label: "Ready",      icon: CheckCircle2, color: "text-[#00C950]",  bg: "bg-[#00C950]/8" },
    generating: { label: "Processing", icon: RefreshCw,    color: "text-blue-500",   bg: "bg-blue-50"     },
    scheduled:  { label: "Scheduled",  icon: Clock,        color: "text-amber-600",  bg: "bg-amber-50"    },
};

// ─── ReportCard ───────────────────────────────────────────────
function ReportCard({ r }: { r: Report }) {
    const fmt    = formatConfig[r.format];
    const status = statusConfig[r.status];
    const FmtIcon    = fmt.icon;
    const StatusIcon = status.icon;

    return (
        <div className={`group bg-white rounded-2xl border overflow-hidden hover:shadow-md hover:shadow-gray-100 transition-all duration-200 ${r.status === "scheduled" ? "border-amber-100" : "border-gray-100"}`}>

        {/* Top accent line */}
        <div className={`h-0.5 w-full ${r.status === "ready" ? "bg-[#00C950]" : r.status === "scheduled" ? "bg-amber-300" : "bg-blue-300"}`} />

        <div className="p-5">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${fmt.bg}`}>
                <FmtIcon size={17} className={fmt.color} />
                </div>
                <div className="min-w-0">
                <p className="text-gray-800 text-sm font-semibold leading-snug">{r.title}</p>
                <p className="text-gray-400 text-[11px] mt-0.5 leading-snug">{r.description}</p>
                </div>
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${status.bg} ${status.color}`}>
                <StatusIcon size={10} className={r.status === "generating" ? "animate-spin" : ""} />
                {status.label}
            </div>
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-4 gap-2 mb-4">
            {r.highlights.map((h) => (
                <div key={h.label} className="bg-gray-50 rounded-xl px-2 py-2 text-center">
                <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">{h.label}</p>
                <p className={`text-xs font-bold font-mono leading-tight ${h.up === false ? "text-red-500" : h.up === true ? "text-gray-900" : "text-gray-500"}`}>
                    {h.value}
                </p>
                </div>
            ))}
            </div>

            {/* Footer meta */}
            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-50">
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Calendar size={11} /> {r.period}</span>
                {r.size !== "—" && <span>{r.size}</span>}
            </div>
            {r.generatedOn !== "—" && <span>Generated {r.generatedOn}</span>}
            </div>
        </div>

        {/* Action buttons */}
        {r.status === "ready" && (
            <div className="flex border-t border-gray-50 divide-x divide-gray-50">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-800 transition-colors">
                <ArrowUpRight size={13} /> Preview
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs text-[#00C950] font-semibold hover:bg-[#00C950]/5 transition-colors">
                <Download size={13} /> Download
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-800 transition-colors">
                <Mail size={13} /> Email
            </button>
            </div>
        )}
        {r.status === "scheduled" && (
            <div className="flex border-t border-amber-50">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs text-amber-600 font-medium hover:bg-amber-50 transition-colors">
                <ArrowUpRight size={13} /> Preview partial data
            </button>
            </div>
        )}
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────
export default function ReportsPage() {
    return (
        <div className="space-y-7">

        {/* Header */}
        <div className="flex items-start justify-between">
            <div>
            <h2 className="text-gray-900 font-bold text-xl tracking-tight">Reports</h2>
            <p className="text-gray-400 text-sm mt-0.5">Export, download & schedule your financial reports</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C950] text-white text-xs font-semibold shadow-md shadow-[#00C950]/20 hover:bg-[#00b347] transition-colors">
            <Sparkles size={14} /> Generate Report
            </button>
        </div>

        {/* Quick export banner */}
        <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-6">
            <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#00C950]/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
                <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-md bg-[#00C950] flex items-center justify-center">
                    <Zap size={11} className="text-white" />
                </div>
                <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wider">Quick Export</p>
                </div>
                <h3 className="text-white text-lg font-bold mb-1">April 2025 Snapshot</h3>
                <p className="text-white/40 text-xs">
                Apr 1–11, 2025 · Partial month · Income Rs.91,000 · Spent Rs.18,430 · Saved Rs.72,570
                </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                {[
                { icon: FileText,        label: "PDF Report",  color: "border-red-400/30 text-red-300 hover:bg-red-500/10"      },
                { icon: FileSpreadsheet, label: "CSV Export",  color: "border-[#00C950]/30 text-[#00C950] hover:bg-[#00C950]/10"},
                { icon: FileImage,       label: "PNG Summary", color: "border-blue-400/30 text-blue-300 hover:bg-blue-500/10"   },
                ].map((btn) => {
                const BtnIcon = btn.icon;
                return (
                    <button key={btn.label}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${btn.color}`}>
                    <BtnIcon size={14} /> {btn.label}
                    </button>
                );
                })}
            </div>
            </div>
        </div>

        {/* Custom report builder */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div>
                <h3 className="text-gray-900 font-semibold text-sm">Custom Report Builder</h3>
                <p className="text-gray-400 text-[11px] mt-0.5">Choose type, date range & format — we'll generate it</p>
            </div>
            <Sparkles size={15} className="text-[#00C950]" />
            </div>

            <div className="p-5 space-y-5">
            {/* Report type grid */}
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Report Type</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {reportTypes.map((rt, i) => {
                    const Icon = rt.icon;
                    const isSelected = i === 0;
                    return (
                    <button key={rt.label}
                        className={`relative flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${isSelected ? "border-[#00C950]/30 bg-[#00C950]/5" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}>
                        {rt.popular && (
                        <span className="absolute top-2 right-2 text-[9px] font-bold text-[#00C950] bg-[#00C950]/10 px-1.5 py-0.5 rounded-full">
                            Popular
                        </span>
                        )}
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-[#00C950] shadow-sm shadow-[#00C950]/30" : "bg-gray-100"}`}>
                        <Icon size={14} className={isSelected ? "text-white" : "text-gray-500"} />
                        </div>
                        <div className="min-w-0 pr-4">
                        <p className={`text-xs font-semibold leading-tight ${isSelected ? "text-[#00C950]" : "text-gray-700"}`}>{rt.label}</p>
                        <p className="text-gray-400 text-[10px] mt-0.5 leading-snug">{rt.desc}</p>
                        </div>
                    </button>
                    );
                })}
                </div>
            </div>

            {/* Config row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date range */}
                <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Date Range</p>
                <select className="w-full px-3 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all">
                    <option>This month (Apr 2025)</option>
                    <option>Last month (Mar 2025)</option>
                    <option>Last 3 months</option>
                    <option>Last 6 months</option>
                    <option>This financial year</option>
                    <option>Custom range…</option>
                </select>
                </div>

                {/* Format */}
                <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Export Format</p>
                <div className="flex gap-2">
                    {(["pdf","csv","xlsx"] as ReportFormat[]).map((f) => {
                    const fmt = formatConfig[f];
                    const FmtIcon = fmt.icon;
                    const isSelected = f === "pdf";
                    return (
                        <button key={f}
                        className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-semibold transition-all ${isSelected ? `${fmt.bg} ${fmt.color} border-transparent` : "border-gray-200 text-gray-400 hover:bg-gray-50"}`}>
                        <FmtIcon size={15} />
                        {fmt.label}
                        </button>
                    );
                    })}
                </div>
                </div>

                {/* Include sections */}
                <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Include</p>
                <div className="space-y-2">
                    {["Income breakdown", "Expense analysis", "Budget vs actual", "AI Insights"].map((s, i) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                        <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-colors ${i !== 3 ? "bg-[#00C950] border-[#00C950]" : "border-gray-300"}`}>
                        {i !== 3 && <CheckCircle2 size={10} className="text-white" />}
                        </div>
                        <span className="text-xs text-gray-600">{s}</span>
                    </label>
                    ))}
                </div>
                </div>
            </div>

            {/* Generate CTA */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <p className="text-gray-400 text-xs">
                Estimated size: <span className="font-semibold text-gray-600">~1.4 MB</span> · Ready in ~5 seconds
                </p>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C950] text-white text-xs font-semibold shadow-md shadow-[#00C950]/20 hover:bg-[#00b347] transition-colors">
                <Sparkles size={13} /> Generate Report
                </button>
            </div>
            </div>
        </div>

        {/* Filters row */}
        <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 text-xs text-gray-500">
            <Filter size={13} /> Filter:
            </div>
            {["All", "Monthly", "Quarterly", "Annual", "Custom"].map((f, i) => (
            <button key={f}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${i === 0 ? "bg-[#00C950] text-white shadow-sm" : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                {f}
            </button>
            ))}
            <div className="ml-auto flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 cursor-pointer">
            <Calendar size={13} /> Date range
            </div>
        </div>

        {/* Recent reports grid */}
        <div>
            <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 font-semibold text-[15px]">Your Reports</h3>
            <p className="text-gray-400 text-xs">{recentReports.length} reports</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {recentReports.map((r) => <ReportCard key={r.id} r={r} />)}
            </div>
        </div>

        {/* Schedule section */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
            <h3 className="text-gray-900 font-semibold text-sm">Scheduled Reports</h3>
            <p className="text-gray-400 text-[11px] mt-0.5">Auto-generated on a recurring schedule</p>
            </div>
            <div className="divide-y divide-gray-50">
            {[
                { label: "Monthly Summary",       schedule: "1st of every month",   format: "PDF", email: "arjun.kapoor@gmail.com", active: true  },
                { label: "Weekly Spending Digest", schedule: "Every Monday at 9 AM", format: "PDF", email: "arjun.kapoor@gmail.com", active: true  },
                { label: "Tax Year Summary",       schedule: "Apr 1 every year",     format: "XLSX",email: "arjun.kapoor@gmail.com", active: false },
            ].map((s) => (
                <div key={s.label} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${s.active ? "bg-[#00C950]" : "bg-gray-300"}`} />
                    <div>
                    <p className="text-gray-800 text-sm font-medium">{s.label}</p>
                    <p className="text-gray-400 text-[11px]">{s.schedule} · {s.format} → {s.email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-semibold ${s.active ? "text-[#00C950]" : "text-gray-400"}`}>
                    {s.active ? "Active" : "Paused"}
                    </span>
                    <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <ChevronRight size={15} />
                    </button>
                </div>
                </div>
            ))}
            </div>
            <div className="px-5 py-4 border-t border-dashed border-gray-100">
            <button className="flex items-center gap-2 text-xs text-[#00C950] font-semibold hover:underline">
                <Calendar size={13} /> Add scheduled report
            </button>
            </div>
        </div>

        </div>
    );
}