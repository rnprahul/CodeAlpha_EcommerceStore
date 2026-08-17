import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { cartService } from '../services/cartService';

const CartContext = createContext(null);

const PROMO_STORAGE_KEY = 'quickkart_promo';

const VALID_PROMOS = {
  'QUICK15': { type: 'percent', value: 15, description: '15% Off Your Order' },
  'SAVE20': { type: 'fixed', value: 20, description: '$20 Off' },
  'FREESHIP': { type: 'freeship', value: 0, description: 'Free Shipping' }
};

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const [appliedPromo, setAppliedPromo] = useState(() => {
    try {
      const saved = localStorage.getItem(PROMO_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync appliedPromo with localStorage
  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save promo to localStorage:', e);
    }
  }, [appliedPromo]);

  // Transform backend cart payload to frontend structure
  const handleServerCartResponse = useCallback((response) => {
    const rawItems = response?.data?.items || [];
    const normalized = rawItems.map((item) => {
      const prod = item.product || {};
      const prodId = prod.id || prod._id || item.product;
      const itemId = item.itemId || item._id;

      return {
        cartItemId: itemId,
        _id: itemId,
        id: prodId,
        productId: prodId,
        product: prod,
        name: prod.name || 'QuickKart Item',
        brand: prod.brand || 'QuickKart',
        category: prod.category || 'general',
        price: item.price !== undefined ? item.price : (prod.price || 0),
        originalPrice: prod.originalPrice || prod.price || 0,
        image: (prod.images && prod.images[0])
          ? prod.images[0]
          : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        color: item.color || null,
        size: item.size || null,
        quantity: item.quantity,
        maxStock: prod.stock || 99
      };
    });

    setCartItems(normalized);
  }, []);

  // Fetch cart from backend API when authenticated
  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await cartService.getCart();
      handleServerCartResponse(response);
    } catch (err) {
      console.error('Error loading cart from server:', err);
      setError(err.message || 'Unable to load cart');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, handleServerCartResponse]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // Add item to cart
  const addToCart = async (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    if (!isAuthenticated) {
      showToast('Please log in to add items to your cart.', 'error');
      return { success: false, requireLogin: true };
    }

    let productId = null;
    let prodName = 'Item';

    if (typeof product === 'string') {
      productId = product;
    } else if (product && (product.id || product._id)) {
      productId = product._id || product.id;
      prodName = product.name || 'Item';
    }

    if (!productId) {
      showToast('Invalid product selected.', 'error');
      return { success: false };
    }

    try {
      setIsUpdating(true);
      const response = await cartService.addToCart(productId, quantity, selectedColor, selectedSize);
      handleServerCartResponse(response);
      showToast(`Added "${prodName}" to cart!`, 'success');
      return { success: true };
    } catch (err) {
      const msg = err.message || 'Unable to add item to cart.';
      showToast(msg, 'error');
      return { success: false, message: msg };
    } finally {
      setIsUpdating(false);
    }
  };

  // Update quantity of item in cart
  const updateQuantity = async (cartItemId, newQty) => {
    if (!isAuthenticated) return;

    try {
      setIsUpdating(true);
      const response = await cartService.updateQuantity(cartItemId, newQty);
      handleServerCartResponse(response);
    } catch (err) {
      const msg = err.message || 'Unable to update item quantity.';
      showToast(msg, 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    if (!isAuthenticated) return;

    try {
      setIsUpdating(true);
      const itemToRemove = cartItems.find((i) => i.cartItemId === cartItemId || i._id === cartItemId);
      const response = await cartService.removeFromCart(cartItemId);
      handleServerCartResponse(response);
      if (itemToRemove) {
        showToast(`Removed "${itemToRemove.name}" from cart.`, 'info');
      }
    } catch (err) {
      showToast(err.message || 'Unable to remove item from cart.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  // Clear entire user cart
  const clearCart = async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      setAppliedPromo(null);
      return;
    }

    try {
      setIsUpdating(true);
      const response = await cartService.clearCart();
      handleServerCartResponse(response);
      setAppliedPromo(null);
      showToast('Cart cleared.', 'info');
    } catch (err) {
      showToast(err.message || 'Unable to clear cart.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return { success: false, message: 'Please enter a coupon code.' };

    if (VALID_PROMOS[cleanCode]) {
      const promoData = { code: cleanCode, ...VALID_PROMOS[cleanCode] };
      setAppliedPromo(promoData);
      showToast(`Promo code "${cleanCode}" applied!`, 'success');
      return { success: true, message: `Promo code applied: ${promoData.description}` };
    } else {
      showToast('Invalid coupon code.', 'error');
      return { success: false, message: 'Invalid or expired coupon code. Try "QUICK15" or "FREESHIP".' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed.', 'info');
  };

  // Computations using current backend item prices
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo || subtotal === 0) return 0;
    if (appliedPromo.type === 'percent') {
      return (subtotal * appliedPromo.value) / 100;
    }
    if (appliedPromo.type === 'fixed') {
      return Math.min(appliedPromo.value, subtotal);
    }
    return 0;
  }, [subtotal, appliedPromo]);

  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (appliedPromo && appliedPromo.type === 'freeship') return 0;
    return subtotal >= 75 ? 0 : 9.99;
  }, [subtotal, appliedPromo]);

  const taxAmount = useMemo(() => {
    const taxable = Math.max(0, subtotal - discountAmount);
    return taxable * 0.08; // 8% sales tax
  }, [subtotal, discountAmount]);

  const totalAmount = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);
  }, [subtotal, discountAmount, shippingFee, taxAmount]);

  const totalItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        isUpdating,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        totalAmount,
        totalItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
