export interface CheckboxFieldInterface {
  name?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  checkboxClassName?: string;
  checked?: boolean;
  error?: string;
  size?: "lg" | "md" | "sm";
  key?: string;
  onCheckedChange?: (value: string) => void;
}
