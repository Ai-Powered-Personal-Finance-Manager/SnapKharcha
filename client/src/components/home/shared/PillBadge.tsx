import { cn } from "@/src/lib/utils";
import { PillBadgeInterface } from "../interface";

export const PillBadge = ({
  text,
  className,
  spanClassName,
}: PillBadgeInterface) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 bg-green-100 text-green-500 text-xs font-semibold mb-8 animate-fade-in",
        className,
      )}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <span
        className={cn(
          " w-2 h-2 rounded-full bg-green-500 animate-pulse",
          spanClassName,
        )}
      />
      {text}
    </div>
  );
};
