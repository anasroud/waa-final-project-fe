import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  allowedRoles: ["admin" | "customer" | "owner"];
  children: React.ReactNode;
};

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const { user, setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined || user === null) {
      // Fetch or set the user here
      setUser(localStorage.user); // Assuming setUser is a function that fetches and sets the user
      return;
    }

    if (!user) {
      if (allowedRoles.includes("admin")) {
        router.push("/login/admin");
      } else if (allowedRoles.includes("customer")) {
        router.push("/login/customer");
      } else if (allowedRoles.includes("owner")) {
        router.push("/login/owner");
      }
    } else if (!allowedRoles.includes(user.role)) {
      router.replace("/");
    }
  }, [user, allowedRoles, router, setUser]);

  return <>{children}</>;
}
