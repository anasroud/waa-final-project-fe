import Hero from "@/components/Hero/Hero";
import Nav from "@/components/Nav/Nav";
import FeaturedProperties from "@/components/FeaturedProperties/FeaturedProperties";
import { useEffect, useState } from "react";
import { Property } from "@/components/PropertyItem/PropertyItem";
import { apiFetch } from "@/utils/api";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let query = `?page=${0}&size=${6}`;

        if (search) {
          query += `&city=${search}`;
        }

        const response = await apiFetch<{
          data: Property[];
          meta: { totalPages: number };
        }>(`/customers/properties${query}`, {
          method: "GET",
        });

        setProperties(response.data);
      } catch (err) {
        setError("Error loading properties. Please try again later.");
        console.error("Error fetching properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [search]);

  return (
    <div className="min-h-screen">
      <Nav />
      <Hero setSearch={setSearch} />
      <FeaturedProperties
        isLoading={isLoading}
        error={error}
        properties={properties}
      />
    </div>
  );
}
