/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Order = require('../controllers/orders.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create Order record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ Order.createOrder);

/*Get single order*/
router.get('/:order_id' , Order.getOrder);

/*Get all orders.*/
router.get('/' , Order.getAllOrders);

/*Update an order record*/
router.post('/:order_id', upload.array(), /*auth.isAuthenticated,*/ Order.updateOrder);

/*Delete order */
router.delete('/:order_id', /*auth.isAuthenticated,*/ Order.deleteOrder);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Order.getAllOrdersForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Order.getAllOrdersSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Order.getAllOrdersFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Order.getAllOrdersBySearchText);



module.exports = router;
