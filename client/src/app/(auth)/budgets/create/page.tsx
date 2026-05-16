import { CreateBudgetPage } from "@/src/features/budgets/pages/CreateBudgetPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Budget | Snapkharcha",
    description: "Set up a new spending budget for a category",
};

export default function Page() {
    return <CreateBudgetPage />;
}