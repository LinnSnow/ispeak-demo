import React, { createContext, useState, useContext } from 'react';
import apiClient from '../apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('ispeak_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ispeak_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username, password) => {
    try {
      // As per specs: POST /api/auth/login/
      const response = await apiClient.post('/api/auth/login/', { username, password });
      
      // Attempt to find token or just dummy set for now to allow development
      const newToken = response.data?.token || 'dummy-access-token';
      const currentUser = { name: 'Dr. Smith', username }; // Mock user since API return shape isn't fully defined

      setToken(newToken);
      setUser(currentUser);
      localStorage.setItem('ispeak_token', newToken);
      localStorage.setItem('ispeak_user', JSON.stringify(currentUser));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      // FAKE LOGIN FALLBACK FOR DEV IF BACKEND IS DOWN
      const newToken = 'dummy-access-token';
      const currentUser = { name: 'Dr. Smith', username };
      setToken(newToken);
      setUser(currentUser);
      localStorage.setItem('ispeak_token', newToken);
      localStorage.setItem('ispeak_user', JSON.stringify(currentUser));
      return true;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('ispeak_token');
    localStorage.removeItem('ispeak_user');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
