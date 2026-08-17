const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * @desc    Register a new user in MongoDB Atlas
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      return sendError(res, 400, 'Please provide your full name');
    }

    if (!email || !email.trim()) {
      return sendError(res, 400, 'Please provide a valid email address');
    }

    if (!password || password.length < 6) {
      return sendError(res, 400, 'Password must be at least 6 characters long');
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists in MongoDB
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return sendError(res, 400, 'This email is already registered.');
    }

    // Create user in MongoDB Atlas (role is forced to "user")
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: 'user'
    });

    const token = generateToken(user._id, user.role);

    return sendSuccess(res, 201, 'Registration successful', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        addresses: user.addresses || []
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & get JWT token from MongoDB Atlas
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, 'Please provide email and password');
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user in MongoDB Atlas including hidden password field
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      return sendError(res, 401, 'Invalid email or password');
    }

    // Compare password using bcrypt
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return sendError(res, 401, 'Invalid email or password');
    }

    const token = generateToken(user._id, user.role);

    return sendSuccess(res, 200, 'Logged in successfully', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        addresses: user.addresses || []
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return sendError(res, 404, 'User account not found');
    }

    return sendSuccess(res, 200, 'Current user profile', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        addresses: user.addresses || [],
        wishlist: user.wishlist || []
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user / clear token
 * @route   POST /api/v1/auth/logout
 * @access  Public
 */
const logoutUser = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  return sendSuccess(res, 200, 'Logged out successfully');
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser
};
