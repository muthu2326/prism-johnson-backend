/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Dealer = require('../controllers/dealer.server.controllers');
var multer = require('multer');
var upload = multer({ dest: 'tmp/dealercsv/' }); // for parsing multipart/form-data
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

/*Create dealer record*/
router.post('/', authenticate, upload.array(), Dealer.createDealer);

/* Dealer locator */
router.get('/locator' , authenticate, Dealer.dealerLocator);

/*Get single dealer*/
router.get('/:dealer_id' , authenticate, Dealer.getDealer);

/*Get all Dealers.*/
router.get('/' , authenticate, Dealer.getAllDealers);

router.post('/upload/dealers', authenticate, upload.single('file'), Dealer.importDealersDataCSV);

/*Update an dealer record*/
router.post('/:dealer_id', authenticate, upload.array(), Dealer.updateDealer);

/*Delete dealer */
router.delete('/:dealer_id', authenticate, Dealer.deleteDealer);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Dealer.getAllDealersForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Dealer.getAllDealersSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Dealer.getAllDealersFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Dealer.getAllDealersBySearchText);



module.exports = router;
