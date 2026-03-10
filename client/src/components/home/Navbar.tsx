"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "For Business", href: "#business" },
        { label: "Pricing", href: "#pricing" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                ? "bg-white backdrop-blur-xl shadow-lg "
                : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-18 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    {/* <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-[#0099ff]/20 group-hover:shadow-[#0099ff]/40 transition-all duration-300">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className="text-black font-bold text-xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                        Snap<span className="text-[#00C950]">Kharcha</span>
                    </span> */}
                    <Image src="/main-logo.png" alt="SnapKharcha Logo" width={150} height={100} />
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-[#8888aa] hover:text-black text-sm font-medium transition-colors duration-200 relative group"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00C950] group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                    <Link
                        href="/auth/login"
                        className="text-[#8888aa] hover:text-black text-sm font-medium px-4 py-2 transition-colors duration-200"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/auth/register"
                        className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-green-500 text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#00C950]/20 hover:shadow-[#00C950]/40 hover:scale-105"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        Get Started Free
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden text-black p-2"
                    aria-label="Toggle menu"
                >
                    <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                    <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden transition-all duration-300 overflow-hidden ${
                menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="bg-white backdrop-blur-xl border-t border-[#1e1e2e] px-6 py-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="text-[#8888aa] hover:text-black text-sm font-medium transition-colors duration-200 py-2"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex gap-3 pt-2 border-t border-[#1e1e2e]">
                        <Link href="/auth/login" className="flex-1 text-center text-sm text-[#8888aa] hover:text-black py-2.5 border border-[#1e1e2e] rounded-xl transition-colors duration-200">
                        Sign In
                        </Link>
                        <Link href="/auth/register" className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl bg-green-500 text-white">
                        Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}