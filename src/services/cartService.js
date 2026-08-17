import { apiRequest } from './api';

export const cartService = {
  async getCart() {
    return await apiRequest('/cart');
  },

  async addToCart(productId, quantity = 1, color = null, size = null) {
    return await apiRequest('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, color, size })
    });
  },

  async updateQuantity(itemId, quantity) {
    return await apiRequest(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    });
  },

  async removeFromCart(itemId) {
    return await apiRequest(`/cart/${itemId}`, {
      method: 'DELETE'
    });
  },

  async clearCart() {
    return await apiRequest('/cart', {
      method: 'DELETE'
    });
  }
};

export default cartService;
