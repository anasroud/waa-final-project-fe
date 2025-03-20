import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  BedDouble,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleDollarSign,
  Eye,
  Heart,
  ShowerHead,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Property } from "../PropertyItem/PropertyItem";
import PropertyDetails from "../PropertyDetails/PropertyDetails";
import { Badge } from "../ui/badge";
import { apiFetch } from "@/utils/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

const FavoritedPropertiesTable = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchFavorites();
  }, [currentPage]);

  const fetchFavorites = async () => {
    try {
      const response = await apiFetch<{
        message: string; data: Property[], meta: {
          "totalPages": number;
          "currentPage": number;
          "totalElements": number;
        }
      }>(
        "/customers/favorites",
        {
          method: "GET",
        },
      );

      if (response.message !== "success")
        throw new Error("Failed to fetch favorites");

      setProperties(response.data);
      setTotalPages(response.meta.totalPages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to load favorites");
      setLoading(false);
    }
  };

  const handleUnfavorite = async (propertyId: number) => {
    try {
      const response = await apiFetch<{
        message: string;
        data: {
          propertyId: number;
        };
      }>("/customers/favorites", {
        method: "POST",
        body: JSON.stringify({ propertyId }),
      });

      if (response.message === "success") {
        setProperties((prev) => prev.filter((p) => p.id !== propertyId));
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  if (properties.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No favorited properties found
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="rounded-tl-md">Property Details</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Features</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="rounded-tr-md">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <div className="text-sm font-medium">{property.title}</div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  {property.address}, {property.city}, {property.state}{" "}
                  {property.zipCode}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Badge
                    className={`!text-[10px] rounded-sm font-bold ${property.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : property.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : property.status === "SOLD"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {property.status}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center font-semibold space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <BedDouble className="mr-1" height={16} />
                    {property.bedroomCount}
                  </span>
                  <span className="flex items-center">
                    <ShowerHead className="mr-1" height={16} />
                    {property.bathroomCount}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <CircleDollarSign
                    className="mr-1 text-green-500"
                    height={16}
                  />
                  ${property.price.toLocaleString()}
                </div>
              </TableCell>
              <TableCell>
                <div className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
                  <Button
                    className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
                    variant="outline"
                    onClick={() => {
                      setSelectedProperty(property);
                      setIsOpen(true);
                    }}
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
                    variant="outline"
                    onClick={() => handleUnfavorite(property.id)}
                  >
                    <Heart size={16} className="text-red-400 fill-current" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
      <PropertyDetails
        isOpen={isOpen}
        selectedProperty={selectedProperty}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default FavoritedPropertiesTable;
