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
  customer: {
    id: number;
    name: string;
    imageURL: string | null;
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

const OffersTable = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const { data } = await apiFetch<OffersResponse>("/owners/offers", {
        method: "GET",
      });

      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOffer = async (offerId: number) => {
    // TODO: Implement API call to accept offer
    console.log("Accepting offer:", offerId);
    const response = await apiFetch<{
      message: string;
      data: { id: number; accepted: boolean };
    }>(`/owners/offers/${offerId}`, {
      method: "PATCH",
      body: JSON.stringify({
        isAccepted: true,
      }),
    });
    if (response.message === "success") {
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer.id === offerId ? { ...offer, isAccepted: true } : offer,
        ),
      );
      fetchOffers();
    } else {
      console.error("Failed to accept offer:", response.message);
    }
  };

  const handleRejectOffer = async (offerId: number) => {
    // TODO: Implement API call to reject offer
    console.log("Rejecting offer:", offerId);
    const response = await apiFetch<{
      message: string;
      data: { id: number; accepted: boolean };
    }>(`/owners/offers/${offerId}`, {
      method: "PATCH",
      body: JSON.stringify({
        isAccepted: false,
      }),
    });
    if (response.message === "success") {
      // refresh the offers list
      setOffers((prevOffers) =>
        prevOffers.filter((offer) => offer.id !== offerId),
      );
      fetchOffers();
    } else {
      console.error("Failed to reject offer:", response.message);
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
            <TableHead>Customer</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Offered Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell>{offer.property.title}</TableCell>
              <TableCell>{offer.customer.name}</TableCell>
              <TableCell>{offer.message}</TableCell>
              <TableCell>${offer.offeredPrice.toLocaleString()}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium ${offer.isAccepted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                >
                  {offer.isAccepted ? "Accepted" : "Pending"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2 justify-end">
                  {!offer.isAccepted && (
                    <Button
                      onClick={() => handleAcceptOffer(offer.id)}
                      variant="outline"
                      className="bg-green-50 text-green-700 hover:bg-green-100"
                      size="sm"
                    >
                      Accept
                    </Button>
                  )}
                  <Button
                    onClick={() => handleRejectOffer(offer.id)}
                    variant="outline"
                    className="bg-red-50 text-red-700 hover:bg-red-100"
                    size="sm"
                  >
                    Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OffersTable;
