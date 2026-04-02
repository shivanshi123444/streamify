import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('streamify_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email, password) => {
    // Simulated auth — replace with real backend if needed
    const users = JSON.parse(localStorage.getItem('streamify_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('streamify_user', JSON.stringify(safeUser));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('streamify_users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('streamify_users', JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('streamify_user', JSON.stringify(safeUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('streamify_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
