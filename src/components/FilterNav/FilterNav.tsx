import { useRef, useState } from "react";
import NormalInput from "../Inputs/Input";
import PricesFilter from "../PricesFilter";
import { Label } from "react-aria-components";
import { Button } from "../ui/button";
import DropDown from "../DropDown";
import { IMoreFiltersOptions } from "../MoreFilters";
import { states } from "@/utils/searchOptions";

export interface SearchFilters {
  minBedroomCount?: number;
  minBathroomCount?: number;
  minPrice?: number;
  maxPrice?: number;
  homeType?: string | null;
  city?: string;
  hasParking?: boolean;
  hasPool?: boolean;
  hasAC?: boolean;
  state?: string | null;
}

export interface IFilterNavProps {
  setSearchFilters: (filters: SearchFilters) => void;
}

const FilterNav = ({ setSearchFilters }: IFilterNavProps) => {
  const searchRef = useRef<HTMLInputElement>(
    null as unknown as HTMLInputElement
  );
  const bedroomsRef = useRef<HTMLInputElement>(
    null as unknown as HTMLInputElement
  );
  const bathroomsRef = useRef<HTMLInputElement>(
    null as unknown as HTMLInputElement
  );
  const homeTypeRef = useRef<string | null>(null);
  const selectedStateRef = useRef<string | null>(null);
  const priceRangeRef = useRef<[number, number]>([0, 1000000000]);
  const [moreFilters, setMoreFilters] = useState<IMoreFiltersOptions>({
    hasPool: false,
    hasParking: false,
    hasAC: false,
  });

  const options = [
    { name: "House", value: "House" },
    { name: "Town Home", value: "Town Home" },
    { name: "Condo", value: "Condo" },
    { name: "Apartment", value: "Apartment" },
  ];

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchFilters({
      minBedroomCount: Number(bedroomsRef.current?.value) || 0,
      minBathroomCount: Number(bathroomsRef.current?.value) || 0,
      minPrice: priceRangeRef.current[0],
      maxPrice: priceRangeRef.current[1],
      homeType: homeTypeRef.current,
      city: searchRef.current?.value || "",
      hasParking: moreFilters.hasParking,
      hasPool: moreFilters.hasPool,
      hasAC: moreFilters.hasAC,
      state: selectedStateRef.current,
    });
  };

  return (
    <nav className="border-b p-4 border-gray-200/20">
      <form
        className="container max-w-6xl bg-gray-100/80 rounded-4xl mx-auto mt-5 gap-6 p-8 flex justify-between items-end flex-col md:flex-row"
        onSubmit={handleOnSubmit}
      >
        <div className="grid w-full gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <NormalInput
            label="Search By City"
            placeHolder="ex: FairField"
            className="w-full"
            inputClassName="bg-white"
            type="text"
            inputRef={searchRef}
          />
          <NormalInput
            label="Bathrooms"
            placeHolder="ex: 2"
            className="w-full"
            inputClassName="bg-white"
            type="number"
            min={0}
            inputRef={bathroomsRef}
          />
          <NormalInput
            label="Bedrooms"
            placeHolder="ex: 3"
            className="w-full"
            inputClassName="bg-white"
            type="number"
            min={0}
            inputRef={bedroomsRef}
          />
          <DropDown
            className="pt-6 w-full"
            placeholder="Home Type"
            options={options}
            setValue={(value) => (homeTypeRef.current = value)}
          />
          <div>
            <Label className="text-sm">Price Range</Label>
            <PricesFilter
              minValue={0}
              maxValue={1000000000}
              initialValue={priceRangeRef.current}
              setValues={(values) => (priceRangeRef.current = values)}
            />
          </div>
          <div>
            <DropDown
              className="pt-6 w-full"
              placeholder="Select a state"
              options={states}
              setValue={(value) => (selectedStateRef.current = value)}
            />
          </div>
        </div>
        <div className="flex gap-4 flex-row md:flex-col">
          <Button
            variant="outline"
            className="bg-black text-white active:bg-gray-200 active:text-gray-900"
            size="lg"
            type="submit"
          >
            Search
          </Button>
          {/* <MoreFilters setMoreFilters={setMoreFilters} /> */}
        </div>
      </form>
    </nav>
  );
};

export default FilterNav;
