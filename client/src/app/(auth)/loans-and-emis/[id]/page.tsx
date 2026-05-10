import { LoanDetailsPage } from "@/src/features/loans-and-emis/LoanDetailsPage";

export default async function LoanDetailsRoute({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <LoanDetailsPage loanId={id} />;
}