/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bed, Bath, Home, MapPin, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

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
    status: string;
    imageURLs: string[];
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
            prev === (property.imageURLs.length - 1) ? 0 : prev + 1
        );
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === 0 ? property.imageURLs.length - 1 : prev - 1
        );
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <div
                className={cn(
                    "bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg",
                    className
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
                                                : "bg-white/50"
                                        )}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
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
            <AnimatePresence>
                {isOpen && (
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
                                <h2 className="text-2xl font-bold">{property.title}</h2>
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
                                    <div className="aspect-video rounded-lg overflow-hidden relative group">
                                        <motion.div
                                            key={currentImageIndex}
                                            initial={{ opacity: 0.5 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0.5 }}
                                            transition={{ duration: 0.7 }}
                                            className="h-full"
                                        >
                                            <img
                                                src={property.imageURLs[currentImageIndex] || "/hero-bg.jpg"}
                                                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                        {property.imageURLs.length > 1 && (
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
                                                    {property.imageURLs.map((_, index) => (
                                                        <div
                                                            key={index}
                                                            className={cn(
                                                                "h-1.5 w-1.5 rounded-full transition-all",
                                                                index === currentImageIndex
                                                                    ? "bg-white w-3"
                                                                    : "bg-white/50"
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
                                                {formatPrice(property.price)}
                                            </span>
                                            <div className="flex items-center text-gray-500">
                                                <MapPin className="h-5 w-5 mr-1" />
                                                <span>{property.address}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="flex items-center">
                                                <Bed className="h-5 w-5 mr-2 text-gray-600" />
                                                <span>{property.bedroomCount} Bedrooms</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Bath className="h-5 w-5 mr-2 text-gray-600" />
                                                <span>{property.bathroomCount} Bathrooms</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Home className="h-5 w-5 mr-2 text-gray-600" />
                                                <span>{property.squareFootage} sqft</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                                        <p className="text-gray-600">{property.description}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Features</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {property.hasParking && (
                                                <div className="flex items-center text-gray-600">
                                                    <span className="mr-2">•</span>
                                                    Parking Available
                                                </div>
                                            )}
                                            {property.hasPool && (
                                                <div className="flex items-center text-gray-600">
                                                    <span className="mr-2">•</span>
                                                    Swimming Pool
                                                </div>
                                            )}
                                            {property.hasAC && (
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
                                            {property.address}<br />
                                            {property.city}, {property.state} {property.zipCode}
                                        </p>
                                    </div>

                                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                        <Button
                                            className="flex-1"
                                            size="lg"
                                        >
                                            <DollarSign className="h-5 w-5" />
                                            Place an Offer
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            size="lg"
                                        >
                                            Contact Seller
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default PropertyItem;