var express = require('express');
var router = express.Router();
var ordersController = require('../controllers/orders');

/* GET all orders */
router.get('/', ordersController.getAllOrders);

/* GET details of a Order */
router.get('/:id', ordersController.getOneOrderDetails);

/* Place an Order */
router.post('/', ordersController.createOrder);

/* Update an Order */
router.put('/:id', ordersController.updateOrder);

/* Delete a Order */
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
