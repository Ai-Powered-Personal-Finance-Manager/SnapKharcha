
// export default function Page() {
//     return (
//         <div className="flex items-center justify-center h-96 rounded-2xl border-2 border-dashed border-gray-200 bg-white">
//         <div className="text-center space-y-2">
//             <p className="text-2xl font-semibold text-gray-300">Settings</p>
//             <p className="text-sm text-gray-400">
//                 Content coming soon — your app settings are here.
//             </p>
//         </div>
//         </div>
//     );
// }
import {
    User, Lock, Bell, Palette, Download,
    ChevronRight, Shield, Smartphone, Mail,
    Eye, EyeOff, Globe, Moon, Trash2,
    CheckCircle2, AlertTriangle, CreditCard,
} from "lucide-react";

// ── Reusable primitives ──────────────────────────────────────
function Section({ title, description, children }: {
    title: string; description?: string; children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
            <h3 className="text-gray-900 font-semibold text-sm">{title}</h3>
            {description && <p className="text-gray-400 text-xs mt-0.5">{description}</p>}
        </div>
        <div className="divide-y divide-gray-50">{children}</div>
        </div>
    );
}

function Row({ label, description, children }: {
    label: string; description?: string; children: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between px-6 py-4 gap-4">
        <div className="min-w-0">
            <p className="text-gray-700 text-sm font-medium">{label}</p>
            {description && <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{description}</p>}
        </div>
        <div className="shrink-0">{children}</div>
        </div>
    );
}

function Toggle({ enabled }: { enabled: boolean }) {
    return (
        <div className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${enabled ? "bg-[#00C950]" : "bg-gray-200"}`}>
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0"}`} />
        </div>
    );
}

function TextInput({ value, type = "text" }: { value: string; type?: string }) {
    return (
        <input
        defaultValue={value}
        type={type}
        className="w-52 px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all"
        />
    );
}

function ActionButton({ label, variant = "default" }: { label: string; variant?: "default" | "danger" | "green" }) {
    const styles = {
        default: "border border-gray-200 text-gray-600 hover:bg-gray-50",
        danger:  "border border-red-100 text-red-500 hover:bg-red-50",
        green:   "bg-[#00C950] text-white shadow-sm shadow-[#00C950]/20 hover:bg-[#00b347]",
    };
    return (
        <button className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${styles[variant]}`}>
        {label}
        </button>
    );
}

// ── Page ─────────────────────────────────────────────────────
export default function SettingsPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-5">

        {/* Header */}
        <div>
            <h2 className="text-gray-900 font-bold text-xl tracking-tight">Settings</h2>
            <p className="text-gray-400 text-sm mt-0.5">Manage your account, security & preferences</p>
        </div>

        {/* Profile */}
        <Section title="Profile" description="Your personal information">

            {/* Avatar row */}
            <div className="flex items-center gap-5 px-6 py-5 border-b border-gray-50">
            <div className="w-16 h-16 rounded-2xl bg-[#01271E] flex items-center justify-center shrink-0 shadow-md">
                <span className="text-xl font-bold text-[#00C950]">AK</span>
            </div>
            <div className="flex-1">
                <p className="text-gray-800 text-sm font-semibold">Arjun Kapoor</p>
                <p className="text-gray-400 text-xs">arjun.kapoor@gmail.com</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                <CheckCircle2 size={12} className="text-[#00C950]" />
                <span className="text-[#00C950] text-[11px] font-medium">Pro Plan</span>
                </div>
            </div>
            <ActionButton label="Change Photo" />
            </div>

            <Row label="Full Name">
            <TextInput value="Arjun Kapoor" />
            </Row>
            <Row label="Email Address">
            <TextInput value="arjun.kapoor@gmail.com" type="email" />
            </Row>
            <Row label="Phone Number" description="Used for OTP verification">
            <TextInput value="+91 98765 43210" type="tel" />
            </Row>
            <Row label="Account Type">
            <span className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium">Personal</span>
            </Row>

            <div className="px-6 py-4 flex justify-end">
            <ActionButton label="Save Changes" variant="green" />
            </div>
        </Section>

        {/* Security */}
        <Section title="Security" description="Manage your password and account access">
            <Row label="Password" description="Last changed 3 months ago">
            <ActionButton label="Change Password" />
            </Row>
            <Row label="Two-Factor Authentication" description="Add an extra layer of security via OTP">
            <Toggle enabled={true} />
            </Row>
            <Row label="Active Sessions" description="2 devices currently logged in">
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors">
                Manage <ChevronRight size={13} />
            </button>
            </Row>
            <Row label="Login Alerts" description="Get notified when someone logs in from a new device">
            <Toggle enabled={true} />
            </Row>

            {/* Sessions list */}
            <div className="px-6 py-4 space-y-3 bg-gray-50/50">
            {[
                { device: "Chrome · MacBook Pro", location: "Mumbai, IN", icon: Globe, current: true  },
                { device: "SnapKharcha App · iPhone 15", location: "Mumbai, IN", icon: Smartphone, current: false },
            ].map((s) => (
                <div key={s.device} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <s.icon size={15} className="text-gray-400" />
                    <div>
                    <p className="text-gray-700 text-xs font-medium">{s.device}</p>
                    <p className="text-gray-400 text-[11px]">{s.location}</p>
                    </div>
                </div>
                {s.current ? (
                    <span className="text-[10px] font-semibold text-[#00C950] bg-[#00C950]/8 px-2 py-0.5 rounded-full">Current</span>
                ) : (
                    <button className="text-[11px] text-red-500 hover:underline">Revoke</button>
                )}
                </div>
            ))}
            </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" description="Choose what alerts you want to receive">
            {[
            { label: "Budget Alerts",      desc: "When you're near or over a budget limit",   on: true  },
            { label: "Transaction Alerts", desc: "For every debit and credit on your account", on: true  },
            { label: "AI Weekly Report",   desc: "Personalized spending digest every Monday",  on: true  },
            { label: "Bill Reminders",     desc: "Upcoming bill due dates",                    on: true  },
            { label: "Savings Milestones", desc: "When you hit a goal milestone",              on: true  },
            { label: "Promotional Emails", desc: "Tips, updates and offers from SnapKharcha",  on: false },
            ].map((n) => (
            <Row key={n.label} label={n.label} description={n.desc}>
                <Toggle enabled={n.on} />
            </Row>
            ))}
        </Section>

        {/* Preferences */}
        <Section title="Preferences" description="Customise your experience">
            <Row label="Currency" description="Used across all calculations and displays">
            <select className="px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all">
                <option>₹ INR — Indian Rupee</option>
                <option>$ USD — US Dollar</option>
                <option>€ EUR — Euro</option>
            </select>
            </Row>
            <Row label="Dark Mode" description="Switch to a dark themed interface">
            <Toggle enabled={false} />
            </Row>
            <Row label="Language">
            <select className="px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] transition-all">
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
            </select>
            </Row>
            <Row label="Budget Reset Day" description="Which day of the month budgets reset">
            <select className="px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#00C950] transition-all">
                <option>1st of the month</option>
                <option>Salary date (custom)</option>
                <option>Last day of month</option>
            </select>
            </Row>
        </Section>

        {/* Plan */}
        <Section title="Subscription">
            <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00C950]/10 flex items-center justify-center">
                    <CreditCard size={18} className="text-[#00C950]" />
                </div>
                <div>
                    <p className="text-gray-900 text-sm font-semibold">Pro Plan</p>
                    <p className="text-gray-400 text-xs">₹299/month · Renews May 1, 2025</p>
                </div>
                </div>
                <ActionButton label="Manage Plan" />
            </div>
            <div className="grid grid-cols-3 gap-3">
                {["AI Insights", "Unlimited Budgets", "Bill Scanner"].map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <CheckCircle2 size={12} className="text-[#00C950] shrink-0" /> {f}
                </div>
                ))}
            </div>
            </div>
        </Section>

        {/* Data */}
        <Section title="Data & Privacy">
            <Row label="Export My Data" description="Download all your transactions and budgets as CSV">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors">
                <Download size={13} /> Export CSV
            </button>
            </Row>
            <Row label="Privacy Mode" description="Blur all amounts on the dashboard">
            <Toggle enabled={false} />
            </Row>
        </Section>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-red-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-red-50 bg-red-50/40">
            <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-red-500" />
                <h3 className="text-red-600 font-semibold text-sm">Danger Zone</h3>
            </div>
            </div>
            <Row label="Delete Account" description="Permanently delete your account and all data. This cannot be undone.">
            <ActionButton label="Delete Account" variant="danger" />
            </Row>
        </div>

        </div>
    );
}