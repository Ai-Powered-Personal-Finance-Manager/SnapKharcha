import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  ChartCandlestick,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  PiggyBank,
  Settings,
  Wallet,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  isLogout?: boolean;
  badge?: string | number;
  badgeColor?: "green" | "red" | "amber";
};

export type NavSection = {
  title?: string;
  items: NavItem[];
};

export const mainNavSections: NavSection[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Finance",
    items: [
      // {
      //     label: "Transactions",
      //     href: "/transactions",
      //     icon: ArrowLeftRight,
      //     badge: 3,
      //     badgeColor: "green",
      // },
      // {
      //     label: "Bill Scanner",
      //     href: "/scan",
      //     icon: ScanLine,
      // },
      {
        label: "Budgets",
        href: "/budgets",
        icon: PiggyBank,
      },
      {
        label: "Expenses",
        href: "/expenses",
        icon: ArrowLeftRight,
      },
      {
        label: "Incomes",
        href: "/incomes",
        icon: Wallet,
      },
      // {
      //     label: "Banks",
      //     href: "/banks",
      //     icon: Building2,
      // },
      {
        label: "Loans And EMIs",
        href: "/loans-and-emis",
        icon: FileText,
      },
      // {
      //     label: "Net Worth",
      //     href: "/net-worth",
      //     icon: BarChart3,
      // },
      // {
      //     label: "Savings Goals",
      //     href: "/savings-goals",
      //     icon: Target,
      // },
    ],
  },
  {
    title: "Insights",
    items: [
      {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
      {
        label: "Financial Health",
        href: "/financial-health",
        icon: ChartCandlestick,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        label: "Notifications",
        href: "/notifications",
        icon: Bell,
        badge: 5,
        badgeColor: "red",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export const bottomNavItems: NavItem[] = [
  // {
  //     label: "Profile",
  //     href: "/profile",
  //     icon: CircleUser,
  // },
  // {
  //     label: "Help & Support",
  //     href: "/help",
  //     icon: HelpCircle,
  // },
  // {
  //     label: "Logout",
  //     href: CONFIG.AUTH.HOME,
  //     icon: LogOut,
  //     isLogout: true,
  // },
];
