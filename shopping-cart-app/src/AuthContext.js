import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenFromStorage = localStorage.getItem('token');
  const [token, setToken] = useState(tokenFromStorage);
  const [user, setUser] = useState(null); // Will hold user info like email

  const login = (token, userEmail) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser({ email: userEmail });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
