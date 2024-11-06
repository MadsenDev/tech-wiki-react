import React, { createContext, useContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { user, error, login, logout } = useAuth();
  const isAuthenticated = !!user; // True if user is not null

  return (
    <UserContext.Provider value={{ user, isAuthenticated, error, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};