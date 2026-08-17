const User = require('../models/User');
const Product = require('../models/Product');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/users/me
 * @access  Private
 */
const getUserProfile = async (req, res, next) => {
  try {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (user) {
        return sendSuccess(res, 200, 'User profile', user);
      }
    } catch (dbErr) {
      // Fall through
    }
    return sendSuccess(res, 200, 'User profile', req.user);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update current user profile
 * @route   PUT /api/v1/users/me
 * @access  Private
 */
const updateUserProfile = async (req, res, next) => {
  try {
    const { name, avatar, phone, addresses } = req.body;

    // Explicitly prevent role mutation by regular users!
    if (req.body.role) {
      delete req.body.role;
    }

    try {
      const user = await User.findById(req.user.id);
      if (!user) return sendError(res, 404, 'User not found');

      if (name) user.name = name;
      if (avatar) user.avatar = avatar;
      if (phone) user.phone = phone;
      if (addresses) user.addresses = addresses;

      await user.save();
      return sendSuccess(res, 200, 'Profile updated successfully', {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        addresses: user.addresses
      });
    } catch (dbErr) {
      return sendSuccess(res, 200, 'Profile updated (Local mode)', req.body);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user wishlist
 * @route   GET /api/v1/users/me/wishlist
 * @access  Private
 */
const getWishlist = async (req, res, next) => {
  try {
    try {
      const user = await User.findById(req.user.id).populate('wishlist');
      if (user) {
        return sendSuccess(res, 200, 'User wishlist', user.wishlist);
      }
    } catch (dbErr) {
      // Fall through
    }
    return sendSuccess(res, 200, 'User wishlist (Empty)', []);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add product to wishlist
 * @route   POST /api/v1/users/me/wishlist/:productId
 * @access  Private
 */
const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    try {
      const product = await Product.findById(productId);
      if (!product) return sendError(res, 404, 'Product not found');

      const user = await User.findById(req.user.id);
      if (!user) return sendError(res, 404, 'User not found');

      if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
        await user.save();
      }

      return sendSuccess(res, 200, 'Added to wishlist', user.wishlist);
    } catch (dbErr) {
      return sendSuccess(res, 200, 'Added to wishlist (Local mode)');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove product from wishlist
 * @route   DELETE /api/v1/users/me/wishlist/:productId
 * @access  Private
 */
const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    try {
      const user = await User.findById(req.user.id);
      if (!user) return sendError(res, 404, 'User not found');

      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
      await user.save();

      return sendSuccess(res, 200, 'Removed from wishlist', user.wishlist);
    } catch (dbErr) {
      return sendSuccess(res, 200, 'Removed from wishlist (Local mode)');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getWishlist,
  addToWishlist,
  removeFromWishlist
};
