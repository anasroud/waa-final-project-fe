/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bed,
  Bath,
  Home,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PropertyDetails from "../PropertyDetails/PropertyDetails";

export type Property = {
  id: number;
  title: string;
  description: string;
  city: string;
  state: string;
  zipCode: string;
  address: string;
  locationLat: number;
  locationLng: number;
  price: number;
  bedroomCount: number;
  bathroomCount: number;
  homeType: string;
  squareFootage: number;
  hasParking: boolean;
  hasPool: boolean;
  hasAC: boolean;
  isApproved: boolean;
  processedAt: string | null;
  ownerId: number;
  status: "Available" | "Pending" | "SOLD" | "CONTINGENT";
  imageURLs: string[];
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

interface PropertyItemProps {
  property: Property;
  className?: string;
}

const PropertyItem = ({ property, className }: PropertyItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === property.imageURLs.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.imageURLs.length - 1 : prev - 1,
    );
  };

  return (
    <>
      <div
        className={cn(
          "bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg",
          className,
        )}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative h-48 w-full group">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.7 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <img
              src={property.imageURLs[currentImageIndex] || "/hero-bg.jpg"}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-sm font-semibold">
            {property.homeType}
          </div>
          {property.imageURLs.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {property.imageURLs.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1 w-1 rounded-full transition-all",
                      index === currentImageIndex
                        ? "bg-white w-2"
                        : "bg-white/50",
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold line-clamp-1">
              {property.title}
            </h3>
            <span className="text-lg font-bold text-primary">
              {formatPrice(property.price)}
            </span>
          </div>
          <div className="flex items-center text-gray-500 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {property.city}, {property.state}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedroomCount} bd</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathroomCount} ba</span>
            </div>
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-1" />
              <span>{property.squareFootage} sqft</span>
            </div>
          </div>
        </div>
      </div>
      <PropertyDetails
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedProperty={property}
      />
    </>
  );
};

export default PropertyItem;
