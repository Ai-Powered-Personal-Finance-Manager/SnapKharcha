import {
    LayoutDashboard,
    ArrowLeftRight,
    ScanLine,
    PiggyBank,
    Target,
    BarChart3,
    FileText,
    Bell,
    Settings,
    HelpCircle,
    LogOut,
    type LucideIcon,
} from "lucide-react";

export type NavItem = {
    label: string;
    href: string;
    icon: LucideIcon;
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
            {
                label: "Transactions",
                href: "/transactions",
                icon: ArrowLeftRight,
                badge: 3,
                badgeColor: "green",
            },
            {
                label: "Bill Scanner",
                href: "/scan",
                icon: ScanLine,
            },
            {
                label: "Budgets",
                href: "/budgets",
                icon: PiggyBank,
            },
            {
                label: "Savings Goals",
                href: "/goals",
                icon: Target,
            },
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
                label: "Reports",
                href: "/reports",
                icon: FileText,
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
    {
        label: "Help & Support",
        href: "/help",
        icon: HelpCircle,
    },
    {
        label: "Log Out",
        href: "/logout",
        icon: LogOut,
    },
];