import FilterNav from "@/components/FilterNav/FilterNav";
import Nav from "@/components/Nav/Nav";
import PropertyItem from "../../components/PropertyItem/PropertyItem";
import { useCallback, useEffect, useState } from "react";
import BasicPagination from "@/components/BasicPagination";
import { SearchFilters } from "../../components/FilterNav/FilterNav";
import { apiFetch } from "@/utils/api";
import { IProperty } from "@/types/proprties";
import PropertyItemSkeleton from "@/components/PropertyItem/PropertyItemSkeleton";

export default function Search() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [countProperties, setCountProperties] = useState(0);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    city: undefined,
    state: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    type: undefined,
    minBedroomCount: undefined,
    minBathroomCount: undefined,
    hasParking: undefined,
    hasPool: undefined,
    hasAC: undefined,
  } as unknown as SearchFilters);

  const pageLimit = 9;
  const totalPages = Math.ceil(countProperties / pageLimit);

  const fetchProperties = useCallback(async () => {
    const buildSearchQuery = (body: SearchFilters) => {
      setIsLoading(true);
      let query = `?page=${page}&size=${pageLimit}`;
      for (const key in body) {
        const value = body[key as keyof SearchFilters];
        if (
          value ||
          (key === "minPrice" && value === 0) ||
          (key === "maxPrice" && value === 0)
        ) {
          query += `&${key}=${value}`;
        }
      }
      return query;
    };
    try {
      const query = buildSearchQuery(searchFilters);
      const response = apiFetch(`/customers/properties${query}`, {
        method: "GET",
      });

      const data = (await response) as {
        data: IProperty[];
        meta: { totalPages: number };
      };

      setProperties(data.data);
      setCountProperties(data.meta.totalPages);
    } catch (err) {
      setError("Error loading properties. Please try again later.");
      console.error("Error fetching properties:", err);
    } finally {
      setIsLoading(false);
    }
  }, [searchFilters, page]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const paginationHandler = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <Nav />
      <div>
        <FilterNav setSearchFilters={setSearchFilters} />
      </div>
      {isLoading && (
        <div className="mx-auto max-w-6xl space-y-6 p-4">
          <div className="grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <PropertyItemSkeleton key={i} />
            ))}
          </div>
        </div>
      )}
      {error && (
        <div className="mx-auto max-w-6xl space-y-6 p-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-lora mb-2">
              Featured Properties
            </h2>
            <p className="text-red-500 mb-8">{error}</p>
          </div>
        </div>
      )}
      {properties.length === 0 && !isLoading && (
        <div className="mx-auto max-w-6xl space-y-6 p-4">
          <div className="">
            <p>
              No properties found. Please try adjusting your search filters.
            </p>
          </div>
        </div>
      )}
      {properties.length !== 0 && !isLoading && (
        <div className="mx-auto max-w-6xl space-y-6 p-4">
          <div className="grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <PropertyItem key={index} property={property} />
            ))}
          </div>
          <div>
            <BasicPagination
              currentPage={page + 1}
              totalPages={totalPages}
              paginationHandler={paginationHandler}
            />
          </div>
        </div>
      )}
    </>
  );
}
