import { apiRequest } from './api';

export const authService = {
  /**
   * Register a new user in MongoDB Atlas
   */
  async register(name, email, password) {
    return await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  },

  /**
   * Login user & get JWT token
   */
  async login(email, password) {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  /**
   * Get current authenticated user profile
   */
  async getMe() {
    return await apiRequest('/auth/me');
  },

  /**
   * Logout user session
   */
  async logout() {
    try {
      return await apiRequest('/auth/logout', { method: 'POST' });
    } catch {
      return { success: true };
    }
  }
};
