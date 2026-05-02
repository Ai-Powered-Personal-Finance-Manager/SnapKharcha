import { LoanDetailsPage } from "@/src/pages/loans-and-emis/LoanDetailsPage";

export default async function LoanDetailsRoute({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <LoanDetailsPage loanId={id} />;
}