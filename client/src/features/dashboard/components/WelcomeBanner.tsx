import { Plus, ScanLine } from "lucide-react"

interface WelcomeBannerProps {
    greeting: {
        text: string;
    };
    userName?: string;
}

export const WelcomeBanner = ({ greeting, userName = "Guest" }: WelcomeBannerProps) => {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-[#01271E] px-6 py-5">
            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#00C950]/10 rounded-full blur-3xl" />
            <div className="relative flex items-center justify-between">
                <div>
                    <p className="text-white/50 text-sm">
                        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    </p>
                    <h2 className="text-white text-xl font-semibold mt-0.5">{greeting.text}, {userName} !</h2>
                    <p className="text-white/40 text-xs mt-1">Here&apos;s your financial snapshot for today</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00C950] text-white text-xs font-semibold shadow-lg shadow-[#00C950]/25 hover:bg-[#00b347] transition-colors">
                        <Plus size={14} /> Add Expense
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 border border-white/12 text-white/70 text-xs font-semibold hover:bg-white/12 transition-colors">
                        <ScanLine size={14} /> Scan Bill
                    </button>
                </div>
            </div>
        </div>
    )
}