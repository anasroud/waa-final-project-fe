import Hero from "@/components/Hero/Hero";
import Nav from "@/components/Nav/Nav";
import FeaturedProperties from "@/components/FeaturedProperties/FeaturedProperties";
import { useEffect, useState } from "react";
import { Property } from "@/components/PropertyItem/PropertyItem";
import { apiFetch } from "@/utils/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        let query = `?page=${currentPage}&size=${6}`;

        if (search) {
          query += `&city=${search}`;
        }

        const response = await apiFetch<{
          data: Property[];
          meta: {
            "totalPages": number;
            "currentPage": number;
            "totalElements": number;
          }
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
  }, [search, currentPage]);



  return (
    <div className="min-h-screen">
      <Nav />
      <Hero setSearch={setSearch} />
      <FeaturedProperties
        isLoading={isLoading}
        error={error}
        properties={properties}
      />
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Pagination>
          <PaginationContent className="w-full justify-between gap-3">
            <PaginationItem>
              <Button
                variant="outline"
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                aria-disabled={currentPage === 0 ? true : undefined}
                role={currentPage === 0 ? "link" : undefined}
                onClick={() => {
                  setCurrentPage((prev) => prev - 1);
                  // fetchProperties();
                }}
                asChild
              >
                <span>
                  <ChevronLeftIcon
                    className="-ms-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Previous
                </span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                aria-disabled={currentPage === totalPages - 1 ? true : undefined}
                role={currentPage === totalPages - 1 ? "link" : undefined}
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                  // fetchProperties();
                }}
                asChild
              >
                <span>
                  Next
                  <ChevronRightIcon
                    className="-me-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                </span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
