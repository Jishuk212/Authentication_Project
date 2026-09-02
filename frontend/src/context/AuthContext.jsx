import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const data = await getCurrentUser();
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (credebtuaks) => {
    const data = await loginUser(credebtuaks);
    if (data.success) {
      setUser(data.user);
    }
    return data;
  }, []);

  const register = useCallback(async (userData) => {
    const data = await registerUser(userData);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      const data = await logoutUser();
      setUser(null);
      return data;
    } catch (error) {
      setUser(null);
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      checkAuth,
    }),
    [user, loading, login, register, logout, checkAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
