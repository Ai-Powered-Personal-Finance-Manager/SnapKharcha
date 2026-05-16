import { BudgetDetailsPage } from "@/src/features/budgets/pages/BudgetDetailsPage";

export default async function BudgetDetailsRoute({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <BudgetDetailsPage budgetId={id} />;
}