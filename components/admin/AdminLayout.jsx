'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';

export default function AdminLayout({ children }) {
  const { admin, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !admin) {
      router.push('/admin/login');
    }
  }, [admin, loading, router]);

  if (loading) {
    return <div className="flex min-h-screen justify-center items-center">Loading...</div>;
  }

  if (!admin) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin/dashboard" className="text-xl font-bold text-indigo-600">
                  Admin Dashboard
                </Link>
              </div>
              <nav className="ml-6 flex space-x-4 items-center">
                <Link
                  href="/admin/dashboard"
                  className={`${
                    pathname === '/admin/dashboard'
                      ? 'text-indigo-600 border-indigo-500'
                      : 'text-gray-600 border-transparent'
                  } hover:text-indigo-900 px-3 py-2 text-sm font-medium border-b-2`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/coupons"
                  className={`${
                    pathname === '/admin/coupons'
                      ? 'text-indigo-600 border-indigo-500'
                      : 'text-gray-600 border-transparent'
                  } hover:text-indigo-900 px-3 py-2 text-sm font-medium border-b-2`}
                >
                  Coupons
                </Link>
                <Link
                  href="/admin/claims"
                  className={`${
                    pathname === '/admin/claims'
                      ? 'text-indigo-600 border-indigo-500'
                      : 'text-gray-600 border-transparent'
                  } hover:text-indigo-900 px-3 py-2 text-sm font-medium border-b-2`}
                >
                  Claims
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
