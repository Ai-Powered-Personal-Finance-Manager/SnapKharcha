"use client";

import { useState } from "react";
import {
  Search, ChevronDown, ChevronUp, Mail,
  MessageCircle, BookOpen, Video, Zap,
  Shield, CreditCard, BarChart3, Target,
  ArrowUpRight, CheckCircle2, Clock,
  AlertCircle, Send, Phone, FileText,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────
const faqSections = [
  {
    title: "Getting Started",
    icon: Zap,
    color: "text-[#00C950]",
    bg: "bg-[#00C950]/8",
    faqs: [
      { q: "How do I add my first expense?",                 a: "Go to the Expenses page and click 'Add Expense'. You must have at least one budget created first — the expense will be charged against that budget." },
      { q: "What's the difference between fixed and variable income?", a: "Fixed income (salary, rent received) is set once and automatically counted every month. Variable income (freelance, YouTube) needs a manual entry each time you receive money, since amounts differ every month." },
      { q: "How do budgets and expenses connect?",           a: "Budgets are spending limits you set per category. When you log an expense, you pick which budget to deduct it from. If you haven't created a budget for a category, you can't log expenses against it." },
      { q: "Can I use the app without connecting a bank?",   a: "Yes! You can log all income and expenses manually. Bank connection is optional — it just automates the process by importing transactions automatically." },
    ],
  },
  {
    title: "Budgets & Expenses",
    icon: CreditCard,
    color: "text-blue-500",
    bg: "bg-blue-50",
    faqs: [
      { q: "What happens when I exceed a budget?",           a: "You'll receive an alert notification. Expenses can still be logged, but the budget card will turn red and show you're over limit. This is by design — it's a warning, not a hard block." },
      { q: "Does unspent budget carry over to next month?",  a: "By default, budgets reset to zero each month. You can enable 'Rollover' when creating a budget to carry unspent amounts forward." },
      { q: "Can I have multiple budgets for the same category?", a: "No — each category can only have one active budget. This keeps tracking clean and prevents double-counting. You can edit the existing budget's amount instead." },
      { q: "How does the budget limit on expenses work?",    a: "Your total budget across all categories is capped at your disposable income — your monthly income minus EMIs. This ensures your budget plan is realistic." },
    ],
  },
  {
    title: "Bank Connection",
    icon: Shield,
    color: "text-purple-500",
    bg: "bg-purple-50",
    faqs: [
      { q: "Is it safe to connect my bank account?",         a: "Yes. We use RBI's Account Aggregator (AA) framework — a regulated, consent-based system. We only get read-only access to balance and transactions. We can never initiate payments or transfers." },
      { q: "Which banks are supported?",                     a: "We currently support HDFC, SBI, ICICI, Axis, Kotak, Yes Bank, PNB, and Bank of Baroda. More banks are being added. You'll see a 'Coming Soon' tag on unsupported banks." },
      { q: "How often is my balance synced?",                a: "Balances sync automatically every 2–4 hours. You can also trigger a manual sync anytime from the Banks page by tapping 'Sync All' or 'Sync' on a specific account." },
      { q: "Why does my sync show an error?",                a: "This usually means your bank session expired or you revoked AA consent. Go to Banks → find the errored account → tap 'Reconnect' and re-authorize." },
    ],
  },
  {
    title: "Analytics & Reports",
    icon: BarChart3,
    color: "text-amber-600",
    bg: "bg-amber-50",
    faqs: [
      { q: "How is the savings rate calculated?",            a: "Savings Rate = (Total Income − Total Expenses) ÷ Total Income × 100. It's calculated for each calendar month and shown as a percentage on the Analytics page." },
      { q: "Can I export my data?",                         a: "Yes. Go to Reports → choose a report type, date range, and format (PDF, CSV, or XLSX) → click Generate. You can also download the current month's snapshot instantly from the Quick Export banner." },
      { q: "How far back does transaction history go?",      a: "For manually entered expenses, all time. For bank-synced transactions, up to 6 months back from the date you connected your bank." },
      { q: "What are AI Insights and how are they generated?", a: "AI Insights analyze your spending patterns — merchant frequency, time-of-day habits, category trends — and generate actionable suggestions. They update weekly based on the latest 30 days of data." },
    ],
  },
  {
    title: "Goals & Net Worth",
    icon: Target,
    color: "text-rose-500",
    bg: "bg-rose-50",
    faqs: [
      { q: "What's the difference between monthly and yearly goals?", a: "Monthly goals reset every month — great for habits like 'save Rs.3,000 this month'. Yearly goals accumulate — they track progress toward a single big target like buying a MacBook by December." },
      { q: "How is net worth calculated?",                   a: "Net Worth = Total Assets − Total Liabilities. Assets include cash, investments, property, and digital assets. Liabilities include loans and credit card balances, which are pulled automatically from the Loans page." },
      { q: "Do my loan EMIs affect my budgets?",            a: "Yes — this is a core feature. Your EMI total is deducted from monthly income before budgets are calculated. If you earn Rs.1L and have Rs.15K in EMIs, you can only budget Rs.85K for expenses." },
    ],
  },
];

// ─── Guide cards ──────────────────────────────────────────────
const guides = [
  { icon: BookOpen, title: "Complete Setup Guide",      desc: "Get your account fully configured in 10 minutes", time: "10 min read", tag: "Beginner" },
  { icon: Video,    title: "Bill Scanner Walkthrough",  desc: "How to snap a receipt and let AI auto-fill it",   time: "3 min video", tag: "Feature"  },
  { icon: FileText, title: "Budget Strategy for Beginners", desc: "50/30/20 rule adapted for Nepal households", time: "8 min read", tag: "Finance"  },
  { icon: BarChart3,title: "Understanding AI Insights", desc: "What the suggestions mean and how to act on them",time: "5 min read", tag: "Feature"  },
  { icon: Shield,   title: "Bank Security Explained",   desc: "How Account Aggregator keeps your data safe",     time: "4 min read", tag: "Security" },
  { icon: Target,   title: "Setting Effective Goals",   desc: "Monthly vs yearly goals — which to use when",     time: "6 min read", tag: "Finance"  },
];

const tagColors: Record<string, string> = {
  Beginner: "bg-[#00C950]/8 text-[#00C950]",
  Feature:  "bg-blue-50 text-blue-500",
  Finance:  "bg-purple-50 text-purple-500",
  Security: "bg-amber-50 text-amber-600",
};

// ─── FAQ Item ────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-gray-50 last:border-0 transition-all ${open ? "bg-[#00C950]/2" : ""}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50/60 transition-colors">
        <p className={`text-sm font-medium leading-snug ${open ? "text-[#00C950]" : "text-gray-800"}`}>{q}</p>
        {open
          ? <ChevronUp size={16} className="text-[#00C950] shrink-0 mt-0.5" />
          : <ChevronDown size={16} className="text-gray-400 shrink-0 mt-0.5" />
        }
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function HelpPage() {
  const [search, setSearch]         = useState("");
  const [ticketSent, setTicketSent] = useState(false);

  const allFaqs = faqSections.flatMap((s) => s.faqs.map((f) => ({ ...f, section: s.title })));
  const filtered = search
    ? allFaqs.filter((f) =>
        f.q.toLowerCase().includes(search.toLowerCase()) ||
        f.a.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-7">

      {/* Header */}
      <div className="text-center py-4">
        <h2 className="text-gray-900 font-bold text-2xl tracking-tight">Help & Support</h2>
        <p className="text-gray-400 text-sm mt-2">Find answers, guides, or reach our team</p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl border border-gray-200 focus-within:border-[#00C950] focus-within:ring-2 focus-within:ring-[#00C950]/10 transition-all shadow-sm">
        <Search size={18} className="text-gray-400 shrink-0" />
        <input type="text" placeholder="Search for answers… e.g. 'how to add budget' or 'bank sync error'"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none" />
        {search && (
          <button onClick={() => setSearch("")} className="text-gray-300 hover:text-gray-500 text-lg font-light">×</button>
        )}
      </div>

      {/* Search results */}
      {filtered && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-50 bg-gray-50/60">
            <p className="text-gray-500 text-xs font-semibold">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
            </p>
          </div>
          {filtered.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-gray-400 text-sm">No matches found. Try different keywords or contact support below.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map((f, i) => (
                <div key={i} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{f.section}</p>
                  <p className="text-gray-800 text-sm font-medium mb-1">{f.q}</p>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{f.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!search && (
        <>
          {/* Quick contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: MessageCircle, title: "Live Chat",     desc: "Usually replies in under 5 minutes",   action: "Start Chat",   color: "bg-[#00C950]", textColor: "text-white",   available: true  },
              { icon: Mail,          title: "Email Support", desc: "support@snapkharcha.com · within 24h",action: "Send Email",   color: "bg-white",     textColor: "text-gray-700",available: true  },
              { icon: Phone,         title: "Phone Support", desc: "Mon–Fri 9 AM–6 PM IST",               action: "Call Us",      color: "bg-white",     textColor: "text-gray-700",available: false },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title}
                  className={`flex flex-col gap-3 p-5 rounded-2xl border transition-all ${c.color === "bg-[#00C950]" ? "bg-[#00C950] border-transparent shadow-lg shadow-[#00C950]/25" : "bg-white border-gray-100 hover:shadow-md hover:shadow-gray-100"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.color === "bg-[#00C950]" ? "bg-white/15" : "bg-gray-100"}`}>
                    <Icon size={18} className={c.color === "bg-[#00C950]" ? "text-white" : "text-gray-600"} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${c.color === "bg-[#00C950]" ? "text-white" : "text-gray-800"}`}>{c.title}</p>
                    <p className={`text-[11px] mt-0.5 leading-snug ${c.color === "bg-[#00C950]" ? "text-white/70" : "text-gray-400"}`}>{c.desc}</p>
                  </div>
                  <button
                    disabled={!c.available}
                    className={`flex items-center gap-1.5 text-xs font-semibold ${c.color === "bg-[#00C950]" ? "text-white" : "text-[#00C950]"} ${!c.available ? "opacity-40 cursor-not-allowed" : "hover:underline"}`}>
                    {c.action} <ArrowUpRight size={12} />
                    {!c.available && <span className="text-[10px] ml-1 opacity-60">(coming soon)</span>}
                  </button>
                </div>
              );
            })}
          </div>

          {/* FAQ sections */}
          {faqSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${section.bg}`}>
                    <Icon size={16} className={section.color} />
                  </div>
                  <h3 className="text-gray-900 font-semibold text-sm">{section.title}</h3>
                  <span className="ml-auto text-gray-400 text-[11px]">{section.faqs.length} questions</span>
                </div>
                <div>
                  {section.faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
                </div>
              </div>
            );
          })}

          {/* Guides grid */}
          <div>
            <h3 className="text-gray-900 font-semibold text-[15px] mb-4">Guides & Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {guides.map((g) => {
                const Icon = g.icon;
                return (
                  <button key={g.title}
                    className="group flex flex-col gap-3 bg-white rounded-2xl border border-gray-100 p-5 text-left hover:shadow-md hover:shadow-gray-100 hover:border-gray-200 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-[#00C950]/8 flex items-center justify-center transition-colors">
                        <Icon size={17} className="text-gray-500 group-hover:text-[#00C950] transition-colors" />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColors[g.tag]}`}>{g.tag}</span>
                    </div>
                    <div>
                      <p className="text-gray-800 text-sm font-semibold leading-snug group-hover:text-[#00C950] transition-colors">{g.title}</p>
                      <p className="text-gray-400 text-[11px] mt-1 leading-relaxed">{g.desc}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mt-auto">
                      <Clock size={11} /> {g.time}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Raise a ticket */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h3 className="text-gray-900 font-semibold text-sm">Raise a Support Ticket</h3>
              <p className="text-gray-400 text-[11px] mt-0.5">Can't find an answer? Our team typically responds within 24 hours.</p>
            </div>

            {ticketSent ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <div className="w-12 h-12 rounded-2xl bg-[#00C950] flex items-center justify-center shadow-lg shadow-[#00C950]/25">
                  <CheckCircle2 size={22} className="text-white" />
                </div>
                <p className="text-gray-800 font-semibold">Ticket submitted!</p>
                <p className="text-gray-400 text-sm">We'll reply to arjun.kapoor@gmail.com within 24 hours.</p>
                <button onClick={() => setTicketSent(false)} className="text-[#00C950] text-xs font-semibold hover:underline mt-1">
                  Submit another
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">Category</label>
                    <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#00C950] transition-all">
                      <option>Bug / App Error</option>
                      <option>Bank Connection Issue</option>
                      <option>Billing & Subscription</option>
                      <option>Data & Privacy</option>
                      <option>Feature Request</option>
                      <option>Account Access</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">Priority</label>
                    <div className="flex gap-2">
                      {["Low","Medium","High"].map((p) => (
                        <button key={p}
                          className={`flex-1 py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${p === "Low" ? "border-[#00C950] bg-[#00C950]/5 text-[#00C950]" : "border-gray-200 text-gray-400 hover:border-gray-300"}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">Subject</label>
                  <input type="text" placeholder="Brief description of your issue"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all" />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">Details</label>
                  <textarea placeholder="Please describe your issue in detail. Include what you were doing when it happened, any error messages you saw, and the steps to reproduce it."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all resize-none" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                    <AlertCircle size={12} />
                    Replying to: arjun.kapoor@gmail.com
                  </div>
                  <button
                    onClick={() => setTicketSent(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C950] text-white text-xs font-bold shadow-md shadow-[#00C950]/20 hover:bg-[#00b347] transition-colors">
                    <Send size={13} /> Submit Ticket
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Version info footer */}
          <div className="text-center py-4 space-y-1">
            <p className="text-gray-300 text-[11px]">SnapKharcha v1.0.0 · Built in Nepal</p>
            <div className="flex items-center justify-center gap-4">
              {["Privacy Policy","Terms of Service","Status Page"].map((l) => (
                <button key={l} className="text-gray-400 text-[11px] hover:text-[#00C950] hover:underline transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
}