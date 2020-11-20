/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Query = require('../controllers/queries.server.controllers');
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
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create queries record*/
router.post('/', authenticate, upload.array(), Query.createQuery);

/*Get single queries*/
router.get('/:queries_id' , authenticate, Query.getQuery);

/*Get all Queries.*/
router.get('/' , authenticate, Query.getAllQueries);

/*Update an queries record*/
router.post('/:queries_id', authenticate, upload.array(), Query.updateQuery);

/*Delete queries */
router.delete('/:queries_id', authenticate, Query.deleteQuery);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Query.getAllQueriesForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Query.getAllQueriesSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Query.getAllQueriesFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Query.getAllQueriesBySearchText);



module.exports = router;
