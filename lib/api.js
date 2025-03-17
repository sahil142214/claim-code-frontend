const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to handle API errors
const handleApiError = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API error occurred');
  }
  return response.json();
};

// Public API calls
export const claimCoupon = async () => {
  try {
    const headers = {
        'X-Forwarded-For': window.clientInformation?.userIp || '', // Not reliable
        'User-Agent': navigator.userAgent,
        // Additional headers that might help identify the user
      };

    const response = await fetch(`${API_URL}/coupons/claim`, {
      method: 'GET',
      credentials: 'include',
      headers: headers,
    });
    return handleApiError(response);
  } catch (error) {
    console.error('Error claiming coupon:', error);
    throw error;
  }
};

// Admin API calls
export const adminLogin = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleApiError(response);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getCoupons = async (token) => {
  try {
    const response = await fetch(`${API_URL}/coupons`, {
      method: 'GET',
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });
    return handleApiError(response);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    throw error;
  }
};

export const createCoupon = async (couponData, token) => {
  try {
    const response = await fetch(`${API_URL}/coupons`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(couponData),
    });
    return handleApiError(response);
  } catch (error) {
    console.error('Error creating coupon:', error);
    throw error;
  }
};

export const updateCoupon = async (id, couponData, token) => {
  try {
    const response = await fetch(`${API_URL}/coupons/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(couponData),
    });
    return handleApiError(response);
  } catch (error) {
    console.error('Error updating coupon:', error);
    throw error;
  }
};

export const deleteCoupon = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/coupons/${id}`, {
      method: 'DELETE',
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });
    return handleApiError(response);
  } catch (error) {
    console.error('Error deleting coupon:', error);
    throw error;
  }
};

export const getAdminStats = async (token) => {
  try {
    const response = await fetch(`${API_URL}/admin/stats`, {
      method: 'GET',
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });
    return handleApiError(response);
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

export const getClaimHistory = async (token) => {
  try {
    const response = await fetch(`${API_URL}/admin/claims`, {
      method: 'GET',
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });
    return handleApiError(response);
  } catch (error) {
    console.error('Error fetching claim history:', error);
    throw error;
  }
};
