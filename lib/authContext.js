'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin token is in localStorage
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdmin({ token });
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('adminToken', token);
    setAdmin({ token });
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
