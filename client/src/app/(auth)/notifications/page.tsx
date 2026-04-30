
// export default function Page() {
//     return (
//         <div className="flex items-center justify-center h-96 rounded-2xl border-2 border-dashed border-gray-200 bg-white">
//         <div className="text-center space-y-2">
//             <p className="text-2xl font-semibold text-gray-300">Notifications</p>
//             <p className="text-sm text-gray-400">
//                 Content coming soon — all alerts and notifications appears here.
//             </p>
//         </div>
//         </div>
//     );
// }
import {
    CheckCheck, Trash2, AlertTriangle,
    TrendingUp, Target, Zap, CreditCard,
    ShieldCheck, Info, Settings2, Filter,
} from "lucide-react";

const notifications = [
    {
        id: 1, unread: true,
        icon: AlertTriangle, iconBg: "bg-red-50", iconColor: "text-red-500",
        title: "Budget Alert — Shopping",
        body: "You've used 95% of your ₹4,000 shopping budget. Only ₹200 remaining this month.",
        time: "Just now", tag: "Budget",
    },
    {
        id: 2, unread: true,
        icon: Zap, iconBg: "bg-[#00C950]/8", iconColor: "text-[#00C950]",
        title: "Weekly AI Insight Ready",
        body: "Your spending report for last week is ready. You saved ₹2,340 more than your target!",
        time: "2 hours ago", tag: "Insight",
    },
    {
        id: 3, unread: true,
        icon: CreditCard, iconBg: "bg-blue-50", iconColor: "text-blue-500",
        title: "Salary Credited",
        body: "₹50,000 has been credited to your HDFC account ending in 4321.",
        time: "Yesterday, 9:02 AM", tag: "Transaction",
    },
    {
        id: 4, unread: false,
        icon: Target, iconBg: "bg-purple-50", iconColor: "text-purple-500",
        title: "Savings Goal Milestone",
        body: "You've crossed 70% of your MacBook Pro goal! At this rate you'll hit it by August.",
        time: "2 days ago", tag: "Goals",
    },
    {
        id: 5, unread: false,
        icon: TrendingUp, iconBg: "bg-amber-50", iconColor: "text-amber-500",
        title: "Spending Trend Detected",
        body: "Your food delivery spend went up 40% this week compared to your monthly average.",
        time: "3 days ago", tag: "Insight",
    },
    {
        id: 6, unread: false,
        icon: ShieldCheck, iconBg: "bg-[#00C950]/8", iconColor: "text-[#00C950]",
        title: "New Device Login",
        body: "A new login was detected from Mumbai, Maharashtra. If this wasn't you, secure your account immediately.",
        time: "4 days ago", tag: "Security",
    },
    {
        id: 7, unread: false,
        icon: Info, iconBg: "bg-gray-100", iconColor: "text-gray-500",
        title: "Bill Reminder — Electricity",
        body: "Your MSEB electricity bill of approx ₹850 is due in 3 days. Pay early to avoid late fees.",
        time: "5 days ago", tag: "Reminder",
    },
];

const tagColors: Record<string, string> = {
    Budget:      "bg-red-50 text-red-500 border-red-100",
    Insight:     "bg-[#00C950]/8 text-[#00C950] border-[#00C950]/20",
    Transaction: "bg-blue-50 text-blue-500 border-blue-100",
    Goals:       "bg-purple-50 text-purple-500 border-purple-100",
    Security:    "bg-[#00C950]/8 text-[#00C950] border-[#00C950]/20",
    Reminder:    "bg-gray-50 text-gray-500 border-gray-200",
};

const unreadCount = notifications.filter((n) => n.unread).length;

export default function NotificationsPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
            <div>
            <h2 className="text-gray-900 font-bold text-xl tracking-tight">Notifications</h2>
            <p className="text-gray-400 text-sm mt-0.5">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : "You're all caught up!"}
            </p>
            </div>
            <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors">
                <Filter size={13} /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#00C950] border border-[#00C950]/20 bg-[#00C950]/5 hover:bg-[#00C950]/10 transition-colors">
                <CheckCheck size={13} /> Mark all read
            </button>
            </div>
        </div>

        {/* Unread */}
        {unreadCount > 0 && (
            <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3 px-1">New</p>
            <div className="space-y-2">
                {notifications.filter((n) => n.unread).map((n) => {
                const Icon = n.icon;
                return (
                    <div key={n.id}
                    className="group relative flex gap-4 bg-white border border-[#00C950]/15 rounded-2xl px-5 py-4 hover:shadow-sm hover:shadow-[#00C950]/8 transition-all duration-200">
                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#00C950]" />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.iconBg}`}>
                        <Icon size={18} className={n.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-gray-900 text-sm font-semibold">{n.title}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tagColors[n.tag]}`}>
                            {n.tag}
                        </span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed">{n.body}</p>
                        <p className="text-gray-400 text-[11px] mt-1.5">{n.time}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity self-start mt-1 text-gray-300 hover:text-red-400 shrink-0">
                        <Trash2 size={14} />
                    </button>
                    </div>
                );
                })}
            </div>
            </div>
        )}

        {/* Read */}
        <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3 px-1">Earlier</p>
            <div className="space-y-2">
            {notifications.filter((n) => !n.unread).map((n) => {
                const Icon = n.icon;
                return (
                <div key={n.id}
                    className="group flex gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-4 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 opacity-60 ${n.iconBg}`}>
                    <Icon size={18} className={n.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-gray-600 text-sm font-medium">{n.title}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border opacity-60 ${tagColors[n.tag]}`}>
                        {n.tag}
                        </span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{n.body}</p>
                    <p className="text-gray-300 text-[11px] mt-1.5">{n.time}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity self-start mt-1 text-gray-300 hover:text-red-400 shrink-0">
                    <Trash2 size={14} />
                    </button>
                </div>
                );
            })}
            </div>
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100">
            <Settings2 size={16} className="text-gray-400 shrink-0" />
            <p className="text-gray-500 text-xs">
            Manage which notifications you receive in{" "}
            <a href="/dashboard/settings" className="text-[#00C950] font-semibold hover:underline">
                Settings → Notifications
            </a>
            </p>
        </div>
        </div>
    );
}