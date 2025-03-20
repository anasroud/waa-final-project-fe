import { useEffect, useState } from "react";
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
  city?: string;
}

const FilterNav = ({ setSearchFilters, city }: IFilterNavProps) => {
  const [search, setSearch] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0.0, 0.0]);
  const [homeType, setHomeType] = useState<string | null>(null);
  const [selectedStates, setState] = useState<string | null>("");
  const [moreFilters, setMoreFilters] = useState<IMoreFiltersOptions>({
    hasPool: false,
    hasParking: false,
    hasAC: false,
  });

  const options = ["House", "Town Home", "Condo", "Apartment"];

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setMoreFilters({
      hasParking: false,
      hasPool: false,
      hasAC: false,
    });
    e.preventDefault();
    setSearchFilters({
      minBedroomCount: bedrooms,
      minBathroomCount: bathrooms,
      minPrice: priceRange[0] * 1.0,
      maxPrice: priceRange[1] * 1.0,
      homeType,
      city: search,
      hasParking: moreFilters.hasParking,
      hasPool: moreFilters.hasPool,
      hasAC: moreFilters.hasAC,
      state: selectedStates,
    });
  };

  useEffect(() => {}, [search]);
  return (
    <nav className=" border-b p-4 border-gray-200/20">
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
            value={city}
            setValue={setSearch}
          />
          <NormalInput
            label="Bathrooms"
            placeHolder="ex: 2"
            className="w-full"
            inputClassName="bg-white"
            type="number"
            min={0}
            setValue={(value: string) => setBathrooms(Number(value))}
          />
          <NormalInput
            label="Bedrooms"
            placeHolder="ex: 3"
            className="w-full"
            inputClassName="bg-white"
            type="number"
            min={0}
            setValue={(value: string) => setBedrooms(Number(value))}
          />
          <DropDown
            className="pt-6 w-full"
            placeholder="Home Type"
            options={options}
            setValue={setHomeType}
          />

          <div>
            <Label className="text-sm">Price Range</Label>
            <PricesFilter
              minValue={0}
              maxValue={1000000}
              initialValue={[0, 1000000]}
              setValues={setPriceRange}
            />
          </div>
          <div>
            <DropDown
              className="pt-6 w-full"
              placeholder="Select a state"
              options={states}
              setValue={setState}
            />
          </div>
        </div>
        <div className="flex gap-4 flex-row md:flex-col">
          <Button
            variant="outline"
            className="bg-black text-white active:bg-gray-200 active:text-gray-900"
            size="lg"
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
