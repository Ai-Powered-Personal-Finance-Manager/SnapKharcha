import { BarChart3, Bell, File, Package, TrendingUp, Users } from "lucide-react";
import { businessFeaturesDataInterface } from "../interface";

export const businessFeaturesData: businessFeaturesDataInterface[] = [
  {
    icon: File,
    title: "AI Bill Generation",
    desc: "Generate professional customer bills and invoices with your business branding in seconds.",
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    desc: "Track daily, weekly, and monthly revenue. See top-selling items at a glance.",
  },
  {
    icon: Users,
    title: "Customer Records",
    desc: "Maintain customer purchase histories and identify loyal customers.",
  },
  {
    icon: Package,
    title: "Inventory Insights",
    desc: "Connect your stock to your sales data. Get alerts when items run low.",
  },
  {
    icon: TrendingUp,
    title: "Profit & Loss Overview",
    desc: "Auto-generated P&L summaries monthly — no accountant needed for basic overviews.",
  },
  {
    icon: Bell,
    title: "Smart Business Alerts",
    desc: "Get notified about unusual sales drops, high-expense days, or tax deadline reminders.",
  },
];
