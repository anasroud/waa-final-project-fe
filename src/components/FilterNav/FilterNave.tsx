import { useEffect, useState } from "react";
import NormalInput from "../Inputs/Input";
import Component from "../comp-258";
import PricesFilter from "../comp-258";

/**
 * nav bar that has the filters
 * @param param0
 * @returns
 */
const FilterNav = ({}) => {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {}, [search]);
  return (
    <nav className="bg-gray-100/20 border-b border-gray-200/20">
      <div className="container mx-auto px-4 py-2 flex items-center">
        <div className="w-fit space-y-3">
          <NormalInput
            label="Search By location"
            placeHolder="ex: FairField"
            className="w-full "
            type="text"
            setValue={setSearch}
          />
          <PricesFilter
            minValue={0}
            maxValue={100000}
            initialValue={[20000, 100000]}
          />
        </div>
      </div>
    </nav>
  );
};

export default FilterNav;
