const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return sendError(res, 401, 'Not authorized, no access token provided');
  }

  try {
    const secret = process.env.JWT_SECRET || 'quickkart_fallback_jwt_secret';
    const decoded = jwt.verify(token, secret);

    // Fetch user if DB is connected, else fallback to token info
    let user = null;
    try {
      user = await User.findById(decoded.id).select('-password');
    } catch {
      // In case DB is not active or during decoupled dev
    }

    req.user = user || { _id: decoded.id, id: decoded.id, role: decoded.role || 'user' };
    next();
  } catch (error) {
    return sendError(res, 401, 'Not authorized, token verification failed');
  }
};

module.exports = { protect };
