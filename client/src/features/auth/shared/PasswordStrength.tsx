"use client";

import { cn } from "@/src/lib/utils";
import { Control, FieldValues, Path, useWatch } from "react-hook-form";

import CheckboxField from "./CheckboxField";

const passwordRules = {
  length: (v: string) => v.length >= 8,
  lowercase: (v: string) => /[a-z]/.test(v),
  uppercase: (v: string) => /[A-Z]/.test(v),
  number: (v: string) => /\d/.test(v),
  special: (v: string) => /[^a-zA-Z0-9]/.test(v),
};

interface PasswordStrengthProps<T extends FieldValues> {
  tracker: Path<T>;
  control: Control<T>;
}

const VisualizerData = [
  {
    key: 1,
    checks: "length",
    message: "At least 8 characters",
  },
  { key: 2, checks: "uppercase", message: "At least 1 uppercase letter" },
  { key: 3, checks: "lowercase", message: "At least 1 lowercase letter" },
  { key: 4, checks: "number", message: "At least 1 number" },
  { key: 5, checks: "special", message: "At least 1 special character" },
];

const PasswordStrength = <T extends FieldValues>({
  tracker,
  control,
}: PasswordStrengthProps<T>) => {
  const password =
    (useWatch({
      control,
      name: tracker,
    }) as string) || "";

  const checks = {
    length: passwordRules.length(password),
    lowercase: passwordRules.lowercase(password),
    uppercase: passwordRules.uppercase(password),
    number: passwordRules.number(password),
    special: passwordRules.special(password),
  };

  const passedCount = Object.values(checks).filter(Boolean).length;

  const strengthMap = {
    0: { label: "Very Weak", color: "bg-red-500" },
    1: { label: "Weak", color: "bg-red-400" },
    2: { label: "Fair", color: "bg-yellow-400" },
    3: { label: "Good", color: "bg-blue-500" },
    4: { label: "Strong", color: "bg-green-500" },
    5: { label: "Very Strong", color: "bg-green-600" },
  };

  const strength = strengthMap[passedCount as keyof typeof strengthMap];

  return (
    <div className="-mt-1 mb-3 space-y-2">
      {/* Strength Bar */}
      <div className="h-2 w-full rounded bg-gray-200">
        <div
          className={`h-2 rounded transition-all duration-300 ${strength.color}`}
          style={{ width: `${(passedCount / 5) * 100}%` }}
        />
      </div>

      <div className="bg-neutral-gray border-gray-200 rounded-xl border p-5">
        <p className="pb-2 text-sm font-medium text-gray-700">
          Password must contain:
        </p>

        <ul className="space-y-1 text-xs text-gray-600">
          {VisualizerData.map((item) => {
            const checkingCondition = item.checks as keyof typeof checks;

            return (
              <li
                key={item.key}
                className={cn(
                  "flex items-center gap-1",
                  checks[checkingCondition] && "text-green-600",
                )}
              >
                <CheckboxField
                  name={item.checks}
                  checked={checks[checkingCondition]}
                  className="cursor-not-allowed"
                  checkboxClassName={cn(
                    "rounded-[4px] data-[state=checked]:bg-green-400",
                    "hover:cursor-not-allowed",
                    checks[checkingCondition] && "border-0",
                  )}
                  size="sm"
                  label={item.message}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PasswordStrength;
