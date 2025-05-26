const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticateToken, isAdmin, isCashierOrAdmin } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authenticateToken);

// Get order statistics - admin only
router.get('/stats', isAdmin, orderController.getOrderStats);

// Get all orders - cashier or admin
router.get('/', isCashierOrAdmin, orderController.getAllOrders);

// Get order by ID - cashier or admin
router.get('/:id', isCashierOrAdmin, orderController.getOrderById);

// Update order status - cashier or admin
router.put('/:id/status', isCashierOrAdmin, orderController.updateOrderStatus);

module.exports = router;