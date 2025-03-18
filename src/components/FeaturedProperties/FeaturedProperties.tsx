import { useEffect, useState } from "react";
import PropertyItem, { Property } from "../PropertyItem/PropertyItem";

const FeaturedProperties = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setIsLoading(true);
                // Fetch only 6 featured properties
                const response = await fetch("/api/properties?limit=6");

                if (!response.ok) {
                    throw new Error("Failed to fetch properties");
                }

                const data = await response.json();
                setProperties(data.properties);
            } catch (err) {
                setError("Error loading properties. Please try again later.");
                console.error("Error fetching properties:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (isLoading) {
        return (
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold font-lora mb-2">Featured Properties</h2>
                    <p className="text-gray-600 mb-8">Loading properties...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold font-lora mb-2">Featured Properties</h2>
                    <p className="text-red-500 mb-8">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-lora mb-2">Featured Properties</h2>
                <p className="text-gray-600 mb-8">Discover our handpicked selection of premium properties</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyItem key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedProperties;