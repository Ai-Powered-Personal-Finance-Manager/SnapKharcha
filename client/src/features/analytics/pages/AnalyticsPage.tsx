"use client";

import { useRef, useState } from "react";
import { useAnalyticsData } from "../hooks";
import { PeriodSelector } from "../components/PeriodSelector";
import { SummaryCards } from "../components/SummaryCards";
import { ExpensesByCategory } from "../components/ExpensesByCategory";
import { IncomeByType } from "../components/IncomeByType";
import { BudgetComparison } from "../components/BudgetComparison";
import { ExpensesByPaymentMethod } from "../components/ExpensesByPaymentMethod";
import { TopMerchants } from "../components/TopMerchants";
import { LoanSummary } from "../components/LoanSummary";
import { AnalyticsExportPreview } from "../components/AnalyticsExportPreview";
import { ErrorFallback } from "@/src/components/ErrorFallback";
import { AnalyticsSkeletonLoading } from "@/src/components/loading-skeletons/AnalyticsSkeletonLoading";
import { ChartColumn, Download, FileText } from "lucide-react";
import { useAnalyticsExport } from "../useAnalyticsExport";

type Period = "today" | "yesterday" | "lastweek" | "lastmonth";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("lastmonth");
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const analyticsExportRef = useRef<HTMLDivElement>(null);
  const { analyticsData, isLoading, error, refetch } = useAnalyticsData(period);
  console.log("Analytics Data:", analyticsData);
  const {
    exportToPDF,
    exportToXLSX,
    isPdfLoading,
    isXlsxLoading,
  } = useAnalyticsExport(analyticsData, analyticsExportRef);

  if (isLoading) {
    return <AnalyticsSkeletonLoading />;
  }

  if (error) {
    return <ErrorFallback resetErrorBoundary={refetch} />;
  }

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const { summary, expensesByCategory, expensesByPaymentMethod, incomeByType, budgetComparison, topMerchants, loanSummary } = analyticsData;

  return (
    <>
      <div className="space-y-6">
      {/* Header + period tabs */}
      <div className="relative flex items-start justify-between flex-col sm:flex-row gap-4">
        <div>
          <h2 className="text-gray-900 font-bold text-2xl tracking-tight">Analytics</h2>
          <p className="text-gray-400 text-sm mt-0.5">Deep-dive into your spending patterns</p>
        </div>
        <div className="flex items-center gap-4">
          <PeriodSelector activePeriod={period} onPeriodChange={setPeriod} />
          <div className="relative">
            <button 
              onClick={() => setOpenDownloadModal(!openDownloadModal)} 
              disabled={isPdfLoading || isXlsxLoading || !analyticsData}
              className="flex items-center gap-2 bg-[#00C950] hover:bg-[#00a840] text-white py-2 px-4 rounded-xl font-medium transition-colors cursor-pointer"
            >
              <Download size={18} />
              Download Report
            </button>
            {openDownloadModal && (
              <div className="absolute top-12 right-0 w-56 rounded-xl shadow-lg border border-gray-200 bg-white z-50 overflow-hidden">
                <div className="p-2">
                  <button 
                    onClick={() => {
                      exportToPDF();
                      setOpenDownloadModal(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100">
                      <FileText size={20} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">PDF File</p>
                      <p className="text-xs text-gray-500">Download as PDF</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => {
                      exportToXLSX();
                      setOpenDownloadModal(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100">
                      <ChartColumn size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">Excel File</p>
                      <p className="text-xs text-gray-500">Download as Excel</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* KPI Summary Cards */}
      <SummaryCards
        totalIncome={summary.totalIncome}
        totalExpenses={summary.totalExpenses}
        netBalance={summary.netBalance}
        savingsRate={summary.savingsRate}
        totalIncomeCount={summary.totalIncomeCount}
        totalExpensesCount={summary.totalExpensesCount}
      />

      {/* Row 1 — Expenses by Category + Income by Type */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ExpensesByCategory data={expensesByCategory} totalExpenses={summary.totalExpenses} />
        {incomeByType && incomeByType.length > 0 && <IncomeByType data={incomeByType} />}
      </div>

      {/* Row 2 — Budget Comparison (Full Width) */}
      {budgetComparison && budgetComparison.length > 0 && <BudgetComparison data={budgetComparison} />}

      {/* Row 3 — Top Merchants + Expenses by Payment Method */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {topMerchants && topMerchants.length > 0 && <TopMerchants data={topMerchants} />}
        {expensesByPaymentMethod && expensesByPaymentMethod.length > 0 && <ExpensesByPaymentMethod data={expensesByPaymentMethod} />}
      </div>

      {/* Row 4 — Loan Summary */}
      {loanSummary && loanSummary.totalLoans > 0 && (
        <LoanSummary
          totalLoans={loanSummary.totalLoans}
          totalLoanAmount={loanSummary.totalLoanAmount}
          totalPaidAmount={loanSummary.totalPaidAmount}
          totalRemainingAmount={loanSummary.totalRemainingAmount}
          totalMonthlyEMI={loanSummary.totalMonthlyEMI}
          loanDetails={loanSummary.loanDetails}
        />
      )}

      </div>

      <AnalyticsExportPreview ref={analyticsExportRef} data={analyticsData} />
    </>
  );
}
