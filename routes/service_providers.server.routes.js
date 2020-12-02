/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var ServiceProvider = require('../controllers/service_providers.server.controllers');
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


router.post('/csv-import', authenticate, upload.single('file'), ServiceProvider.importServiceProvidersDataCSV);

/* BEANS code generated for CRR*UD. */

/*Create service_providers record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ ServiceProvider.createServiceProvider);

/*Get single service_providers*/
router.get('/:service_providers_id' , ServiceProvider.getServiceProvider);

/*Get all ServiceProviders.*/
router.get('/' , ServiceProvider.getAllServiceProviders);

/*Update an service_providers record*/
router.post('/:service_providers_id', upload.array(), /*auth.isAuthenticated,*/ ServiceProvider.updateServiceProvider);

/*Delete service_providers */
router.delete('/:service_providers_id', /*auth.isAuthenticated,*/ ServiceProvider.deleteServiceProvider);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , ServiceProvider.getAllServiceProvidersForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , ServiceProvider.getAllServiceProvidersSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , ServiceProvider.getAllServiceProvidersFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , ServiceProvider.getAllServiceProvidersBySearchText);



module.exports = router;
