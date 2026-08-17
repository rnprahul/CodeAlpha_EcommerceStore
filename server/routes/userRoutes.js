const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getWishlist,
  addToWishlist,
  removeFromWishlist
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All user profile & wishlist operations require auth

router.route('/me')
  .get(getUserProfile)
  .put(updateUserProfile);

router.route('/me/wishlist')
  .get(getWishlist);

router.route('/me/wishlist/:productId')
  .post(addToWishlist)
  .delete(removeFromWishlist);

module.exports = router;
