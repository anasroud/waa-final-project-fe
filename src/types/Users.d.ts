export interface Users {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  imageUrl: string;
  image: string;
}

export type UserRole = "owner" | "admin" | "customer";
