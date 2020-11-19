/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Product = require('../controllers/product.server.controllers');
var ProductsMRP = require('../controllers/product_mrp_list.controllers');
var multer = require('multer');
var upload = multer({ dest: 'tmp/product/csv/' }); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create product record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ Product.createProduct);

/*Get single product*/
router.get('/:slug' , Product.getProduct);

/*Get all Products.*/
router.get('/' , Product.getAllProducts);

/*Update an product record*/
router.post('/upload/price', upload.single('file'), /*auth.isAuthenticated,*/ Product.importProductPriceCSV);

/* Get all products mrp */
router.get('/prices/list', ProductsMRP.getAllProductMRPs);

/*Update an product record*/
router.post('/:product_id', upload.array(), /*auth.isAuthenticated,*/ Product.updateProduct);

/*Delete product */
router.delete('/:product_id', /*auth.isAuthenticated,*/ Product.deleteProduct);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Product.getAllProductsForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Product.getAllProductsSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Product.getAllProductsFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Product.getAllProductsBySearchText);



module.exports = router;
