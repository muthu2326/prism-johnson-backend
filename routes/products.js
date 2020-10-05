var express = require('express');
var router = express.Router();
var productsController = require('../controllers/products');

/* GET all products */
router.get('/', productsController.getAllProducts);

/* GET details of a product */
router.get('/:id', productsController.getOneProductDetails);

/* Add a Product */
router.post('/', productsController.createProduct);

/* Update a Product */
router.put('/:id', productsController.updateProduct);

/* Delete a Product */
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
