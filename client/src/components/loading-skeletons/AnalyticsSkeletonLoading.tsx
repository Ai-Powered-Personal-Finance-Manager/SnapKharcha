export const AnalyticsSkeletonLoading = () => {
  return (
    <div className="space-y-6">
      {/* Header + period tabs */}
      <div className="flex items-start justify-between flex-col sm:flex-row gap-4">
        <div className="space-y-2">
          <div className="h-8 w-40 rounded-2xl bg-gray-200 animate-pulse" />
          <div className="h-4 w-64 rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 rounded-lg bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="h-4 w-20 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse" />
            </div>
            <div className="h-7 w-32 rounded-full bg-gray-200 animate-pulse mb-2" />
            <div className="h-3 w-24 rounded-full bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Row 1 — Expenses by Category + Income by Type */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 p-5"
          >
            <div className="mb-5">
              <div className="h-5 w-40 rounded-full bg-gray-200 animate-pulse mb-2" />
              <div className="h-3 w-48 rounded-full bg-gray-200 animate-pulse" />
            </div>
            <div className="h-64 rounded-lg bg-gray-100 animate-pulse" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-3 w-24 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-3 w-20 rounded-full bg-gray-200 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 — Budget Comparison (Full Width) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="mb-6">
          <div className="h-5 w-40 rounded-full bg-gray-200 animate-pulse mb-2" />
          <div className="h-3 w-96 rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="h-96 rounded-lg bg-gray-100 animate-pulse mb-6" />
        <div className="grid grid-cols-3 gap-4 pt-5 border-t border-gray-100">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="h-3 w-24 rounded-full bg-gray-200 animate-pulse mb-3" />
              <div className="h-6 w-32 rounded-full bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 — Expenses by Payment Method (Full Width) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="mb-6">
          <div className="h-5 w-48 rounded-full bg-gray-200 animate-pulse mb-2" />
          <div className="h-3 w-32 rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="h-80 rounded-lg bg-gray-100 animate-pulse mb-6" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-3 w-20 rounded-full bg-gray-200 animate-pulse" />
              </div>
              <div className="flex gap-4">
                <div className="h-3 w-24 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-3 w-32 rounded-full bg-gray-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 4 — Top Merchants + Loan Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 p-5"
          >
            <div className="mb-5">
              <div className="h-5 w-40 rounded-full bg-gray-200 animate-pulse mb-2" />
              <div className="h-3 w-48 rounded-full bg-gray-200 animate-pulse" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-32 rounded-full bg-gray-200 animate-pulse" />
                    <div className="h-2 w-24 rounded-full bg-gray-200 animate-pulse" />
                  </div>
                  <div className="h-4 w-20 rounded-full bg-gray-200 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
