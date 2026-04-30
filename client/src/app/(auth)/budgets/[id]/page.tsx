import { BudgetDetailsPage } from "@/src/pages/budgets/BudgetDetailsPage";

export default function BudgetDetailsRoute({
    params,
}: {
    params: { id: string };
}) {
    return <BudgetDetailsPage budgetId={params.id} />;
}