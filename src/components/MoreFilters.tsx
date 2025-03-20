"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DropDown from "./DropDown";
import { states } from "@/utils/searchOptions";

// state (optional): Filter properties by state.
// homeType (optional): Filter properties by type (e.g., Apartment, House). This should be sent as a comma-separated list.
// hasParking (optional): Filter properties that have parking.
// hasPool (optional): Filter properties that have a pool.
// hasAC (optional): Filter properties that have air conditioning.

export interface IMoreFiltersOptions {
  hasPool: boolean;
  hasParking: boolean;
  hasAC: boolean;
  state?: string; // Add the state property
}

export interface IMoreFiltersProps {
  setMoreFilters: React.Dispatch<React.SetStateAction<IMoreFiltersOptions>>;
}

export default function MoreFilters({ setMoreFilters }: IMoreFiltersProps) {
  const handleValuesChange = (
    type: keyof IMoreFiltersOptions,
    value: unknown
  ) => {
    setMoreFilters((prev: IMoreFiltersOptions) => ({ ...prev, [type]: value }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">More Filter</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            More Filters
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label>First name</Label>
                  <Input
                    placeholder="Matt"
                    defaultValue="Margaret"
                    type="text"
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Last name</Label>
                  <Input
                    placeholder="Welsh"
                    defaultValue="Villard"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <DropDown
                  placeholder="Select a state"
                  options={states}
                  setValue={(e) => {
                    handleValuesChange("state", e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
