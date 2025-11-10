import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        // Ensure name is read from the decoded token
        if (decodedToken && decodedToken.id && decodedToken.email) {
          setUser({
            id: decodedToken.id,
            name: decodedToken.name || decodedToken.email, // Use decodedToken.name, fallback to email
            email: decodedToken.email
          });
        } else {
          setUser(null); // If token doesn't have expected payload, treat as not logged in
          localStorage.removeItem('token');
          setToken(null);
        }
      } catch (error) {
        console.error("Error decoding token or token invalid:", error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData); // userData should now correctly contain 'name' from the server
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
