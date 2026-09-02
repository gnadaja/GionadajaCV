import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// AuthContext centraliza el estado del usuario logueado para que cualquier componente
// pueda leerlo y actualizarlo sin pasar props manualmente por toda la app.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('portfolioUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('No se pudo leer el usuario guardado:', error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('portfolioUser', JSON.stringify(user));
      return;
    }

    localStorage.removeItem('portfolioUser');
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}
