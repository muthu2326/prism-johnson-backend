/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var User = require('../controllers/user.server.controllers');
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

/*Create user record*/
router.post('/', upload.array(), authenticate, User.createUser);

/*Create User on registration*/
router.post('/register', authenticate, upload.array(), User.userRegistration);


router.get('/count/orders', authenticate, User.getAllUsersAndOrdersCount);

/*Get single user*/
router.get('/:user_id', authenticate, User.getUser);

/*Get all Users.*/
router.get('/', authenticate, User.getAllUsers);

/*Update an user record*/
router.post('/:user_id', upload.array(), User.updateUser);

/*Delete user */
router.delete('/:user_id', authenticate, User.deleteUser);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo', User.getAllUsersForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy', User.getAllUsersSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText', User.getAllUsersFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText', User.getAllUsersBySearchText);


module.exports = router;