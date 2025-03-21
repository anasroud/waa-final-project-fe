import { LoaderCircleIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderCircleIcon
        className="-ms-1 animate-spin"
        size={50}
        aria-hidden="true"
      />
    </div>
  );
};

export default Loading;
