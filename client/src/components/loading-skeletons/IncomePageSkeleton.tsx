const IncomePageSkeleton = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <div className="h-6 w-40 animate-pulse rounded-full bg-gray-200" />
                    <div className="h-4 w-72 animate-pulse rounded-full bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-10 w-36 animate-pulse rounded-xl bg-gray-200" />
                    <div className="h-10 w-36 animate-pulse rounded-xl bg-gray-200" />
                </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-100 p-6 shadow-sm">
                <div className="h-4 w-52 animate-pulse rounded-full bg-gray-200" />
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div className="h-24 animate-pulse rounded-xl bg-gray-200" />
                    <div className="h-24 animate-pulse rounded-xl bg-gray-200" />
                    <div className="h-24 animate-pulse rounded-xl bg-gray-200" />
                </div>
                <div className="mt-5 h-12 animate-pulse rounded-xl bg-gray-200" />
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
                <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />
                <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />
                <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />
            </div>

            <div className="flex justify-between">
                <div className="h-6 w-24 rounded-xl bg-gray-200 animate-pulse"/>
                <div className="h-6 w-32 rounded-xl bg-gray-200 animate-pulse"/>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
                <div className="h-72 animate-pulse rounded-2xl bg-gray-200" />
                <div className="h-72 animate-pulse rounded-2xl bg-gray-200" />
                <div className="h-72 animate-pulse rounded-2xl bg-gray-200" />
            </div>
        </div>
    );
};

export default IncomePageSkeleton;