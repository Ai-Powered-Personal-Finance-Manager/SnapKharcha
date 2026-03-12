"use client";
import Link from "next/link";

const links = {
  Product: ["Features", "How It Works", "Pricing", "For Business", "Roadmap"],
  Company: ["About Us", "Blog", "Careers", "Press Kit"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  Support: ["Help Center", "Contact Us", "System Status", "API Docs"],
};

export const Footer = () => {
  return (
    <footer className="bg-gray-900 px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4 group w-fit"
            >
              <div className="w-9 h-9 rounded-xl bg-[#00C950] flex items-center justify-center shadow-lg shadow-[#00C950]/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span
                className="text-white font-bold text-xl tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Snap<span className="text-[#00C950]">Kharcha</span>
              </span>
            </Link>
            <p
              className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              AI-powered personal and business finance management. Track
              expenses, snap bills, and get smart insights — all in one place.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: "𝕏", label: "Twitter" },
                { icon: "in", label: "LinkedIn" },
                { icon: "f", label: "Facebook" },
                { icon: "◎", label: "Instagram" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00C950]/50 hover:bg-[#00C950]/10 transition-all duration-200 text-xs font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4
                className="text-white text-sm font-bold mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h4
              className="text-white font-bold text-base mb-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Stay in the loop
            </h4>
            <p
              className="text-gray-400 text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Get product updates, financial tips, and feature announcements.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-600 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00C950]/60 transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            <button
              className="px-5 py-2.5 rounded-xl bg-[#00C950] text-white text-sm font-bold hover:bg-[#00b347] transition-colors whitespace-nowrap"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800">
          <p
            className="text-gray-500 text-sm text-center sm:text-left"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © 2025 SnapKharcha.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
