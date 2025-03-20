import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  BedDouble,
  CircleDollarSign,
  Edit,
  Eye,
  ShowerHead,
  Trash,
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

// const sampleResponse = { "message": "success", "data": [{ "id": 1, "title": "Beautiful Villa", "description": "A luxurious villa in the city", "city": "New York", "state": "NY", "zipCode": "10001", "address": "123 Villa St", "locationLat": 40.7128, "locationLng": -74.006, "price": 500000, "bedroomCount": 4, "bathroomCount": 3, "homeType": "House", "squareFootage": 3500, "hasParking": true, "hasPool": true, "hasAC": true, "processedAt": "2025-03-19T13:41:19.488141", "ownerId": 2, "status": "Available", "imageURLs": [], "approved": true }, { "id": 2, "title": "Modern Condo", "description": "A modern condo with a pool", "city": "Los Angeles", "state": "CA", "zipCode": "90001", "address": "456 Condo Ave", "locationLat": 34.0522, "locationLng": -118.2437, "price": 350000, "bedroomCount": 2, "bathroomCount": 2, "homeType": "Condo", "squareFootage": 1200, "hasParking": true, "hasPool": true, "hasAC": true, "processedAt": "2025-03-19T13:41:19.488165", "ownerId": 2, "status": "Available", "imageURLs": [], "approved": true }], "meta": { "totalPages": 1, "currentPage": 0, "totalElements": 2 } }

const PropertiesTable = () => {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await apiFetch<{ message: string; data: Property[] }>(
        "/owners/properties",
        {
          method: "GET",
        },
      );

      if (response.message !== "success")
        throw new Error("Failed to fetch properties");

      setProperties(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);

      setError("Failed to load properties");
      setLoading(false);
    }
  };

  const handleEdit = (propertyId: number) => {
    router.push(`/owner/edit-property/${propertyId}`);
  };

  const handleDelete = async (propertyId: number) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete property");
      fetchProperties(); // Refresh the list
    } catch (err) {
      console.log(err);

      setError("Failed to delete property");
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <>
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
                    className={`!text-[10px] rounded-sm font-bold ${
                      property.status === "AVAILABLE"
                        ? "bg-green-100 text-green-800"
                        : property.status === "PENDING"
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
                {property.status === "AVAILABLE" && (
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
                      onClick={() => handleEdit(property.id)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(property.id)}
                    >
                      <Trash size={16} className="text-red-400" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PropertyDetails
        isOpen={isOpen}
        selectedProperty={selectedProperty}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default PropertiesTable;
