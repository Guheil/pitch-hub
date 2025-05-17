'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !currentUser) {
      // Store the path they were trying to access
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.push('/login');
    }
  }, [currentUser, loading, router, pathname]);

  // Show nothing while checking authentication
  if (loading || !currentUser) {
    return null;
  }

  return <>{children}</>;
}
