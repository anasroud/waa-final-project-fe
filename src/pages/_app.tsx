import { AuthProvider } from "@/context/AuthContext";
import "../styles/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { AppProps } from "next/app";

const protectedRoutes: Record<string, ["admin" | "customer" | "owner"]> = {
  "/login/admin": ["admin"],
  "/login/customer": ["customer"],
  "/login/owner": ["owner"],
};

export default function App({ Component, pageProps, router }: AppProps) {
  const allowedRoles = protectedRoutes[router.pathname];

  return (
    <AuthProvider>
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
