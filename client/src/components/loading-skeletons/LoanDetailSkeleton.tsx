const LoanDetailsSkeleton = () => {
return (
    <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-gray-200 animate-pulse" />
                <div className="space-y-2">
                    <div className="h-4 w-24 rounded-full bg-gray-200 animate-pulse" />
                    <div className="h-6 w-48 rounded-full bg-gray-200 animate-pulse" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse"/>
                <div className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse"/>
            </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-gray-100 bg-gray-100 p-6 shadow-sm animate-pulse">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-gray-200" />
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-32 rounded-full bg-gray-200" />
                            <div className="h-4 w-44 rounded-full bg-gray-200" />
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="h-8 w-28 rounded-full bg-gray-200" />
                        <div className="h-4 w-20 rounded-full bg-gray-200" />
                    </div>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-gray-200" />
                <div className="mt-6 mb-6 grid gap-3 sm:grid-cols-2">
                    <div className="h-24 rounded-2xl bg-gray-200" />
                    <div className="h-24 rounded-2xl bg-gray-200" />
                </div>
                <div className="h-24 rounded-2xl bg-gray-200"/>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-gray-100 p-6 shadow-sm animate-pulse">
                <div className="h-6 w-40 rounded-full bg-gray-200" />
                <div className="mt-4 space-y-3">
                    <div className="h-12 rounded-2xl bg-gray-200" />
                    <div className="h-12 rounded-2xl bg-gray-200" />
                    <div className="h-12 rounded-2xl bg-gray-200" />
                    <div className="h-12 rounded-2xl bg-gray-200" />
                    <div className="h-12 rounded-2xl bg-gray-200" />
                    <div className="h-12 rounded-2xl bg-gray-200" />
                </div>
            </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-gray-100 p-6 shadow-sm animate-pulse">
            <div className="h-6 w-44 rounded-full bg-gray-200" />
            <div className="mt-4 space-y-3">
                <div className="h-16 rounded-2xl bg-gray-200" />
                <div className="h-16 rounded-2xl bg-gray-200" />
                <div className="h-16 rounded-2xl bg-gray-200" />
            </div>
        </div>
    </div>
    );
};

export default LoanDetailsSkeleton;
