import { apiRequest } from './api';

/**
 * Normalizes product data from backend API response for consistent frontend consumption.
 */
export function normalizeProduct(product) {
  if (!product) return null;
  const id = product._id ? product._id.toString() : product.id;

  // Transform specifications if returned as Mongoose Map object
  let specificationsObj = {};
  if (product.specifications) {
    if (product.specifications instanceof Map) {
      specificationsObj = Object.fromEntries(product.specifications);
    } else if (typeof product.specifications === 'object') {
      specificationsObj = product.specifications;
    }
  }

  return {
    ...product,
    id,
    _id: id,
    name: product.name || 'Unnamed Product',
    brand: product.brand || 'QuickKart',
    category: product.category || 'general',
    price: typeof product.price === 'number' ? product.price : 0,
    originalPrice: typeof product.originalPrice === 'number' ? product.originalPrice : (product.price || 0),
    discount: typeof product.discount === 'number' ? product.discount : 0,
    rating: typeof product.rating === 'number' ? product.rating : 4.5,
    reviewCount: typeof product.reviewCount === 'number' ? product.reviewCount : 0,
    images: Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
    description: product.description || '',
    specifications: specificationsObj,
    stock: typeof product.stock === 'number' ? product.stock : 20,
    colors: Array.isArray(product.colors) ? product.colors : [],
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
    featured: Boolean(product.featured),
    trending: Boolean(product.trending),
    inStock: product.inStock !== undefined ? product.inStock : (product.stock > 0)
  };
}

export const productService = {
  /**
   * Get products with query parameters (filtering, search, pagination, sort)
   */
  async getProducts(params = {}) {
    const cleanParams = {};
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '' && params[key] !== 'all') {
        cleanParams[key] = params[key];
      }
    });

    const queryString = new URLSearchParams(cleanParams).toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    const response = await apiRequest(endpoint);

    const rawData = response.data || [];
    const normalizedData = rawData.map(normalizeProduct);

    return {
      success: response.success,
      message: response.message,
      data: normalizedData,
      meta: response.meta || {
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 12,
        total: normalizedData.length,
        totalPages: 1
      }
    };
  },

  /**
   * Get single product by ID
   */
  async getProductById(id) {
    const response = await apiRequest(`/products/${id}`);
    return {
      success: response.success,
      message: response.message,
      data: normalizeProduct(response.data)
    };
  },

  /**
   * Get products by category
   */
  async getProductsByCategory(category, params = {}) {
    return this.getProducts({ ...params, category });
  },

  /**
   * Search products by query string
   */
  async searchProducts(query, params = {}) {
    return this.getProducts({ ...params, search: query });
  },

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit = 8) {
    return this.getProducts({ featured: 'true', limit });
  },

  /**
   * Get trending products
   */
  async getTrendingProducts(limit = 4) {
    return this.getProducts({ trending: 'true', limit });
  }
};

export default productService;
