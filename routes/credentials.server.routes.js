/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Credential = require('../controllers/credentials.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create credentials record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ Credential.createCredential);

/*Get single credentials*/
router.get('/:type' , Credential.getCredential);

/*Get all Credentials.*/
router.get('/' , Credential.getAllCredentials);

/*Update an credentials record*/
router.post('/:credentials_id', upload.array(), /*auth.isAuthenticated,*/ Credential.updateCredential);

/*Delete credentials */
router.delete('/:credentials_id', /*auth.isAuthenticated,*/ Credential.deleteCredential);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Credential.getAllCredentialsForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Credential.getAllCredentialsSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Credential.getAllCredentialsFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Credential.getAllCredentialsBySearchText);



module.exports = router;
