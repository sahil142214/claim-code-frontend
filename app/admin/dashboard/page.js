'use client';

import { useState, useEffect } from 'react';
import { getAdminStats } from '@/lib/api';
import { useAuth } from '@/lib/authContext';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { admin } = useAuth();

  useEffect(() => {
    if (admin) {
      fetchStats();
    }
  }, [admin]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await getAdminStats(admin.token);
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading stats...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button
          onClick={fetchStats}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Retry
        </button>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Coupons Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Coupons</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.totalCoupons || 0}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-3">
              <div className="text-sm">
                <span className="font-medium text-indigo-600">{stats?.activeCoupons || 0} active</span>
              </div>
            </div>
          </div>

          {/* Total Claims Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Claims</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.totalClaims || 0}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-3">
              <div className="text-sm">
                <span className="font-medium text-indigo-600">{stats?.last24HoursClaims || 0} in last 24h</span>
              </div>
            </div>
          </div>

          {/* 7-Day Claims Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Last 7 Days</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.last7DaysClaims || 0}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-3">
              <div className="text-sm">
                <span className="font-medium text-indigo-600">Claims this week</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              System Overview
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="prose max-w-none">
              <p>
                Welcome to the Coupon Distribution System admin panel. Use the navigation 
                to manage coupons and view claim history.
              </p>
              <h4>Quick Tips:</h4>
              <ul>
                <li>Add new coupons from the Coupons page</li>
                <li>Monitor which IPs are claiming coupons in the Claims section</li>
                <li>Toggle coupon availability from the Coupons page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
