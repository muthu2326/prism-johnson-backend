/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var State = require('../controllers/state.server.controllers');
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

/*Create State record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ State.createState);

/*Get single State*/
router.get('/:state_id' , State.getState);

/*Get all States.*/
router.get('/' , authenticate, State.getAllStates);

/*Update an State record*/
router.post('/:state_id', upload.array(), /*auth.isAuthenticated,*/ State.updateState);

/*Delete State */
router.delete('/:state_id', /*auth.isAuthenticated,*/ State.deleteState);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , State.getAllStatesForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , State.getAllStatesSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , State.getAllStatesFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , State.getAllStatesBySearchText);



module.exports = router;
