"use client";

import { useState } from "react";
import {
  Camera, Briefcase, GraduationCap, User,
  MapPin, Phone, Mail, Calendar, Globe,
  ChevronDown, CheckCircle2, Edit3, Save,
  Building2, Target, Shield,
  TrendingUp, Award, Clock,
  CircleDollarSign,
} from "lucide-react";

// ─── Employment status options ────────────────────────────────
const employmentStatuses = [
  { id: "employed",    label: "Employed",        icon: Briefcase,      desc: "Working full-time or part-time"     },
  { id: "self",        label: "Self-Employed",   icon: Building2,      desc: "Freelancer, business owner"         },
  { id: "student",     label: "Student",         icon: GraduationCap,  desc: "College, university, or school"     },
  { id: "unemployed",  label: "Unemployed",      icon: User,           desc: "Currently seeking work"             },
  { id: "retired",     label: "Retired",         icon: Award,          desc: "No longer actively working"         },
];

const incomeRanges = [
  "Below Rs.2L / year",
  "Rs.2L – Rs.5L / year",
  "Rs.5L – Rs.10L / year",
  "Rs.10L – Rs.20L / year",
  "Rs.20L – Rs.50L / year",
  "Above Rs.50L / year",
  "Prefer not to say",
];

const financialGoalOptions = [
  "Save for home purchase",
  "Build emergency fund",
  "Pay off loans faster",
  "Invest & grow wealth",
  "Plan for retirement",
  "Fund education",
  "Travel & experiences",
  "Start a business",
];

// ─── Page ─────────────────────────────────────────────────────
export default function ProfilePage() {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [status, setStatus]   = useState("employed");
  const [goals, setGoals]     = useState<string[]>(["Build emergency fund", "Pay off loans faster"]);

  const toggleGoal = (g: string) =>
    setGoals((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);

  const selectedStatus = employmentStatuses.find((e) => e.id === status)!;
  const StatusIcon = selectedStatus.icon;

  function SectionHeader({ title, id }: { title: string; id: string }) {
    const isEditing = editingSection === id;
    return (
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <h3 className="text-gray-900 font-semibold text-sm">{title}</h3>
        <button
          onClick={() => setEditingSection(isEditing ? null : id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${isEditing ? "bg-[#00C950] text-white" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"}`}>
          {isEditing ? <><Save size={12} /> Save</> : <><Edit3 size={12} /> Edit</>}
        </button>
      </div>
    );
  }

  function Field({ label, value, type = "text", placeholder, editable }: {
    label: string; value: string; type?: string; placeholder?: string; editable: boolean;
  }) {
    return (
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">{label}</label>
        {editable ? (
          <input type={type} defaultValue={value} placeholder={placeholder}
            className="w-full px-3 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all" />
        ) : (
          <p className="text-gray-800 text-sm px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">{value || <span className="text-gray-300">Not set</span>}</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-gray-900 font-bold text-xl tracking-tight">My Profile</h2>
        <p className="text-gray-400 text-sm mt-0.5">Your personal information and financial identity</p>
      </div>

      {/* ── Profile hero card ─────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#01271E] rounded-2xl p-6">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#00C950]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex items-start gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-[#00C950] flex items-center justify-center shadow-lg shadow-[#00C950]/30">
              <span className="text-2xl font-black text-white">AK</span>
            </div>
            <button className="absolute -bottom-2 -right-2 w-7 h-7 rounded-xl bg-white border-2 border-[#01271E] flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
              <Camera size={12} className="text-gray-600" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-xl font-bold">Rohan Shrestha</h3>
            <p className="text-white/50 text-sm mt-0.5">rohanxtha2060@gmail.com · +977 9828075695</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#00C950]/15 text-[#00C950] border border-[#00C950]/20">
                <StatusIcon size={11} /> {selectedStatus.label}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-white/8 text-white/60">
                <MapPin size={11} /> Kathmandu, Bagmati
              </span>
              <span className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-white/8 text-white/60">
                <Clock size={11} /> Member since Jan 2025
              </span>
            </div>
          </div>

          {/* Plan badge */}
          <div className="shrink-0 text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00C950] text-white text-xs font-bold shadow-md shadow-[#00C950]/30">
              <Award size={12} /> Pro Plan
            </span>
            <p className="text-white/30 text-[10px] mt-1.5">Renews May 1, 2025</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative mt-6 pt-5 border-t border-white/8 grid grid-cols-4 gap-4">
          {[
            { label: "Total Saved",   value: "Rs.3.6L",  icon: TrendingUp },
            { label: "Goals Active",  value: "9",       icon: Target     },
            { label: "Budgets Set",   value: "10",      icon: CircleDollarSign },
            { label: "Streak",        value: "47 days", icon: Award      },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={11} className="text-white/30" />
                  <p className="text-white/30 text-[10px] uppercase tracking-wider">{s.label}</p>
                </div>
                <p className="text-white font-bold text-sm font-mono">{s.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Personal Information ──────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <SectionHeader title="Personal Information" id="personal" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name"       value="Rohan Shrestha"              editable={editingSection === "personal"} />
          <Field label="Date of Birth"   value="April 7, 2004"  type="date" editable={editingSection === "personal"} />
          <Field label="Email Address"   value="rohanxtha2060@gmail.com" type="email" editable={editingSection === "personal"} />
          <Field label="Phone Number"    value="+977 9828075695" type="tel" editable={editingSection === "personal"} />
          <Field label="City"            value="kathmandu"                    editable={editingSection === "personal"} />
          <Field label="State"           value="Bagmati"               editable={editingSection === "personal"} />
          <Field label="Country"         value="Nepal"                     editable={editingSection === "personal"} />
        </div>
      </div>

      {/* ── Employment & Professional ─────────────────────── */}
      {/* <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <SectionHeader title="Employment & Professional" id="employment" />
        <div className="p-6 space-y-5">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-3">
              Current Status *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {employmentStatuses.map((e) => {
                const Icon = e.icon;
                const isSelected = status === e.id;
                return (
                  <button key={e.id}
                    onClick={() => setStatus(e.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-center transition-all ${isSelected ? "border-[#00C950] bg-[#00C950]/5" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? "bg-[#00C950] shadow-sm shadow-[#00C950]/30" : "bg-gray-100"}`}>
                      <Icon size={16} className={isSelected ? "text-white" : "text-gray-500"} />
                    </div>
                    <p className={`text-[11px] font-semibold leading-tight ${isSelected ? "text-[#00C950]" : "text-gray-600"}`}>
                      {e.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(status === "employed" || status === "self") && (
              <>
                <Field label="Company / Organisation" value={status === "employed" ? "Infosys Ltd" : "Freelance / Own Business"} editable={editingSection === "employment"} />
                <Field label="Job Title / Position"   value={status === "employed" ? "Software Engineer" : "Full-Stack Developer"} editable={editingSection === "employment"} />
                <Field label="Industry"               value="Information Technology" editable={editingSection === "employment"} />
                <Field label="Work Experience"        value="3 years" editable={editingSection === "employment"} />
              </>
            )}
            {status === "student" && (
              <>
                <Field label="Institution Name"  value="IIT Bombay"           editable={editingSection === "employment"} />
                <Field label="Course / Degree"   value="B.Tech Computer Science" editable={editingSection === "employment"} />
                <Field label="Year of Study"     value="3rd Year"             editable={editingSection === "employment"} />
                <Field label="Expected Graduation" value="May 2026"           editable={editingSection === "employment"} />
              </>
            )}
            {status === "retired" && (
              <>
                <Field label="Previous Occupation" value="Senior Manager — HDFC Bank" editable={editingSection === "employment"} />
                <Field label="Years of Experience" value="32 years"                   editable={editingSection === "employment"} />
              </>
            )}
            {status === "unemployed" && (
              <>
                <Field label="Last Occupation"    value="" placeholder="e.g. Marketing Executive" editable={true} />
                <Field label="Looking for work in" value="" placeholder="e.g. Tech, Finance…"     editable={true} />
              </>
            )}
          </div>
        </div>
      </div> */}

      {/* ── Financial Profile ────────────────────────────── */}
      {/* <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <SectionHeader title="Financial Profile" id="finance" />
        <div className="p-6 space-y-5">

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
              Annual Income Range
            </label>
            <div className="relative">
              <select defaultValue="Rs.5L – Rs.10L / year"
                className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-gray-200 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all">
                {incomeRanges.map((r) => <option key={r}>{r}</option>)}
              </select>
              <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-3">
              Primary Financial Goals <span className="text-gray-300 normal-case font-normal">(select all that apply)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {financialGoalOptions.map((g) => {
                const selected = goals.includes(g);
                return (
                  <button key={g}
                    onClick={() => toggleGoal(g)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-medium text-left transition-all ${selected ? "border-[#00C950] bg-[#00C950]/8 text-[#00C950]" : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"}`}>
                    <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? "bg-[#00C950] border-[#00C950]" : "border-gray-300"}`}>
                      {selected && <CheckCircle2 size={9} className="text-white" />}
                    </div>
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
              Investment Risk Appetite
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "low",    label: "Conservative",  desc: "Fixed deposits, PPF",       color: "text-blue-500",  bg: "border-blue-200 bg-blue-50/50" },
                { id: "medium", label: "Moderate",      desc: "Mutual funds, balanced",    color: "text-amber-600", bg: "border-amber-200 bg-amber-50/50" },
                { id: "high",   label: "Aggressive",    desc: "Stocks, equity, crypto",    color: "text-red-500",   bg: "border-red-200 bg-red-50/50" },
              ].map((r) => {
                const isSelected = r.id === "medium";
                return (
                  <button key={r.id}
                    className={`flex flex-col gap-1 p-3.5 rounded-xl border-2 text-left transition-all ${isSelected ? r.bg + " border-2" : "border-gray-200 hover:border-gray-300"}`}>
                    <p className={`text-xs font-bold ${isSelected ? r.color : "text-gray-600"}`}>{r.label}</p>
                    <p className="text-gray-400 text-[10px]">{r.desc}</p>
                    {isSelected && <CheckCircle2 size={12} className={r.color + " mt-1"} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">PAN Number</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl">
                <Shield size={13} className="text-gray-400 shrink-0" />
                <p className="text-gray-700 text-sm font-mono tracking-widest">ABCPK•••K</p>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">Aadhar (last 4)</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl">
                <Shield size={13} className="text-gray-400 shrink-0" />
                <p className="text-gray-700 text-sm font-mono tracking-widest">•••• •••• 4321</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* ── Preferences ──────────────────────────────────── */}
      {/* <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <SectionHeader title="App Preferences" id="prefs" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Currency",            value: "Rs. — Nepali Rupees" },
            { label: "Language",            value: "English"               },
            { label: "Budget Reset Day",    value: "1st of the month"      },
            { label: "Date Format",         value: "DD/MM/YYYY"            },
            { label: "Number Format",       value: "1,00,000 (Nepal)"     },
            { label: "Fiscal Year",         value: "Apr – Mar (Nepal)"     },
          ].map((p) => (
            <div key={p.label}>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">{p.label}</label>
              {editingSection === "prefs" ? (
                <div className="relative">
                  <select className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-gray-200 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#00C950] transition-all">
                    <option>{p.value}</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              ) : (
                <p className="text-gray-800 text-sm px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">{p.value}</p>
              )}
            </div>
          ))}
        </div>
      </div> */}

    </div>
  );
}