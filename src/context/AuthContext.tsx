import { createContext, useContext, useState } from "react";
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

const debugMode = process.env.NEXT_PUBLIC_DEBUG_MODE === "true";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   if (debugMode) {
  //     setUser({
  //       role: process.env.NEXT_PUBLIC_DEBUG_ROLE as UserRole,
  //       token: 'mock-token',
  //     });
  //     console.log('🚀 Debug Mode Enabled');
  //   } else {
  //     const storedUser = localStorage.getItem('user');
  //     if (storedUser) setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock the authentication flow during development
    if (debugMode) {
      setUser({ role, token: "mock-token" });
      router.push(`/${role}-home`);
      return;
    }

    const data = await apiFetch<{ token: string }>(`/admins/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const userData = { role, token: data.token };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push(`/${role}-home`);
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

    await apiFetch<void>(`/owners/signup`, {
      method: "POST",
      body: formData,
    });

    router.push(`/${role}-login`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

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
