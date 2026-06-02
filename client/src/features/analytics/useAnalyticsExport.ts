"use client";
import { useState, useCallback } from "react";
import type { AnalyticsDataContent } from "./types";

interface ExportState {
    isPdfLoading: boolean;
    isXlsxLoading: boolean;
    error: string | null;
}

export const useAnalyticsExport = (
    analyticsData: AnalyticsDataContent | undefined,
    exportRef: React.RefObject<HTMLDivElement | null>,
) => {
    const [state, setState] = useState<ExportState>({
        isPdfLoading: false,
        isXlsxLoading: false,
        error: null,
    });

    /**
     * Export analytics dashboard as PDF
     */
    const exportToPDF = useCallback(async () => {
        if (!exportRef.current) {
            setState((s) => ({
                ...s,
                error: "Analytics export preview not found",
            }));
            return;
        }

        setState((s) => ({ ...s, isPdfLoading: true, error: null }));

        try {
            // Dynamically import dependencies
            const html2canvas = (await import("html2canvas")).default;
            const jsPDF = (await import("jspdf")).jsPDF;

            // Capture the DOM element
            const canvas = await html2canvas(exportRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = (canvas.height / canvas.width) * imgWidth;
            const pageCount = Math.ceil(imgHeight / pageHeight);

            const pdf = new jsPDF({
                orientation: "p",
                unit: "mm",
                format: "a4",
            });

            let position = 0;

            // Add the image, splitting across pages if necessary
            for (let i = 0; i < pageCount; i++) {
                if (i > 0) {
                    pdf.addPage();
                }
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                position -= pageHeight;
            }

            const today = new Date().toISOString().split("T")[0];
            pdf.save(`financial-analytics-${today}.pdf`);
            setState((s) => ({ ...s, isPdfLoading: false }));
        } catch (err) {
            const errorMsg =
                err instanceof Error ? err.message : "Failed to export PDF";
            setState((s) => ({
                ...s,
                isPdfLoading: false,
                error: errorMsg,
            }));
            console.error("PDF export error:", err);
        }
    }, [exportRef]);

    /**
     * Export analytics data as Excel
     */
    const exportToXLSX = useCallback(async () => {
        if (!analyticsData) {
            setState((s) => ({
                ...s,
                error: "Analytics data not available",
            }));
            return;
        }

        setState((s) => ({ ...s, isXlsxLoading: true, error: null }));

        try {
        const XLSX = await import("xlsx");
        const wb = XLSX.utils.book_new();

        const today = new Date().toISOString().split("T")[0];

        // Summary Sheet
        const summaryRows = [
            { Metric: "Total Income", Value: analyticsData.summary.totalIncome },
            { Metric: "Income Transactions", Value: analyticsData.summary.totalIncomeCount },
            { Metric: "Total Expenses", Value: analyticsData.summary.totalExpenses },
            {
            Metric: "Expense Transactions",
            Value: analyticsData.summary.totalExpensesCount,
            },
            { Metric: "Net Balance", Value: analyticsData.summary.netBalance },
            {
            Metric: "Savings Rate (%)",
            Value: analyticsData.summary.savingsRate.toFixed(2),
            },
        ];

        XLSX.utils.book_append_sheet(
            wb,
            XLSX.utils.json_to_sheet(summaryRows),
            "Summary"
        );

        // Expenses by Category Sheet
        if (analyticsData.expensesByCategory.length) {
            const expenseCategoryRows = analyticsData.expensesByCategory.map((cat) => ({
            Category: cat.categoryName,
            Amount: cat.totalAmount,
            Transactions: cat.transactionCount,
            }));
            XLSX.utils.book_append_sheet(
            wb,
            XLSX.utils.json_to_sheet(expenseCategoryRows),
            "Expenses by Category"
            );
        }

        // Expenses by Payment Method Sheet
        if (analyticsData.expensesByPaymentMethod.length) {
            const paymentMethodRows = analyticsData.expensesByPaymentMethod.map((pm) => ({
            "Payment Method": pm.paymentMethod,
            Amount: pm.totalAmount,
            Transactions: pm.transactionCount,
            }));
            XLSX.utils.book_append_sheet(
            wb,
            XLSX.utils.json_to_sheet(paymentMethodRows),
            "Payment Methods"
            );
        }

        // Income by Type Sheet
        if (analyticsData.incomeByType.length) {
            const incomeTypeRows = analyticsData.incomeByType.map((inc) => ({
            Type: inc.type,
            Amount: inc.totalAmount,
            Count: inc.count,
            }));
            XLSX.utils.book_append_sheet(
            wb,
            XLSX.utils.json_to_sheet(incomeTypeRows),
            "Income by Type"
            );
        }

        // Budget Comparison Sheet
        if (analyticsData.budgetComparison.length) {
            const budgetRows = analyticsData.budgetComparison.map((budget) => ({
            Budget: budget.budgetName,
            Category: budget.categoryName,
            "Budget Amount": budget.budgetAmount,
            "Spent Amount": budget.spentAmount,
            "Remaining Amount": budget.remainingAmount,
            "Used (%)": budget.percentageUsed.toFixed(2),
            }));
            XLSX.utils.book_append_sheet(
            wb,
            XLSX.utils.json_to_sheet(budgetRows),
            "Budgets"
            );
        }

        // Top Merchants Sheet
        if (analyticsData.topMerchants.length) {
            const merchantRows = analyticsData.topMerchants.map((merchant) => ({
            Merchant: merchant.merchant,
            Amount: merchant.totalAmount,
            Transactions: merchant.transactionCount,
            }));
            XLSX.utils.book_append_sheet(
            wb,
            XLSX.utils.json_to_sheet(merchantRows),
            "Top Merchants"
            );
        }

        // Loan Summary Sheet
        if (analyticsData.loanSummary) {
            const loanSummaryRows = [
            { Metric: "Total Loans", Value: analyticsData.loanSummary.totalLoans },
            {
                Metric: "Total Loan Amount",
                Value: analyticsData.loanSummary.totalLoanAmount,
            },
            {
                Metric: "Total Paid Amount",
                Value: analyticsData.loanSummary.totalPaidAmount,
            },
            {
                Metric: "Total Remaining Amount",
                Value: analyticsData.loanSummary.totalRemainingAmount,
            },
            {
                Metric: "Total Monthly EMI",
                Value: analyticsData.loanSummary.totalMonthlyEMI,
            },
            ];
            XLSX.utils.book_append_sheet(
            wb,
            XLSX.utils.json_to_sheet(loanSummaryRows),
            "Loan Summary"
            );

            // Loan Details Sheet
            if (analyticsData.loanSummary.loanDetails.length) {
            const loanDetailsRows = analyticsData.loanSummary.loanDetails.map((loan) => ({
                "Loan Name": loan.name,
                "Loan Amount": loan.amount,
                "Paid Amount": loan.paidAmount,
                "EMI Amount": loan.emiAmount,
                "Remaining": loan.amount - loan.paidAmount,
            }));
            XLSX.utils.book_append_sheet(
                wb,
                XLSX.utils.json_to_sheet(loanDetailsRows),
                "Loan Details"
            );
            }
        }

        XLSX.writeFile(wb, `financial-analytics-${today}.xlsx`);
        setState((s) => ({ ...s, isXlsxLoading: false }));
        } catch (err) {
        const errorMsg =
            err instanceof Error ? err.message : "Failed to export Excel";
        setState((s) => ({
            ...s,
            isXlsxLoading: false,
            error: errorMsg,
        }));
        console.error("XLSX export error:", err);
        }
    }, [analyticsData]);

    return {
        exportToPDF,
        exportToXLSX,
        isPdfLoading: state.isPdfLoading,
        isXlsxLoading: state.isXlsxLoading,
        error: state.error,
    };
};
