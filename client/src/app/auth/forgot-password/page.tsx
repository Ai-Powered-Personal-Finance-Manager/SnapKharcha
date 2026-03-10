"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { EyeIcon, EyeOff } from "lucide-react";

type Step = "email" | "otp" | "reset" | "success";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step !== "otp") return;
    setResendTimer(30); setCanResend(false);
    const interval = setInterval(() => {
      setResendTimer((t) => { if (t <= 1) { clearInterval(interval); setCanResend(true); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp]; newOtp[index] = value.slice(-1); setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) { setOtp(pasted.split("")); otpRefs.current[5]?.focus(); }
  };

  const simulate = (next: () => void) => { setIsLoading(true); setTimeout(() => { setIsLoading(false); next(); }, 1500); };

  const passwordStrength = (() => {
    if (!newPassword) return 0; let s = 0;
    if (newPassword.length >= 8) s++; if (/[A-Z]/.test(newPassword)) s++; if (/[0-9]/.test(newPassword)) s++; if (/[^A-Za-z0-9]/.test(newPassword)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#0284c7", "#00C950"][passwordStrength];

  const steps: Step[] = ["email", "otp", "reset"];
  const stepMeta = { email: { num: 1, label: "Enter Email", sub: "We'll send a 6-digit code" }, otp: { num: 2, label: "Verify OTP", sub: "Check your inbox or spam" }, reset: { num: 3, label: "New Password", sub: "Choose a strong password" }, success: { num: 4, label: "Done", sub: "" } };

  return (
    <div className="min-h-screen bg-white flex">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] relative overflow-hidden p-12 bg-[#01271E]">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#00C950]/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-[#00C950]/6 blur-[80px] pointer-events-none" />

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

        {/* Step Progress */}
        <div className="relative z-10">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>Password Reset Flow</p>
          <div className="space-y-5 mb-10">
            {steps.map((s) => {
              const meta = stepMeta[s];
              const isActive = step === s;
              const isDone = stepMeta[step].num > meta.num;
              return (
                <div key={s} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-500 ${isDone ? "bg-[#00C950] text-white" : isActive ? "bg-[#00C950] text-white shadow-lg shadow-[#00C950]/30" : "bg-white/5 border border-white/10 text-gray-500"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {isDone ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> : meta.num}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold transition-colors duration-300 ${isActive || isDone ? "text-white" : "text-gray-600"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>{meta.label}</p>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{meta.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Password tips */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-[#00C950]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-white text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Password Tips</p>
            </div>
            <ul className="space-y-2.5">
              {["Use at least 8 characters", "Mix uppercase & lowercase letters", "Include numbers and symbols", "Avoid your name or birthday"].map((tip, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C950]/60 flex-shrink-0" />
                  <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00C950] animate-pulse" />
          <p className="text-gray-500 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>Reset links expire after 15 minutes · OTP valid for 5 minutes</p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00C950]/5 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* Mobile Logo */}
        <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-xl bg-[#00C950] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span className="text-gray-900 font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>Snap<span className="text-[#00C950]">Kharcha</span></span>
        </Link>

        <div className="w-full max-w-md relative z-10">

          {/* ── Email step ── */}
          {step === "email" && (
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C950]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Forgot your password?</h1>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                No worries! Enter your registered email and we'll send you a 6-digit verification code.
              </p>
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Email Address</label>
                <div className="relative">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && email && simulate(() => setStep("otp"))} placeholder="you@example.com"
                    className="w-full px-4 py-3.5 pl-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }} />
                  <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
              </div>
              <button onClick={() => simulate(() => setStep("otp"))} disabled={!email || isLoading}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00C950] text-white hover:bg-[#00b347] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00C950]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {isLoading ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Sending code...</>) : (<>Send Verification Code <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></>)}
              </button>
              <p className="text-center text-gray-500 text-sm mt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Remember your password? <Link href="/auth/login" className="text-[#00C950] font-semibold hover:underline">Back to Sign In</Link>
              </p>
            </div>
          )}

          {/* ── OTP step ── */}
          {step === "otp" && (
            <div>
              <button onClick={() => setStep("email")} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-sm mb-6 transition-colors group" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Back
              </button>
              <div className="w-14 h-14 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0284c7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Check your inbox</h1>
              <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>We sent a 6-digit code to</p>
              <p className="text-gray-900 font-semibold text-sm mb-8 flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="text-[#00C950]">{email}</span>
                <button onClick={() => setStep("email")} className="text-gray-400 hover:text-gray-600 text-xs underline">change</button>
              </p>

              {/* OTP Inputs */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Verification Code</label>
                <div className="flex gap-2.5" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`w-full aspect-square rounded-xl text-center text-xl font-bold transition-all duration-200 focus:outline-none focus:scale-105 ${digit ? "bg-[#f0fdf4] border-2 border-[#00C950] text-gray-900" : "bg-gray-50 border-2 border-gray-200 text-gray-900 focus:border-[#00C950] focus:bg-[#f0fdf4]"}`}
                      style={{ fontFamily: "'Syne', sans-serif" }} />
                  ))}
                </div>
              </div>

              {/* Resend */}
              <div className="flex items-center justify-between mb-6 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-gray-500 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {canResend ? "Didn't receive the code?" : `Resend code in ${resendTimer}s`}
                </p>
                <button onClick={() => { if (canResend) { setResendTimer(30); setCanResend(false); setOtp(["","","","","",""]); } }} disabled={!canResend}
                  className={`text-xs font-semibold transition-all ${canResend ? "text-[#00C950] hover:underline cursor-pointer" : "text-gray-300 cursor-not-allowed"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Resend OTP
                </button>
              </div>

              <button onClick={() => simulate(() => setStep("reset"))} disabled={otp.some((d) => !d) || isLoading}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00C950] text-white hover:bg-[#00b347] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00C950]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {isLoading ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Verifying...</>) : (<>Verify Code <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></>)}
              </button>
              <p className="text-center text-gray-400 text-xs mt-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Check your spam folder if you don't see it within a minute.</p>
            </div>
          )}

          {/* ── Reset step ── */}
          {step === "reset" && (
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C950]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Set new password</h1>
              <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>Create a strong password you haven't used before.</p>

              <div className="space-y-4 mb-6">
                {/* New Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>New Password</label>
                  <div className="relative">
                    <input type={showNew ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 8 characters"
                      className="w-full px-4 py-3.5 pl-11 pr-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                      style={{ fontFamily: "'DM Sans', sans-serif" }} />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showNew ? <EyeOff /> : <EyeIcon />}
                    </button>
                  </div>
                  {newPassword && (
                    <div className="mt-2.5">
                      <div className="flex gap-1 mb-1.5">
                        {[1,2,3,4].map((i) => (
                          <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-300" style={{ backgroundColor: i <= passwordStrength ? strengthColor : "#e5e7eb" }} />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold" style={{ color: strengthColor, fontFamily: "'DM Sans', sans-serif" }}>{strengthLabel}</p>
                        <div className="flex gap-3">
                          {[{ label: "8+ chars", pass: newPassword.length >= 8 }, { label: "A-Z", pass: /[A-Z]/.test(newPassword) }, { label: "0-9", pass: /[0-9]/.test(newPassword) }, { label: "!@#", pass: /[^A-Za-z0-9]/.test(newPassword) }].map((req) => (
                            <span key={req.label} className="text-xs flex items-center gap-0.5 transition-colors duration-200" style={{ color: req.pass ? "#00C950" : "#9ca3af", fontFamily: "'DM Sans', sans-serif" }}>
                              {req.pass ? "✓" : "○"} {req.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Confirm New Password</label>
                  <div className="relative">
                    <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your new password"
                      className={`w-full px-4 py-3.5 pl-11 pr-11 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none transition-all duration-200 border ${confirmPassword && newPassword !== confirmPassword ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100" : confirmPassword && newPassword === confirmPassword ? "border-[#00C950] focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 bg-[#f0fdf4]" : "border-gray-200 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white"}`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }} />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showConfirm ? <EyeOff /> : <EyeOn />}
                    </button>
                    {confirmPassword && (
                      <div className="absolute right-10 top-1/2 -translate-y-1/2">
                        {newPassword === confirmPassword
                          ? <svg className="w-4 h-4 text-[#00C950]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          : <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        }
                      </div>
                    )}
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-red-500 mt-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Passwords don't match</p>
                  )}
                </div>
              </div>

              <button onClick={() => simulate(() => setStep("success"))} disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword || passwordStrength < 2 || isLoading}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00C950] text-white hover:bg-[#00b347] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00C950]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {isLoading ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Updating password...</>) : (<>Reset Password <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></>)}
              </button>
            </div>
          )}

          {/* ── Success step ── */}
          {step === "success" && (
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-[#00C950]/15 animate-ping opacity-60" />
                <div className="relative w-20 h-20 rounded-full bg-[#00C950] flex items-center justify-center shadow-2xl shadow-[#00C950]/30">
                  <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>Password Reset!</h1>
              <p className="text-gray-500 text-sm mb-10 leading-relaxed max-w-sm mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Your password has been successfully updated. You can now sign in to your SnapKharcha account with your new password.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[{ icon: "🔒", title: "Account secured", desc: "Your new password is active" }, { icon: "📱", title: "All devices signed out", desc: "Sign in again on each device" }].map((card, i) => (
                  <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-left">
                    <span className="text-2xl block mb-2">{card.icon}</span>
                    <p className="text-gray-900 text-xs font-semibold mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{card.title}</p>
                    <p className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{card.desc}</p>
                  </div>
                ))}
              </div>

              <Link href="/auth/login" className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00C950] text-white hover:bg-[#00b347] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00C950]/25 flex items-center justify-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Sign In to Dashboard
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <p className="text-gray-400 text-xs mt-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Didn't request this change? <a href="mailto:security@snapkharcha.com" className="text-red-400 hover:underline">Contact support</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}