const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * Format order document for clean frontend consumption
 */
const formatOrderResponse = (order) => {
  if (!order) return null;
  const orderObj = order.toObject ? order.toObject() : order;
  const idStr = orderObj._id ? orderObj._id.toString() : orderObj.id;

  // Status step indicator: 1 = Processing, 2 = Shipped, 3 = Delivered, 0 = Cancelled
  let statusStep = 1;
  if (orderObj.orderStatus === 'Shipped') statusStep = 3;
  else if (orderObj.orderStatus === 'Delivered') statusStep = 4;
  else if (orderObj.orderStatus === 'Cancelled') statusStep = 0;

  const formattedItems = (orderObj.items || []).map((item) => ({
    _id: item._id ? item._id.toString() : undefined,
    id: item.product ? item.product.toString() : (item.id || idStr),
    product: item.product ? item.product.toString() : undefined,
    name: item.name || 'Product',
    image: item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    price: typeof item.price === 'number' ? item.price : 0,
    quantity: item.quantity || 1,
    color: item.color || null,
    size: item.size || null,
    itemTotal: (item.price || 0) * (item.quantity || 1)
  }));

  return {
    ...orderObj,
    _id: idStr,
    id: idStr,
    orderNumber: `QK-${idStr.slice(-6).toUpperCase()}`,
    date: orderObj.createdAt ? new Date(orderObj.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    status: orderObj.orderStatus || 'Processing',
    orderStatus: orderObj.orderStatus || 'Processing',
    statusStep,
    paymentStatus: orderObj.paymentStatus || 'Paid',
    paymentMethod: orderObj.paymentMethod || 'Credit Card',
    items: formattedItems,
    subtotal: orderObj.subtotal || 0,
    discount: orderObj.discount || 0,
    shippingFee: orderObj.shippingFee || 0,
    tax: orderObj.tax || 0,
    total: orderObj.total || 0,
    shippingAddress: orderObj.shippingAddress || {}
  };
};

/**
 * @desc    Create new order from user's MongoDB cart
 * @route   POST /api/v1/orders
 * @access  Private
 */
const createOrder = async (req, res, next) => {
  try {
    const {
      shippingAddress,
      deliveryMethod = 'standard',
      paymentMethod = 'Credit Card',
      promoCode
    } = req.body;

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.pinCode) {
      return sendError(res, 400, 'Please complete all required shipping address fields.');
    }

    // Load user's cart from MongoDB Atlas
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || !cart.items || cart.items.length === 0) {
      return sendError(res, 400, 'Your shopping cart is empty.');
    }

    let subtotal = 0;
    const verifiedItems = [];
    const productsToUpdate = [];

    // Verify product existence and stock
    for (const item of cart.items) {
      const dbProduct = item.product;

      if (!dbProduct) {
        return sendError(res, 400, 'One or more products in your cart are no longer available.');
      }

      if (dbProduct.stock < item.quantity) {
        return sendError(
          res,
          400,
          `Only ${dbProduct.stock} units of "${dbProduct.name}" are currently available.`
        );
      }

      const price = dbProduct.price;
      const itemSubtotal = price * item.quantity;
      subtotal += itemSubtotal;

      verifiedItems.push({
        product: dbProduct._id,
        name: dbProduct.name,
        image: dbProduct.images && dbProduct.images[0] ? dbProduct.images[0] : '',
        price,
        quantity: item.quantity,
        color: item.color || null,
        size: item.size || null
      });

      productsToUpdate.push({
        productId: dbProduct._id,
        qty: item.quantity,
        name: dbProduct.name
      });
    }

    // Server-side financial calculations
    let discount = 0;
    const cleanPromo = (promoCode || '').trim().toUpperCase();
    if (cleanPromo === 'QUICK15') {
      discount = (subtotal * 15) / 100;
    } else if (cleanPromo === 'SAVE20') {
      discount = Math.min(20, subtotal);
    }

    let shippingFee = (subtotal >= 75 || cleanPromo === 'FREESHIP') ? 0 : 9.99;
    if (deliveryMethod === 'overnight') {
      shippingFee = 19.99;
    }

    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = taxableAmount * 0.08; // 8% sales tax
    const total = Math.max(0, subtotal - discount + shippingFee + tax);

    // Deduct stock and sync inStock status for each ordered item atomically
    const decrementedProducts = [];
    try {
      for (const { productId, qty, name } of productsToUpdate) {
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: productId, stock: { $gte: qty } },
          { $inc: { stock: -qty } },
          { new: true }
        );

        if (!updatedProduct) {
          // Rollback any products decremented earlier in this batch
          for (const rolled of decrementedProducts) {
            const rb = await Product.findByIdAndUpdate(
              rolled.productId,
              { $inc: { stock: rolled.qty } },
              { new: true }
            );
            if (rb) {
              rb.inStock = rb.stock > 0;
              await rb.save();
            }
          }
          return sendError(
            res,
            400,
            `Insufficient stock for "${name}". Please review your cart.`
          );
        }

        // Sync inStock status
        const isStillInStock = updatedProduct.stock > 0;
        if (updatedProduct.inStock !== isStillInStock) {
          updatedProduct.inStock = isStillInStock;
          await updatedProduct.save();
        }

        decrementedProducts.push({ productId, qty });
      }
    } catch (stockErr) {
      // Rollback on error
      for (const rolled of decrementedProducts) {
        const rb = await Product.findByIdAndUpdate(
          rolled.productId,
          { $inc: { stock: rolled.qty } },
          { new: true }
        );
        if (rb) {
          rb.inStock = rb.stock > 0;
          await rb.save();
        }
      }
      return sendError(res, 500, 'Failed to update product stock during checkout.');
    }

    // Create Order in MongoDB Atlas
    const order = await Order.create({
      user: req.user.id,
      items: verifiedItems,
      shippingAddress: {
        fullName: shippingAddress.fullName,
        phone: shippingAddress.phone || req.user.phone || '',
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pinCode: shippingAddress.pinCode,
        country: shippingAddress.country || 'United States'
      },
      deliveryMethod,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      orderStatus: 'Processing',
      subtotal,
      discount,
      shippingFee,
      tax,
      total
    });

    // Clear user cart in MongoDB Atlas after successful order creation
    cart.items = [];
    await cart.save();

    const formattedOrder = formatOrderResponse(order);
    return sendSuccess(res, 201, 'Order placed successfully', formattedOrder);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get logged in user orders
 * @route   GET /api/v1/orders
 * @access  Private
 */
const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    const formattedOrders = orders.map(formatOrderResponse);
    return sendSuccess(res, 200, 'User order history', formattedOrders);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get order details by ID
 * @route   GET /api/v1/orders/:id
 * @access  Private
 */
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 404, 'Order not found');
    }

    const order = await Order.findById(id);

    if (!order) {
      return sendError(res, 404, 'Order not found');
    }

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return sendError(res, 403, 'Forbidden: You do not have permission to view this order.');
    }

    const formattedOrder = formatOrderResponse(order);
    return sendSuccess(res, 200, 'Order details retrieved', formattedOrder);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancel order
 * @route   POST /api/v1/orders/:id/cancel
 * @access  Private
 */
const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 404, 'Order not found');
    }

    const order = await Order.findById(id);
    if (!order) {
      return sendError(res, 404, 'Order not found');
    }

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return sendError(res, 403, 'Forbidden: You do not have permission to cancel this order.');
    }

    if (order.orderStatus !== 'Processing') {
      return sendError(res, 400, 'Your order can no longer be cancelled as it has already been shipped or processed.');
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    // Restore product stock in MongoDB Atlas
    for (const item of order.items) {
      if (item.product) {
        const restoredProd = await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: item.quantity } },
          { new: true }
        );
        if (restoredProd) {
          const isNowInStock = restoredProd.stock > 0;
          if (restoredProd.inStock !== isNowInStock) {
            restoredProd.inStock = isNowInStock;
            await restoredProd.save();
          }
        }
      }
    }

    const formattedOrder = formatOrderResponse(order);
    return sendSuccess(res, 200, 'Order cancelled successfully', formattedOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
};
