import FilterNav from "@/components/FilterNav/FilterNav";
import Nav from "@/components/Nav/Nav";
import PropertyItem from "../../components/PropertyItem/PropertyItem";
import { useCallback, useEffect, useState } from "react";
import BasicPagination from "@/components/BasicPagination";
import { SearchFilters } from "../../components/FilterNav/FilterNav";
import { apiFetch } from "@/utils/api";
import { IProperty } from "@/types/proprties";

export default function Search() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [countProperties, setCountProperties] = useState(0);
  const [page, setPage] = useState(1);
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
      let query = `?page=${page}&size=${pageLimit}`;
      for (const key in body) {
        if (body[key as keyof SearchFilters]) {
          query += `&${key}=${body[key as keyof SearchFilters]}`;
        }
      }
      return query;
    };

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
      <div className="mx-auto max-w-6xl space-y-6 p-4">
        <div className="grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <PropertyItem key={index} property={property} />
          ))}
        </div>
        <div>
          <BasicPagination
            currentPage={page}
            totalPages={totalPages}
            paginationHandler={paginationHandler}
          />
        </div>
      </div>
    </>
  );
}
