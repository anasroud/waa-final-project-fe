import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  allowedRoles: ["admin" | "customer" | "owner"];
  children: React.ReactNode;
};

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
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
    } else {
      router.replace("/");
    }
  }, [user, allowedRoles, router]);

  return <>{children}</>;
}
