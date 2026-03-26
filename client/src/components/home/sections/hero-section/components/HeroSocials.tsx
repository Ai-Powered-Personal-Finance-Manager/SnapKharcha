export const HeroSocials = () => {
  return (
    <div className="mt-16 flex flex-col sm:flex-row items-center gap-6">
      <div className="flex -space-x-3">
        {[
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1494790108755-2616b612b630?w=40&h=40&q=80&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&q=80&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&q=80&fit=crop&crop=face",
        ].map((src, i) => (
          <img
            key={i}
            src={src}
            alt="user"
            className="w-9 h-9 rounded-full border-2 border-[#0a0a0f] object-cover"
          />
        ))}
      </div>
      <div className="text-center sm:text-left">
        <div className="flex items-center gap-1 text-[#fbbf24] text-sm mb-0.5">
          {"★★★★★"}
        </div>
        <p
          className="text-[#8888aa] text-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Loved by <strong className="text-black">2,000+</strong> beta users
        </p>
      </div>
      <div className="h-10 w-px bg-[#1e1e2e] hidden sm:block" />
      <div className="flex gap-6">
        {["Personal", "Business", "AI-Ready"].map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-1.5 text-[#8888aa] text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg
              className="w-4 h-4 text-[#00ff15]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};
