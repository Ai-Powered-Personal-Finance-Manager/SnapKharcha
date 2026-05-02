const ExpenseDetailsPageSkeleton = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-200" />
                <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded-full bg-gray-200" />
                    <div className="h-6 w-48 animate-pulse rounded-full bg-gray-200" />
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="animate-pulse rounded-3xl border border-gray-200 bg-gray-100 p-6 shadow-sm">
                    <div className="h-8 w-40 rounded-full bg-gray-200" />
                    <div className="mt-6 h-4 w-full rounded-full bg-gray-200" />
                    <div className="mt-3 h-2 w-full rounded-full bg-gray-200" />
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="h-24 rounded-2xl bg-gray-200" />
                        <div className="h-24 rounded-2xl bg-gray-200" />
                    </div>
                </div>
                <div className="animate-pulse rounded-3xl border border-gray-200 bg-gray-100 p-6 shadow-sm">
                    <div className="h-6 w-40 rounded-full bg-gray-200" />
                    <div className="mt-4 space-y-3">
                        <div className="h-12 rounded-2xl bg-gray-200" />
                        <div className="h-12 rounded-2xl bg-gray-200" />
                        <div className="h-12 rounded-2xl bg-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseDetailsPageSkeleton;