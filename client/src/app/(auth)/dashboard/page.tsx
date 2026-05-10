import type { Metadata } from "next";
import DashboardPage from "@/src/features/dashboard/pages/DashboardPage";

export const metadata: Metadata = {
    title: "Dashboard | SnapKharcha",
    description: "Your financial dashboard overview",
};

export default function Page() {
    return <DashboardPage />;
}