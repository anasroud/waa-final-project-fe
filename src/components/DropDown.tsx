import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export interface IDropDownProps {
  className?: string;
  placeholder?: string;
  options: { name: string; value: string }[];
  setValue: (value: string | null) => void;
}
export default function DropDown({
  className,
  placeholder,
  options,
  setValue,
}: IDropDownProps) {
  const [selected, setSelected] = useState<{
    name: string;
    value: string;
  } | null>(null);

  setValue(selected?.value ?? null);
  const handleSelection = (option: { name: string; value: string }) => {
    if (selected?.value === option.value) {
      setSelected(null);
    } else {
      setSelected(option);
    }
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            {selected?.name || placeholder}
            <ChevronDownIcon
              className="-me-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width) max-h-[200px] overflow-y-auto">
          {selected !== null && (
            <DropdownMenuItem
              className="border-b-1"
              onClick={() => setSelected(null)}
            >
              Clear Selection
            </DropdownMenuItem>
          )}{" "}
          {options?.map((option) => (
            <DropdownMenuItem
              onClick={() => {
                handleSelection(option);
              }}
              className={selected === option ? "bg-accent" : ""}
              key={option.value}
            >
              {option.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
