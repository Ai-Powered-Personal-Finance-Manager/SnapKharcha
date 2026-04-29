"use client";

import { useState } from "react";
import {
  Plus, RefreshCw, Shield, CheckCircle2,
  AlertTriangle, Clock, Wifi, WifiOff,
  CreditCard, Building2, TrendingUp, Eye,
  EyeOff, ChevronRight, Lock, Zap, Info,
  ArrowUpRight, ArrowDownLeft, MoreHorizontal,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type AccountType = "savings" | "current" | "salary" | "fd" | "rd" | "credit";
type SyncStatus  = "synced" | "syncing" | "error" | "pending";

type BankAccount = {
  id: number;
  bankName: string;
  bankShort: string;
  bankColor: string;
  bankBg: string;
  accountType: AccountType;
  accountNumber: string;   // masked
  ifsc: string;
  balance: number;
  lastSynced: string;
  syncStatus: SyncStatus;
  isPrimary: boolean;
  linkedUPI?: string;
};

// ─── Data ─────────────────────────────────────────────────────
const accounts: BankAccount[] = [
  {
    id: 1,
    bankName: "HDFC Bank",    bankShort: "HDFC",  bankColor: "text-[#004B87]", bankBg: "bg-blue-50",
    accountType: "salary",    accountNumber: "•••• •••• 4321",  ifsc: "HDFC0001234",
    balance: 124350,          lastSynced: "2 mins ago",          syncStatus: "synced",
    isPrimary: true,          linkedUPI: "arjun@hdfcbank",
  },
  {
    id: 2,
    bankName: "State Bank of India", bankShort: "SBI", bankColor: "text-[#22409A]", bankBg: "bg-indigo-50",
    accountType: "savings",   accountNumber: "•••• •••• 7890",  ifsc: "SBIN0012345",
    balance: 200000,          lastSynced: "1 hour ago",          syncStatus: "synced",
    isPrimary: false,
  },
  {
    id: 3,
    bankName: "ICICI Bank",   bankShort: "ICICI", bankColor: "text-[#F37A20]", bankBg: "bg-orange-50",
    accountType: "credit",    accountNumber: "•••• •••• •••• 5678", ifsc: "ICIC0001000",
    balance: -12400,          lastSynced: "Failed",              syncStatus: "error",
    isPrimary: false,         linkedUPI: "arjun@icici",
  },
  {
    id: 4,
    bankName: "Axis Bank",    bankShort: "AXIS",  bankColor: "text-[#800000]", bankBg: "bg-rose-50",
    accountType: "fd",        accountNumber: "•••• •••• 2233",  ifsc: "UTIB0001100",
    balance: 200000,          lastSynced: "Yesterday",           syncStatus: "synced",
    isPrimary: false,
  },
];

// ─── Popular banks for adding ─────────────────────────────────
const popularBanks = [
  { name: "HDFC Bank",  short: "HDFC",  color: "#004B87", supported: true  },
  { name: "SBI",        short: "SBI",   color: "#22409A", supported: true  },
  { name: "ICICI Bank", short: "ICICI", color: "#F37A20", supported: true  },
  { name: "Axis Bank",  short: "AXIS",  color: "#800000", supported: true  },
  { name: "Kotak",      short: "KOTAK", color: "#ED1C24", supported: true  },
  { name: "Yes Bank",   short: "YES",   color: "#003087", supported: true  },
  { name: "PNB",        short: "PNB",   color: "#1A3C6E", supported: true  },
  { name: "Bank of Baroda", short: "BOB", color: "#FF6600", supported: true },
  { name: "Canara Bank", short: "CAN",  color: "#007DC1", supported: false },
  { name: "Union Bank", short: "UBI",   color: "#002D62", supported: false },
  { name: "IndusInd",   short: "IIB",   color: "#0072BC", supported: false },
  { name: "Federal Bank",short: "FED",  color: "#003087", supported: false },
];

const accountTypeLabel: Record<AccountType, { label: string; bg: string; text: string }> = {
  savings:  { label: "Savings A/C",  bg: "bg-[#00C950]/8",  text: "text-[#00C950]"  },
  current:  { label: "Current A/C",  bg: "bg-blue-50",      text: "text-blue-500"   },
  salary:   { label: "Salary A/C",   bg: "bg-purple-50",    text: "text-purple-500" },
  fd:       { label: "Fixed Deposit",bg: "bg-amber-50",     text: "text-amber-600"  },
  rd:       { label: "Recurring Dep",bg: "bg-teal-50",      text: "text-teal-500"   },
  credit:   { label: "Credit Card",  bg: "bg-red-50",       text: "text-red-500"    },
};

const syncConfig: Record<SyncStatus, { icon: React.ElementType; color: string; label: string }> = {
  synced:  { icon: CheckCircle2, color: "text-[#00C950]",  label: "Synced"   },
  syncing: { icon: RefreshCw,    color: "text-blue-500",   label: "Syncing…" },
  error:   { icon: AlertTriangle,color: "text-red-500",    label: "Error"    },
  pending: { icon: Clock,        color: "text-amber-500",  label: "Pending"  },
};

// ─── Bank card ────────────────────────────────────────────────
function BankCard({ acc }: { acc: BankAccount }) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const sync   = syncConfig[acc.syncStatus];
  const SyncIcon = sync.icon;
  const typeConf = accountTypeLabel[acc.accountType];
  const isCredit = acc.accountType === "credit";

  return (
    <div className={`group bg-white rounded-2xl border overflow-hidden hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 ${acc.isPrimary ? "border-[#00C950]/25" : "border-gray-100"}`}>

      {/* Top accent */}
      <div className={`h-1 ${acc.syncStatus === "error" ? "bg-red-400" : acc.isPrimary ? "bg-[#00C950]" : "bg-gray-200"}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Bank avatar */}
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${acc.bankBg} border-gray-100`}>
              <span className={`text-xs font-black ${acc.bankColor}`}>{acc.bankShort}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-gray-800 text-sm font-semibold">{acc.bankName}</p>
                {acc.isPrimary && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#00C950] text-white">Primary</span>
                )}
              </div>
              <p className="text-gray-400 text-[11px] font-mono">{acc.accountNumber}</p>
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-gray-600">
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* Balance */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-gray-400 text-[11px]">
              {isCredit ? "Outstanding Balance" : "Available Balance"}
            </p>
            <button onClick={() => setBalanceVisible((v) => !v)} className="text-gray-300 hover:text-gray-500 transition-colors">
              {balanceVisible ? <Eye size={12} /> : <EyeOff size={12} />}
            </button>
          </div>
          {balanceVisible ? (
            <p className={`text-2xl font-black font-mono ${isCredit ? "text-red-500" : "text-gray-900"}`}>
              {isCredit ? "−" : ""}₹{Math.abs(acc.balance).toLocaleString()}
            </p>
          ) : (
            <p className="text-2xl font-black text-gray-200 tracking-widest">₹•••••</p>
          )}
        </div>

        {/* Tags row */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${typeConf.bg} ${typeConf.text}`}>
            {typeConf.label}
          </span>
          {acc.linkedUPI && (
            <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-purple-50 text-purple-500">
              UPI: {acc.linkedUPI}
            </span>
          )}
        </div>

        {/* IFSC */}
        <p className="text-gray-300 text-[10px] font-mono mb-4">IFSC: {acc.ifsc}</p>

        {/* Sync status */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className={`flex items-center gap-1.5 text-[11px] font-medium ${sync.color}`}>
            <SyncIcon size={12} className={acc.syncStatus === "syncing" ? "animate-spin" : ""} />
            {sync.label} · {acc.lastSynced}
          </div>
          <div className="flex items-center gap-2">
            {acc.syncStatus === "error" && (
              <button className="text-[11px] text-red-500 font-semibold hover:underline">Reconnect</button>
            )}
            <button className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#00C950] transition-colors">
              <RefreshCw size={11} /> Sync
            </button>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex border-t border-gray-50 divide-x divide-gray-50">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors">
          <ArrowUpRight size={12} /> Transactions
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors">
          <ArrowDownLeft size={12} /> Statements
        </button>
        {!acc.isPrimary && (
          <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs text-[#00C950] font-semibold hover:bg-[#00C950]/5 transition-colors">
            Set Primary
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function BanksPage() {
  const [showAddBank, setShowAddBank] = useState(false);

  const totalBalance = accounts
    .filter((a) => a.accountType !== "credit" && a.syncStatus !== "error")
    .reduce((a, b) => a + b.balance, 0);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-gray-900 font-bold text-xl tracking-tight">Connected Banks</h2>
          <p className="text-gray-400 text-sm mt-0.5">Sync your bank accounts for automatic balance & transaction updates</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors">
            <RefreshCw size={14} /> Sync All
          </button>
          <button
            onClick={() => setShowAddBank(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C950] text-white text-xs font-semibold shadow-md shadow-[#00C950]/20 hover:bg-[#00b347] transition-colors">
            <Plus size={14} /> Add Bank
          </button>
        </div>
      </div>

      {/* Summary banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-6">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#00C950]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Total Balance</p>
            <p className="text-white text-2xl font-black font-mono">₹{(totalBalance / 100000).toFixed(2)}L</p>
            <p className="text-white/30 text-[11px] mt-1">across {accounts.filter(a => a.accountType !== "credit").length} accounts</p>
          </div>
          <div>
            <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Accounts</p>
            <p className="text-white text-2xl font-black font-mono">{accounts.length}</p>
            <p className="text-white/30 text-[11px] mt-1">
              {accounts.filter(a => a.syncStatus === "synced").length} synced · {accounts.filter(a => a.syncStatus === "error").length} error
            </p>
          </div>
          <div>
            <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Primary Account</p>
            <p className="text-white text-lg font-bold">{accounts.find(a => a.isPrimary)?.bankName}</p>
            <p className="text-white/30 text-[11px] mt-1">{accounts.find(a => a.isPrimary)?.accountNumber}</p>
          </div>
          <div>
            <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Credit Outstanding</p>
            <p className="text-red-400 text-2xl font-black font-mono">₹12,400</p>
            <p className="text-white/30 text-[11px] mt-1">ICICI credit card</p>
          </div>
        </div>

        {/* Security note */}
        <div className="relative mt-5 pt-5 border-t border-white/8 flex items-center gap-2">
          <Lock size={13} className="text-white/30 shrink-0" />
          <p className="text-white/25 text-[11px]">
            Bank connections use RBI-approved Account Aggregator framework. We have read-only access. We never store your passwords.
          </p>
        </div>
      </div>

      {/* Error alert */}
      {accounts.some(a => a.syncStatus === "error") && (
        <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-red-50 border border-red-100">
          <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-700 text-xs font-semibold">ICICI Bank sync failed</p>
            <p className="text-red-600 text-xs mt-0.5">Your session may have expired. Reconnect your account to resume automatic syncing.</p>
          </div>
          <button className="text-red-500 text-xs font-bold hover:underline shrink-0">Reconnect</button>
        </div>
      )}

      {/* Security info */}
      <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-[#00C950]/5 border border-[#00C950]/15">
        <Shield size={15} className="text-[#00C950] shrink-0 mt-0.5" />
        <p className="text-[#01271E] text-xs leading-relaxed">
          <span className="font-semibold text-[#00C950]">Bank-grade security: </span>
          Connections are powered by the RBI's Account Aggregator framework. SnapKharcha gets
          read-only access to balances and transactions — we can never initiate transfers or payments on your behalf.
        </p>
      </div>

      {/* Bank cards grid */}
      <div>
        <h3 className="text-gray-900 font-semibold text-[15px] mb-4">Your Accounts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {accounts.map((acc) => <BankCard key={acc.id} acc={acc} />)}

          {/* Add bank card */}
          <button
            onClick={() => setShowAddBank(true)}
            className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 hover:border-[#00C950]/40 hover:bg-[#00C950]/2 transition-all duration-200 group min-h-[200px]">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 group-hover:bg-[#00C950]/10 flex items-center justify-center transition-colors">
              <Plus size={20} className="text-gray-400 group-hover:text-[#00C950] transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-gray-500 group-hover:text-[#00C950] text-sm font-semibold transition-colors">Add Bank Account</p>
              <p className="text-gray-300 text-[11px] mt-1">Connect savings, salary, FD or credit card</p>
            </div>
          </button>
        </div>
      </div>

      {/* Add Bank Panel (inline, not modal) */}
      {showAddBank && (
        <div className="bg-white rounded-2xl border border-[#00C950]/20 overflow-hidden shadow-lg shadow-[#00C950]/5">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-[#00C950]/3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#00C950] flex items-center justify-center">
                <Plus size={13} className="text-white" />
              </div>
              <h3 className="text-gray-900 font-semibold text-sm">Add a New Bank Account</h3>
            </div>
            <button onClick={() => setShowAddBank(false)} className="text-gray-400 hover:text-gray-700 text-lg font-light">×</button>
          </div>

          <div className="p-6 space-y-5">
            {/* How it works */}
            <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
              <Info size={14} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-blue-700 text-xs leading-relaxed">
                Select your bank → You'll be redirected to your bank's secure login → Grant read-only access → Done. The whole process takes under 2 minutes.
              </p>
            </div>

            {/* Account type */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-3">Account Type</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(["savings","salary","current","fd","rd","credit"] as AccountType[]).map((t) => {
                  const conf = accountTypeLabel[t];
                  return (
                    <button key={t}
                      className={`py-2.5 px-2 rounded-xl border-2 text-[11px] font-semibold text-center transition-all ${t === "savings" ? `${conf.bg} ${conf.text} border-transparent` : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                      {conf.label.replace(" A/C","").replace(" Dep","")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bank picker */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-3">
                Select Bank
                <span className="text-gray-300 font-normal normal-case ml-2">({popularBanks.filter(b => b.supported).length} supported)</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {popularBanks.map((b) => (
                  <button key={b.name}
                    disabled={!b.supported}
                    className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${b.supported ? "border-gray-200 hover:border-[#00C950]/40 hover:bg-[#00C950]/3 cursor-pointer" : "border-gray-100 opacity-40 cursor-not-allowed"}`}>
                    {!b.supported && (
                      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[8px] font-bold bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded-full whitespace-nowrap">Soon</span>
                    )}
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center border border-gray-100"
                      style={{ backgroundColor: b.color + "15" }}>
                      <span className="text-[10px] font-black" style={{ color: b.color }}>{b.short}</span>
                    </div>
                    <span className="text-[10px] text-gray-600 font-medium text-center leading-tight">{b.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Account details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">Account Number</label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 focus-within:border-[#00C950] focus-within:ring-2 focus-within:ring-[#00C950]/10 transition-all">
                  <Building2 size={14} className="text-gray-400 shrink-0" />
                  <input type="text" placeholder="Enter account number"
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-300 outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">IFSC Code</label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 focus-within:border-[#00C950] focus-within:ring-2 focus-within:ring-[#00C950]/10 transition-all">
                  <CreditCard size={14} className="text-gray-400 shrink-0" />
                  <input type="text" placeholder="e.g. HDFC0001234"
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-300 outline-none font-mono uppercase" />
                </div>
              </div>
            </div>

            {/* AA consent note */}
            <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-amber-50 border border-amber-100">
              <Zap size={14} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-amber-700 text-xs leading-relaxed">
                By connecting your bank, you consent to SnapKharcha fetching your <span className="font-semibold">account balance and transaction history</span> via the Account Aggregator network.
                This is <span className="font-semibold">read-only</span> — we cannot move money.
              </p>
            </div>

            {/* CTA */}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowAddBank(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="flex-1 py-3 rounded-xl bg-[#00C950] text-white text-sm font-bold shadow-md shadow-[#00C950]/20 hover:bg-[#00b347] transition-colors">
                Connect Bank Securely
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction auto-import note */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Wifi size={16} className="text-[#00C950]" />
          <h3 className="text-gray-900 font-semibold text-sm">What Syncing Does</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: TrendingUp,   title: "Live Balance",      desc: "Your account balance is always up to date in dashboard and net worth." },
            { icon: ArrowDownLeft,title: "Auto-import Txns",  desc: "Transactions are pulled in automatically — no manual logging needed." },
            { icon: Shield,       title: "Read-Only Access",  desc: "We can never initiate payments, transfers, or any write actions." },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#00C950]/8 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#00C950]" />
                </div>
                <div>
                  <p className="text-gray-800 text-xs font-semibold">{f.title}</p>
                  <p className="text-gray-400 text-[11px] mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}