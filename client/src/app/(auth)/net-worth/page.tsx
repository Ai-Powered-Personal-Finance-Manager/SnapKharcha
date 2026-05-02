import {
  Plus, TrendingUp, TrendingDown, MoreHorizontal,
  Landmark, Car, Home, Gem, Bitcoin,
  Banknote, CreditCard, BarChart3, ArrowUpRight,
  Info, Pencil,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type AssetCategory = "liquid" | "physical" | "digital" | "investment";
type LiabilityCategory = "loan" | "credit" | "other";

type Asset = {
  id: number;
  icon: React.ElementType;
  label: string;
  description: string;
  value: number;
  category: AssetCategory;
  change?: number;      // % change since last month
  iconBg: string;
  iconColor: string;
};

type Liability = {
  id: number;
  icon: React.ElementType;
  label: string;
  description: string;
  value: number;
  category: LiabilityCategory;
  iconBg: string;
  iconColor: string;
};

// ─── Data ─────────────────────────────────────────────────────
const assets: Asset[] = [
  // Liquid
  { id: 1,  icon: Banknote,  label: "Savings Account",    description: "HDFC Bank — primary",          value: 124350,  category: "liquid",      change: 5.2,   iconBg: "bg-[#00C950]/8",  iconColor: "text-[#00C950]" },
  { id: 2,  icon: Banknote,  label: "Fixed Deposit",      description: "SBI — 6.5% p.a. 2-yr lock",   value: 200000,  category: "liquid",      change: 0,     iconBg: "bg-[#00C950]/8",  iconColor: "text-[#00C950]" },
  { id: 3,  icon: Landmark,  label: "PPF Account",        description: "Post Office — 7.1% p.a.",      value: 88000,   category: "liquid",      change: 1.8,   iconBg: "bg-blue-50",      iconColor: "text-blue-500"  },
  // Investments
  { id: 4,  icon: BarChart3, label: "Mutual Funds",       description: "HDFC Flexi Cap + Axis SIP",    value: 145000,  category: "investment",  change: 8.4,   iconBg: "bg-purple-50",    iconColor: "text-purple-500"},
  { id: 5,  icon: BarChart3, label: "Stock Portfolio",    description: "Zerodha — Nifty 50 stocks",    value: 62000,   category: "investment",  change: -3.2,  iconBg: "bg-purple-50",    iconColor: "text-purple-500"},
  // Physical
  { id: 6,  icon: Home,      label: "Flat — Andheri",     description: "2BHK · 650 sq ft · est. value",value: 8500000, category: "physical",    change: 4.1,   iconBg: "bg-amber-50",     iconColor: "text-amber-600" },
  { id: 7,  icon: Car,       label: "Maruti Swift",       description: "2020 model · est. resale",     value: 480000,  category: "physical",    change: -8.5,  iconBg: "bg-amber-50",     iconColor: "text-amber-600" },
  { id: 8,  icon: Gem,       label: "Gold Jewellery",     description: "Family gold — est. 120g",      value: 720000,  category: "physical",    change: 12.0,  iconBg: "bg-yellow-50",    iconColor: "text-yellow-600"},
  // Digital
  { id: 9,  icon: Bitcoin,   label: "Crypto Holdings",   description: "BTC 0.12 + ETH 1.4",           value: 38000,   category: "digital",     change: -11.2, iconBg: "bg-orange-50",    iconColor: "text-orange-500"},
];

const liabilities: Liability[] = [
  { id: 1, icon: Home,       label: "Home Loan",          description: "SBI Housing · Rs.45L outstanding",value: 4500000, category: "loan",   iconBg: "bg-red-50",   iconColor: "text-red-500"  },
  { id: 2, icon: Car,        label: "Car Loan",           description: "HDFC Auto · Rs.1.8L outstanding", value: 180000,  category: "loan",   iconBg: "bg-red-50",   iconColor: "text-red-500"  },
  { id: 3, icon: CreditCard, label: "Credit Card",        description: "ICICI Coral · current balance",  value: 12400,   category: "credit", iconBg: "bg-pink-50",  iconColor: "text-pink-500" },
  { id: 4, icon: Banknote,   label: "Personal Loan",      description: "Bajaj Finance · Rs.80K left",      value: 80000,   category: "other",  iconBg: "bg-orange-50",iconColor: "text-orange-500"},
];

// ─── Computed ─────────────────────────────────────────────────
const totalAssets      = assets.reduce((a, s) => a + s.value, 0);
const totalLiabilities = liabilities.reduce((a, s) => a + s.value, 0);
const netWorth         = totalAssets - totalLiabilities;
const prevNetWorth     = netWorth * 0.962;           // mock: was 3.8% lower last month
const nwChange         = netWorth - prevNetWorth;
const nwChangePct      = ((nwChange / prevNetWorth) * 100).toFixed(1);

const byCategory = (cat: AssetCategory) => assets.filter((a) => a.category === cat);
const catTotal   = (cat: AssetCategory) => byCategory(cat).reduce((a, s) => a + s.value, 0);

const categoryMeta: Record<AssetCategory, { label: string; color: string; hex: string }> = {
  liquid:     { label: "Liquid / Cash",    color: "bg-[#00C950]", hex: "#00C950" },
  investment: { label: "Investments",      color: "bg-purple-400", hex: "#a78bfa" },
  physical:   { label: "Physical Assets",  color: "bg-amber-400",  hex: "#fbbf24" },
  digital:    { label: "Digital Assets",   color: "bg-orange-400", hex: "#fb923c" },
};

// ─── Sub-components ───────────────────────────────────────────
function AssetRow({ a }: { a: Asset }) {
  const Icon = a.icon;
  const positive = (a.change ?? 0) >= 0;
  return (
    <div className="group flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/60 transition-colors">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${a.iconBg}`}>
        <Icon size={16} className={a.iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-sm font-medium">{a.label}</p>
        <p className="text-gray-400 text-[11px]">{a.description}</p>
      </div>
      {a.change !== undefined && a.change !== 0 && (
        <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${positive ? "bg-[#00C950]/8 text-[#00C950]" : "bg-red-50 text-red-500"}`}>
          {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {positive ? "+" : ""}{a.change}%
        </div>
      )}
      <p className="text-gray-900 text-sm font-semibold font-mono shrink-0 w-28 text-right">
        Rs.{a.value >= 100000 ? `${(a.value / 100000).toFixed(2)}L` : a.value.toLocaleString()}
      </p>
      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-gray-500 shrink-0">
        <Pencil size={13} />
      </button>
    </div>
  );
}

function LiabilityRow({ l }: { l: Liability }) {
  const Icon = l.icon;
  return (
    <div className="group flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/60 transition-colors">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${l.iconBg}`}>
        <Icon size={16} className={l.iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-sm font-medium">{l.label}</p>
        <p className="text-gray-400 text-[11px]">{l.description}</p>
      </div>
      <p className="text-red-500 text-sm font-semibold font-mono shrink-0 w-28 text-right">
        −Rs.{l.value >= 100000 ? `${(l.value / 100000).toFixed(2)}L` : l.value.toLocaleString()}
      </p>
      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-gray-500 shrink-0">
        <Pencil size={13} />
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function NetWorthPage() {
  const categories: AssetCategory[] = ["liquid", "investment", "physical", "digital"];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-gray-900 font-bold text-xl tracking-tight">Net Worth</h2>
          <p className="text-gray-400 text-sm mt-0.5">Assets − Liabilities = Your true wealth picture</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors">
            <Plus size={14} /> Add Liability
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C950] text-white text-xs font-semibold shadow-md shadow-[#00C950]/20 hover:bg-[#00b347] transition-colors">
            <Plus size={14} /> Add Asset
          </button>
        </div>
      </div>

      {/* Net Worth hero banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#01271E] p-6">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-[#00C950]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Net worth big number */}
          <div className="md:col-span-1">
            <p className="text-white/40 text-[11px] uppercase tracking-wider mb-2">Net Worth</p>
            <p className="text-white text-3xl font-black font-mono">
              Rs.{(netWorth / 100000).toFixed(1)}<span className="text-white/50 text-xl font-bold">L</span>
            </p>
            <div className={`flex items-center gap-1.5 mt-2 text-xs font-semibold ${Number(nwChangePct) >= 0 ? "text-[#00C950]" : "text-red-400"}`}>
              {Number(nwChangePct) >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              +Rs.{(nwChange / 1000).toFixed(0)}K ({nwChangePct}%) vs last month
            </div>
          </div>

          {/* Assets / Liabilities */}
          <div>
            <p className="text-white/40 text-[11px] uppercase tracking-wider mb-2">Total Assets</p>
            <p className="text-[#00C950] text-2xl font-bold font-mono">Rs.{(totalAssets / 100000).toFixed(1)}L</p>
            <p className="text-white/30 text-[11px] mt-1">{assets.length} items tracked</p>
          </div>
          <div>
            <p className="text-white/40 text-[11px] uppercase tracking-wider mb-2">Total Liabilities</p>
            <p className="text-red-400 text-2xl font-bold font-mono">−Rs.{(totalLiabilities / 100000).toFixed(1)}L</p>
            <p className="text-white/30 text-[11px] mt-1">{liabilities.length} outstanding debts</p>
          </div>
        </div>

        {/* Asset breakdown bar */}
        <div className="relative">
          <p className="text-white/30 text-[10px] mb-2 uppercase tracking-wider">Assets breakdown</p>
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            {categories.map((cat) => {
              const pct = (catTotal(cat) / totalAssets) * 100;
              return (
                <div key={cat} className={`h-full ${categoryMeta[cat].color} first:rounded-l-full last:rounded-r-full`}
                  style={{ width: `${pct}%` }} />
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryMeta[cat].hex }} />
                <span className="text-white/35 text-[10px]">
                  {categoryMeta[cat].label} ({Math.round((catTotal(cat) / totalAssets) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const total = catTotal(cat);
          const items = byCategory(cat);
          return (
            <div key={cat} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-500 text-xs font-medium">{categoryMeta[cat].label}</p>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryMeta[cat].hex }} />
              </div>
              <p className="text-gray-900 text-lg font-bold font-mono">
                Rs.{total >= 100000 ? `${(total / 100000).toFixed(1)}L` : total.toLocaleString()}
              </p>
              <p className="text-gray-400 text-[11px] mt-1">{items.length} {items.length === 1 ? "item" : "items"}</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full"
                  style={{ width: `${Math.round((total / totalAssets) * 100)}%`, backgroundColor: categoryMeta[cat].hex }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Assets table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <div>
            <h3 className="text-gray-900 font-semibold text-sm">Assets</h3>
            <p className="text-gray-400 text-[11px] mt-0.5">Everything you own</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-[#00C950] font-semibold hover:underline">
            <Plus size={13} /> Add Asset
          </button>
        </div>

        {/* Group by category */}
        {categories.map((cat) => (
          <div key={cat}>
            <div className="flex items-center gap-2 px-5 py-2 bg-gray-50/60 border-b border-gray-50">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: categoryMeta[cat].hex }} />
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{categoryMeta[cat].label}</p>
              <span className="ml-auto font-mono text-[11px] text-gray-500">
                Rs.{catTotal(cat) >= 100000 ? `${(catTotal(cat) / 100000).toFixed(2)}L` : catTotal(cat).toLocaleString()}
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {byCategory(cat).map((a) => <AssetRow key={a.id} a={a} />)}
            </div>
          </div>
        ))}

        {/* Add asset row */}
        <button className="w-full flex items-center gap-3 px-5 py-3.5 text-gray-400 hover:text-[#00C950] hover:bg-[#00C950]/2 transition-colors border-t border-dashed border-gray-100">
          <div className="w-9 h-9 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center group-hover:border-[#00C950]/30">
            <Plus size={15} />
          </div>
          <span className="text-xs font-medium">Add an asset</span>
        </button>
      </div>

      {/* Liabilities table */}
      <div className="bg-white rounded-2xl border border-red-50 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-red-50 bg-red-50/30">
          <div>
            <h3 className="text-gray-900 font-semibold text-sm">Liabilities</h3>
            <p className="text-gray-400 text-[11px] mt-0.5">What you owe — auto-synced from Loans page</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <Info size={12} />
              <span>Loan data pulled automatically</span>
            </div>
            <button className="flex items-center gap-1 text-xs text-red-500 font-semibold hover:underline ml-2">
              <ArrowUpRight size={12} /> Manage Loans
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {liabilities.map((l) => <LiabilityRow key={l.id} l={l} />)}
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 bg-red-50/40 border-t border-red-50">
          <p className="text-gray-600 text-sm font-semibold">Total Liabilities</p>
          <p className="text-red-500 text-sm font-bold font-mono">
            −Rs.{(totalLiabilities / 100000).toFixed(2)}L
          </p>
        </div>
      </div>

      {/* Net worth history */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <div>
            <h3 className="text-gray-900 font-semibold text-sm">Net Worth History</h3>
            <p className="text-gray-400 text-[11px] mt-0.5">12-month snapshot</p>
          </div>
        </div>
        <div className="px-5 py-5">
          <div className="flex items-end gap-2 h-24">
            {[42, 46, 48, 51, 50, 54, 55, 58, 61, 60, 64, 67].map((v, i) => {
              const isCurrent = i === 11;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className={`w-full rounded-t-md transition-all ${isCurrent ? "bg-[#00C950]" : "bg-gray-100 hover:bg-gray-200"}`}
                    style={{ height: `${(v / 70) * 100}%` }}
                  />
                  <span className={`text-[9px] font-medium ${isCurrent ? "text-[#00C950]" : "text-gray-300"}`}>
                    {["M","J","J","A","S","O","N","D","J","F","M","A"][i]}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
            <p className="text-gray-400 text-[11px]">May 2024 — Rs.42L</p>
            <div className="flex items-center gap-1.5 text-[#00C950] text-[11px] font-semibold">
              <TrendingUp size={12} />
              +Rs.25L (+59.5%) in 12 months
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}