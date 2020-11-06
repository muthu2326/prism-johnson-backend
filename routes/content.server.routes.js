/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Content = require('../controllers/content.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create content record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ Content.createContent);

/*Get single content*/
router.get('/:content_id' , Content.getContent);

/*Get all Contents.*/
router.get('/' , Content.getAllContents);

/*Update an content record*/
router.post('/:content_id', upload.array(), /*auth.isAuthenticated,*/ Content.updateContent);

/*Delete content */
router.delete('/:content_id', /*auth.isAuthenticated,*/ Content.deleteContent);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Content.getAllContentsForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Content.getAllContentsSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Content.getAllContentsFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Content.getAllContentsBySearchText);



module.exports = router;
