"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const recentActivity = [
    { icon: "🍔", label: "Food & Dining", amount: "-₹340", time: "2h ago", color: "#fbbf24" },
    { icon: "🚕", label: "Transport", amount: "-₹120", time: "5h ago", color: "#38bdf8" },
    { icon: "💊", label: "Healthcare", amount: "-₹850", time: "Yesterday", color: "#f472b6" },
  ];

  return (
    <div className="min-h-screen bg-white flex">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] relative overflow-hidden p-12 bg-[#01271E]">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#00C950]/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-60 h-60 rounded-full bg-[#00C950]/6 blur-[80px] pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 relative z-10 w-fit group">
          <div className="w-9 h-9 rounded-xl bg-[#00C950] flex items-center justify-center shadow-lg shadow-[#00C950]/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>
            Snap<span className="text-[#00C950]">Kharcha</span>
          </span>
        </Link>

        {/* Center content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Welcome back.{" "}
            <span className="text-[#00C950]">Your finances missed you.</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Sign in to check your spending insights, review budgets, and stay on track with your goals.
          </p>

          {/* Mini Dashboard */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-400 text-xs mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>This Month's Spending</p>
                <p className="text-white text-3xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif" }}>₹14,230</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Budget Left</p>
                <p className="text-[#00C950] text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>₹5,770</p>
              </div>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-1">
              <div className="h-full rounded-full bg-[#00C950] w-[71%] transition-all duration-700" />
            </div>
            <p className="text-gray-500 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>71% of ₹20,000 budget used</p>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white text-xs font-bold mb-3 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Recent Activity</p>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</p>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.time}</p>
                  </div>
                  <span className="text-xs font-bold" style={{ color: item.color, fontFamily: "'Syne', sans-serif" }}>{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00C950] animate-pulse" />
          <p className="text-gray-500 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            All data encrypted with AES-256 · Bank-grade security
          </p>
        </div>
      </div>

      {/* ── Right Panel (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-white">
        {/* Subtle green tint top-right */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#00C950]/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#00C950]/4 blur-[80px] pointer-events-none" />
        {/* Light dot grid */}
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        {/* Mobile Logo */}
        <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-xl bg-[#00C950] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-gray-900 font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
            Snap<span className="text-[#00C950]">Kharcha</span>
          </span>
        </Link>

        <div className="w-full max-w-md relative z-10">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Sign in to your account
            </h1>
            <p className="text-gray-500 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Don't have an account?{" "}
              <Link href="/register" className="text-[#00C950] font-semibold hover:underline">Create one free</Link>
            </p>
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold flex items-center justify-center gap-3 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 mb-5 shadow-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>or sign in with email</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Email Address</label>
              <div className="relative">
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 pl-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-[#00C950] hover:underline font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pl-11 pr-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword
                    ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  }
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${formData.rememberMe ? "bg-[#00C950] border-[#00C950]" : "border-gray-300 bg-white group-hover:border-[#00C950]/50"}`}>
                {formData.rememberMe && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="sr-only" />
              <span className="text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>Remember me</span>
            </label>

            {/* Submit */}
            <button
              type="button" onClick={handleSubmit}
              disabled={isLoading || !formData.email || !formData.password}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00C950] text-white hover:bg-[#00b347] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00C950]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : "Sign In to Dashboard →"}
            </button>
          </div>

          {/* Security note */}
          <div className="mt-8 p-4 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-start gap-3">
            <svg className="w-4 h-4 text-[#00C950] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Your data is protected with AES-256 encryption. We never share your financial data with third parties.
            </p>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            New to SnapKharcha?{" "}
            <Link href="/auth/register" className="text-[#00C950] font-semibold hover:underline">Create a free account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}