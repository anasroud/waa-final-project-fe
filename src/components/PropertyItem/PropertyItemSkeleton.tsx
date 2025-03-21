import React from "react";
import { cn } from "@/lib/utils";

const PropertyItemSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg",
        className
      )}
    >
      <div className="relative h-48 w-full bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="flex items-center text-gray-500 mb-3">
          <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="flex justify-between text-sm">
          <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyItemSkeleton;
