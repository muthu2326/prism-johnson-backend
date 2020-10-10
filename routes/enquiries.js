var express = require('express');
var router = express.Router();
var enquiriesController = require('../controllers/enquiries');

/* GET all enquiries */
router.get('/', enquiriesController.getAllEnquiries);

/* GET details of a Enquiry */
router.get('/:id', enquiriesController.getOneEnquiryDetails);

/* Place an Enquiry */
router.post('/', enquiriesController.createEnquiry);

/* Update an Enquiry */
router.put('/:id', enquiriesController.updateEnquiry);

/* Delete a Enquiry */
router.delete('/:id', enquiriesController.deleteEnquiry);

module.exports = router;
