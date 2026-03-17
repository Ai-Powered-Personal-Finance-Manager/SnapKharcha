import { statsDataInterface } from "../interface";

export const Stats = ({ stats }: statsDataInterface) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group text-center p-7 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300"
        >
          <p
            className="text-4xl font-extrabold mb-2 group-hover:scale-110 transition-transform duration-300"
            style={{ color: stat.color, fontFamily: "'Syne', sans-serif" }}
          >
            {stat.value}
          </p>
          <p
            className="text-gray-500 text-sm font-medium"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};
