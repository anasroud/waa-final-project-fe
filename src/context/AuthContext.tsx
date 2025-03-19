import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiFetch } from "@/utils/api";

type UserRole = "owner" | "admin" | "customer";

interface User {
  role: UserRole;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    image: File | null,
    role: UserRole
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string, role: UserRole) => {
    const data = await apiFetch<{
      data: {
        token: string;
        id: number;
        email: string;
        name: string;
        imageURl: string;
        role: UserRole;
      };
    }>(`/${role}s/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    data.data.role = role;

    const userData = { ...data.data };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push(`/`);
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    image: File | null,
    role: UserRole
  ) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    if (image) formData.append("image", image);

    await apiFetch<void>(`/${role}s/signup`, {
      method: "POST",
      body: formData,
    });

    router.push(`/${role}/login`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
