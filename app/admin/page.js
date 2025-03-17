'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';

export default function AdminPage() {
  const router = useRouter();
  const { admin, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (admin) {
        // If already logged in, redirect to dashboard
        router.push('/admin/dashboard');
      } else {
        // If not logged in, redirect to login
        router.push('/admin/login');
      }
    }
  }, [admin, loading, router]);

  // Show loading state while checking authentication
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Loading Admin Panel</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
} 