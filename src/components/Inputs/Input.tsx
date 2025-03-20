import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useId } from "react";

export interface INormalInputProps {
  label: string;
  placeHolder: string;
  className?: string;
  type: string;
  setValue: (value: string) => void;
  value?: string;
}

export default function NormalInput({
  label,
  placeHolder,
  className,
  type,
  setValue,
  value,
}: INormalInputProps) {
  const id = useId();

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={(cn("*:not-first:mt-2"), className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        onChange={changeEvent}
        id={id}
        placeholder={placeHolder}
        type={type}
        value={value}
      />
    </div>
  );
}
