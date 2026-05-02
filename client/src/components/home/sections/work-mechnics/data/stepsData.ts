import { stepsInterface } from "../interface";

export const steps: stepsInterface[] = [
  {
    step: "01",
    title: "Create Your Account",
    description:
      "Sign up as a Personal User or Business User. Personal users track individual finances. Business users get invoice generation, customer billing, and sales analytics on top.",
    image:
      "/register.png",
    color: "#00C950",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    step: "02",
    title: "Log or Snap Your Expenses",
    description:
      "Add expenses manually with categories, or simply snap a photo of your bill. Our AI model reads the receipt and auto-fills category, amount, date, and merchant name.",
    image:
      "/expense.png",
    color: "#0284c7",
    bg: "#f0f9ff",
    border: "#bae6fd",
  },
  {
    step: "03",
    title: "Set Budgets & Goals",
    description:
      "Define monthly budget limits per category. Set savings goals — vacation, gadget, emergency fund. SnapKharcha tracks your progress and nudges you when you drift off track.",
    image:
      "/goals.png",
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#ddd6fe",
  },
  {
    step: "04",
    title: "Get AI-Powered Insights",
    description:
      "SnapKharcha's AI engine analyzes your patterns and surfaces actionable insights — spending trends, anomalies, predictive forecasts, and personalized saving recommendations.",
    image:
      "/analytics.png",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
  },
];
