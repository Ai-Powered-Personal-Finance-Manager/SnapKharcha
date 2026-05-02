import type { Metadata } from "next";
import { BudgetsPage } from "@/src/pages/budgets/BudgetsPage";

export const metadata: Metadata = {
    title: "Budgets | Snapkharcha",
    description: "Manage and track your budget allocations",
};

export default function Page() {
    return <BudgetsPage />;
}