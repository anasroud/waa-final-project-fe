import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

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
  offers: Offer[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
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
      const response = await fetch('/api/offers');
      const data: OffersResponse = await response.json();
      setOffers(data.offers);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOffer = async (offerId: number) => {
    // TODO: Implement API call to accept offer
    console.log('Accepting offer:', offerId);
  };

  const handleRejectOffer = async (offerId: number) => {
    // TODO: Implement API call to reject offer
    console.log('Rejecting offer:', offerId);
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
              <TableCell>
                ${offer.offeredPrice.toLocaleString()}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${offer.isAccepted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                >
                  {offer.isAccepted ? 'Accepted' : 'Pending'}
                </span>
              </TableCell>
              <TableCell>
                {!offer.isAccepted && (
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleAcceptOffer(offer.id)}
                      variant="outline"
                      className="bg-green-50 text-green-700 hover:bg-green-100"
                      size="sm"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleRejectOffer(offer.id)}
                      variant="outline"
                      className="bg-red-50 text-red-700 hover:bg-red-100"
                      size="sm"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OffersTable;