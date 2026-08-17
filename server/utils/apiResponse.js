/**
 * Send a standardized success JSON response
 */
const sendSuccess = (res, statusCode = 200, message = 'Operation successful', data = null, meta = null) => {
  const response = {
    success: true,
    message
  };

  if (data !== null) {
    response.data = data;
  }

  if (meta !== null) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send a standardized error JSON response
 */
const sendError = (res, statusCode = 500, message = 'Something went wrong', errors = null) => {
  const response = {
    success: false,
    message
  };

  if (errors !== null) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

module.exports = {
  sendSuccess,
  sendError
};
