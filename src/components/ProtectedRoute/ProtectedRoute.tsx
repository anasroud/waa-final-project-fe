import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/Users";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  allowedRoles: UserRole[];
  children: React.ReactNode;
};

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login/${allowedRoles[0]}`);
    }

    if (!loading && user && !allowedRoles.includes(user.role)) {
      router.push(`/`);
    }
  }, [user, loading, router, allowedRoles]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return children;
}
