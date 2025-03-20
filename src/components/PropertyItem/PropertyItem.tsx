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
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PropertyDetails from "../PropertyDetails/PropertyDetails";
import { apiFetch } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

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
  favorited: boolean;
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

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await apiFetch("/customers/favorites", {
        method: "POST",
        body: JSON.stringify({ propertyId: property.id }),
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

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

  const { user } = useAuth();

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
          <div className="absolute top-2 w-full flex justify-between items-center px-4">
            <div className="left-2 bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
              {property.homeType}
            </div>
            {user && (
              <button
                onClick={toggleFavorite}
                className="text-white hover:text-primary transition-colors"
              >
                {!property.favorited ? (
                  <Heart size={24} />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-6 h-6 fill-red-500"
                  >
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                  </svg>
                )}
              </button>
            )}
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
