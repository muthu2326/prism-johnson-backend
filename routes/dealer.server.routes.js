/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Dealer = require('../controllers/dealer.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create dealer record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ Dealer.createDealer);

/*Get single dealer*/
router.get('/:dealer_id' , Dealer.getDealer);

/*Get all Dealers.*/
router.get('/' , Dealer.getAllDealers);

router.get('/locator' , Dealer.dealerLocator);

/*Update an dealer record*/
router.post('/:dealer_id', upload.array(), /*auth.isAuthenticated,*/ Dealer.updateDealer);

/*Delete dealer */
router.delete('/:dealer_id', /*auth.isAuthenticated,*/ Dealer.deleteDealer);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Dealer.getAllDealersForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Dealer.getAllDealersSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Dealer.getAllDealersFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Dealer.getAllDealersBySearchText);



module.exports = router;
