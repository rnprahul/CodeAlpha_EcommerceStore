import { apiRequest } from './api';

export const orderService = {
  async createOrder(orderData) {
    return await apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  async getUserOrders() {
    return await apiRequest('/orders');
  },

  async getOrderById(id) {
    return await apiRequest(`/orders/${id}`);
  },

  async cancelOrder(id) {
    return await apiRequest(`/orders/${id}/cancel`, {
      method: 'POST'
    });
  }
};

export default orderService;
