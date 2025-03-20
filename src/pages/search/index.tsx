import FilterNav from "@/components/FilterNav/FilterNave";
import Nav from "@/components/Nav/Nav";
import PropertyItem from "../../components/PropertyItem/PropertyItem";
import { useEffect, useState } from "react";
import Component from "@/components/comp-458";
import AnimatedWrapper from "@/components/AnimatedWrapper/AnimatedWrapper";

export default function Search() {
  const [properties, setProperties] = useState([]);
  const [countProperties, setCountProperties] = useState(0);
  const [page, setPage] = useState(1);

  const pageLimit = 9;
  const totalPages = Math.ceil(countProperties / pageLimit);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch(
        `/api/properties?page=${page}&limit=${pageLimit}`,
      );
      const data = await response.json();
      setProperties(data.properties);
    };

    fetchProperties();
  }, [page]);

  useEffect(() => {
    const fetchCountProperties = async () => {
      const response = await fetch("/api/properties/count");
      const data = await response.json();
      setCountProperties(data.count);
    };

    fetchCountProperties();
  }, []);

  const paginationHandler = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <Nav />
      <div>
        <FilterNav />
      </div>
      <AnimatedWrapper className="mx-auto max-w-6xl space-y-6 p-4">
        <div className="grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <PropertyItem key={index} property={property} />
          ))}
        </div>
        <div>
          <Component
            currentPage={page}
            totalPages={totalPages}
            paginationHandler={paginationHandler}
          />
        </div>
      </AnimatedWrapper>
    </>
  );
}
