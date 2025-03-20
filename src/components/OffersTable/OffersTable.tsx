import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/utils/api";
import ConfirmationModal from "./components/ConfirmationModal";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Offer {
  id: number;
  message: string;
  offeredPrice: number;
  isAccepted: boolean | null;
  soldAt: string | null;
  property: {
    id: number;
    title: string;
    price: number;
  };
  customer: {
    id: number;
    name: string;
    imageURL: string | null;
    email: string;
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

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOffers();
  }, [currentPage]);

  const fetchOffers = async () => {
    try {
      const { data, meta } = await apiFetch<OffersResponse>("/owners/offers?page=" + currentPage + "&size=10", {
        method: "GET",
      });

      setOffers(data);
      setTotalPages(meta.totalPages);
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

  const handleCloseOffer = async (offerId: number) => {
    // /owners/offers/4/finalize
    console.log("Closing offer:", offerId);
    const response = await apiFetch<{
      message: string;
      data: { id: number; accepted: boolean };
    }>(`/owners/offers/${offerId}/finalize`, {
      method: "PATCH",
      body: JSON.stringify({
        soldAt: true,
      }),
    });
    if (response.message === "success") {
      // refresh the offers list
      setOffers((prevOffers) =>
        prevOffers.filter((offer) => offer.id !== offerId),
      );
      fetchOffers();
    } else {
      console.error("Failed to close offer:", response.message);
    }
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [action, setAction] = useState<"close" | "accept" | "reject" | null>(
    null,
  );
  const [offerId, setOfferId] = useState<number | null>(null);

  function handleOpenConfirmationModal(
    action: "close" | "accept" | "reject",
    offerId: number,
  ) {
    setAction(action);
    setOfferId(offerId);
    setShowConfirmationModal(true);
  }

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
              <TableCell>
                <p>{offer.customer.name}</p>
                <p className="text-sm text-gray-500">{offer.customer.email}</p>
              </TableCell>
              <TableCell>{offer.message.slice(0, 30)}...</TableCell>
              <TableCell>${offer.offeredPrice.toLocaleString()}
              </TableCell>
              <TableCell>

                <span
                  className={cn(
                    `inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium`,
                    {
                      "text-green-800 bg-green-100":
                        offer.isAccepted && !offer.soldAt,
                      "text-yellow-800 bg-yellow-100":
                        !offer.isAccepted,
                      "text-gray-800 bg-gray-100": offer.isAccepted && offer.soldAt,
                      "text-red-600 bg-red-100": offer.isAccepted === false,
                    },
                  )}
                >
                  {offer.isAccepted === true && <>
                    {offer.soldAt ? "Sold" : "Contingent"}
                  </>}
                  {offer.isAccepted === null && "Pending"}
                  {offer.isAccepted === false && "Rejected"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2 justify-end">
                  {!offer.isAccepted && offer.isAccepted !== false && (
                    <Button
                      onClick={() =>
                        handleOpenConfirmationModal("accept", offer.id)
                      }
                      className="bg-green-50 text-green-700 hover:bg-green-100"
                      size="sm"
                    >
                      Accept
                    </Button>
                  )}
                  {!offer.soldAt && offer.isAccepted && (
                    <Button
                      onClick={() =>
                        handleOpenConfirmationModal("close", offer.id)
                      }
                      className="bg-green-50 text-green-700 hover:bg-green-100"
                      size="sm"
                    >
                      Close offer
                    </Button>
                  )}
                  {!offer.soldAt && offer.isAccepted !== false && (
                    <Button
                      onClick={() =>
                        handleOpenConfirmationModal("reject", offer.id)
                      }
                      className="bg-red-50 text-red-700 hover:bg-red-100"
                      size="sm"
                    >
                      Reject
                    </Button>
                  )}
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
                <ChevronLeftIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
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
                <ChevronRightIcon className="-me-1 opacity-60" size={16} aria-hidden="true" />
              </span>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <ConfirmationModal
        cancel={() => {
          setShowConfirmationModal(false);
          setAction(null);
          setOfferId(null);
        }}
        id={offerId || 1}
        isOpen={showConfirmationModal}
        action={action}
        onClose={(action, id) => {
          if (action === "accept") {
            handleAcceptOffer(id);
          }
          if (action === "reject") {
            handleRejectOffer(id);
          }
          if (action === "close") {
            handleCloseOffer(id);
          }
          setShowConfirmationModal(false);
        }}
      />
    </div>
  );
};

export default OffersTable;
