"use client";

import { useState, useEffect } from "react";
import {
  Camera, Briefcase, GraduationCap, User,
  MapPin, Edit3, Save, Building2, Target,
  TrendingUp, Award, Clock, CircleDollarSign,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useGetProfile, useUpdateProfile } from "../api";

type EmploymentStatus = {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
};

// ─── Employment status options ────────────────────────────────
const employmentStatuses: EmploymentStatus[] = [
  { id: "employed", label: "Employed", icon: Briefcase, desc: "Working full-time or part-time" },
  { id: "self", label: "Self-Employed", icon: Building2, desc: "Freelancer, business owner" },
  { id: "student", label: "Student", icon: GraduationCap, desc: "College, university, or school" },
  { id: "unemployed", label: "Unemployed", icon: User, desc: "Currently seeking work" },
  { id: "retired", label: "Retired", icon: Award, desc: "No longer actively working" },
];

function SectionHeader({ title, isEditing, onToggle, disabled }: { title: string; isEditing: boolean; onToggle: () => void; disabled?: boolean }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
      <h3 className="text-gray-900 font-semibold text-sm">{title}</h3>
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${isEditing ? "bg-[#00C950] text-white" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"}`}>
        {isEditing ? <><Save size={12} /> Save</> : <><Edit3 size={12} /> Edit</>}
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function ProfilePage() {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [status] = useState("employed");

  // profile hooks
  const { profile, isLoading: isProfileLoading, refetch } = useGetProfile();
  const updateMutation = useUpdateProfile();

  // form state
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [stateName, setStateName] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    setTimeout(() => {
      setFullName(profile.name || "");
      setDob(profile.dob || null);
      setEmail(profile.email || "");
      setPhoneNumber(profile.phone || null);
      setCity(profile.city || null);
      setStateName(profile.state || null);
      setCountry(profile.country || null);
    }, 0);
  }, [profile]);

  const hasPersonalChanges =
    !!profile && (
      fullName !== (profile.name || "") ||
      dob !== (profile.dob || null) ||
      phoneNumber !== (profile.phone || null) ||
      city !== (profile.city || null) ||
      stateName !== (profile.state || null) ||
      country !== (profile.country || null)
    );

  async function handleSavePersonal() {
    if (!hasPersonalChanges) {
      return;
    }

    try {
      await updateMutation.mutateAsync({
        name: fullName,
        dob: dob || undefined,
        phone: phoneNumber || undefined,
        city: city || undefined,
        state: stateName || undefined,
        country: country || undefined,
      });
    } catch {
      // handled by mutation
    }
  }

  const selectedStatus = employmentStatuses.find((e) => e.id === status)!;
  const StatusIcon = selectedStatus.icon;

  if (isProfileLoading && !profile) {
    return <div className="max-w-4xl mx-auto py-6">Loading profile...</div>;
  }

  // If API returned no profile (e.g. { success: false, message: 'Profile not found' })
  if (!isProfileLoading && !profile) {
    return (
      <div className="max-w-4xl mx-auto py-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <h3 className="text-gray-900 font-semibold text-lg">Profile not found</h3>
          <p className="text-gray-500 text-sm mt-2">We couldn&apos;t find your profile. You can retry or create a profile to get started.</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => refetch()}
              className="px-4 py-2 rounded-xl bg-[#00C950] text-white font-medium hover:bg-[#00a840] transition-colors"
            >
              Retry
            </button>
            <button
              onClick={async () => {
                // create a minimal profile by calling update with default values
                try {
                  await updateMutation.mutateAsync({ name: "", dob: undefined });
                  refetch();
                } catch {
                  /* mutation shows toast on error */
                }
              }}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Create profile
            </button>
          </div>
        </div>
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
            <h3 className="text-white text-xl font-bold">{fullName || "N/A"}</h3>
            <p className="text-white/50 text-sm mt-0.5">{email} · {phoneNumber || "+977 9828075695"}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#00C950]/15 text-[#00C950] border border-[#00C950]/20">
                <StatusIcon size={11} /> {selectedStatus.label}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-white/8 text-white/60">
                <MapPin size={11} /> {city ? `${city}, ${country || "N/A"}` : "Location not set"}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-white/8 text-white/60">
                <Clock size={11} /> Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "N/A"}
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
        <SectionHeader
          title="Personal Information"
          isEditing={editingSection === "personal"}
          disabled={updateMutation.isPending}
          onToggle={async () => {
            if (editingSection === "personal") {
              await handleSavePersonal();
              setEditingSection(null);
            } else {
              setEditingSection("personal");
            }
          }}
        />

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">Full Name</label>
            {editingSection === "personal" ? (
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all" />
            ) : (
              <p className="text-gray-800 text-sm px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">{fullName || <span className="text-gray-300">Not set</span>}</p>
            )}
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">Date of Birth</label>
            {editingSection === "personal" ? (
              <input type="date" value={dob || ""} onChange={(e) => setDob(e.target.value)} className="w-full px-3 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all" />
            ) : (
              <p className="text-gray-800 text-sm px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">{dob || <span className="text-gray-300">Not set</span>}</p>
            )}
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">Email Address</label>
            {editingSection === "personal" ? (
              <input type="email" disabled value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all disabled:cursor-not-allowed" />
            ) : (
              <p className="text-gray-800 text-sm px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">{email || <span className="text-gray-300">Not set</span>}</p>
            )}
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">Phone Number</label>
            {editingSection === "personal" ? (
              <input type="tel" value={phoneNumber || ""} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-3 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all" />
            ) : (
              <p className="text-gray-800 text-sm px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">{phoneNumber || <span className="text-gray-300">Not set</span>}</p>
            )}
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">City</label>
            {editingSection === "personal" ? (
              <input value={city || ""} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all" />
            ) : (
              <p className="text-gray-800 text-sm px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">{city || <span className="text-gray-300">Not set</span>}</p>
            )}
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">State</label>
            {editingSection === "personal" ? (
              <input value={stateName || ""} onChange={(e) => setStateName(e.target.value)} className="w-full px-3 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all" />
            ) : (
              <p className="text-gray-800 text-sm px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">{stateName || <span className="text-gray-300">Not set</span>}</p>
            )}
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">Country</label>
            {editingSection === "personal" ? (
              <input value={country || ""} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all" />
            ) : (
              <p className="text-gray-800 text-sm px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">{country || <span className="text-gray-300">Not set</span>}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
