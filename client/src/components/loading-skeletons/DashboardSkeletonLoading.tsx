export const DashboardSkeletonLoading = () => {
    return (
        <div className="space-y-6">
            {/* Welcome Banner Skeleton */}
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm md:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-3">
                        <div className="h-3 w-24 rounded-full bg-gray-200 animate-pulse" />
                        <div className="h-9 w-56 rounded-2xl bg-gray-200 animate-pulse" />
                        <div className="h-4 w-72 max-w-full rounded-full bg-gray-200 animate-pulse" />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="h-11 w-32 rounded-2xl bg-gray-200 animate-pulse" />
                        <div className="h-11 w-28 rounded-2xl bg-gray-200 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-xl bg-gray-200 animate-pulse" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-20 rounded-full bg-gray-200 animate-pulse" />
                                <div className="h-6 w-28 rounded-full bg-gray-200 animate-pulse" />
                            </div>
                        </div>
                        <div className="h-3 w-24 rounded-full bg-gray-200 animate-pulse" />
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                {/* Recent Transactions Skeleton */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
                    <div className="mb-5 space-y-2">
                        <div className="h-4 w-28 rounded-full bg-gray-200 animate-pulse" />
                        <div className="h-3 w-40 rounded-full bg-gray-200 animate-pulse" />
                    </div>

                    <div className="space-y-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-xl bg-gray-200 animate-pulse" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 w-24 rounded-full bg-gray-200 animate-pulse" />
                                        <div className="h-3 w-16 rounded-full bg-gray-200 animate-pulse" />
                                    </div>
                                </div>
                                <div className="h-3 w-12 rounded-full bg-gray-200 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-5">
                    {/* Budget Overview Skeleton */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
                        <div className="mb-4 space-y-2">
                            <div className="h-4 w-28 rounded-full bg-gray-200 animate-pulse" />
                            <div className="h-3 w-40 rounded-full bg-gray-200 animate-pulse" />
                        </div>
                        <div className="space-y-4">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="h-3 w-24 rounded-full bg-gray-200 animate-pulse" />
                                        <div className="h-3 w-16 rounded-full bg-gray-200 animate-pulse" />
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-200 animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Savings Goal Skeleton */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="h-4 w-32 rounded-full bg-gray-200 animate-pulse" />
                                <div className="h-3 w-48 rounded-full bg-gray-200 animate-pulse" />
                            </div>
                            <div className="h-3 w-full rounded-full bg-gray-200 animate-pulse" />
                            <div className="h-2 w-3/4 rounded-full bg-gray-200 animate-pulse" />
                            <div className="flex gap-4">
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-16 rounded-full bg-gray-200 animate-pulse" />
                                    <div className="h-4 w-20 rounded-full bg-gray-200 animate-pulse" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-16 rounded-full bg-gray-200 animate-pulse" />
                                    <div className="h-4 w-20 rounded-full bg-gray-200 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Insight Skeleton */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
                        <div className="flex gap-3 mb-4">
                            <div className="h-6 w-6 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
                            <div className="h-4 w-24 rounded-full bg-gray-200 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 w-full rounded-full bg-gray-200 animate-pulse" />
                            <div className="h-3 w-5/6 rounded-full bg-gray-200 animate-pulse" />
                            <div className="h-3 w-4/5 rounded-full bg-gray-200 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};