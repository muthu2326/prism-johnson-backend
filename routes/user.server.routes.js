/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var User = require('../controllers/user.server.controllers');
const {authenticate} = require('../middleware/middleware')
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create user record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ User.createUser);

/*Create User on registration*/
router.post('/register', upload.array(), /*auth.isAuthenticated,*/ User.userRegistration);


router.get('/count/orders' , User.getAllUsersAndOrdersCount);

/*Get single user*/
router.get('/:user_id' , User.getUser);

/*Get all Users.*/
router.get('/' , User.getAllUsers);

/*Update an user record*/
router.post('/:user_id', upload.array(), /*auth.isAuthenticated,*/ User.updateUser);

/*Delete user */
router.delete('/:user_id', /*auth.isAuthenticated,*/ User.deleteUser);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , User.getAllUsersForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , User.getAllUsersSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , User.getAllUsersFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , User.getAllUsersBySearchText);



module.exports = router;
