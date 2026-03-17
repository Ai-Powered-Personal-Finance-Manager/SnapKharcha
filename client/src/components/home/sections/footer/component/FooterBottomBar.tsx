export const FooterBottomBar = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800">
      <p
        className="text-gray-500 text-sm text-center sm:text-left"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        © 2025 SnapKharcha.
      </p>
      <div className="flex items-center gap-4">
        {["Privacy", "Terms", "Cookies"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};
