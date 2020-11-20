/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Order = require('../controllers/orders.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data
const {
    authenticate,
    authorizeAdmin,
    authorizeTTE,
    authorizeDealer,
    authorizeAll,
    authorizeAdminTTE,
    authorizeAdminDealer,
    authorizeTTEDealer,
} = require('../middleware/middleware');

/* BEANS code generated for CRR*UD. */

/*Create Order record*/
router.post('/', authenticate, upload.array(), Order.createOrder);

/*Get single order*/
router.get('/:order_id' , authenticate, Order.getOrder);

/*Get all orders.*/
router.get('/' , authenticate, Order.getAllOrders);

/*Update an order record*/
router.post('/:order_id', authenticate, upload.array(), Order.updateOrder);

/*Delete order */
router.delete('/:order_id', authenticate, Order.deleteOrder);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Order.getAllOrdersForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Order.getAllOrdersSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Order.getAllOrdersFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Order.getAllOrdersBySearchText);



module.exports = router;
