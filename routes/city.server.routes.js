/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var City = require('../controllers/city.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create city record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ City.createCity);

/*Get single city*/
router.get('/:city_id' , City.getCity);

/*Get all Cities.*/
router.get('/' , City.getAllCities);

/*Update an city record*/
router.post('/:city_id', upload.array(), /*auth.isAuthenticated,*/ City.updateCity);

/*Delete city */
router.delete('/:city_id', /*auth.isAuthenticated,*/ City.deleteCity);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , City.getAllCitiesForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , City.getAllCitiesSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , City.getAllCitiesFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , City.getAllCitiesBySearchText);



module.exports = router;
