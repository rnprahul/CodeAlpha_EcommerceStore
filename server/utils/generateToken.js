const jwt = require('jsonwebtoken');

const generateToken = (userId, role = 'user') => {
  const secret = process.env.JWT_SECRET || 'quickkart_fallback_jwt_secret';
  const expiresIn = process.env.JWT_EXPIRE || '30d';

  return jwt.sign(
    { id: userId, role },
    secret,
    { expiresIn }
  );
};

module.exports = generateToken;
