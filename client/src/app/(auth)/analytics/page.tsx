import type { Metadata } from "next";
import AnalyticsPage from "@/src/features/analytics/pages/AnalyticsPage";

export const metadata: Metadata = {
    title: "Analytics | Snapkharcha",
    description: "Manage and track your budget allocations",
};

export default function Page() {
    return <AnalyticsPage />;
}