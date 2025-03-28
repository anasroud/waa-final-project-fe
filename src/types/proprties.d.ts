export interface IProperty {
  id: number;
  title: string;
  description: string;
  city: string;
  state: string;
  zipCode: string;
  address: string;
  locationLat: number;
  locationLng: number;
  price: number;
  favorited: boolean;
  bedroomCount: number;
  bathroomCount: number;
  homeType: string;
  squareFootage: number;
  hasParking: boolean;
  hasPool: boolean;
  hasAC: boolean;
  processedAt: string;
  ownerId: number;
  status: "Available" | "Pending" | "SOLD" | "CONTINGENT";
  imageURLs: string[];
  isApproved: boolean;
}
