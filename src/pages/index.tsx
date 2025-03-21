import Hero from "@/components/Hero/Hero";
import Nav from "@/components/Nav/Nav";
import FeaturedProperties from "@/components/FeaturedProperties/FeaturedProperties";
import { useEffect, useState } from "react";
import { Property } from "@/components/PropertyItem/PropertyItem";
import { apiFetch } from "@/utils/api";
import BasicPagination from "@/components/BasicPagination";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        let query = `?page=${page - 1}&size=${6}`;

        if (search) {
          query += `&city=${search}`;
        }

        const response = await apiFetch<{
          data: Property[];
          meta: { totalPages: number };
        }>(`/customers/properties${query}`, {
          method: "GET",
        });

        setTotalPages(response.meta.totalPages);
        setProperties(response.data);
      } catch (err) {
        setError("Error loading properties. Please try again later.");
        console.error("Error fetching properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [search, page]);

  const paginationHandler = (page: number) => {
    setPage(page);
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <Hero setSearch={setSearch} />
      <FeaturedProperties
        isLoading={isLoading}
        error={error}
        properties={properties}
      />
      <BasicPagination
        currentPage={page}
        totalPages={totalPages === 0 ? 1 : totalPages}
        className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        paginationHandler={paginationHandler}
      />
    </div>
  );
}
