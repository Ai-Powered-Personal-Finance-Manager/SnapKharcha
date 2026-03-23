"use client";
import { useState } from "react";
import Link from "next/link";

type UserType = "personal" | "business" | null;
type Step = 1 | 2;

export default function RegisterPage() {
  const [userType, setUserType] = useState<UserType>(null);
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", email: "", password: "", confirmPassword: "",
    businessName: "", businessType: "", phone: "", agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [target.name]: target.type === "checkbox" ? target.checked : target.value }));
  };

  const strength = (() => {
    const p = formData.password; if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#0284c7", "#00C950"][strength];

  const EyeOn = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
  const EyeOff = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>;

  return (
    <div className="min-h-screen bg-white flex">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] relative overflow-hidden p-12 bg-[#01271E]">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#00C950]/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full bg-[#00C950]/6 blur-[80px] pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 relative z-10 w-fit">
          <div className="w-9 h-9 rounded-xl bg-[#00C950] flex items-center justify-center shadow-lg shadow-[#00C950]/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>
            Snap<span className="text-[#00C950]">Kharcha</span>
          </span>
        </Link>

        {/* Center */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00C950]/30 bg-[#00C950]/10 text-[#00C950] text-xs font-semibold mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C950] animate-pulse" />
            Join 2,000+ users already tracking
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Your finances,{" "}
            <span className="text-[#00C950]">finally understood</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Set up takes less than 2 minutes. Start tracking your first expense today.
          </p>

          <div className="space-y-3.5">
            {[
              { icon: "📸", label: "Snap any bill — AI reads & categorizes it instantly" },
              { icon: "📊", label: "Visual dashboards updated in real time" },
              { icon: "🔔", label: "Smart alerts before you overspend" },
              { icon: "🏪", label: "Business mode for shops & restaurants" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl leading-none mt-0.5">{item.icon}</span>
                <p className="text-gray-400 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-gray-400 text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            "SnapKharcha showed me I was spending ₹11,000/month on things I didn't even remember buying. Changed my entire approach to money."
          </p>
          <div className="flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80&fit=crop&crop=face" alt="user" className="w-8 h-8 rounded-full object-cover border border-white/10" />
            <div>
              <p className="text-white text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Arjun Kapoor</p>
              <p className="text-gray-500 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>Software Engineer, Mumbai</p>
            </div>
            <div className="ml-auto text-[#fbbf24] text-xs">★★★★★</div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00C950]/5 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* Mobile Logo */}
        <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-xl bg-[#00C950] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-gray-900 font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>Snap<span className="text-[#00C950]">Kharcha</span></span>
        </Link>

        <div className="w-full max-w-md relative z-10">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s ? "bg-[#00C950] text-white shadow-md shadow-[#00C950]/30" : "bg-gray-100 border border-gray-200 text-gray-400"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {step > s ? "✓" : s}
                </div>
                {s < 2 && <div className={`w-16 h-px transition-all duration-300 ${step > s ? "bg-[#00C950]" : "bg-gray-200"}`} />}
              </div>
            ))}
            <p className="ml-2 text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>Step {step} of 2</p>
          </div>

          {/* ── STEP 1: Account type ── */}
          {step === 1 && (
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Create your account</h1>
              <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>First, tell us how you'll use SnapKharcha.</p>

              <div className="space-y-4">
                {/* Personal */}
                <button
                  onClick={() => { setUserType("personal"); setStep(2); }}
                  className="group w-full p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#00C950] hover:shadow-lg hover:shadow-[#00C950]/10 transition-all duration-300 text-left shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">👤</div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-bold text-base mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Personal User</h3>
                      <p className="text-gray-500 text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Track your own expenses, set budgets, and get AI financial insights.</p>
                      <div className="flex flex-wrap gap-2">
                        {["Bill Snap", "AI Insights", "Budget Alerts"].map((p) => (
                          <span key={p} className="text-xs px-2.5 py-1 rounded-full bg-[#f0fdf4] text-[#00C950] font-semibold border border-[#bbf7d0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p}</span>
                        ))}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-[#00C950] transition-colors flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>

                {/* Business */}
                <button
                  onClick={() => { setUserType("business"); setStep(2); }}
                  className="group w-full p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#d97706] hover:shadow-lg hover:shadow-[#d97706]/10 transition-all duration-300 text-left shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#fffbeb] border border-[#fde68a] flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">🏪</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900 font-bold text-base" style={{ fontFamily: "'Syne', sans-serif" }}>Business User</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#fffbeb] text-[#d97706] font-bold border border-[#fde68a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pro</span>
                      </div>
                      <p className="text-gray-500 text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>For restaurants, shops, and small businesses. Generate bills & track sales.</p>
                      <div className="flex flex-wrap gap-2">
                        {["Invoicing", "Sales Analytics", "Inventory"].map((p) => (
                          <span key={p} className="text-xs px-2.5 py-1 rounded-full bg-[#fffbeb] text-[#d97706] font-semibold border border-[#fde68a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p}</span>
                        ))}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-[#d97706] transition-colors flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>
              </div>

              <p className="text-center text-gray-500 text-sm mt-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#00C950] font-semibold hover:underline">Sign in</Link>
              </p>
            </div>
          )}

          {/* ── STEP 2: Fill details ── */}
          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-sm mb-6 transition-colors group" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${userType === "business" ? "bg-[#fffbeb] border border-[#fde68a]" : "bg-[#f0fdf4] border border-[#bbf7d0]"}`}>
                  {userType === "business" ? "🏪" : "👤"}
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {userType === "business" ? "Business Account" : "Personal Account"}
                  </h1>
                  <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>Fill in your details to get started</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Arjun Kapoor"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }} />
                </div>

                {/* Business Name */}
                {userType === "business" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Business Name</label>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Kapoor's Kitchen"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/15 focus:bg-white transition-all duration-200"
                      style={{ fontFamily: "'DM Sans', sans-serif" }} />
                  </div>
                )}

                {/* Business Type */}
                {userType === "business" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Business Type</label>
                    <select name="businessType" value={formData.businessType} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/15 focus:bg-white transition-all duration-200 appearance-none"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <option value="">Select business type</option>
                      <option value="restaurant">Restaurant / Café</option>
                      <option value="grocery">Grocery / Supermarket</option>
                      <option value="retail">Retail Store</option>
                      <option value="mart">Mart / Convenience Store</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }} />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Phone Number</label>
                  <div className="flex gap-2">
                    <div className="px-3 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 text-sm flex items-center whitespace-nowrap" style={{ fontFamily: "'DM Sans', sans-serif" }}>🇮🇳 +91</div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="98765 43210"
                      className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                      style={{ fontFamily: "'DM Sans', sans-serif" }} />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Min. 8 characters"
                      className="w-full px-4 py-3 pr-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                      style={{ fontFamily: "'DM Sans', sans-serif" }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showPassword ? <EyeOff /> : <EyeOn />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1,2,3,4].map((i) => (
                          <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-300" style={{ backgroundColor: i <= strength ? strengthColor : "#e5e7eb" }} />
                        ))}
                      </div>
                      <p className="text-xs font-semibold" style={{ color: strengthColor, fontFamily: "'DM Sans', sans-serif" }}>{strengthLabel}</p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Confirm Password</label>
                  <div className="relative">
                    <input type={showConfirm ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password"
                      className={`w-full px-4 py-3 pr-11 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none transition-all duration-200 border ${formData.confirmPassword && formData.password !== formData.confirmPassword ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white"}`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showConfirm ? <EyeOff /> : <EyeOn />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Passwords don't match</p>
                  )}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 mt-0.5 rounded flex-shrink-0 border flex items-center justify-center transition-all duration-200 ${formData.agreeTerms ? "bg-[#00C950] border-[#00C950]" : "border-gray-300 bg-white group-hover:border-[#00C950]/50"}`}>
                    {formData.agreeTerms && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="sr-only" />
                  <span className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    I agree to the <Link href="/terms" className="text-[#00C950] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#00C950] hover:underline">Privacy Policy</Link>
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="button" disabled={!formData.agreeTerms}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00C950] text-white hover:bg-[#00b347] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00C950]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Create {userType === "business" ? "Business" : "Personal"} Account →
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>or continue with</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Google */}
                <button type="button" className="w-full py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold flex items-center justify-center gap-3 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>
              </div>

              <p className="text-center text-gray-500 text-sm mt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Already have an account? <Link href="/auth/login" className="text-[#00C950] font-semibold hover:underline">Sign in</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}