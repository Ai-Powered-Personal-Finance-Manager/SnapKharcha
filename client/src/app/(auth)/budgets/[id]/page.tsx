import { BudgetDetailsPage } from "@/src/pages/budgets/BudgetDetailsPage";

export default async function BudgetDetailsRoute({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <BudgetDetailsPage budgetId={id} />;
}