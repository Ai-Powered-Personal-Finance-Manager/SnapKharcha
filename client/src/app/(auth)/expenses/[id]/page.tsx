import { ExpenseDetailsPage } from "@/src/pages/expenses/ExpenseDetailsPage";

export default async function ExpenseDetailsRoute({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <ExpenseDetailsPage expenseId={id} />;
}