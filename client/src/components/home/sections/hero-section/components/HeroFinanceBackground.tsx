export const HeroFinanceBackground = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <svg
                className="absolute inset-0 w-full h-full opacity-20"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.10" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Horizontal grid lines */}
                {/* {[120, 200, 280, 360, 440].map((y) => (
                    <line
                        key={y}
                        x1="0" y1={y} x2="1000" y2={y}
                        stroke="#22c55e" strokeOpacity="2" strokeWidth="1"
                    />
                ))} */}

                {/* Vertical grid lines */}
                {/* {[125, 250, 375, 500, 625, 750, 875].map((x) => (
                    <line
                        key={x}
                        x1={x} y1="0" x2={x} y2="580"
                        stroke="#22c55e" strokeOpacity="7" strokeWidth="1"
                    />
                ))} */}
                {/* horizontal lines */}
                {Array.from({ length: 25 }, (_, i) => (i + 1) * 80).map((y) => (
                <line key={y} x1="0" y1={y} x2="1000" y2={y}
                    stroke="#22c55e" strokeOpacity="0.5" strokeWidth="1" />
                ))}

                {/* vertical lines   */}
                {Array.from({ length: 50 }, (_, i) => (i + 1) * 100).map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="1000"
                    stroke="#22c55e" strokeOpacity="0.5" strokeWidth="1" />
                ))}

                {/* Main area chart */}
                <path
                    d="M0,420 C55,400 100,380 140,360 C180,340 210,300 250,280 C290,260 320,270 360,250 C400,230 430,200 470,180 C510,160 540,170 580,150 C620,130 650,140 695,120 C740,100 760,110 805,90 C850,70 885,80 930,60 L1000,50 L1000,580 L0,580 Z"
                    fill="url(#areaGrad)"
                />
                <path
                    d="M0,420 C55,400 100,380 140,360 C180,340 210,300 250,280 C290,260 320,270 360,250 C400,230 430,200 470,180 C510,160 540,170 580,150 C620,130 650,140 695,120 C740,100 760,110 805,90 C850,70 885,80 930,60 L1000,50"
                    fill="none" stroke="#22c55e" strokeWidth="2" strokeOpacity="0.4"
                />

                {/* Secondary area chart */}
                <path
                    d="M0,460 C70,450 140,430 210,420 C280,410 335,440 390,430 C445,420 490,400 545,390 C600,380 655,400 710,385 C765,370 820,360 875,350 L1000,340 L1000,580 L0,580 Z"
                    fill="url(#areaGrad2)"
                />
                <path
                    d="M0,460 C70,450 140,430 210,420 C280,410 335,440 390,430 C445,420 490,400 545,390 C600,380 655,400 710,385 C765,370 820,360 875,350 L1000,340"
                    fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.25"
                />

                {/* Candlesticks — left edge */}
                <rect x="30" y="300" width="10" height="60" fill="#22c55e" rx="2" />
                <line x1="35" y1="290" x2="35" y2="370" stroke="#22c55e" strokeWidth="1.5" />
                <rect x="50" y="320" width="10" height="40" fill="#ef4444" rx="2" />
                <line x1="55" y1="312" x2="55" y2="368" stroke="#ef4444" strokeWidth="1.5" />
                <rect x="70" y="290" width="10" height="70" fill="#22c55e" rx="2" />
                <line x1="75" y1="278" x2="75" y2="368" stroke="#22c55e" strokeWidth="1.5" />
                <rect x="90" y="310" width="10" height="50" fill="#22c55e" rx="2" />
                <line x1="95" y1="300" x2="95" y2="368" stroke="#22c55e" strokeWidth="1.5" />
                <rect x="110" y="330" width="10" height="35" fill="#ef4444" rx="2" />
                <line x1="115" y1="322" x2="115" y2="373" stroke="#ef4444" strokeWidth="1.5" />
                <rect x="130" y="295" width="10" height="62" fill="#22c55e" rx="2" />
                <line x1="135" y1="283" x2="135" y2="365" stroke="#22c55e" strokeWidth="1.5" />

                {/* Candlesticks — right edge (ends ~x=960, safely inside 1000px viewBox) */}
                <rect x="830" y="260" width="10" height="55" fill="#22c55e" rx="2" />
                <line x1="835" y1="250" x2="835" y2="322" stroke="#22c55e" strokeWidth="1.5" />
                <rect x="852" y="280" width="10" height="38" fill="#ef4444" rx="2" />
                <line x1="857" y1="272" x2="857" y2="325" stroke="#ef4444" strokeWidth="1.5" />
                <rect x="874" y="250" width="10" height="65" fill="#22c55e" rx="2" />
                <line x1="879" y1="238" x2="879" y2="322" stroke="#22c55e" strokeWidth="1.5" />
                <rect x="896" y="270" width="10" height="48" fill="#22c55e" rx="2" />
                <line x1="901" y1="258" x2="901" y2="325" stroke="#22c55e" strokeWidth="1.5" />
                <rect x="918" y="290" width="10" height="30" fill="#ef4444" rx="2" />
                <line x1="923" y1="282" x2="923" y2="328" stroke="#ef4444" strokeWidth="1.5" />
                <rect x="940" y="255" width="10" height="58" fill="#22c55e" rx="2" />
                <line x1="945" y1="244" x2="945" y2="320" stroke="#22c55e" strokeWidth="1.5" />

                {/* Bar chart — bottom left */}
                <rect x="20" y="470" width="16" height="60" fill="#22c55e" rx="3" />
                <rect x="42" y="455" width="16" height="75" fill="#22c55e" rx="3" />
                <rect x="64" y="480" width="16" height="50" fill="#16a34a" rx="3" />
                <rect x="86" y="465" width="16" height="65" fill="#22c55e" rx="3" />
                <rect x="108" y="450" width="16" height="80" fill="#22c55e" rx="3" />

                {/* Bar chart — bottom right (ends at x≈984) */}
                <rect x="880" y="475" width="16" height="55" fill="#3b82f6" rx="3" />
                <rect x="902" y="460" width="16" height="70" fill="#3b82f6" rx="3" />
                <rect x="924" y="480" width="16" height="50" fill="#3b82f6" rx="3" />
                <rect x="946" y="462" width="16" height="68" fill="#3b82f6" rx="3" />
                <rect x="968" y="450" width="16" height="80" fill="#3b82f6" rx="3" />

                {/* Donut ring — top right (cx=920, r=55 → rightmost edge=975, inside 1000) */}
                <circle cx="920" cy="130" r="55"
                    fill="none" stroke="#22c55e" strokeWidth="12"
                    strokeOpacity="0.18" strokeDasharray="172 173" strokeLinecap="round"
                />
                <circle cx="920" cy="130" r="55"
                    fill="none" stroke="#3b82f6" strokeWidth="12"
                    strokeOpacity="0.12" strokeDasharray="80 265" strokeDashoffset="-172" strokeLinecap="round"
                />
                <circle cx="920" cy="130" r="55"
                    fill="none" stroke="#f59e0b" strokeWidth="12"
                    strokeOpacity="0.10" strokeDasharray="45 300" strokeDashoffset="-252" strokeLinecap="round"
                />

                {/* Live pulsing dot — on main chart line */}
                <circle cx="695" cy="120" r="5" fill="#22c55e" opacity="0.7">
                    <animate attributeName="r" values="5;10;5" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;0.15;0.7" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="695" cy="120" r="3" fill="#22c55e" />
            </svg>
        </div>
    );
};