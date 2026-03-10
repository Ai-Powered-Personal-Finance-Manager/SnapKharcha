import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import AppProvider from "@/src/providers/AppProvider";
import { Suspense } from "react";
import Loading from "@/src/components/Loading";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI-Powered Personal Finance Manager",
  description: "Smart Expense & AI Powered Finance Tracking System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <Suspense fallback={<Loading/>}>
          <AppProvider>
            {children}
          </AppProvider>
        </Suspense>
      </body>
    </html>
  );
}