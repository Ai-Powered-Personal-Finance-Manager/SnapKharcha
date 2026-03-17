import { PillBadge } from "../../../shared";
import { testimonialsDataInterface } from "../interface";

export const Testimonials = ({ testimonials }: testimonialsDataInterface) => {
  return (
    <>
      {/* header */}
      <div className="text-center mb-14">
        <PillBadge
          text="Testimonials"
          spanClassName="w-1.5 h-1.5 rounded-full bg-[#00C950]"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#00C950] bg-[#f0fdf4] border border-[#bbf7d0] px-4 py-2 rounded-full mb-5"
        />

        <h2
          className="text-4xl sm:text-5xl font-extrabold text-gray-900"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          People Love <span className="text-[#00C950]">SnapKharcha</span>
        </h2>
      </div>

      {/* testimonial data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="group p-7 rounded-2xl bg-white border border-gray-100 hover:border-[#00C950]/30 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
          >
            <span
              className="absolute top-4 right-5 text-7xl font-bold leading-none pointer-events-none select-none text-gray-50 group-hover:text-[#00C950]/10 transition-colors duration-300"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              "
            </span>
            <p
              className="text-gray-600 text-sm leading-relaxed mb-6 relative z-10"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              "{t.text}"
            </p>
            <div className="flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
              />
              <div>
                <p
                  className="text-gray-900 text-sm font-semibold"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {t.name}
                </p>
                <p
                  className="text-gray-400 text-xs"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {t.role}
                </p>
              </div>
              <div className="ml-auto text-[#fbbf24] text-xs">★★★★★</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
