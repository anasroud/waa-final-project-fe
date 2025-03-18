import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  allowedRoles: ('owner' | 'admin' | 'customer')[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      if (allowedRoles.includes('owner')) router.push('/owner-login');
      else if (allowedRoles.includes('customer')) router.push('/customer-login');
      else router.push('/');
    } else if (!allowedRoles.includes(user.role)) {
      if (user.role === 'admin') router.push('/');
      else if (user.role === 'customer') router.push('/customer-login');
      else if (user.role === 'owner') router.push('/owner-login');
    }
  }, [user, router, allowedRoles]);

  return user && allowedRoles.includes(user.role) ? <>{children}</> : null;
}
