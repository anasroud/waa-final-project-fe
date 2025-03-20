export interface Users {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  imageUrl: string;
  approved: boolean;
  image: string;
}

export type UserRole = "owner" | "admin" | "customer";
