import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export interface INormalInputProps {
  label: string;
  placeHolder: string;
  type: string;
  setValue: (value: string) => void;
}

export default function NormalInput({
  label,
  placeHolder,
  type,
  setValue,
}: INormalInputProps) {
  const id = useId();

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        onChange={changeEvent}
        id={id}
        placeholder={placeHolder}
        type={type}
      />
    </div>
  );
}
