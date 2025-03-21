import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useId } from "react";

export interface INormalInputProps {
  label: string;
  placeHolder: string;
  className?: string;
  type: string;
  value?: string;
  inputClassName?: string;
  min?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function NormalInput({
  label,
  placeHolder,
  className,
  type,
  value,
  inputClassName,
  inputRef,
  min,
}: INormalInputProps) {
  const id = useId();

  return (
    <div className={(cn("*:not-first:mt-2"), className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        className={inputClassName}
        id={id}
        ref={inputRef}
        placeholder={placeHolder}
        type={type}
        min={min}
        defaultValue={value}
      />
    </div>
  );
}
