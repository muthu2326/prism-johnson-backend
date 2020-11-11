/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Section = require('../controllers/sections.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create sections record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ Section.createSection);

/*Get single sections*/
router.get('/:sections_id' , Section.getSection);

/*Get all Sections.*/
router.get('/' , Section.getAllSections);

/*Update an sections record*/
router.post('/:sections_id', upload.array(), /*auth.isAuthenticated,*/ Section.updateSection);

/*Delete sections */
router.delete('/:sections_id', /*auth.isAuthenticated,*/ Section.deleteSection);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Section.getAllSectionsForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Section.getAllSectionsSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Section.getAllSectionsFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Section.getAllSectionsBySearchText);



module.exports = router;
