import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';
import { authService } from '../services/authService';

const AuthContext = createContext(null);
const TOKEN_KEY = 'quickkart_token';

export const AuthProvider = ({ children }) => {
  const { showToast } = useToast();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // Restore authenticated session on app initialization or token change
  const refreshUser = useCallback(async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }

    try {
      const res = await authService.getMe();
      if (res.success && res.data?.user) {
        setUser(res.data.user);
        setToken(storedToken);
      } else {
        throw new Error('Invalid token session');
      }
    } catch (error) {
      console.warn('[QuickKart Auth] Token verification failed or session expired. Logging out.');
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email, password) => {
    try {
      const res = await authService.login(email, password);
      if (res.success && res.data) {
        const { user: userData, token: newToken } = res.data;
        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);
        setUser(userData);
        showToast(`Welcome back, ${userData.name}!`, 'success');
        return { success: true };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (error) {
      const msg = error.message || 'Invalid email or password.';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await authService.register(name, email, password);
      if (res.success && res.data) {
        const { user: userData, token: newToken } = res.data;
        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);
        setUser(userData);
        showToast(`Account registered successfully! Welcome, ${userData.name}.`, 'success');
        return { success: true };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (error) {
      const msg = error.message || 'Registration failed. Please try again.';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore network failures on logout
    }
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
    showToast('You have been logged out.', 'info');
  };

  const updateUserProfile = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData
    }));
    showToast('Profile updated successfully!', 'success');
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: `QK-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      statusStep: 1,
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
        updateUserProfile,
        orders,
        addOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
