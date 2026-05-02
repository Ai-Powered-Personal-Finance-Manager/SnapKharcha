export const BudgetSkeletonLoading = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <div className="flex min-h-screen w-full flex-col gap-6">
                {/* page header */}
                <div className="overflow-hidden backdrop-blur-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2">
                            <div className="h-6 w-44 rounded-2xl bg-gray-200 animate-pulse" />
                            <div className="h-4 w-72 max-w-full rounded-full bg-gray-200 animate-pulse" />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="h-10 w-32 rounded-2xl bg-gray-200 animate-pulse" />
                            {/* <div className="h-11 w-28 rounded-2xl bg-gray-200 animate-pulse" /> */}
                        </div>
                    </div>
                </div>

                {/* Banner */}
                <div className="h-36 w-full overflow-hidden rounded-3xl bg-gray-200 animate-pulse"/>

                {/* Budget cards grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-2xl bg-white/50 p-5"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gray-200 animate-pulse" />
                                    <div className="space-y-2">
                                        <div className="h-3 w-24 rounded-full bg-gray-200 animate-pulse" />
                                        <div className="h-3 w-16 rounded-full bg-gray-200 animate-pulse" />
                                    </div>
                                </div>
                                <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse" />
                            </div>

                            <div className="mb-2 flex items-end justify-between">
                                <div className="space-y-2">
                                    <div className="h-5 w-28 rounded-full bg-gray-200 animate-pulse" />
                                    <div className="h-3 w-32 rounded-full bg-gray-200 animate-pulse" />
                                </div>
                                <div className="h-4 w-10 rounded-full bg-gray-200 animate-pulse" />
                            </div>

                            <div className="mb-3 h-2 rounded-full bg-gray-100 overflow-hidden">
                                <div className="h-full w-2/3 rounded-full bg-gray-200 animate-pulse" />
                            </div>

                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse" />
                                <div className="h-3 w-28 rounded-full bg-gray-200 animate-pulse" />
                            </div>
                        </div>
                    ))}

                    {/* Add new budget card */}
                    {/* <div className="group flex min-h-45 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                            <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse" />
                        </div>
                        <div className="h-4 w-24 rounded-full bg-gray-200 animate-pulse" />
                    </div> */}
                </div>
            </div>
        </div>
    );
};