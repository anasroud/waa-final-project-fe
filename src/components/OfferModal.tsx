import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "./ui/input";
import { useState } from "react";
import { apiFetch } from "@/utils/api";
import { Property } from "./PropertyItem/PropertyItem";
import { DollarSign } from "lucide-react";
import { toast } from "sonner";

interface ApiResponse {
  message: string;
  data: {
    id: number;
    offeredPrice: number;
    message: string;
    propertyId: number;
  };
}

export default function OfferModal({
  selectedProperty,
  setIsOpen,
}: {
  selectedProperty: Property;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [offer, setOffer] = useState({
    offeredPrice: "",
    message: "",
  });

  const handleOfferSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      // Validate the offer
      if (!offer.offeredPrice || !offer.message) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (isNaN(Number(offer.offeredPrice))) {
        toast.error("Please enter a valid number for the offer price.");
        return;
      }
      if (Number(offer.offeredPrice) <= 0) {
        toast.error("Offer price must be greater than 0.");
        return;
      }
      if (offer.message.length < 10) {
        toast.error("Message must be at least 10 characters long.");
        return;
      }

      const response = await apiFetch<ApiResponse>(`/customers/offers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offeredPrice: offer.offeredPrice,
          message: offer.message,
          propertyId: selectedProperty?.id,
        }),
      });

      if (response.message !== "success") {
        throw new Error("Failed to submit offer");
      }

      // Close the dialog on success
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting offer:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1" size="lg">
          <DollarSign className="h-5 w-5" />
          Place an Offer
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Make an offer for the property
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <form className="space-y-5">
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label>Offer Price</Label>
                <Input
                  id="price"
                  placeholder="How much do you want to offer?"
                  value={offer.offeredPrice}
                  onChange={(e) =>
                    setOffer({ ...offer, offeredPrice: e.target.value })
                  }
                  aria-label="price"
                />
              </div>

              <div className="*:not-first:mt-2">
                <Label>Message to Owner</Label>
                <Textarea
                  id="message"
                  placeholder="Personalize your message to the owner"
                  value={offer.message}
                  onChange={(e) =>
                    setOffer({ ...offer, message: e.target.value })
                  }
                  aria-label="message"
                />
              </div>
            </div>
            <Button
              type="button"
              className="w-full"
              onClick={handleOfferSubmit}
            >
              Send Offer
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
