import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export interface IInputWithIconProps {
  Icon: React.ComponentType<{ size: number; className?: string }>;
  placeholder: string;
  label: string;
  type: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const InputWithIcon = ({
  Icon,
  placeholder,
  label,
  type,
  inputRef,
}: IInputWithIconProps) => {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          ref={inputRef}
          className="peer ps-9"
          placeholder={placeholder}
          type={type}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <Icon size={20} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default InputWithIcon;
