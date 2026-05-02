const ExpenseSkeletonLoading = () => {
    return (
        <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
                    <div className="h-4 w-96 animate-pulse rounded-full bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-10 w-32 animate-pulse rounded-xl bg-gray-200" />
                    <div className="h-10 w-32 animate-pulse rounded-xl bg-gray-200" />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="h-28 animate-pulse rounded-2xl border border-gray-100 bg-gray-200" />
                <div className="h-28 animate-pulse rounded-2xl border border-gray-100 bg-gray-200" />
                <div className="h-28 animate-pulse rounded-2xl border border-gray-100 bg-gray-200" />
            </div>

            <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
            
            <div className="grid gap-6 xl:grid-cols-[1fr_18rem]">
                <div className="space-y-4">
                    <div className="h-[460px] animate-pulse rounded-2xl border border-gray-100 bg-gray-200" />
                </div>
                <div className="space-y-4">
                    <div className="h-[220px] animate-pulse rounded-2xl border border-gray-100 bg-gray-200" />
                    <div className="h-[160px] animate-pulse rounded-2xl border border-gray-100 bg-gray-200" />
                </div>
            </div>
        </div>
    );
};

export default ExpenseSkeletonLoading;