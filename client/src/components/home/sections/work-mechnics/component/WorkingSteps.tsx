import { WorkingStepsInterface } from "../interface";

export const WorkingSteps = ({ steps }: WorkingStepsInterface) => {
  return (
    <div className="space-y-20">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
        >
          {/* Content */}
          <div className="flex-1 max-w-lg">
            <div className="flex items-start gap-5">
              <div
                className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-sm"
                style={{
                  backgroundColor: step.bg,
                  color: step.color,
                  border: `1px solid ${step.border}`,
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {step.step}
              </div>
              <div>
                <h3
                  className="text-gray-900 text-2xl font-bold mb-3"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-gray-500 text-base leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full max-w-xl">
            <div className="relative group">
              <div
                className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: step.color, opacity: 0 }}
              />
              <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
                <div
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm shadow-sm"
                  style={{
                    color: step.color,
                    border: `1px solid ${step.border}`,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: step.color }}
                  />
                  Step {step.step}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
