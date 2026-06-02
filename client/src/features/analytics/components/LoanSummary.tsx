interface LoanDetail {
  id: string;
  name: string;
  amount: number;
  paidAmount: number;
  emiAmount: number;
}

interface LoanSummaryProps {
  totalLoans: number;
  totalLoanAmount: number;
  totalPaidAmount: number;
  totalRemainingAmount: number;
  totalMonthlyEMI: number;
  loanDetails: LoanDetail[];
}

export function LoanSummary({
  totalLoans,
  totalLoanAmount,
  totalPaidAmount,
  totalRemainingAmount,
  totalMonthlyEMI,
  loanDetails,
}: LoanSummaryProps) {
  if (totalLoans === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-gray-900 font-semibold text-sm">Loan Summary</h3>
        <p className="text-gray-400 text-xs mt-2">No active loans</p>
      </div>
    );
  }

  const overallPercentagePaid = totalLoanAmount > 0 ? Math.round((totalPaidAmount / totalLoanAmount) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="mb-5">
        <h3 className="text-gray-900 font-semibold text-sm">Loan Summary</h3>
        <p className="text-gray-400 text-[11px] mt-0.5">{totalLoans} active loans</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-gray-500 text-[11px] font-medium">Total Amount</p>
          <p className="text-gray-900 font-bold text-sm mt-1">Rs.{totalLoanAmount.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-gray-500 text-[11px] font-medium">Monthly EMI</p>
          <p className="text-gray-900 font-bold text-sm mt-1">Rs.{totalMonthlyEMI.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-gray-500 text-[11px] font-medium">Paid</p>
          <p className="text-[#00C950] font-bold text-sm mt-1">Rs.{totalPaidAmount.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-gray-500 text-[11px] font-medium">Remaining</p>
          <p className="text-orange-500 font-bold text-sm mt-1">Rs.{totalRemainingAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Overall progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-xs font-medium">Overall Progress</span>
          <span className="text-gray-700 text-xs font-semibold">{overallPercentagePaid}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#00C950] rounded-full transition-all duration-700" style={{ width: `${overallPercentagePaid}%` }} />
        </div>
      </div>

      {/* Individual loans */}
      <div className="space-y-3">
        {loanDetails.map((loan) => {
          const loanProgress = loan.amount > 0 ? Math.round((loan.paidAmount / loan.amount) * 100) : 0;

          return (
            <div key={loan.id} className="border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-gray-700 text-xs font-medium">{loan.name}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">EMI: Rs.{loan.emiAmount.toLocaleString()}/month</p>
                </div>
                <span className="text-gray-600 text-xs font-semibold">{loanProgress}%</span>
              </div>

              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${loanProgress}%` }} />
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="text-gray-400 text-[10px]">
                  Rs.{loan.paidAmount.toLocaleString()} / Rs.{loan.amount.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
