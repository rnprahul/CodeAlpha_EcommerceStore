const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Require JWT authentication for all order operations

router.route('/')
  .post(createOrder)
  .get(getUserOrders);

router.get('/:id', getOrderById);
router.post('/:id/cancel', cancelOrder);

module.exports = router;
