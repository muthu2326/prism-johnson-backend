/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var DescriptionList = require('../controllers/description_list.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create description_list record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ DescriptionList.createDescriptionList);

/*Get single description_list*/
router.get('/:description_list_id' , DescriptionList.getDescriptionList);

/*Get all DescriptionLists.*/
router.get('/' , DescriptionList.getAllDescriptionLists);

/*Update an description_list record*/
router.post('/:description_list_id', upload.array(), /*auth.isAuthenticated,*/ DescriptionList.updateDescriptionList);

/*Delete description_list */
router.delete('/:description_list_id', /*auth.isAuthenticated,*/ DescriptionList.deleteDescriptionList);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , DescriptionList.getAllDescriptionListsForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , DescriptionList.getAllDescriptionListsSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , DescriptionList.getAllDescriptionListsFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , DescriptionList.getAllDescriptionListsBySearchText);



module.exports = router;
