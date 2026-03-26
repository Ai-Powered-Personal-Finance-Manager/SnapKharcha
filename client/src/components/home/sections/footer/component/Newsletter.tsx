export const Newsletter = () => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1">
        <h4
          className="text-white font-bold text-base mb-1"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Stay in the loop
        </h4>
        <p
          className="text-gray-400 text-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Get product updates, financial tips, and feature announcements.
        </p>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <input
          type="email"
          placeholder="you@example.com"
          className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-600 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00C950]/60 transition-colors duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        <button
          className="px-5 py-2.5 rounded-xl bg-[#00C950] text-white text-sm font-bold hover:bg-[#00b347] transition-colors whitespace-nowrap"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};
