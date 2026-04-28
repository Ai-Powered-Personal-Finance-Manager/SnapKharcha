export const DashboardSkeletonLoading = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <div className="flex min-h-screen w-full flex-col gap-6">
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

                <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
                        <div className="mb-5 flex items-center justify-between">
                            <div className="space-y-2">
                                <div className="h-4 w-28 rounded-full bg-gray-200 animate-pulse" />
                                <div className="h-3 w-40 rounded-full bg-gray-200 animate-pulse" />
                            </div>
                            <div className="h-9 w-24 rounded-2xl bg-gray-200 animate-pulse" />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="h-11 w-11 rounded-2xl bg-gray-200 animate-pulse" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 w-20 rounded-full bg-gray-200 animate-pulse" />
                                            <div className="h-6 w-24 rounded-full bg-gray-200 animate-pulse" />
                                        </div>
                                    </div>

                                    <div className="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
                                    <div className="mt-4 h-2 w-full rounded-full bg-gray-200 animate-pulse" />
                                    <div className="mt-2 h-2 w-2/3 rounded-full bg-gray-200 animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
                            <div className="space-y-3">
                                <div className="h-4 w-24 rounded-full bg-gray-200 animate-pulse" />
                                <div className="h-10 w-full rounded-2xl bg-gray-200 animate-pulse" />
                                <div className="h-10 w-5/6 rounded-2xl bg-gray-200 animate-pulse" />
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
                            <div className="space-y-4">
                                <div className="h-4 w-32 rounded-full bg-gray-200 animate-pulse" />
                                <div className="space-y-3">
                                    <div className="h-16 w-full rounded-2xl bg-gray-200 animate-pulse" />
                                    <div className="h-16 w-full rounded-2xl bg-gray-200 animate-pulse" />
                                    <div className="h-16 w-11/12 rounded-2xl bg-gray-200 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
                    <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse" />
                        <div className="h-4 w-28 rounded-full bg-gray-200 animate-pulse" />
                    </div>
                    <div className="mt-4 h-3 w-full rounded-full bg-gray-200 animate-pulse" />
                    <div className="mt-3 h-3 w-5/6 rounded-full bg-gray-200 animate-pulse" />
                </div>
            </div>
        </div>
    );
};