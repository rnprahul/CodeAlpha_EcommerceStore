const { sendError } = require('../utils/apiResponse');

const notFound = (req, res, next) => {
  return sendError(res, 404, `API Resource Not Found - ${req.originalUrl}`);
};

module.exports = notFound;
