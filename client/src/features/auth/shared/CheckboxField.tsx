"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/src/lib/utils";
import { CheckboxFieldInterface } from "../interface/checkboxFieldInterface";

export default function CheckboxField({
  label,
  name,
  error,
  className = "",
  checked,
  size = "md",
  disabled,
  checkboxClassName,
  onCheckedChange,
  ...other
}: CheckboxFieldInterface) {
  const getSize = () => {
    switch (size) {
      case "lg":
        return "w-5 h-5";
      case "md":
        return "w-4.5 h-4.5";
      case "sm":
        return "w-3.5 h-3.5";
    }
  };
  return (
    <label
      htmlFor={name}
      className={cn(
        "flex cursor-pointer items-center gap-2 select-none",
        className,
      )}
    >
      <Checkbox
        id={name}
        name={name}
        checked={checked}
        onCheckedChange={(checked) => {
          onCheckedChange?.(checked as string);
        }}
        disabled={disabled}
        className={cn(
          "border hover:cursor-pointer focus:ring-0",
          "data-[state=checked]:bg-primary-main",
          "data-[state=checked]:border-primary-main",
          "data-[state=checked]:text-white",
          error
            ? "border-web-error-main"
            : "border-web-neutral-40 bg-web-neutral-10",
          getSize(),
          checkboxClassName,
        )}
        {...other}
      />
      {label}
    </label>
  );
}
