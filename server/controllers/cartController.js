const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * Format and populate cart data with current database prices & totals
 */
const formatCartResponse = async (cartDoc) => {
  if (!cartDoc) {
    return { cartId: null, items: [], subtotal: 0 };
  }

  const populated = await Cart.findById(cartDoc._id).populate('items.product');
  if (!populated) {
    return { cartId: null, items: [], subtotal: 0 };
  }

  const items = [];
  let subtotal = 0;

  for (const item of populated.items) {
    if (!item.product) continue;

    const currentPrice = typeof item.product.price === 'number' ? item.product.price : (item.priceAtAdd || 0);
    const itemTotal = currentPrice * item.quantity;
    subtotal += itemTotal;

    items.push({
      _id: item._id,
      itemId: item._id.toString(),
      product: {
        _id: item.product._id,
        id: item.product._id.toString(),
        name: item.product.name,
        brand: item.product.brand,
        category: item.product.category,
        price: item.product.price,
        originalPrice: item.product.originalPrice || item.product.price,
        discount: item.product.discount || 0,
        images: item.product.images || [],
        stock: item.product.stock,
        colors: item.product.colors || [],
        sizes: item.product.sizes || []
      },
      quantity: item.quantity,
      color: item.color || null,
      size: item.size || null,
      price: currentPrice,
      itemTotal
    });
  }

  return {
    cartId: populated._id,
    items,
    subtotal
  };
};

/**
 * @desc    Get logged-in user cart
 * @route   GET /api/v1/cart
 * @access  Private
 */
const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    const formattedCart = await formatCartResponse(cart);
    return sendSuccess(res, 200, 'User cart retrieved', formattedCart);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add item to user cart
 * @route   POST /api/v1/cart
 * @access  Private
 */
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, color, size } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return sendError(res, 400, 'Valid Product ID is required');
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      return sendError(res, 400, 'Quantity must be at least 1');
    }

    const product = await Product.findById(productId);
    if (!product) {
      return sendError(res, 404, 'Product not found');
    }

    if (product.stock <= 0) {
      return sendError(res, 400, 'This product is currently out of stock');
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (i) => i.product.toString() === productId && i.color === color && i.size === size
    );

    if (existingIndex > -1) {
      const newTotalQty = cart.items[existingIndex].quantity + qty;
      if (newTotalQty > product.stock) {
        return sendError(res, 400, `Only ${product.stock} items are available in stock.`);
      }
      cart.items[existingIndex].quantity = newTotalQty;
    } else {
      if (qty > product.stock) {
        return sendError(res, 400, `Only ${product.stock} items are available in stock.`);
      }
      cart.items.push({
        product: productId,
        quantity: qty,
        color: color || null,
        size: size || null,
        priceAtAdd: product.price
      });
    }

    await cart.save();
    const formattedCart = await formatCartResponse(cart);
    return sendSuccess(res, 200, 'Item added to cart successfully', formattedCart);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update cart item quantity
 * @route   PUT /api/v1/cart/:itemId
 * @access  Private
 */
const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      return removeFromCart(req, res, next);
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return sendError(res, 404, 'Cart not found');

    const item = cart.items.id(itemId);
    if (!item) return sendError(res, 404, 'Cart item not found');

    const product = await Product.findById(item.product);
    if (product && qty > product.stock) {
      return sendError(res, 400, `Only ${product.stock} items are available in stock.`);
    }

    item.quantity = qty;
    await cart.save();

    const formattedCart = await formatCartResponse(cart);
    return sendSuccess(res, 200, 'Cart item updated', formattedCart);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove single item from cart
 * @route   DELETE /api/v1/cart/:itemId
 * @access  Private
 */
const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return sendError(res, 404, 'Cart not found');

    cart.items = cart.items.filter((i) => i._id.toString() !== itemId);
    await cart.save();

    const formattedCart = await formatCartResponse(cart);
    return sendSuccess(res, 200, 'Cart item removed', formattedCart);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear entire user cart
 * @route   DELETE /api/v1/cart
 * @access  Private
 */
const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    const formattedCart = await formatCartResponse(cart);
    return sendSuccess(res, 200, 'Cart cleared successfully', formattedCart);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
