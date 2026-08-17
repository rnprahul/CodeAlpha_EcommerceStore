const { sendError } = require('../utils/apiResponse');

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return sendError(res, 403, 'Forbidden: Admin access privileges required');
  }
};

module.exports = { adminOnly };
