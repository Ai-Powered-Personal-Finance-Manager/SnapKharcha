"use client";

const columns = [1, 2, 3, 4, 5];

const shimmer = "animate-pulse bg-gray-200";

export const FinancialHealthSkeleton = () => {
  return (
    <div className="h-full">
      {/* HEADER */}
      <div className="mb-6 space-y-2">
        <div className={`h-6 w-48 rounded ${shimmer}`} />
        <div className={`h-4 w-72 rounded ${shimmer}`} />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-5 lg:grid-cols-3">
        {columns.map((col) => (
          <div
            key={col}
            className="rounded-2xl border border-gray-200 bg-gray-200 p-4"
          >
            {/* COLUMN HEADER */}
            <div className="mb-4 border-l-4 border-gray-200 pl-3">
              <div className="flex items-center gap-2 mb-2">
                <div className={`h-5 w-5 rounded ${shimmer}`} />
                <div className={`h-4 w-24 rounded ${shimmer}`} />
              </div>

              <div className={`h-3 w-20 rounded ${shimmer}`} />
            </div>

            {/* CARDS */}
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                >
                  {/* TITLE + BADGE */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`h-4 w-28 rounded ${shimmer}`} />
                    <div className={`h-5 w-14 rounded-full ${shimmer}`} />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="space-y-2 mb-3">
                    <div className={`h-3 w-full rounded ${shimmer}`} />
                    <div className={`h-3 w-3/4 rounded ${shimmer}`} />
                  </div>

                  {/* CATEGORY */}
                  <div className={`h-3 w-16 rounded ${shimmer}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
