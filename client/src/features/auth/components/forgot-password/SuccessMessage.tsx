import { CONFIG } from "@/src/core/config";
import Link from "next/link";

export const SuccessMessage = () => {
  return (
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full bg-[#00C950]/15 animate-ping opacity-60" />
        <div className="relative w-20 h-20 rounded-full bg-[#00C950] flex items-center justify-center shadow-2xl shadow-[#00C950]/30">
          <svg
            className="w-9 h-9 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <h1
        className="text-3xl font-extrabold text-gray-900 mb-3"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Password Reset!
      </h1>
      <p
        className="text-gray-500 text-sm mb-10 leading-relaxed max-w-sm mx-auto"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Your password has been successfully updated. You can now sign in to your
        SnapKharcha account with your new password.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {[
          {
            icon: "🔒",
            title: "Account secured",
            desc: "Your new password is active",
          },
          {
            icon: "📱",
            title: "All devices signed out",
            desc: "Sign in again on each device",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-left"
          >
            <span className="text-2xl block mb-2">{card.icon}</span>
            <p
              className="text-gray-900 text-xs font-semibold mb-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {card.title}
            </p>
            <p
              className="text-gray-400 text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      <Link
        href={CONFIG.AUTH.LOGIN}
        className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00C950] text-white hover:bg-[#00b347] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00C950]/25 flex items-center justify-center gap-2"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Sign In to Dashboard
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>
      <p
        className="text-gray-400 text-xs mt-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Didn't request this change?{" "}
        <a
          href="mailto:security@snapkharcha.com"
          className="text-red-400 hover:underline"
        >
          Contact support
        </a>
      </p>
    </div>
  );
};
