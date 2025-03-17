'use client';

import { useState } from 'react';
import { claimCoupon } from '@/lib/api';

export default function ClaimButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleClaim = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const data = await claimCoupon();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to claim coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleClaim}
        disabled={loading}
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg"
      >
        {loading ? 'Claiming...' : 'Claim Your Coupon'}
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}
      
      {result && (
        <div className="mt-4 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-green-700 font-medium">{result.message}</p>
          <div className="mt-4 p-4 bg-white border-2 border-dashed border-green-300 rounded-md">
            <p className="text-xl font-bold text-gray-800">{result.coupon.code}</p>
            <p className="text-gray-600 mt-1">{result.coupon.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
