import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/utils/api";
import { CircleDollarSign } from "lucide-react";

interface Offer {
  id: number;
  message: string;
  offeredPrice: number;
  isAccepted: boolean;
  property: {
    id: number;
    title: string;
    price: number;
  };
}

interface OffersResponse {
  message: string;
  data: Offer[];
  meta: {
    totalPages: number;
    currentPage: number;
    totalElements: number;
  };
}

const CustomerOffersTable = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const { data } = await apiFetch<OffersResponse>("/customers/offers", {
        method: "GET",
      });

      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOffer = async (offerId: number) => {
    try {
      const response = await apiFetch<{ message: string }>(
        `/customers/offers/${offerId}`,
        {
          method: "DELETE",
        },
      );

      if (response.message === "success") {
        setOffers((prevOffers) =>
          prevOffers.filter((offer) => offer.id !== offerId),
        );
      }
    } catch (error) {
      console.error("Error canceling offer:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading offers...</div>;
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Listed Price</TableHead>
            <TableHead>Your Offer</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell className="font-medium">
                {offer.property.title}
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <CircleDollarSign
                    className="mr-1 text-green-500"
                    height={16}
                  />
                  ${offer.property.price.toLocaleString()}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <CircleDollarSign
                    className="mr-1 text-blue-500"
                    height={16}
                  />
                  ${offer.offeredPrice.toLocaleString()}
                </div>
              </TableCell>
              <TableCell>{offer.message}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium ${
                    offer.isAccepted
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {offer.isAccepted ? "Accepted" : "Pending"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2 justify-end">
                  {!offer.isAccepted && (
                    <Button
                      onClick={() => handleCancelOffer(offer.id)}
                      variant="outline"
                      className="bg-red-50 text-red-700 hover:bg-red-100"
                      size="sm"
                    >
                      Cancel Offer
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerOffersTable;
