/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Banner = require('../controllers/banner.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create banner record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ Banner.createBanner);

/*Get single banner*/
router.get('/:banner_id' , Banner.getBanner);

/*Get all Banners.*/
router.get('/' , Banner.getAllBanners);

/*Update an banner record*/
router.post('/:banner_id', upload.array(), /*auth.isAuthenticated,*/ Banner.updateBanner);

/*Delete banner */
router.delete('/:banner_id', /*auth.isAuthenticated,*/ Banner.deleteBanner);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Banner.getAllBannersForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Banner.getAllBannersSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Banner.getAllBannersFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Banner.getAllBannersBySearchText);



module.exports = router;
