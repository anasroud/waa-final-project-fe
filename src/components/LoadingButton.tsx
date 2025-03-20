import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";

export interface ILoadingButtonProps {
  label: string;
  className: string;
}

export default function LoadingButton({
  label,
  className,
}: ILoadingButtonProps) {
  return (
    <Button disabled className={className}>
      <LoaderCircleIcon
        className="-ms-1 animate-spin"
        size={16}
        aria-hidden="true"
      />
      {label}
    </Button>
  );
}
