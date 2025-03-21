import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Bath,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Home,
  MapPin,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice, Property } from "../PropertyItem/PropertyItem";
import { cn } from "@/lib/utils";
import OfferModal from "../OfferModal";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

function PropertyDetails({
  isOpen,
  setIsOpen,
  selectedProperty,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProperty: Property | null;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProperty) return;
    setCurrentImageIndex((prev) =>
      prev === selectedProperty.imageURLs.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProperty) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProperty.imageURLs.length - 1 : prev - 1,
    );
  };

  const { user } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && selectedProperty && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">{selectedProperty.title}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="-mr-2"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden group">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 0.7 }}
                    className="h-full"
                  >
                    <div className="h-full relative w-full object-cover">
                      <Image
                        src={
                          selectedProperty.imageURLs[currentImageIndex] ||
                          "/hero-bg.jpg"
                        }
                        alt={`${selectedProperty.title} - Image ${
                          currentImageIndex + 1
                        }`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </motion.div>
                  {selectedProperty.imageURLs.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {selectedProperty.imageURLs.map((_, index) => (
                          <div
                            key={index}
                            className={cn(
                              "h-1.5 w-1.5 rounded-full transition-all",
                              index === currentImageIndex
                                ? "bg-white w-3"
                                : "bg-white/50",
                            )}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(selectedProperty.price)}
                    </span>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-5 w-5 mr-1" />
                      <span>{selectedProperty.address}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <BedDouble className="h-5 w-5 mr-2 text-gray-600" />
                      <span>{selectedProperty.bedroomCount} Bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2 text-gray-600" />
                      <span>{selectedProperty.bathroomCount} Bathrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="h-5 w-5 mr-2 text-gray-600" />
                      <span>{selectedProperty.squareFootage} sqft</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">
                    {selectedProperty.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProperty.hasParking && (
                      <div className="flex items-center text-gray-600">
                        <span className="mr-2">•</span>
                        Parking Available
                      </div>
                    )}
                    {selectedProperty.hasPool && (
                      <div className="flex items-center text-gray-600">
                        <span className="mr-2">•</span>
                        Swimming Pool
                      </div>
                    )}
                    {selectedProperty.hasAC && (
                      <div className="flex items-center text-gray-600">
                        <span className="mr-2">•</span>
                        Air Conditioning
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <p className="text-gray-600">
                    {selectedProperty.address}
                    <br />
                    {selectedProperty.city}, {selectedProperty.state}{" "}
                    {selectedProperty.zipCode}
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  {user && user.role === "customer" && (
                    <OfferModal
                      selectedProperty={selectedProperty}
                      setIsOpen={setIsOpen}
                    />
                  )}
                  <Button variant="outline" className="flex-1" size="lg">
                    Contact Seller
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PropertyDetails;
