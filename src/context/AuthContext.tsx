import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiFetch } from "@/utils/api";

type UserRole = "owner" | "admin" | "customer";

interface User {
  id: number;
  email: string;
  name: string;
  imageUrl: string;
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
    // image: File | null,
    role: UserRole,
  ) => Promise<void>;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      const decodedToken = decodeToken(parsedUser.token); // Implement your token decoding logic
      if (decodedToken && decodedToken.exp > Date.now() / 1000) {
        setUser(parsedUser);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      const data = await apiFetch<{ data: User }>(`/${role}s/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const userData = { ...data.data, role };
      setUser(userData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { role: _, ...userWithoutRole } = userData;
      const localData = { role, ...userWithoutRole };
      localStorage.setItem("user", JSON.stringify(localData));
      router.push(`/`);
    } catch (error) {
      if (error instanceof Error) {
        if (JSON.parse(error.message)["message"] === "Bad credentials") {
          throw new Error("Invalid email or password");
        }
        console.log("Login failed:", error["message"]);
      } else {
        console.log("Login failed:", error);
      }
      throw new Error("Login failed");
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    // image: File | null,
    role: UserRole,
  ) => {
    try {
      const data = await apiFetch<{ data: unknown }>(`/${role}s/signup`, {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      });

      if (data.data) {
        console.log("Registration successful:", data.data);
      }

      router.push(`/login/${role}`);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, setUser, loading, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const decodeToken = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    return JSON.parse(jsonPayload);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return null;
  }
};
