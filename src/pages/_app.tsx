import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { UserRole } from "@/types/Users";
import { AppProps } from "next/app";

const protectedRoutes: Record<string, UserRole[]> = {
  "/owner": ["owner"],
  "/dashboard": ["admin"],
  "/search": ["customer"],
};

export default function App({ Component, pageProps, router }: AppProps) {
  const allowedRoles = protectedRoutes[router.pathname];

  return (
    <AuthProvider key={typeof window !== "undefined" ? "client" : "server"}>
      {allowedRoles ? (
        <ProtectedRoute allowedRoles={allowedRoles}>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}
