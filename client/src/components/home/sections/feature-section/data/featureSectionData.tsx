import { FeatureDataInterface } from "../interface/featureInterface";

export const featuresData: FeatureDataInterface[] = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    color: "#00C950",
    iconBg: "rgba(0,201,80,0.12)",
    iconBorder: "rgba(0,201,80,0.25)",
    badgeBg: "rgba(0,201,80,0.1)",
    badgeBorder: "rgba(0,201,80,0.2)",
    title: "Bill Snap & Auto-Categorize",
    description:
      "Point your camera at any receipt. Our AI vision model reads the total, items, and merchant, auto-tagging it to the right category like Food, Travel, or Utilities instantly.",
    badge: "AI Vision",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    color: "#38bdf8",
    iconBg: "rgba(56,189,248,0.12)",
    iconBorder: "rgba(56,189,248,0.25)",
    badgeBg: "rgba(56,189,248,0.1)",
    badgeBorder: "rgba(56,189,248,0.2)",
    title: "Smart Spending Insights",
    description:
      "Go beyond raw numbers. SnapKharcha analyzes your patterns and surfaces actionable insights, like 'Your dining out spending has doubled this month.'",
    badge: "Analytics",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
    color: "#a78bfa",
    iconBg: "rgba(167,139,250,0.12)",
    iconBorder: "rgba(167,139,250,0.25)",
    badgeBg: "rgba(167,139,250,0.1)",
    badgeBorder: "rgba(167,139,250,0.2)",
    title: "Overspending Alerts",
    description:
      "Set custom budget limits per category. Get real-time push notifications when you're approaching or crossing your limits, before it's too late.",
    badge: "Real-time",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </svg>
    ),
    color: "#fbbf24",
    iconBg: "rgba(251,191,36,0.12)",
    iconBorder: "rgba(251,191,36,0.25)",
    badgeBg: "rgba(251,191,36,0.1)",
    badgeBorder: "rgba(251,191,36,0.2)",
    title: "Visual Expense Dashboard",
    description:
      "Beautiful charts and breakdowns of your monthly spending. Pie charts, bar graphs, and trend lines, a crystal-clear picture of where your money goes.",
    badge: "Dashboard",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "#f472b6",
    iconBg: "rgba(244,114,182,0.12)",
    iconBorder: "rgba(244,114,182,0.25)",
    badgeBg: "rgba(244,114,182,0.1)",
    badgeBorder: "rgba(244,114,182,0.2)",
    title: "Goal & Savings Tracker",
    description:
      "Set financial goals, a trip, a gadget, an emergency fund. SnapKharcha tracks your progress, calculates how much to save monthly, and celebrates milestones.",
    badge: "Goals",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    color: "#34d399",
    iconBg: "rgba(52,211,153,0.12)",
    iconBorder: "rgba(52,211,153,0.25)",
    badgeBg: "rgba(52,211,153,0.1)",
    badgeBorder: "rgba(52,211,153,0.2)",
    title: "Manual Entry & Import",
    description:
      "Log expenses manually with full category control, add notes, and attach images. Or import CSV/Excel bank statements with one click.",
    badge: "Flexible",
  },
];
