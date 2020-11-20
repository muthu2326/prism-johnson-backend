/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Testimonial = require('../controllers/testimonial.server.controllers');
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

/*Create testimonial record*/
router.post('/', upload.array(), authenticate, Testimonial.createTestimonial);

/*Get single testimonial*/
router.get('/:slug' , authenticate, Testimonial.getTestimonial);

/*Get all Testimonials.*/
router.get('/' , authenticate, Testimonial.getAllTestimonials);

/*Update an testimonial record*/
router.post('/:testimonial_id', authenticate, upload.array(), Testimonial.updateTestimonial);

/*Delete testimonial */
router.delete('/:testimonial_id', authenticate, Testimonial.deleteTestimonial);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Testimonial.getAllTestimonialsForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Testimonial.getAllTestimonialsSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Testimonial.getAllTestimonialsFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Testimonial.getAllTestimonialsBySearchText);



module.exports = router;
